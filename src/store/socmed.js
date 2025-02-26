import axios from 'axios'

export default {
  isRegistered: false,
  namespaced: true,

  state: {
    data: [],
    video: [],
    categorySocmed: []
  },

  mutations: {
    fetchSocmedUser: (state, data) => {
      state.data = data.data
      state.categorySocmed = data.total
    },
    fetchSocmedVideoUser: (state, data) => {
      const video = data.data.filter(item => {
        return item.name === 'youtube'
      })

      state.video = video
    }
  },

  actions: {
    fetchSocmedUser: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`${rootState.apiURL}/member/${payload}/socmed`)
          .then(res => {
            const { data } = res.data

            commit('fetchSocmedUser', data)
            commit('fetchSocmedVideoUser', data)
          })
          .catch((error) => reject(error))
      })
    }
  }
}
