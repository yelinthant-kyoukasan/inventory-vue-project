<template>
  <div class="container">
    <div class="login-container">
      <div class="login-second-container">
        <p>ADMIN LOGIN</p>
        <form @submit.prevent="login">
          <input type="email" placeholder="Email" v-model="email">
          <input type="password" placeholder="Password" v-model="password">
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from "../assets/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'LoginView',
  components: {
    
  },
  setup(){
    const email = ref("")
    const password = ref("")
    // const auth = getAuth();
    // console.log(auth) 
    const login = async () => {
      console.log("Hello")
      await signInWithEmailAndPassword(auth, email.value, password.value)
        .then((auth) => {
          console.log("logged in!")
          localStorage.setItem('user', JSON.stringify(auth.user))
          router.push({ path: '/'})
        })
        .catch(err => {
          toast.error("Invalid email or password", {
            autoClose: 5000
          })
          console.log(err)
        })
    }
    return {
      email,
      password,
      login
    }
  }
}
</script>
<style>
  .container{
    padding: 0;
    margin: 0;
    width: 99vw;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-container{
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 500px;
    height: 400px;
    background-color: #21222d;
    color: #a9dfd8;
    border-radius: 20px;
  }
  .login-second-container{
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: #21222d;
  }
  .login-second-container p{
    font-weight: 600;
    font-size: x-large;
    background-color: #21222d;
    margin-bottom: 40px;
  }
  .login-second-container form{
    flex: 0.6;
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #21222d;

  }
  .login-second-container input, .login-second-container button{
    background: #3d4850;
    width: 100%;
    border: none;
    margin: 0 0 30px 0;
    padding: 5px 10px;
    letter-spacing: 0.7px;
    font-size: small;
    font-family: "Poppins", sans-serif;
    outline: none;
    color: #a9dfd8;
    text-transform: uppercase;
    border-radius: 5px;
    height: 30px;
  }

  .login-second-container button{
    height: 35px;
    background-color: #a9dfd8;
    padding: 5px 20px;
    color: #3d4850;
  }
</style>
