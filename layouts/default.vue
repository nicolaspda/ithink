<template>
  <v-app>
    <v-main id="main">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span
        >&copy; {{ new Date().getFullYear() }} /
        <NuxtLink :to="page" @click.native="changeData">
          {{ routeName }}
        </NuxtLink>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import 'animate.css'
export default {
  name: 'default',
  data: function () {
    return {
      routeName: 'About',
      page: '/about',
    }
  },
  methods: {
    changeData: function () {      
      if (this.$nuxt._route.path !== '/about') {
        this.routeName = 'About'
        this.page = '/about'
      } else {
        this.routeName = 'Home'
        this.page = '/'
      }
    },
  },
}
</script>

<style>
#main {
  background-color: #5f67b6;
}
</style>
