<template>
  <div>
    <v-autocomplete
      id="autocomplete"
      clearable
      :loading="isLoading"
      rounded
      dense
      solo
      hide-no-data
      label="Pesquise aqui"
      :items="titulos"
      item-text="name"
      item-value="item-disabled" 
      :search-input.sync="search"
    >
      <template v-slot:item="{ item }">
        <v-list-item
          link
          :to="{
            path: 'content/',
            query: {
              title: item.name || item.title,
              img: item.poster_path != undefined
                    ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path
                    : item.backdrop_path != undefined
                    ? 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path
                    : item.profile_path != undefined
                    ? 'https://image.tmdb.org/t/p/w500/' + item.profile_path
                    : 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg',
              category: item.media_type,
            },
          }"
          >{{ item.name }}{{ item.title }}</v-list-item
        >
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      titulos: [],
      search: '',
      isLoading: false,
    }
  },
  methods: {
    gettitulo: function () {
      axios
        .get(
          'https://api.themoviedb.org/3/search/multi?api_key=36fa7134e42de3076a18d9b0d61ee173&language=pt-BR&include_adult=false&query=' +
            this.search
        )
        .then((response) => {
          this.titulos = response.data.results
        })
    },
    go: function () {
      //Usa uma função que realiza delay pra fazer a chamada
      clearTimeout(this._timerId);      
      this.isLoading = true
      this._timerId = setTimeout(() => {
        this.gettitulo()
        this.isLoading = false
      }, 2000);
    },
  },
   watch: {
    search (val) {
      if (!val) {
       return
      } 
      this.go()
    },
  },
}
</script>
<style></style>
