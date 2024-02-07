<template>
    <div class="addbook-container">
        <div class="add-title">
            <p>Add New Book</p>
            <v-icon icon="mdi-book-open-blank-variant" class="book-icon"></v-icon>
        </div>
        <div class="add-container">
            <form class="add-form" @submit.prevent="addBook">
                <div className="formInput">
                    <label>Book Name</label>
                    <input type="text" requried placeholder="Rich Dad Poor Dad" v-model="title"/>
                </div>
                <div className="formInput">
                    <label>Rating</label>
                    <input type="text" requried placeholder="3.9" v-model="rating"/>
                </div>
                <div className="formInput">
                    <label>Price</label>
                    <input type="text" requried placeholder="25" v-model="price"/>
                </div>
                <div className="formInput">
                    <label>Weight</label>
                    <input type="text" requried placeholder="4 (kg)" v-model="weight"/>
                </div>
                <div className="formInput">
                    <label>Quantity</label>
                    <input type="text" requried placeholder="10" v-model="quantity"/>
                </div>
                
                <div class="formButton">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    </div>
        
</template>
<script>
import { ref } from 'vue';
import { auth } from "../assets/firebase";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../assets/firebase';
import router from '@/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  export default {
    name: 'AddBook',
    setup() {
        const title = ref("");
        const rating = ref("");
        const price = ref("");
        const weight = ref("");
        const quantity = ref("");
        
        const addBook = async () => {
            addDoc(collection(db, 'books'), {
                title: title.value,
                rating: rating.value,
                price:  price.value,
                weight: weight.value,
                quantity: quantity.value
            })
            .then(() => {
                toast.success("Successfully added", {
                    autoClose: 5000
                })
                title.value = ""
                rating.value = ""
                price.value = ""
                weight.value = ""
                quantity.value = ""
                console.log("clicked")
            })
            .catch( err => console.log(err))
        }  
        
        return {
            title,
            rating,
            price,
            weight,
            quantity,
            addBook,
        }
    }
  }  
</script>
<style>
   .add-title{
    background-color: #21222d;
    height: 50px;
    border-radius: 5px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
   }
   .add-container{
    background-color: #21222d;
    margin-top: 30px;
    border-radius: 5px;
   }
   .add-form{
    padding: 20px;
    background: #21222d;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    }   
   .add-form > *{
    background-color: #21222d;
   }
   .formInput{
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 40%;
   }
   .formButton{
    width: 28%;
    margin-top: 30px;
   }
   .formButton button{
    background: #a9dfd8;
    width: 100%;
    border: none;
    margin: 0 0 30px 0;
    letter-spacing: 0.7px;
    font-size: small;
    font-family: "Poppins", sans-serif;
    outline: none;
    color: #21222d;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 5px 20px;
    height: 35px;
   }
   .formInput label{
    background-color: #21222d;
    font-size: 1.05rem;
    font-weight: 500;
    color: #a9dfd8;
}
   .formInput > input{
    background: #3d4850;
    width: 70%;
    border: none;
    margin: 0 0 30px 0;
    padding: 5px 10px;
    letter-spacing: 0.7px;
    font-size: small;
    font-family: "Poppins", sans-serif;
    outline: none;
    color: #a9dfd8;
    border-radius: 5px;
    height: 30px;
   }
   .book-icon{
    margin-left: 5px;
   }
   .add-title > *{
    background-color: #21222d;
    color: #65666d;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 0.7px;
    text-transform: uppercase;
   }
</style>
  