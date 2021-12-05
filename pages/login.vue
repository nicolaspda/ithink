<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <iThinkLogo class="animate__animated animate__bounce" />
      <br />
      <v-row justify="center" align="center">
        <br />
        <SignIn class="pa-8" />
      </v-row>
      <v-row>
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          :show-arrows="false"
          height="250"
          interval="4000"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide.src"
          >
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </v-col>
  </v-row>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      slides: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
   mounted: function () {
    this.$store.commit('alterLogin')
    this.$router.push('/')
  }
}
</script>
