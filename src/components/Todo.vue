<template>
      <div class="todo">
        <div class="title-due">
            <p class="title">{{ todo.title }}</p>
            <p class="due">{{ todo.due }}</p>
        </div>
        <div class="done-trash">
            <div class="pencil-edit" @click="handleEdit" v-if="!todo.status">
                <v-icon icon="mdi-check" class="done-check"></v-icon>
            </div>
            <div class="trash-delete" @click="handleDelete">
                <v-icon icon="mdi-trash-can" class="trash"></v-icon>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { auth, db } from '../assets/firebase'
import { deleteDoc, doc, collection, updateDoc } from "firebase/firestore";

  export default {
    name: 'Todo',
    props: ['todo'],
    components: {
        
        },
    setup (props){
        const todo = props.todo;

        const handleDelete = async () => {
          // console.log(book.id)
          deleteDoc(doc(db, 'todos', props.todo.id))
          .then(() => {
            console.log("sucessfully deleted!")
          })
          .catch(err => console.log(err))
        }

        const handleEdit = async () => {
            updateDoc(doc(db, 'todos', props.todo.id), {
                status: true,
            })
            .then(() => {
            console.log("sucessfully updated!")
            })
          .catch(err => console.log(err))
        }
        return {
            todo,
            handleEdit,
            handleDelete
        }
    }
    }
    
</script>
<style>
    .todo{
        margin-top: 10px;
        padding: 10px 15px;
        border-radius: 8px;
        background: #0b0c0f;
        display: flex;
        justify-content: space-between;
    }
    .todo, .title-due p, .title, .due, .done-trash, .done-trash > *{
        background: #0b0c0f;
    }
    .title, .due{
        font-size: 0.8rem;
    }
    .title{
        font-weight: 400;
        color: #a9dfd8;
        background: #0b0c0f;
    }
    .due{
        color: #65666d;
        background: #0b0c0f;
    }
    .done-trash{
        display: flex;
    }
    .done-trash .done-check{
        color: #fdb85a;
    }
    .done-trash .trash{
        color: rgb(169, 49, 73);
    }
    .pencil-edit, .trash-delete{
        background: #0b0c0f;
        margin-right: 2px;
        padding: 5px;
        border-radius: 30px;
    }
     
    .pencil-edit:hover, .trash-delete:hover{
        cursor: pointer;
        border-radius: 30px;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
        box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
    }
</style>
  