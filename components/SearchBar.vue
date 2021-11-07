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
      @change="go"
    >
    <template v-slot:item="{ item }">
        <v-list-item link :to="{ path: 'content/', query: { title: item.title, img:item.poster }}">{{item.title}}</v-list-item>
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
    }
  },
  methods: {
    gettitulo: function () {
      axios
        .get(
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f7388385-522e-4b1e-b33c-8d27b1c73ddd/movies.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211107%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211107T213150Z&X-Amz-Expires=86400&X-Amz-Signature=6910234d8c0a2d63b353c25e892cd89bbf8d3069a0d6c17cf925cd04f5592524&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22movies.json%22'
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
