import axios from 'axios'

export default {
  isRegistered: false,
  namespaced: true,

  state: {
    countries: []
  },

  mutations: {
    fetchCountries: (state, data) => {
      state.countries = data
    }
  },

  getters: {
    getPhoneCodeCountries: (state) => {
      return state.countries.map(item => {
        return {
          label: `${item.name} (+${item.phonecode})`,
          value: item.phonecode
        }
      })
    }
  },

  actions: {
    fetchCountries: ({ rootState, commit }) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/csc/countries`)
          .then(res => {
            const { data } = res.data

            commit('fetchCountries', data)
          })
          .catch((error) => reject(error))
      })
    }
  }
}
