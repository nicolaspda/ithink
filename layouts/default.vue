<template>
  <v-app id="content">
    <v-main>
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

</script>

<style>

#content{background-color: #5F67B6}
</style>
