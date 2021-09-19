<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <iThinkLogo class="animate__animated animate__bounce" />
      <br />
      <SearchBar />
        <v-row justify="center" align="center">
        <v-icon color="green accent-2" x-large>mdi-trending-up</v-icon>
      </v-row>
      <br />
      <Card />
    </v-col>
  </v-row>
</template>

<style>


</style>

<script>
import 'animate.css'
import SearchBar from '~/components/SearchBar.vue'
import Card from '~/components/card.vue'
export default {
  components: { SearchBar, Card },
}
</script>