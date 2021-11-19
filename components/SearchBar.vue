<template>
  <div>
    <v-autocomplete
      id="autocomplete"
      clearable
      rounded
      dense
      solo
      label="Pesquise ou digite a categoria"
      :items="titulos"
      item-text="name"
      item-value="item-disabled"
      return-object
      @keyup="go"
    >
      <template v-slot:item="{ item }">
        <v-list-item
          link
          :to="{
            path: 'content/',
            query: {
              title: item.name || item.title,
              img: 'https://image.tmdb.org/t/p/w500/' + item.profile_path,
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
      //usar alguma função que realize delay pra fazer a chamada
      this.gettitulo()
    },
  },
}
</script>
<style></style>
