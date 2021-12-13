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
      <v-col v-for="(img, i) in limitArray" :key="i" cols="12">
        <v-card color="grey lighten-5" elevation="7">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="text-h6"
                v-text="img.name || img.title"
              ></v-card-title>
              <v-card-subtitle v-text="img.media_type"></v-card-subtitle>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img
                :src="
                  img.poster_path != undefined
                    ? 'https://image.tmdb.org/t/p/w500/' + img.poster_path
                    : img.backdrop_path != undefined
                    ? 'https://image.tmdb.org/t/p/w500/' + img.backdrop_path
                    : img.profile_path != undefined
                    ? 'https://image.tmdb.org/t/p/w500/' + img.profile_path
                    : 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'
                "
              ></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
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
            console.log(title.date)
            if (moment(String(title.date)).isAfter(moment().subtract(24, 'hours'))) {
              axios
                .get(
                  'https://api.themoviedb.org/3/search/multi?api_key=36fa7134e42de3076a18d9b0d61ee173&language=pt-BR&include_adult=false&query=' +
                    title.name
                )
                .then((response) => {
                  this.imgs.push(response.data.results[0])
                })
            }
          })
        })
    },
  },
  created: function () {
    this.getImgs()
  },
  computed: {
    limitArray: function () {
      return this.imgs.slice(0, 5)
    },
  },
}
</script>
