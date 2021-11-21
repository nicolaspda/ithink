<template>
      <div ref="google"></div>
</template>

<style></style>

<script>
import jwt_decode from 'jwt-decode'

export default {
  data: function () {
    return {
      google: { theme: 'outline', size: 'large' },
    }
  },

  methods: {
    handleCredentialResponse: function (response) {
      // decodeJwtResponse() is a custom function defined by you
      // to decode the credential response.

      const responsePayload = jwt_decode(response.credential)

      console.log('ID: ' + responsePayload.sub)
      console.log('Full Name: ' + responsePayload.name)
      console.log('Given Name: ' + responsePayload.given_name)
      console.log('Family Name: ' + responsePayload.family_name)
      console.log('Image URL: ' + responsePayload.picture)
      console.log('Email: ' + responsePayload.email)
      this.$store.commit('alterLogin')
      this.$router.push('/')
    },
  },
  //CHAMA O BOTÃO DE SIGN IN
  mounted: function () {
    google.accounts.id.initialize({
      client_id:
        '644103719072-dm0f88sb2uicho95hgap6bbnrj58clh8.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    })
    google.accounts.id.renderButton(
      this.$refs['google'],
      this.google
      //ATRIBUTOS CUSTOMIZAVEIS DO DATA
    )
  },
}
</script>
