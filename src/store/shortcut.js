import axios from 'axios'

export default {
  isRegistered: false,
  namespaced: true,

  state: {
    data: []
  },

  mutations: {
    fetchShortcut: (state, data) => {
      state.data = data
    }
  },

  actions: {
    fetchShortcut: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/shortcut/username/${payload}`)
          .then(res => {
            const { data } = res.data

            commit('fetchShortcut', data)
          })
          .catch((error) => reject(error))
      })
    }
  }
}
