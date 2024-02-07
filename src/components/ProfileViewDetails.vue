<template>
    <p>Email - <span>{{ email }}</span></p>
    <p>Books Read - <span>{{ userDetail.read }}</span></p>
    <p>Age - <span>{{ userDetail.age }}</span></p>
    <p>Height - <span>{{ userDetail.height }}cm</span></p>   
    <button v-if="showVerify" class="verified">Email Verified!</button>
    <button v-else class="verify" @click="handleVerify">Verify Email</button>
</template>  
<script>
  import { ref } from 'vue';
  import { auth, db } from '../assets/firebase'
  import { deleteDoc, doc, collection, updateDoc } from "firebase/firestore";
  import { getAuth, sendEmailVerification } from "firebase/auth";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    name: 'ProfileViewDetails',
    components: {
    },
    props: ["userDetail"],
    setup(props) {
        const auth = getAuth();
        const userDetail = props.userDetail;
        const email = auth.currentUser.email
        const showVerify = ref(false)

        if (auth.currentUser.emailVerified == false) {
            showVerify.value = false;
        } else {
            showVerify.value = true;
        }

        const actionCodeSettings = {
            url: "http://localhost:8080/profile",
            handleCodeInApp: true
        }

        const handleVerify = async () => {
            sendEmailVerification(auth.currentUser, actionCodeSettings)
                .then(() => {
                    toast.success("A verification link is sent to your email!", {
                        autoClose: 4000
                    })
                    console.log("sent")
                })
                .catch((error) => {
                    console.log(error)
                });
        }

        auth.onAuthStateChanged( userCred => {
            console.log(userCred)
        })

        return {
            userDetail,
            email,
            showVerify,
            handleVerify
        }
    }
  }
  </script>
  <style>
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
    .verify, .verified{
        background: #20aef3;
        padding: 10px;
        border-radius: 15px;
    }
    .verified{
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
        box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
    }
    .verify:hover{
        cursor: pointer;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
        box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
    }
  </style>
  