import axios from 'axios'

export default async ({
  Vue,
  router,
  store
}) => {
  axios.defaults.baseURL = `${process.env.API}/api/${process.env.cid}`

  axios.interceptors.request.use(
    (config) => {
      if (!config.url.includes('authentication')) {
        const localStorage = JSON.parse(window.localStorage.getItem('userd'))
        const token = localStorage ? localStorage.api_token : null
        if (config.url.includes('token')) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          config.headers.Authorization = `Bearer ${token}` || null
        }
      }
      config.headers.post['Access-Control-Allow-Headers'] = '*'

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  Vue.prototype.$axios = axios
}
