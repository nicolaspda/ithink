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
          rounded="b-xl"
          elevation="15"
          class="animate__animated animate__backInDown"
        >
          <div>
            {{ title }} <br />
            <i class="grey--text font-weight-light" style="font-size: 15px">
              {{
                category === 'person'
                  ? 'Celebridade'
                  : category === 'tv'
                  ? 'Série/Tv'
                  : category === 'movie'
                  ? 'Filme'
                  : ''
              }}
            </i>
            <br />
            <v-btn icon color="white" small fab elevation="12" to="/"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >
          </div>
          <v-row>
            <v-col align="right">
                <v-img class="rounded" :src="img" max-height="140" max-width="100">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
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
                :cardSample="filterCards"
                :likeState="card.likeState"
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
        :id="id"
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
  head() {
    return {
      title: this.title,
    }
  },
  data: function () {
    return {
      title: '',
      img: '',
      id: '',
      category: '',
      cards: [],
      noCards: false,
    }
  },
  methods: {
    getCards: function () {
      axios
        .get(
          'https://ithink-332305-default-rtdb.firebaseio.com/-MrGnWn3O0JppoR9IK4O.json'
        )
        .then((response) => {
          this.cards = response.data
        })
    },
  },
  created: function () {
    this.title = this.$nuxt._route.query.title
    this.img = this.$nuxt._route.query.img
    this.category = this.$nuxt._route.query.category
    this.id = this.$nuxt._route.query.id
    this.getCards()
  },
  computed: {
    filterCards: function () {
      return this.cards.filter((card) => {
        return card.id.match(this.id)
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
