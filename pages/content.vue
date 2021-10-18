<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-app-bar color="#6A76AB" dark prominent extended absolute rounded>
          <v-app-bar-title>{{ title }}</v-app-bar-title>
          <v-row>
            <v-col align="right">
              <v-img :src="img" max-height="140" max-width="100"></v-img>
              <v-col>
                <Slider
                  v-for="card in filterCards"
                  :key="card.name"
                  :total="card.total"
                />
              </v-col>
            </v-col>
          </v-row>
        </v-app-bar>
        <br /><br /><br /><br /><br /><br /><br />

        <v-container>
          <!-- Aqui vão aparecer os cards -->
          <div
            v-for="card in filterCards"
            :key="card.name"
            :category="card.category"
          >
            <Card
              v-for="(card, key) in card.comments"
              :key="key"
              :title="title"
              :resultUp="card.resultUp"
              :resultDown="card.resultDown"
              :grade="card.grade"
              :description="card.description"
              :person="card.person"
            />
          </div>
          <br />
          <br />
        </v-container>
      </v-col>
      <Data :title="title" />
    </v-row>
  </div>
</template>

<style scoped>
body {
  background-color: white;
}
</style>

<script>
import Card from '~/components/card.vue'
import slider from '~/components/slider.vue'
import axios from 'axios'

export default {
  components: { slider, Card },
  data: function () {
    return {
      title: '',
      img: '',
      cards: [],
    }
  },
  methods: {
    getCards: function () {
      axios
        .get('https://api.jsonbin.io/b/614151d19548541c29b230c3/7')
        .then((response) => {
          this.cards = response.data
        })
    },
  },
  created: function () {
    this.title = this.$nuxt._route.query.title
    this.img = this.$nuxt._route.query.img
    this.getCards()
  },
  computed: {
    filterCards: function () {
      return this.cards.filter((card) => {
        return card.name.match(this.title)
      })
    },
  },
}
</script>
