<template>
  <v-card elevation="7" class="mb-5">
    <v-card-title class="headline"> </v-card-title>
    <v-card-text>
      <v-row>
        <v-col align="center">
          <v-avatar>
            <img :src="picture" alt="MyPhoto" />
          </v-avatar>
          <br /><br /><br />
          <v-icon v-if="grade" color="green lighten-2">mdi-thumb-up</v-icon>
          <v-icon v-else color="red lighten-2">mdi-thumb-down</v-icon>
        </v-col>
        <v-col cols="9" align="center">
          <NuxtLink to="/inspire">
            {{ description }}
          </NuxtLink>
        </v-col>
      </v-row>
      <hr class="my-3" />
      <v-row>
        <v-col align="left">
          <em
            ><small>&mdash; {{ person }}</small></em
          >
        </v-col>
        <v-col align="right">
          <v-btn v-if="likeTrigger" class="ma-2" text icon @click="countUp">
            <v-icon color="grey">mdi-thumb-up-outline</v-icon>
            {{ upResult }}
          </v-btn>
          <v-btn v-else class="ma-2" text icon @click="countUp">
            <v-icon color="grey">mdi-thumb-up</v-icon>
            {{ upResult }}
          </v-btn>
          <v-btn
            v-if="dislikeTrigger"
            class="ma-2"
            text
            icon
            @click="countDown"
          >
            <v-icon color="grey">mdi-thumb-down-outline</v-icon>
            {{ downResult }}
          </v-btn>
          <v-btn v-else class="ma-2" text icon @click="countDown">
            <v-icon color="grey">mdi-thumb-down</v-icon>
            {{ downResult }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    resultUp: Number,
    resultDown: Number,
    grade: Boolean,
    person: String,
    picture: String,
    cardSample: Array,
    likeState: Array,
  },
  data: function () {
    return {
      //Likes
      likeTrigger: true,
      dislikeTrigger: true,
      upResult: this.resultUp,
      downResult: this.resultDown,
    }
  },
  methods: {
    countUp() {
      this.likeTrigger = !this.likeTrigger
      if (this.dislikeTrigger === false) {
        this.dislikeTrigger = true
        this.downResult -= 1
        this.registerLike(true)
      }
      if (this.likeTrigger === false) {
        this.upResult += 1
        this.registerLike(true)
      } else {
        this.upResult -= 1
        this.registerLike(false)
      }
    },
    countDown() {
      this.dislikeTrigger = !this.dislikeTrigger
      if (this.likeTrigger === false) {
        this.likeTrigger = true
        this.upResult -= 1
        this.registerLike(false)
      }
      if (this.dislikeTrigger === false) {
        this.downResult += 1
        this.registerLike(false)
      } else {
        this.downResult -= 1
        this.registerLike(true)
      }
    },
    registerLike(val) {
     
      //Se existe id, remove a atual
      if (this.likeState !== undefined) {
        const stateId = this.likeState.find(
          (like) => like.id == this.$store.state.id
        )
        const i = this.likeState.findIndex(
          (like) => like.id == this.$store.state.id
        )
        //SE NÃO EXISTIR id, ADICIONA
        if (!stateId) {
          this.likeState.push({ id: this.$store.state.id, result: val })
        //SE EXISTIR, TESTA SE QUAL VALOR E TROCA ELE
        } else if (stateId.result == val) {
          stateId.result = !stateId.result
         //SE EXISTIR, E NÃO FOR O MESMO VALOR, REMOVE
        } else {
          this.likeState.splice(i, 1)
        }
      }
    },
  },
  //REGISTRA OS LIKES DE QUEM JÁ OPINOU
  created: function () {
    if (this.likeState !== undefined) {
      const stateId = this.likeState.find((like) => like.id == this.$store.state.id)
      if (stateId.result == true) {
        this.likeTrigger = false
        this.dislikeTrigger = true
      } else {
        this.likeTrigger = true
        this.dislikeTrigger = false
      }
    }
  },
}
</script>

<style></style>
