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
      state.name = localStorage.getItem('name')
      state.picture = localStorage.getItem('picture')
    },
  }