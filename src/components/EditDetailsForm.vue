<template>
    <form action="" @submit.prevent="handleBookEdit">
        <div className="profileFormInput">
            <label>Title</label>
            <input type="text" requried placeholder="Type here..." v-model="title"/>
        </div>
        <div className="profileFormInput">
            <label>Rating</label>
            <input type="text" requried placeholder="Type here..." v-model="rating"/>
        </div>
        <div className="profileFormInput">
          <label>Price</label>
          <input type="text" requried placeholder="Type here..." v-model="price"/>
        </div>
        <div className="profileFormInput">
            <label>Quantity</label>
            <input type="text" requried placeholder="Type here..." v-model="quantity"/>
        </div>
        <div className="profileFormInput">
            <label>Weight</label>
            <input type="text" requried placeholder="Type here..." v-model="weight"/>
        </div>
        <div className="profileFormInput">
          <button type="submit">Update</button>
        </div>
    </form> 
</template>
  
<script>
  import { ref } from 'vue';
  import { db } from '../assets/firebase'
  import { deleteDoc, doc, collection, updateDoc, onSnapshot } from "firebase/firestore";
  import { getAuth, updateEmail, verifyBeforeUpdateEmail, sendSignInLinkToEmail } from "firebase/auth";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    name: 'DetailsForm',
    components: {
      
    },
    props: ["book"],
    setup(props) {

        const book = props.book;
        const title = ref(book.title)
        const rating = ref(book.rating)
        const price = ref(book.price)
        const quantity = ref(book.quantity)
        const weight = ref(book.weight)
        const id = book.id

        const handleBookEdit = async () => {
            updateDoc(doc(db, 'books', id), {
                title: title.value,
                rating: parseFloat(rating.value),
                price: parseFloat(price.value),
                quantity: parseInt(quantity.value),
                weight: parseInt(weight.value)
            })
            .then(() => {
                title.value = book.title;
                rating.value = book.rating;
                price.value = book.price;
                quantity.value = book.quantity;
                weight.value = book.weight;
                console.log("successful")
                location.reload()
            })
            .catch(err => console.log(err))
        }
    
      return {
        title,
        rating,
        price,
        quantity,
        weight,
        handleBookEdit
      }
    }
  }
  </script>
  <style>

    form{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    .profileFormInput{
      display: flex;
      flex-direction: column;
      gap: 7px;
      justify-content: flex-start;
      width: 100%;
  
    }
    .profileFormInput label{
      font-size: 1.05rem;
      font-weight: 500;
      color: #a9dfd8;
    }
    .profileFormInput input{
      background: #3d4850;
      padding: 5px 10px;
      letter-spacing: 0.7px;
      border-radius: 5px;
      color: #a9dfd8;
      outline: none;
      font-size: small;
      width: 100%;
    }
    .profileFormInput button{
      background: #a9dfd8;
      width: 100%;
      border: none;
      letter-spacing: 0.7px;
      font-size: small;
      outline: none;
      color: #21222d;
      text-transform: uppercase;
      border-radius: 5px;
      padding: 5px 20px;
      margin-top: 5px;
     }
  </style>
  