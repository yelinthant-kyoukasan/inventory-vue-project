<template>
    <div class="notes-container" v-for="todo in todos" :key="todo">
        <Note :note="todo"/>
    </div>
</template>  
<script>
  import { ref } from 'vue';
  import Note from './Note.vue';
  import { db } from '@/assets/firebase';
  import { getDocs, collection, onSnapshot } from 'firebase/firestore'
  import { onMounted } from 'vue';

  
  export default {
    name: 'StickyNotes',
    components: {
    Note
    },
    setup() {

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
                    console.log(modifiedtodo)
                    modifiedtodos.splice(modifiedtodo, 1, {...change.doc.data(), id: change.doc.id})
                    console.log(modifiedtodos)
                    todos.value = modifiedtodos;
                }
            })
        })        

        return {
            todos
        }
    }
  }
</script>
<style>
    .notes-container{
        width: 60vw;
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
    }
</style>
  