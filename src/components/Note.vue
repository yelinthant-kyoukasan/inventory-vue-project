<template>
    <div class="note-container">
        <div class="note-second">
            <div class="note-title">
                <p>{{ note.title }}</p>
                <div class="note-icons">
                    <div class="note-pencil" @click="handleEdit" v-if="!note.status">
                        <v-icon icon="mdi-check" class="pencil-note"></v-icon>
                    </div>
                    <div class="note-trash" @click="handleDelete">
                        <v-icon icon="mdi-trash-can" class="trash-note"></v-icon>
                    </div>
                </div>
            </div>
            <p class="note-due">{{ note.due }}</p>
            <p :class="{ 'note-status': !note.status, 'note-status done': note.status}">{{ note.status ? "Completed" : "On Progress"}}</p>
            <p class="note-body"> - {{ note.body }}</p>                
        </div>
    </div>
</template>  
<script>
  import { ref } from 'vue';
  import { auth, db } from '../assets/firebase'
  import { deleteDoc, doc, collection, updateDoc } from "firebase/firestore";
  
  export default {
    name: 'Note',
    props: ['note'],
    components: {
      
    },
    setup(props) {
        const note = props.note;
        
        const handleDelete = async () => {
          // console.log(book.id)
          deleteDoc(doc(db, 'todos', props.note.id))
          .then(() => {
            console.log("sucessfully deleted!")
          })
          .catch(err => console.log(err))
        }
        
        const handleEdit = async () => {
            updateDoc(doc(db, 'todos', props.note.id), {
                status: true,
            })
            .then(() => {
            console.log("sucessfully updated!")
            })
          .catch(err => console.log(err))
        }


        return {
            note,
            handleDelete,
            handleEdit
        }
    }
}
</script>
<style> 
    .note-container, .note-second{
        background-color: #fdf2b3;
        border-radius: 15px;
    }
    .note-container{
        height: 30vh;
        width: 22vw;
    }
    
    .note-second > *{
        background-color: #fdf2b3;
    }
    .note-status{
        background: #ffdada;
        padding: 5px;
        color: #21222d;
        font-weight: 500;
        font-size: 0.8rem;
        border-radius: 10px;
        width: 30%;
        text-align: center;
        margin: 5px 0;
    }
    .done{
        background-color: #ffb56a;
    }
    .note-second{
        padding: 20px;
    }
    .note-title > *{
        font-weight: 600;
        font-size: 1.2rem;
        margin-bottom: 5px;
        background: #fdf2b3;
    }
    .note-title{
        display: flex;
        justify-content: space-between;
    }
    .note-icons{
        display: flex;
    }
    .note-icons > *{
        background: #fdf2b3;
        margin-left: 2px;
    }
    .pencil-note, .trash-note{
        background-color: #21222d;
        font-size: 1.2rem;
    }
    .note-pencil, .note-trash{
        padding: 5px 10px;
        border-radius: 30px;
        background-color: #21222d;
        height: 40px;
    }
    .note-pencil:hover, .note-trash:hover{
        cursor: pointer;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
        box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
    }
    .pencil-note{
        color: #fdb85a;
    }
    .trash-note{
        color: rgb(169, 49, 73);
    }
    .note-due{
        font-weight: 600;
        font-size: 0.98rem;
        margin-bottom: 0px;

    }
    .note-done{
        font-weight: 700;
        font-size: 0.8rem;
    }
    .note-body{
        font-size: 0.95rem;
        font-weight: 500;
    }
</style>
  