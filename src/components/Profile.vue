<template>
    <div class="side-profile">
        <div class="side-profile-container">
          <div class="photo-edit">
            <p class="welcome">Welcome, Admin!</p>
            <p class="welcome-edit" @click="edit">Edit profile details</p>
            <div class="profile-details" v-for="detail in details" :key="detail">
              <ProfileDetails :detail="detail"/>              
            </div>
        </div>
        <div class="todos-container">
            <p class="title-todo">Scheduled Todo's</p>
            <div class="todos" v-for="todo in todos" :key="todo">
                <Todo :todo="todo"/>
            </div>
            <p class="title-todo notodos" v-if="present">There are no to-dos!</p>
          </div>
        </div>
      </div>
</template>
  
<script>
import Todo from './Todo.vue'
import ProfileDetails from './ProfileDetails.vue'
import { ref } from 'vue';
import { db } from '@/assets/firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore'
import { onMounted } from 'vue';
import router from '@/router';

  export default {
    name: 'Profile',
    components: {
        Todo,
        ProfileDetails
    },
    setup(){

      const todos = ref([])
      const details = ref([])
      // const details = props.details;
      const present = ref(false)
      
      // console.log("This is in proifle", details)
      
      onMounted(async () => {
        let booksCollection = await getDocs(collection(db, 'todos'))
        booksCollection.forEach( task => {
          todos.value.push({...task.data(), id: task.id})
        })
        let detailsCollection = await getDocs(collection(db, 'user-details'))
        detailsCollection.forEach( detail => {
          details.value.push({...detail.data(), id: detail.id})
        })
        // console.log("This is in Profile" , details.value)
        if (todos.value.length == 0) {
          present.value = true;
        }
      })


        onSnapshot(collection(db, 'todos'), (snapshot) => {
          const changes = snapshot.docChanges()
          changes.forEach(change => {
              if (change.type == "removed") {
                  let deletedbook = todos.value.findIndex(item => {
                    return item.id === change.doc.id
                  })
                  todos.value.splice(deletedbook, 1)
              } else if (change.type == "modified") {
                    let modifiedtodos = todos.value;
                    let modifiedtodo = modifiedtodos.findIndex(item => {
                        return item.id === change.doc.id
                    })
                    modifiedtodos.splice(modifiedtodo, 1, {...change.doc.data(), id: change.doc.id})
                    todos.value = modifiedtodos;
              }
          })
          // console.log(todos.value)
        })

        const edit = () => {
          router.push("/profile")
        }
        
        return {
            todos,
            details,
            present,
            edit
        }

    }
    }
    
</script>
<style>
    .todos-container, .todos{
        background: #21222d;
    }
    .todos-container{
        margin-top: 40px;
    }
    .title-todo{
        font-size: 1.2rem;
        font-weight: 500;
        color: #a9dfd8;
        background: #21222d;

    }
    .todos{
        margin-top: 10px;
    }
    .side-profile{
    width: 25vw;
    background-color: #21222d;
    border-left: 5px solid #21222d;
    border-top-left-radius: 50px;
  }
  .side-profile-container{
    background-color: #21222d;
    margin: 30px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  .notodos{
    font-size: 1.5rem;
    font-weight: 550;
    margin-top: 10px;
    color: #fdb85a;
  }
  .photo-edit .welcome{
    color: #a9dfd8;
    font-weight: 600;
    font-size: 2.5rem;
    letter-spacing: 0.8px;
  }
  .welcome{
    background-image: linear-gradient(150deg, #fdb85a, #20aef3);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  }
  .photo-edit .welcome-edit{
    color: #65666d;
    font-size: 0.8rem;
    margin-top: 10px;
  }
  .welcome-edit:hover{
    cursor: pointer;
  }
  .profile-details{
    display: flex;
    background-color: #2f353e;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    justify-content: space-between;
    border-radius: 8px;
  }
  .first-line{
    color: #65666d;
    font-size: 0.7rem;
  }
  .second-line{
    margin-top: 3px;
    color: #a9dfd8;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .books-read, .birthday, .height{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #2f353e;
  }
  .profile-details .books-read p, .profile-details .birthday p, .profile-details .height p{
    background-color: #2f353e;
  }
  .photo-edit{
    display: flex;
    flex-direction: column;
    background-color: #21222d;

  }
  .photo-edit p{
    background-color: #21222d;
  }
</style>
  