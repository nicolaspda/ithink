<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-app-bar
          color="#221E41"
          dark
          prominent
          extended
          absolute
          rounded
          elevation="15"
        >
          <div>
            {{ title }}<br />
            <v-btn icon color="white" small fab elevation="12" to="/"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >
          </div>
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
          <v-banner
            dark
            rounded
            v-if="noCards"
            align="center"
            icon="mdi-account-voice"
          >
            Ainda não há opiniões cadastradas para este título. <br />
            Seja o primeiro a adicionar!
          </v-banner>
          <div v-for="card in filterCards" :key="card.name">
            <transition-group name="component-fade" mode="out-in" appear>
              <Card
                v-for="(card, key) in card.comments"
                :key="key"
                :title="title"
                :resultUp="card.resultUp"
                :resultDown="card.resultDown"
                :grade="card.grade"
                :description="card.description"
                :person="card.person"
                :picture="card.picture"
                :category="category"
              />
            </transition-group>
          </div>
          <br />
          <br />
        </v-container>
      </v-col>
      <Data
        :title="title"
        :category="category"
        :cardSample="filterCards"
        :allCards="cards"
      />
    </v-row>
  </div>
</template>

<style scoped>
body {
  background-color: white;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
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
      category: '',
      cards: [],
      noCards: false,
    }
  },
  methods: {
    getCards: function () {
      axios
        .get('https://api.npoint.io/62237f9c648e7e1cd160')
        .then((response) => {
          this.cards = response.data
        })
    },
  },
  created: function () {
    this.title = this.$nuxt._route.query.title
    this.img = this.$nuxt._route.query.img
    this.category = this.$nuxt._route.query.category
    this.getCards()
  },
  computed: {
    filterCards: function () {
      return this.cards.filter((card) => {
        return card.name.match(this.title)
      })
    },
  },
  watch: {
    filterCards: function (val) {
      if (val.length == 0) {
        this.noCards = true
      } else {
        this.noCards = false
      }
    },
  },
  mounted: function () {
    this.$store.commit('alterLogin')
  },
}
</script>
