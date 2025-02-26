import axios from 'axios'

export default {
  isRegistered: false,
  namespaced: true,

  state: {
    config: {
      status: false,
      alias: null
    },
    sponsor: {
      partner: [],
      totalRedeem: 0
    }
  },

  mutations: {
    fetchConfigPartner: (state, data) => {
      state.config.status = data.status
      state.config.alias = data.alias
    },
    fetchPartnerSponsor: (state, data) => {
      const partner = data.partner.map(item => {
        return item.partner
      })
        .filter(item => item.is_expired === false)
        .splice(0, 12)

      state.sponsor.partner = partner
      state.sponsor.totalRedeem = data.countRedeem
    }
  },

  actions: {
    fetchPartnerSponsor: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/sponsor/username/${payload.username}`)
          .then(res => {
            const { data } = res.data

            commit('fetchPartnerSponsor', data)
          })
          .catch((error) => reject(error))
      })
    },
    fetchConfigPartner: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/partner/config/${payload}`)
          .then(res => {
            const { data } = res.data

            commit('fetchConfigPartner', data)
          })
          .catch((error) => reject(error))
      })
    }
  }
}
