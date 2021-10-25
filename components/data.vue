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
      <v-card elevation="7">
        <v-card-title class="headline"> Categoria - {{ title }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col align="center">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <br />
              <br />
              <v-row justify="center">
                <v-btn class="ma-2" text icon @click="setLike">
                  <v-icon color="green lighten-2">{{ mdiLike }}</v-icon>
                </v-btn>
              </v-row>
              <v-row justify="center">
                <v-btn class="ma-2" text icon @click="setDislike">
                  <v-icon color="red lighten-2">{{ mdiDislike }}</v-icon>
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
              <em><small>&mdash; Nicolas Pedroso</small></em>
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
  props: {title:String, cardSample:Array},
  data: function () {
    return {
      fab: false,
      dialog: false,
      mdiDislike: 'mdi-thumb-down-outline',
      mdiLike: 'mdi-thumb-up-outline',
      isSelected: true,
      cardData: {
        person: 'Person',
        description: '',
        grade: true,
        resultUp: 0,
        resultDown: 0,
      },
      articleId:'',
    }
  },
  methods: {
    toTop() {
      this.$vuetify.goTo(0)
    },
    modalCard() {
      this.dialog = true
    },
    setLike() {
      //arrumar BUG de clique nos 2
      if (this.isSelected == true) {
        this.mdiLike = 'mdi-thumb-up'
        this.isSelected = false
      } else {
        this.mdiLike = 'mdi-thumb-up-outline'
        this.isSelected = true
      }
    },
    setDislike() {
      if (this.isSelected == true) {
        this.mdiDislike = 'mdi-thumb-down'
        this.isSelected = false
      } else {
        this.mdiDislike = 'mdi-thumb-down-outline'
        this.isSelected = true
      }
    },
    //TODO Enviar dados
    async addCard() {
      this.cardSample[0].comments.push(this.cardData)
      const response = await axios.post(
        'https://api.npoint.io/8e4fc086e01e1082bced', this.cardSample)
      console.log(response.data)
      this.dialog = false
    },
  },
}
</script>
