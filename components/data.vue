<template>
  <v-container>
    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="#263238" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-message-text</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="grey darken-1" @click="SignOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click.stop="modalCard">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark x-small color="primary" @click="toTop">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-alert
        color="red"
        dismissible
        elevation="10"
        type="error"
        v-model="alertError"
        transition="scale-transition"
        >Defina seu voto!
      </v-alert>
      <v-alert
        elevation="10"
        type="warning"
        dark
        v-model="alertDanger"
        icon="mdi-alert"
        transition="scale-transition"
      >
        <v-row align="center">
          <v-col class="grow">
            Você já declarou um voto para este título!
          </v-col>
          <v-col class="shrink">
            <v-btn small color="black darken-1" @click="editComment">Alterar
            </v-btn><br><br>
            <v-btn small color="black darken-1" @click="dialog = false"
              >Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-card elevation="7" :disabled="alertDanger">
        <v-card-title class="headline">
          {{ category }} - {{ title }}</v-card-title
        >
        <v-card-text>
          <v-row>
            <v-col align="center">
              <v-avatar>
                <img :src="this.$store.state.picture" alt="MyPhoto" />
              </v-avatar>
              <br />
              <br />
              <v-row justify="center">
                <v-btn v-if="setLike" class="ma-2" text icon @click="clickLike">
                  <v-icon color="green lighten-2">mdi-thumb-up-outline</v-icon>
                </v-btn>
                <v-btn v-else class="ma-2" text icon @click="clickLike">
                  <v-icon color="green lighten-2">mdi-thumb-up</v-icon>
                </v-btn>
              </v-row>
              <v-row justify="center">
                <v-btn
                  v-if="setDislike"
                  class="ma-2"
                  text
                  icon
                  @click="clickDislike"
                >
                  <v-icon color="red lighten-2">mdi-thumb-down-outline</v-icon>
                </v-btn>
                <v-btn v-else class="ma-2" text icon @click="clickDislike">
                  <v-icon color="red lighten-2">mdi-thumb-down</v-icon>
                </v-btn>
              </v-row>
            </v-col>
            <v-col cols="9" align="center">
              <v-textarea
                color="teal"
                v-model="cardData.description"
                label="Digite aqui"
                dense
                counter
                :rules="[
                  (v) =>
                    (v || '').length <= 300 ||
                    'Descrição deve conter até 300 caracteres!',
                ]"
              >
              </v-textarea>
            </v-col>
          </v-row>

          <hr class="my-3" />
          <v-row>
            <v-col align="left">
              <em
                ><small>&mdash; {{ $store.state.name }}</small></em
              >
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Fechar
              </v-btn>
              <v-btn color="blue darken-1" text @click="addCard">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style></style>

<script>
import axios from 'axios'
export default {
  name: 'Options',
  props: {
    title: String,
    category: String,
    id: String,
    cardSample: Array,
    allCards: Array,
  },
  data: function () {
    return {
      fab: false,
      alertError: false,
      alertDanger: false,
      dialog: false,
      setLike: true,
      setDislike: true,
      cardData: {
        person: this.$store.state.name,
        picture: this.$store.state.picture,
        description: '',
        grade: null,
        resultUp: 0,
        resultDown: 0,
        id: this.$store.state.id
      },
    }
  },
  methods: {
    toTop() {
      this.$vuetify.goTo(0)
    },
    SignOut() {
      localStorage.removeItem('authenticated')
      localStorage.removeItem('name')
      localStorage.removeItem('picture')
      localStorage.removeItem('id')
      this.$router.push('/login')
    },
    editComment() {
      this.alertDanger = false
      this.cardSample[0].comments.forEach((comments, index) => {
        if (comments.id == this.$store.state.id) {
          this.cardSample[0].comments.splice(index, 1)
        }
      })
    },
    modalCard() {
      if (this.cardSample[0] === undefined) {
        this.dialog = true
      } else {
        this.dialog = true
        this.cardSample[0].comments.forEach((comments, index) => {
          if (comments.id == this.$store.state.id) {
            console.log('Nope!')
            this.alertDanger = true
          }
        })
      }
    },
    switchGrade() {
      if (this.setLike === false && this.setDislike === true) {
        this.cardData.grade = this.setDislike
      }
      if (this.setDislike === false && this.setLike === true) {
        this.cardData.grade = this.setDislike
      }
    },

    clickLike() {
      this.setLike = !this.setLike
      if (this.setDislike === false) {
        this.setDislike = true
      }
      this.switchGrade()
    },
    clickDislike() {
      this.setDislike = !this.setDislike
      if (this.setLike === false) {
        this.setLike = true
      }
      this.switchGrade()
    },

    //Envia dados
    async addCard() {
      //Pega todo o array de Cards, remove o title atual e depois sobe ele
      //Testa se o card tem o voto definido

      if (this.setDislike === true && this.setLike === true) {
        this.cardData.grade = null
        this.alertError = true
        setTimeout(() => {
          this.alertError = false
        }, 3000)
      } else {
        this.allCards.forEach((card, index) => {
          if (card.name == this.title) {
            this.allCards.splice(index, 1)
          }
        })

        try {
          //Coleta todos os likes atuais e o novo caso seja selecionado
          var totalLikes = 0
          this.cardSample[0].comments.forEach((comments, index) => {
            if (comments.grade == true) {
              totalLikes++
            }
          })
          if (this.cardData.grade === true) {
            totalLikes++
          }

          //Lógica que altera a porcentagem de likes vs dislikes no Slider e envia para a API
          const totArray = this.cardSample[0].comments.length + 1
          this.cardSample[0].total = (totalLikes / totArray) * 100
          this.cardSample[0].date = moment().format()
          this.cardSample[0].id = this.id

          //Adiciona os dados digitados e faz o Post
          this.cardSample[0].comments.push(this.cardData)
          this.allCards.push(this.cardSample[0])

          const response = await axios.put(
            'https://ithink-332305-default-rtdb.firebaseio.com/-MrGnWn3O0JppoR9IK4O.json',
            this.allCards
          )
          console.log(response.data)
          this.dialog = false
          //Adiciona os dados caso seja o primeiro Card do assunto
        } catch (e) {
          const firstCard = {
            category: this.category,
            comments: [this.cardData],
            name: this.title,
            total: this.cardData.grade === true ? 100 : 0,
            date: moment().format(),
            id: this.id
          }
          this.allCards.push(firstCard)
          console.log('FirstCard')
          console.log(this.allCards)

          const response = await axios.put(
            'https://ithink-332305-default-rtdb.firebaseio.com/-MrGnWn3O0JppoR9IK4O.json',
            this.allCards
          )
          console.log(response.data)
          this.dialog = false
        }
      }
    },
  },
}
</script>
