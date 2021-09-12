<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <iThinkLogo />
      <br />
      <v-card elevation="7">
        <v-card-title class="headline">
          <NuxtLink to="/inspire"> {Categoria} </NuxtLink>
          &nbsp; - &nbsp;
          <NuxtLink to="/inspire"> {Nome do Obj} </NuxtLink>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <br /><br /><br />
              <v-row style="max-width: 100px">
                <v-slider
                  v-model="val"
                  thumb-label="always"
                  thumb-size="24"
                  :thumb-color="colorTip"
                  :track-color="colorAfter"
                  color="red"
                  readonly
                ></v-slider>
              </v-row>
            </v-col>
            <v-col cols="9" align="center">
              <NuxtLink to="/inspire"> Lorem ipsum dolor sit amet consectetur adipisicing elit. At eaque quidem animi, sapiente deserunt nobis accusamus exercitationem atque numquam alias eum aliquid eligendi perspiciatis consequuntur facere neque aperiam qui laudantium? </NuxtLink>
            </v-col>
          </v-row>

          <hr class="my-3" />
          <v-row>
            <v-col align="left">
              <em><small>&mdash; Nicolas Pedroso</small></em>
            </v-col>
            <v-col align="right">
              <v-btn class="ma-2" text icon @click.once="countUp">
                <v-icon color="green lighten-2">{{mdiUp}}</v-icon>
                {{ resultUp }}
              </v-btn>
              <v-btn class="ma-2" text icon @click.once="countDown">
                <v-icon color="red lighten-2">{{mdiDown}}</v-icon>
                {{ resultDown }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      resultUp: 0,
      resultDown: 0,
      clicked: true,
      colorTip: '#424242',
      colorAfter: '#81C784',
      val: 50,
      mdiDown: 'mdi-thumb-down-outline',
      mdiUp: 'mdi-thumb-up-outline',
    }
  },
  methods: {
    countUp() {
      this.resultUp += 1
      this.mdiUp = 'mdi-thumb-up'
    },
    countDown() {
      this.resultDown += 1
      this.mdiDown = 'mdi-thumb-down'
    },
  },
}
</script>
