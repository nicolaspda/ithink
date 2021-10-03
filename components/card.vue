<template>
  <v-card elevation="7">
    <v-card-title class="headline">
      <NuxtLink to="/inspire"> Categoria </NuxtLink>
      &nbsp; - &nbsp;
      <NuxtLink to="/content"> {{cards}} </NuxtLink>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col align="center">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <br /><br /><br />
          <Slider />
          <v-icon color="green lighten-2">mdi-thumb-up</v-icon>
        </v-col>
        <v-col cols="9" align="center">
          <NuxtLink to="/inspire">      
          </NuxtLink>
        </v-col>
      </v-row>

      <hr class="my-3" />
      <v-row>
        <v-col align="left">
          <em><small>&mdash; Nicolas Pedroso</small></em>
        </v-col>
        <v-col align="right">
          <v-btn class="ma-2" text icon @click="countUp">
            <v-icon color="green lighten-2">{{ mdiUp }}</v-icon>
            {{ resultUp }}
          </v-btn>
          <v-btn class="ma-2" text icon @click="countDown">
            <v-icon color="red lighten-2">{{ mdiDown }}</v-icon>
            {{ resultDown }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
   props: ['cards'],
  data: function () {
  return {
   
      /*Likes*/
      resultUp: 0,
      resultDown: 0,
      notActiveUp: true,
      notActiveDown: true,
      mdiDown: 'mdi-thumb-down-outline',
      mdiUp: 'mdi-thumb-up-outline',
    };
  },
  methods: {
    countUp() {
      //arrumar BUG de clique nos 2
      if (this.notActiveUp == true) {
        this.resultUp += 1
        this.mdiUp = 'mdi-thumb-up'
        this.notActiveUp = false
      } else {
        this.resultUp -= 1
        this.mdiUp = 'mdi-thumb-up-outline'
        this.notActiveUp = true
      }
    },
    countDown() {
      if (this.notActiveDown == true) {
        this.resultDown += 1
        this.mdiDown = 'mdi-thumb-down'
        this.notActiveDown = false
      } else {
        this.resultDown -= 1
        this.mdiDown = 'mdi-thumb-down-outline'
        this.notActiveDown = true
      }
    }
  },
};

</script>

<style></style>
