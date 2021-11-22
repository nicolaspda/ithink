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
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
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
      <v-card elevation="7">
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
    cardSample: Array,
    allCards: Array,
  },
  data: function () {
    return {
      fab: false,
      alertError: false,
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
      },
    }
  },
  methods: {
    toTop() {
      this.$vuetify.goTo(0)
    },
    modalCard() {
      if (this.cardSample[0] === undefined) {
        this.dialog = true
      } else {
        this.cardSample[0].comments.forEach((comments, index) => {
          if (comments.person == this.$store.state.name) {
            console.log('Nope!')
            //"ALERT ATTENTION" Você já declarou um voto para este título!
            //Deseja alterar sua opinião?
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
      }
      else {
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

          //Lógica que altera a porcentagem de likes vs dislikes no Slider
          const totArray = this.cardSample[0].comments.length + 1
          this.cardSample[0].total = (totalLikes / totArray) * 100

          //Adiciona os dados digitados e faz o Post
          this.cardSample[0].comments.push(this.cardData)
          this.allCards.push(this.cardSample[0])

          const response = await axios.post(
            'https://api.npoint.io/62237f9c648e7e1cd160',
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
          }
          this.allCards.push(firstCard)
          console.log('FirstCard')
          const response = await axios.post(
            'https://api.npoint.io/62237f9c648e7e1cd160',
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
