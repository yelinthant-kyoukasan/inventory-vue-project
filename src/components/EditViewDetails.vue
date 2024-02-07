<template>
    <p>Title - <span>{{ book.title }}</span></p>
    <p>Rating - <span>{{ book.rating }}</span></p>
    <p>Price - <span>${{ book.price }}</span></p>
    <p>Quantity - <span>{{ book.quantity }}</span></p>   
    <p>Weight - <span>{{ book.weight }}g</span></p>
</template>  
<script>
  import { ref } from 'vue';
  import { auth, db } from '../assets/firebase'
  import { deleteDoc, doc, collection, updateDoc } from "firebase/firestore";
  import { getAuth, sendEmailVerification } from "firebase/auth";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    name: 'EditViewDetails',
    components: {
    },
    props: ["book"],
    setup(props) {
        const book = props.book;

        return {
            book
        }
    }
  }
  </script>
  <style>
    .details-show{
      background: #a9dfd8;
      padding: 20px;
      height: 35vh;
      width: 30vw;
      border-radius: 10px;
      letter-spacing: 0.7px;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .details-show p, .details-show span{
      background: #a9dfd8;
    }
    .details-show span{
      font-weight: 700;
    }
    .verify, .verified{
        background: #20aef3;
        padding: 10px;
        border-radius: 15px;
    }
    .verified{
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
        box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
    }
    .verify:hover{
        cursor: pointer;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0, 0.47);
        box-shadow: 2px 4px 10px 1px rgba(72, 65, 65, 0.47);
    }
  </style>
  