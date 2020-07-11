<template>
  <v-main id="home">
    <keep-alive include="home">
      <router-view />
    </keep-alive>
  </v-main>
</template>

<script>
  export default {
    name: 'CoreView',
  }
</script>
