<template>
    <div class="gadget-container">
        <div class="gadget-second">
            <v-icon :icon="gadget[0]" class="gadget-icon" :style="{color: gadget[1]}"></v-icon>
            <p class="number">{{ gadget[3] }}</p>
            <p class="text">{{ gadget[2] }}</p>
        </div>
    </div>
</template>
  
<script>
  export default {
    name: 'Gadget',
    props: ['gadget'],
    setup(props) {
        const gadget = props.gadget;

        return {
            gadget
        }
    }
  }  
</script>
<style>
    .gadget-second > *{
        background-color: #21222d;
    }
    .gadget-second .number{
        color: #a9dfd8;
        font-weight: 600;
        font-size: 2.5rem;
        letter-spacing: 0.8px;
    }
    .text{
        color: #65666d;
        font-size: 0.9rem;
    }
    .gadget-second{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #21222d;
        border-radius: 15px;
        width: 11vw;
        height: 23vh;
    }
</style>
  