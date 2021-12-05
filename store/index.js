//Define os States
export const state = () => {
  return {
    authenticated: 'false',
    name: '',
    picture: ''
  }
}

//Define as mutações
export const mutations = {
    alterLogin(state) {
      state.authenticated = localStorage.getItem('authenticated')
    },
    SET_VARS (state, value) {
      state.name = value.name
      state.picture = value.picture
    },
  }