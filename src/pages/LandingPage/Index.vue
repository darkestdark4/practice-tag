<template>
  <div>
    <div class="" v-if="username === 'mvp'">
      <Mvp />
    </div>
    <div class="" v-else-if="username === 'iluna-indonesia'">
      <Iluna />
    </div>
  </div>
</template>
<script>
import Mvp from 'src/pages/LandingPage/MVP/Index.vue'
// import Mvp from 'src/pages/LandingPage/Mvp.vue'
import Iluna from 'src/pages/LandingPage/Iluna.vue'

const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  components: { Mvp, Iluna },
  data () {
    return {
      username
    }
  },
  mounted () {
    if (this.username === 'mvp') {
      return 1
    } else if (this.username === 'iluna-indonesia') {
      return 1
    } else {
      this.$router.push({ path: '/not-found' })
    }
  }
}
</script>
