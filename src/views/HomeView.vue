<template>
  <div class="home">
    <Sidebar />
    <div class="mid-container">
      <div class="mid-second">
        <div class="search-bar">
          <v-icon icon="mdi-magnify" class="icon-magnify"></v-icon>
          <input type="text" placeholder="SEARCH">
        </div>
        <div class="components">
          <Gadget :gadget="gadget1"/>
          <Gadget :gadget="gadget2"/>
          <Gadget :gadget="gadget3"/>
          <Gadget :gadget="gadget4"/>
        </div>
        <div class="add-book">
          <AddBook />
        </div>
      </div>
    </div>
    <Profile />
  </div>
</template>

<script>
import Gadget from '@/components/Gadget.vue';
import AddBook from '@/components/AddBook.vue';
import Sidebar from '../components/Siderbar.vue'
import Profile from '../components/Profile.vue'
import { defineComponent } from 'vue';
import { ref } from 'vue';
import router from '@/router';
import { db } from '@/assets/firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore'
import { onMounted } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Gadget,
    AddBook,
    Profile,
    Sidebar
  },
  setup() {

      const gadget1 = ref(["mdi-account-group","#fdb85a","Customers", 290]);
      const gadget2 = ref(["mdi-garage","#a9dfd8","Inventory", 0]);
      const gadget3 = ref(["mdi-truck","#20aef3","Orders", 23]);
      const gadget4 = ref(["mdi-alert-circle-outline","#f2c8ed","Out-of-stock", 0]);

    return {
      gadget1,
      gadget2,
      gadget3,
      gadget4,
      // details
    }
  }
});
</script>

<style>
  .mid-container{
    width: 60vw;
  }
  .add-book{
    margin-top: 30px;
  }
  .components{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 62px;
  }
  .search-bar{
    display: flex;
    background: #21222d;
    height: 40px;
    border-radius: 5px;
    padding: 0px 10px;
    justify-content: center;
  }
  .search-bar > *{
    background: #21222d;

  }
  .search-bar .icon-magnify{
    background: #21222d;
    height: 40px;
    padding: 5px 10px;
    border-radius: 5px;
    color: #65666d;
    font-size: larger;
  }
  .search-bar input{
    background: #21222d;
    width: 100%;
    border: none;
    padding: 5px 10px;
    letter-spacing: 0.7px;
    font-size: small;
    font-family: "Poppins", sans-serif;
    outline: none;
    color: #65666d;
    border-radius: 5px;
    height: 40px;
  }
  .search-bar input:focus{
    color: #a9dfd8;
  }
  .mid-second{
    margin: 30px;
  }
  .home{
    padding: 0;
    margin: 0;
    display: flex;
  }
</style>

