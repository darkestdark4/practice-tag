export default {
  isRegistered: false,
  namespaced: true,

  state: {
    isMobile: false,
    titlePage: '',
    campaignDialog: false
  },

  getters: {
    getIsMobile (state) {
      return state.isMobile
    },
    getTitlePage (state) {
      return state.titlePage
    }
  },

  mutations: {
    setIsMobile (state, data) {
      state.isMobile = data
    },
    setTitlePage (state, data) {
      state.titlePage = data
    },
    setCampaignDialog (state, data) {
      state.campaignDialog = data
    }
  },

  actions: {
    submitIsMobile ({ commit }, data) {
      commit('setIsMobile', data)
    },
    submitTitlePage ({ commit }, data) {
      commit('setTitlePage', data)
    },
    setCampaignDialog ({ commit }, data) {
      if (data === 'open') {
        commit('setCampaignDialog', true)
      } else {
        commit('setCampaignDialog', false)
      }
    }
  }
}
