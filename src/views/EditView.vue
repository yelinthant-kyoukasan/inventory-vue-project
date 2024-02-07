<template>
    <div class="edit-view">
      <Siderbar />
      <div class="edit-mid">
        <p class="edit-mid-title">Update Book Details</p>
        <div class="details-edit-show">
          <div class="details-show" v-for="singlebook in book" :key="book">
            <EditViewDetails :book="singlebook"/>
          </div>
          <div class="details-edit" v-for="singlebook in book" :key="book">
            <EditDetailsForm :book="singlebook"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Siderbar from '@/components/Siderbar.vue';
  import { ref } from 'vue';
  import { auth, db } from '../assets/firebase'
  import { deleteDoc, doc, collection, updateDoc, onSnapshot } from "firebase/firestore";
  import EditViewDetails from '../components/EditViewDetails.vue'
  import EditDetailsForm from '../components/EditDetailsForm.vue'
  import { useRoute, useRouter } from 'vue-router';
    import { watch } from 'vue';
  
  export default {
    name: 'EditView',
    components: {
      Siderbar,
      EditDetailsForm,
      EditViewDetails
    },
    setup() {

        const book = ref([])
        const route = useRoute()
        const id = route.params.id;
        // console.log(id)

        

        onSnapshot(doc(db, "books", id), (doc) => {
            const newbook = book.value;
            // console.log("This is doc data", doc.data())
            book.value.splice(0, 1, {...doc.data(), id: id})
            // console.log("This is book data", book.value)
        })

      return {
        book,
      }
    }
  }
  </script>
<style>
.edit-view{
    padding: 0;
    margin: 0;
    display: flex;
    height: 100%;
  }
  .edit-mid{
    margin: 30px;
    width: 80vw;
    display: flex;
    flex-direction: column;
  }
  .edit-mid-title{
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
  