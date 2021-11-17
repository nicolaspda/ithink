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
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f7388385-522e-4b1e-b33c-8d27b1c73ddd/movies.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211116T232632Z&X-Amz-Expires=86400&X-Amz-Signature=7a7859a6af5690268f1e0201920d0c046e7494002bbb37067ae34dd14cb4d5b8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22movies.json%22&x-id=GetObject'
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
