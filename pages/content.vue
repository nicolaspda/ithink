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
        <Card />
        <br />
        <Card />
        <br />
        <Card />
        <br />
        <Card />
        <br />
        <Card />
        <br />
        <Card />
        <br />
        <Card />
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

export default {
  components: { slider, Card },
  data() {
    return {

    }
  }

}
</script>
