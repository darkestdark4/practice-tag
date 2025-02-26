import axios from 'axios'

export default {
  isRegistered: false,
  namespaced: true,

  state: {
    data: [],
    configStatus: false
  },

  mutations: {
    fetchBannerByUsername: (state, data) => {
      state.data = data
    },
    fetchBannerConfigByUsername: (state, data) => {
      state.configStatus = data.status
    }
  },

  actions: {
    fetchBannerByUsername: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/banner/username/${payload}`)
          .then(res => {
            const { data } = res.data

            commit('fetchBannerByUsername', data)
          })
          .catch((error) => reject(error))
      })
    },
    fetchBannerConfigByUsername: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/banner/config/username/${payload}`)
          .then(res => {
            const { data } = res.data

            commit('fetchBannerConfigByUsername', data)
          })
          .catch((error) => reject(error))
      })
    }
  }
}
