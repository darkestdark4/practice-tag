import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store } /* ssrContext  */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const localStorage = JSON.parse(window.sessionStorage.getItem('userd'))
    const token = localStorage ? localStorage.api_token : null
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!token) {
        return next({ path: '/login' })
      } else {
        return next()
      }
    } else {
      return next()
    }
    // else {
    //   if (to.name === 'landing-page') {
    //     const host = window.location.host
    //     const parts = host.split('.')
    //     const username = parts[0]
    //     if (username != 'mvp') {
    //       return next({ path: '/not-found' })
    //     } else {
    //       return next()
    //     }
    //   } else {
    //     return next()
    //   }
    // }
  })

  return Router
}
