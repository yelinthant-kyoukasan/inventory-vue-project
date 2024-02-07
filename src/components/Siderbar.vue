<template>
    <div class="sidebar">
        <div class="sidebar-container">
            <p class="nav-items">
              <v-icon icon="mdi-view-dashboard" class="bar-icons"></v-icon>
              <router-link to="/">Dashboard</router-link>
            </p>
            <p class="nav-items">
              <v-icon icon="mdi-garage" class="bar-icons"></v-icon>
              <router-link to="/inventory">Inventory</router-link>
            </p>
            <p class="nav-items">
              <v-icon icon="mdi-calendar-check" class="bar-icons"></v-icon>
              <router-link to="/todos">Todos</router-link>
            </p>
            <p class="nav-items">
              <v-icon icon="mdi-account" class="bar-icons"></v-icon>
              <router-link to="/profile">Profile</router-link>
            </p>
            <p class="nav-items" @click="logout">
              <v-icon icon="mdi-logout" class="bar-icons"></v-icon>
              Sign out
            </p>
        </div>
    </div>    
</template>
  
<script>
import { signOut } from "firebase/auth";
import { auth } from "../assets/firebase";
import router from "@/router";

  export default {
    name: 'Sidebar',
    components: {
        
        },
    setup() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if( !userData || userData == null || userData == undefined) {
        router.push({ path: '/login' })
      }
      const logout = async () => {
        await signOut(auth).then(res => console.log("logged out!")).catch(err => console.log(err))
        localStorage.setItem('user', null);
        router.push('/login')
      }

      return {
        logout
      }
    }
    }
    
</script>
<style>
  .nav-items{
    display: flex;
    gap: 5px;
  }
.sidebar{
    width: 15vw;
    border-right: 1px solid #3d4850;
    display: flex;
    justify-content: center;
  }
  .sidebar-container{
    text-align: center;
    padding: 20px;
    text-decoration: none;
  }
  .sidebar-container a, .sidebar-container p{
    text-align: center;
    color: #6a8b88;
    text-decoration: none;
  }
  .nav-items{
    margin: 40px 0;
    padding: 13px 25px;
    border-radius: 10px;
  }
  .bar-icons{
    background: transparent;
  }
  .nav-items:hover{
    background: #3d4850;
    transition: .4s;
    cursor: pointer;
  }
</style>
  