import axios from 'axios'

export default {
  isRegistered: false,
  namespaced: true,

  state: {
    corporate: [],
    user: []
  },

  getters: {
    getDisplayAddress (state) {
      if (state.corporate.length < 1) {
        return state.user
      }

      return state.corporate
    }
  },

  mutations: {
    fetchCorporateAddress: (state, data) => {
      state.corporate = data.map((item) => {
        return {
          order: item.order,
          address: item.address,
          country: item.country,
          state: item.state,
          city: item.city,
          type: null,
          postalCode: item.postal_code
        }
      })
    },
    fetchUserAddress: (state, data) => {
      state.user = data.map((item) => {
        return {
          order: item.order,
          address: item.address,
          country: item.country,
          state: item.state,
          city: item.city,
          type: item.type,
          postalCode: item.postal_code
        }
      })
    }
  },

  actions: {
    fetchCorporateAddress: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/corporate/${payload}/address`)
          .then(res => {
            const { data } = res.data

            commit('fetchCorporateAddress', data)
          })
          .catch((error) => reject(error))
      })
    },
    fetchUserAddress: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/member/${payload}/address`)
          .then(res => {
            const { data } = res.data

            commit('fetchUserAddress', data)
          })
          .catch((error) => reject(error))
      })
    }
  }
}
