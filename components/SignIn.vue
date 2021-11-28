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
      // decodeJwtResponse() is a custom function defined
      // to decode the credential response.

      const responsePayload = jwt_decode(response.credential)

      console.log('ID: ' + responsePayload.sub)
      this.$store.commit('SET_VARS', responsePayload)
      this.$store.commit('alterLogin')
      this.$router.push('/')
    },
  },
  //CHAMA O BOTÃO DE SIGN IN
  mounted: function () {
    // test if google is available and set ID
    let initializeWhenGoogleIsAvailable = () => {
      try {
        google.accounts.id.initialize({
          client_id:
            '644103719072-dm0f88sb2uicho95hgap6bbnrj58clh8.apps.googleusercontent.com',
          callback: this.handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          this.$refs['google'],
          this.google
          //ATRIBUTOS CUSTOMIZAVEIS DO DATA VÃO AQUI
        )
      } catch {
        setTimeout(initializeWhenGoogleIsAvailable, 100) // if it isn't, wait a bit and retry
      }
    }
    initializeWhenGoogleIsAvailable()
  },
}
</script>
