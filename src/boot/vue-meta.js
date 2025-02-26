// import something here
import VueMeta from 'vue-meta'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
  })
}
