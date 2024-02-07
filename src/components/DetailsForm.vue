<template>
    <form action="" @submit.prevent="handleEditDetails">
        <div className="profileFormInput">
            <label>Books Read</label>
            <input type="text" requried placeholder="Type here..." v-model="books_read"/>
        </div>
        <div className="profileFormInput">
            <label>Age</label>
            <input type="text" requried placeholder="Type here..." v-model="age"/>
        </div>
        <div className="profileFormInput">
          <label>Height</label>
          <input type="text" requried placeholder="Type here..." v-model="height"/>
        </div>
        <div className="profileFormInput">
          <button type="submit">Update</button>
        </div>
    </form> 
</template>
  
<script>
  import { ref } from 'vue';
  import { db } from '../assets/firebase'
  import { deleteDoc, doc, collection, updateDoc, onSnapshot } from "firebase/firestore";
  import { getAuth, updateEmail, verifyBeforeUpdateEmail, sendSignInLinkToEmail } from "firebase/auth";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    name: 'DetailsForm',
    components: {
      
    },
    props: ["userDetail"],
    setup(props) {

      const auth = getAuth();
      const books_read = ref(props.userDetail.read)
      const age = ref(props.userDetail.age)
      const height = ref(props.userDetail.height)
      const actionCodeSettings = {
        url: "http://localhost:8080/profile",
        handleCodeInApp: true
      }
  
          
      const handleEditDetails = () => {
        // console.log(email.value, books_read.value, age.value, height.value)

        //docs
        if (auth.currentUser.emailVerified == false) {
            toast.error(
                "Please verify your email first.",
                {
                    autoClose: 3500
                }
            )
            books_read.value = props.userDetail.read
            age.value = props.userDetail.age
            height.value = props.userDetail.height
        } else {
            updateDoc(doc(db, 'user-details', props.userDetail.id), {
                age: parseInt(age.value),
                height: parseInt(height.value),
                read: parseInt(books_read.value)
            })
            .then(() => {
              age.value = props.userDetail.age;
              books_read.value = props.userDetail.read;
              height.value = props.userDetail.value;
              console.log("successful")
            })
            .catch(err => console.log(err))
        }
      }

    
  
    
      return {
        books_read,
        age,
        height,
        handleEditDetails,
      }
    }
  }
  </script>
  <style>

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
  