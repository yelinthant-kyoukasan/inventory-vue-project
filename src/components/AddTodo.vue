<template>
    <div class="side-addtodo">
        <div class="side-addtodo-container">
            <p class="welcome-todo">Add New <br>To-do!</p>
            <div class="todo-form">
                <form action="" @submit.prevent="addTodo">
                    <div className="todoFormInput">
                        <label>Title</label>
                        <input type="text" requried placeholder="Type here..." v-model="title"/>
                    </div>
                    <div className="todoFormInput">
                        <label>Due</label>
                        <input type="text" requried placeholder="Type here..." v-model="due"/>
                    </div>
                    <div className="todoFormInput">
                        <label>Text</label>
                        <textarea name="" id="" cols="30" rows="6" type="text" requried placeholder="Type here..." v-model="body"></textarea>
                    </div>
                    <div className="todoFormInput">
                       <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
</template>
  
<script>
import { ref } from 'vue';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../assets/firebase';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  export default {
    name: 'AddTodo',
    components: {
        
        },
    setup(){
        const title = ref("")
        const due = ref("")
        const body = ref("")
        const addTodo = async () => {
            addDoc(collection(db, 'todos'), {
                title: title.value,
                due:  due.value,
                body: body.value,
                status: false
            })
            .then(() => {
                toast.success("Successfully added", {
                    autoClose: 5000
                })
                title.value = ""
                due.value = ""
                body.value = ""
                console.log("clicked")


            })
            .catch( err => console.log(err))
        }
        return {
            title,
            due,
            body,
            addTodo
        }
    }
    }
    
</script>
<style>
    .side-addtodo{
        background: #21222d;
        width: 25vw;
        border-top-left-radius: 50px;
    }
    .side-addtodo-container{
        margin: 30px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
    }
    .side-addtodo-container{
        background: #21222d;
    }
    .welcome-todo{
        color: #a9dfd8;
        font-weight: 600;
        font-size: 2.5rem;
        letter-spacing: 0.8px;
        background-image: linear-gradient(150deg, #fdb85a, #20aef3);
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;    
    }
    .todo-form{
        margin-top: 30px;
        border-radius: 5px;
        padding: 10px 20px 25px 20px
    }

    .todo-form, .todo-form form, .todo-form label, .todoFormInput{
        background-color: #2f353e;
    }
    form{
        border-radius: 5px;
    }
    .todoFormInput{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
    }
    .todoFormInput label{
        font-size: 1.05rem;
        font-weight: 500;
        color: #a9dfd8;
        margin-bottom: 5px;
    }
    .todoFormInput input, .todoFormInput textarea{
        background: #21222d;
        width: 100%;
        padding: 5px 10px;
        letter-spacing: 0.7px;
        font-size: small;
        border-radius: 5px;
        color: #a9dfd8;
        outline:none;
    }
    .todoFormInput button{
        margin-top: 5px;
        background: #a9dfd8;
        width: 100%;
        border: none;
        letter-spacing: 0.7px;
        font-size: small;
        padding: 10px;
        border-radius: 5px;
    }
</style>
  