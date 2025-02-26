export default {
  isRegistered: false,
  namespaced: true,

  state: {
    loggedIn: false
    // token: null,
    // username: null,
    // profile: {
    //   image: null,
    //   background: null,
    //   companyLogo: null
    // }
  },

  mutations: {
    setLoggedIn (state, data) {
      state.loggedIn = data
    }
    // setToken (state, data) {
    //   state.token = data
    // },
    // setUsername (state, data) {
    //   state.username = data
    // },
    // setProfile (state, data) {
    //   state.profile = data
    // }
  },

  actions: {
    submitLoggedIn ({ commit }, data) {
      commit('setLoggedIn', data)
    }
    // submitToken ({ commit }, data) {
    //   commit('setToken', data)
    // },
    // submitUsername ({ commit }, data) {
    //   commit('setUsername', data)
    // },
    // submitProfile({ commit }, data) {
    //   commit('setProfile', data)
    // }
  }
}
