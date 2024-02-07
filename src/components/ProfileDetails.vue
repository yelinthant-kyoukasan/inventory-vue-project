<template>
        <div class="books-read">
          <p class="first-line">Books Read</p>
          <p class="second-line">{{ detail.read }}</p>
        </div>
        <div class="birthday">
          <p class="first-line">Age</p>
          <p class="second-line">{{ detail.age }}</p>
        </div>
        <div class="height">
          <p class="first-line">Height</p>
          <p class="second-line">{{ detail.height }}cm</p>
        </div>
</template>
  
<script>
import { ref } from 'vue';

  export default {
    name: 'ProfileDetails',
    props: ['detail'],
    components: {
        
        },
    setup(props){
        const detail = props.detail
        // console.log("This is in ProfileDetails" , detail)
        
        return {
            detail
        }
    }
  }
    
</script>
<style>
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
</style>
  