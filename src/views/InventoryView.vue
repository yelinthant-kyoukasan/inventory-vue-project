<template>
  <div class="inventory">
    <Siderbar />
    <div class="mid-inventory">
      <div class="inventory-second">
        <div class="gadgets-components">
          <!-- <Gadget :gadget="gadget1"/>
          <Gadget :gadget="gadget2"/>
          <Gadget :gadget="gadget3"/>
          <Gadget :gadget="gadget4"/> -->
          <p class="inventory-class">Welcome to Inventory</p>
        </div>  
        <div class="table-container" v-if="show">
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Book Title</th>
                      <th>Rating</th>
                      <th>Price</th>
                      <th>Weight</th>
                      <th>Quantity</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody v-for="(book, index) in books" :key="book">
                  <BookRow 
                      :book="book"
                      :index="index"
                  />
              </tbody>
          </table>
      </div>
        <div v-else>
          <h1 style="color: #a9dfd8; margin-top: 20px;">
            There are no books in the inventory.
          </h1>
        </div>
      </div>
    </div>
    <Profile/>
  </div>
</template>

<script>
import Siderbar from '@/components/Siderbar.vue';
import Gadget from '@/components/Gadget.vue';
import { ref, watch } from 'vue';
import BookRow from '@/components/BookRow.vue';
import Profile from '@/components/Profile.vue';
import { db } from '../assets/firebase'
import { getDocs, collection, onSnapshot } from 'firebase/firestore'

export default {
  name: 'InventoryView',
  components: {
    Siderbar,
    Gadget,
    BookRow,
    Profile
  },

  setup(){

        //variables
        let show = ref(true)
        const books = ref([])
        //-----------------------------------------------------------------------

        //books
        onSnapshot(collection(db, 'books'), async (snapshot) => {
          const changes = snapshot.docChanges()
          // change.value.push(changes)
          changes.forEach(change => {
            if (change.type == "removed") {
                let deletedbook = books.value.findIndex(item => {
                  return item.id === change.doc.id
                })
                if (deletedbook >= 0){
                  books.value.splice(deletedbook, 1)
                }
            } else if (change.type == "added"){
                books.value.push({...change.doc.data(), id: change.doc.id})
            } else if (change.type == "modified") {
                let modifiedbooks = books.value;
                let modifiedbook = modifiedbooks.findIndex(item => {
                  return item.id === change.doc.id
                })
                modifiedbooks.splice(modifiedbook, 1, {...change.doc.data(), id: change.doc.id})
                books.value = modifiedbooks;              
            }
          }) 
          if (books.value.length == 0) {
            show.value = false;
          } else {
            show.value = true;
          }
        })
        //-----------------------------------------------------------------------



        return {
          show,
          books
        }
  }
}
</script>
<style>
.table-container{
  margin-top: 30px;
}
table{
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #65666d;
  text-align: left;
  border-radius: 20px;
  color: #a9dfd8;
  text-align: center;
}

tr {
  border-top: 1px solid #65666d;
}

th{
  font-weight: 600;
}

tr, th, td{
  padding: 15px;
}
.inventory-class{
  font-weight: 600;
  font-size: 2rem;
  color: #a9dfd8;
}

.table-icons:hover{
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201,201,201, 0.47);
}
.inventory{
  padding: 0;
  margin: 0;
  display: flex;
  height: 100%;
}
.mid-inventory{
  width: 60vw;
}
.inventory-second{
  margin: 30px;
}
.gadgets-components{
  display: flex;
  gap: 62px;
}
</style>
