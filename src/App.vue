<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import router from './router';

export default {
  name: 'App',
  setup() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if( !userData || userData == null || userData == undefined) {
      router.push({ path: '/login' })
    }
  }
}
</script>
