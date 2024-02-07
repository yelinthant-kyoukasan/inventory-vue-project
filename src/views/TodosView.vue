<template>
  <div class="Todos">
    <Siderbar />
    <div class="todos-mid">
      <div class="todos-mid-second">
        <p class="todos-mid-title">Welcome to Sticky Wall</p>
        <StickyNotes v-if="show"/>
        <div v-else>
          <h1 style="color: #fdb85a; margin-top: 20px;">
            There are no to-dos!
          </h1>
        </div>
      </div>
    </div>
    <AddTodo />
  </div>
</template>

<script>
import Siderbar from '@/components/Siderbar.vue';
import StickyNotes from '../components/StickyNotes.vue';
import AddTodo from '../components/AddTodo.vue'
import { db } from '../assets/firebase'
import { getDocs, collection, onSnapshot } from 'firebase/firestore'
import { onMounted, onUpdated } from 'vue';
import { ref } from 'vue';

export default {
  name: 'TodosView',
  components: {
    Siderbar,
    StickyNotes,
    AddTodo
  },
  setup() {
    let show = ref(true)

    const todos = ref([])

    onSnapshot(collection(db, 'todos'), (snapshot) => {
      const changes = snapshot.docChanges()
      changes.forEach(change => {
        if (change.type == "removed") {
            let newtodos = todos.value
            let deletedtodo = newtodos.findIndex(item => {
                return item.id === change.doc.id
            })
            newtodos.splice(deletedtodo, 1)
            todos.value = newtodos
        } else if (change.type == "added"){
            todos.value.push({...change.doc.data(), id: change.doc.id})
        } else if (change.type == "modified"){
            let modifiedtodos = todos.value;
            let modifiedtodo = modifiedtodos.findIndex(item => {
              return item.id === change.doc.id
            })
            modifiedtodos.splice(modifiedtodo, 1, {...change.doc.data(), id: change.doc.id})
            todos.value = modifiedtodos;
        }
      })
      // console.log(todos.value.length)
      if (todos.value.length == 0) {
        show.value = false;
      } else {
        show.value = true;
      }
    })

      return {
        show
      }

    }
  }
</script>
<style>
  .Todos{
    padding: 0;
    margin: 0;
    display: flex;
    height: 100%;
  }
  .todos-mid{
    width: 60vw;
  }
  .todos-mid-second{
    margin: 30px;
  }
  .todos-mid-title{
    font-weight: 600;
    font-size: 2rem;
    color: #a9dfd8;
  }
</style>
