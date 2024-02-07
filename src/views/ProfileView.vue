<template>
  <div class="profile-view">
    <Siderbar />
    <div class="profile-mid">
      <p class="profile-mid-title">Update Admin Details</p>
      <div class="details-edit-show">
        <div class="details-show" v-for="userDetail in userDetails" :key="userDetail">
          <ProfileViewDetails :userDetail="userDetail"/>
        </div>
        <div class="details-edit" v-for="userDetail in userDetails" :key="userDetail">
          <DetailsForm :userDetail="userDetail"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Siderbar from '@/components/Siderbar.vue';
import ProfileViewDetails from '@/components/ProfileViewDetails.vue';
import DetailsForm from '@/components/DetailsForm.vue';
import { ref } from 'vue';
import { auth, db } from '../assets/firebase'
import { deleteDoc, doc, collection, updateDoc, onSnapshot } from "firebase/firestore";

export default {
  name: 'ProfileView',
  components: {
    Siderbar,
    ProfileViewDetails,
    DetailsForm
  },
  setup() {

    const userDetails = ref([])
    const email = ref("")
    const books_read = ref("")
    const age = ref("")
    const height = ref("")

    const handleEdit = () => {
      // updateDoc(doc(db, 'user-details', ))
    }

    onSnapshot(collection(db, 'user-details'), (snapshot) => {
      const changes = snapshot.docChanges()
      changes.forEach(change => {
        if (change.type == "modified"){
            let modifiedDetails = userDetails.value;
            let modifiedDetail = modifiedDetails.findIndex(item => {
              return item.id === change.doc.id
            })
            modifiedDetails.splice(modifiedDetail, 1, {...change.doc.data(), id: change.doc.id})
            userDetails.value = modifiedDetails;
        } else if (change.type == "added"){
          userDetails.value.push({...change.doc.data(), id: change.doc.id})
        }
    })})
        

  
    return {
      email,
      books_read,
      age,
      height,
      handleEdit,
      userDetails,
    }
  }
}
</script>
<style>
  .profile-view{
    padding: 0;
    margin: 0;
    display: flex;
    height: 100%;
  }
  .profile-mid{
    margin: 30px;
    width: 80vw;
    display: flex;
    flex-direction: column;
  }
  .profile-mid-title{
    font-weight: 600;
    font-size: 2rem;
    color: #a9dfd8;
    padding-bottom: 15px;
    border-bottom: 1px solid #3d4850;
  }
  .details-edit-show{
    display: flex;
    margin-top: 30px;
    justify-content: flex-start;
    gap: 100px;
  }
  .details-show{
    background: #a9dfd8;
    padding: 20px;
    height: 35vh;
    width: 30vw;
    border-radius: 10px;
    letter-spacing: 0.7px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .details-show p, .details-show span{
    background: #a9dfd8;
  }
  .details-show span{
    font-weight: 700;
  }
  .details-edit, form, form label, form input, .profileFormInput{
    background: #21222d;
  }
  .details-edit{
    background-color: #21222d;
    border-radius: 5px;
    padding: 18px 20px 30px 20px;
    width: 25vw;
  }
  form{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .profileFormInput{
    display: flex;
    flex-direction: column;
    gap: 7px;
    justify-content: flex-start;
    width: 100%;

  }
  .profileFormInput label{
    font-size: 1.05rem;
    font-weight: 500;
    color: #a9dfd8;
  }
  .profileFormInput input{
    background: #3d4850;
    padding: 5px 10px;
    letter-spacing: 0.7px;
    border-radius: 5px;
    color: #a9dfd8;
    outline: none;
    font-size: small;
    width: 100%;
  }
  .profileFormInput button{
    background: #a9dfd8;
    width: 100%;
    border: none;
    letter-spacing: 0.7px;
    font-size: small;
    outline: none;
    color: #21222d;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 5px 20px;
    margin-top: 5px;
   }
</style>
