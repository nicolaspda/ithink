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
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        :show-arrows="false"
        height="450"
        interval="4000"
      >
        <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.profile_path === undefined ? 'https://image.tmdb.org/t/p/w500/' + img.poster_path : 'https://image.tmdb.org/t/p/w500/' + img.profile_path">
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<style></style>

<script>
import SearchBar from '~/components/SearchBar.vue'
import axios from 'axios'
export default {
  middleware: ['auth'],
  components: { SearchBar },

  data: function () {
    return {
      imgs: [],
    }
  },
  methods: {
    getImgs: function () {
      axios
        .get('https://api.npoint.io/62237f9c648e7e1cd160')
        .then((response) => {
          response.data.forEach((title) => {
            axios
              .get(
                'https://api.themoviedb.org/3/search/multi?api_key=36fa7134e42de3076a18d9b0d61ee173&language=pt-BR&include_adult=false&query=' +
                  title.name
              )
              .then((response) => {
                this.imgs.push(response.data.results[0]) 
              })
          })
        })
    },
  },

  created: function () {
    this.getImgs()
  },
}
</script>
