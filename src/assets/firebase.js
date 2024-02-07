// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpIb1_Ou_BzzqNwaaA6VjLfLC-bKHGm3A",
  authDomain: "inventory-vue-e1b76.firebaseapp.com",
  databaseURL: "https://inventory-vue-e1b76-default-rtdb.firebaseio.com",
  projectId: "inventory-vue-e1b76",
  storageBucket: "inventory-vue-e1b76.appspot.com",
  messagingSenderId: "574851063271",
  appId: "1:574851063271:web:50333c15303678f3153142",
  measurementId: "G-78HK5B389C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db }