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
      @keyup="go"
    >
      <template v-slot:item="{ item }">
        <v-list-item
          link
          :to="{
            path: 'content/',
            query: {
              title: item.name || item.title,
              img: item.profile_path===undefined ? 'https://image.tmdb.org/t/p/w500/' + item.poster_path : 'https://image.tmdb.org/t/p/w500/' + item.profile_path,
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
      console.log('foi')
      this.search = document.getElementById('autocomplete').value
      //Usa uma função que realiza delay pra fazer a chamada
      //Avaliar melhoria no futuro para fazer 1 request apenas
      this.isLoading = true
      var self = this
      setTimeout(function () {
        self.gettitulo()
        self.isLoading = false
      }, 2000)
    },
  },
}
</script>
<style></style>
