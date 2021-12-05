<template>
  <v-app>
    <v-main id="main">
      <v-container>
        <Nuxt />        
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import 'animate.css'
 export default {
  name: "default",

}
</script>

<style>

#main {background-color: #5F67B6}
</style>
