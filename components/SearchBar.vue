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
    ></v-autocomplete>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      titulos: [],
    };
  },
  methods: {
    gettitulo: function () {
      axios
        .get("https://raw.githubusercontent.com/meilisearch/MeiliSearch/main/datasets/movies/movies.json")
        .then((response) => {
          this.titulos = response.data;
        });
    },
  },
    created: function () {
      this.gettitulo();
    },
};
  
</script>
<style>

</style>