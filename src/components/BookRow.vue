<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.rating }}</td>
        <td>${{ book.price }}</td>
        <td>{{ book.weight }}g</td>
        <td>{{ book.quantity }}</td>
        <td class="icons">
            <div class="pencil-edit" @click="bookEdit">
                <v-icon icon="mdi-pencil" class="pencil-icon"></v-icon>
            </div>
            <div class="trash-delete" @click="handleDelete">
                <v-icon icon="mdi-trash-can" class="trash-icon"></v-icon>
            </div>
        </td>
    </tr>
  </template>
  
<script>
  import { ref } from 'vue';
  import { auth, db } from '../assets/firebase'
  import { deleteDoc, doc, collection } from "firebase/firestore";
import router from '@/router';
  
  export default {
    name: 'BookRow',
    props: ["book", "index"],
    components: {
      
    },
    setup(props) {
        const book = props.book;
        const index = props.index;
        const id = book.id;
        const handleDelete = async () => {
          // console.log(book.id)
          deleteDoc(doc(db, 'books', book.id))
          .then(() => {
            console.log("sucessfully deleted!")
          })
          .catch(err => console.log(err))
        }

        const bookEdit = () => {
          router.push('/editbook/' + id)
        }

        return {
            book,
            index,
            handleDelete,
            bookEdit
        }
    }
  }
  </script>
<style>
  .pencil-edit{
    color: #fdb85a;
  }
  .trash-delete{
    color: rgb(169, 49, 73);
  }
  .pencil-edit, .trash-delete{
    background: #171821;
  }
  .pencil-edit, .trash-delete{
    padding: 5px;
    border-radius: 30px;
  }   
  .pencil-edit:hover, .trash-delete:hover{
    cursor: pointer;
    border-radius: 30px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
  }
  .icons{
    display: flex;
  }
</style>
  