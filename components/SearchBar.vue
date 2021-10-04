<template>
  <div>
    <v-autocomplete
      clearable
      rounded
      dense
      solo
      label="Pesquise ou digite a categoria"
      :items="titulos"
      item-text="title"
      item-value="item-disabled"
      v-model="select"
      @change="go"
    >
    <template v-slot:item="{ item }">
        <v-list-item link :to="'content/'">{{item.title}}</v-list-item>
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
      select: '',
    }
  },
  methods: {
    gettitulo: function () {
      axios
        .get(
          'https://raw.githubusercontent.com/meilisearch/MeiliSearch/main/datasets/movies/movies.json'
        )
        .then((response) => {
          this.titulos = response.data
        })
    },
    go: function () {
      console.log('foi')

    },
  },
  created: function () {
    this.gettitulo()
  },
}
</script>
<style></style>
