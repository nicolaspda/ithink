<template>
<div>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-app-bar color="#6A76AB" dark prominent extended absolute rounded >
        <v-app-bar-title>Shazam!</v-app-bar-title>
        <v-row>
          <v-col align="right">
            <v-img
              src="https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg"
              max-height="140"
              max-width="100"
            ></v-img>
            <v-col>
              <Slider />
            </v-col>
          </v-col>
        </v-row>
      </v-app-bar>
      <br><br><br><br><br><br><br>

      <v-container>
        <!-- Aqui vão aparecer os cards -->
        <Card v-for="card in cards" :key="card.name" :cards="card.name"/>
        <br />
        <br />
      </v-container>
    </v-col>
    <Data />
  </v-row>
 </div>
</template>

<style scoped>
body {
  background-color: white;
}
</style>

<script>
import Card from '~/components/card.vue'
import slider from '~/components/slider.vue'
import axios from "axios";


export default {
   components: { slider, Card },
  data: function () {
  return {
    cards: [],
  }
 },
  methods: {
    getCards: function () {
      axios
        .get("https://api.jsonbin.io/b/614151d19548541c29b230c3/4")
        .then((response) => {
          this.cards = response.data;
        });
    },
    
},
  created: function () {
      this.getCards();
    },

}
</script>
