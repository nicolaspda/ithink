<template>
  <v-container>
    <v-row>
      <v-col class="text-center" style="padding-top: 6%">
        <v-img
          src="/logo2-ithink.svg"
          alt="iThink, a plataforma para você falar o que pensa! Comente sobre celebridades, filmes, séries e muito mais!"
          class="rounded"
        ></v-img>
        <v-banner dark elevation="7" shaped color="#1b2538">
          iThink <br />
          &copy; Todos os direitos reservados <br />
          <br /><br /><br />
          <v-row no-gutters>
            <v-col cols="4">
              <v-img max-width="100" src="tmdb.svg"> </v-img>
            </v-col>
            <v-col style="font-size: 15px">
              <i>
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.</i
              >
            </v-col>
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'About',
    }
  },
}
</script>
