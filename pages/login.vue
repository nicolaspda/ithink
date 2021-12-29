<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <iThinkLogo class="animate__animated animate__bounce" />
      <br />
      <v-row justify="center" align="center">
        <br />
        <SignIn class="pa-8" />
      </v-row>
    </v-col>
  </v-row>
</template>

<style></style>

<script>
export default {
  head() {
    return {
      title: 'About',
    }
  },
  data() {
    return {}
  },
  mounted: function () {
    this.$store.commit('alterLogin')
    this.$router.push('/')
  },
}
</script>
