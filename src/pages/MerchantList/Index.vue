<template>
  <div>
    <div class="" v-if="username === 'iluna-indonesia'">
      <Iluna />
    </div>
  </div>
</template>
<script>
import Iluna from 'src/pages/MerchantList/Iluna.vue'

const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  components: { Iluna },
  data () {
    return {
      username
    }
  },
  mounted () {
    if (this.username === 'iluna-indonesia') {
      return 1
    } else {
      this.$router.push({ path: '/not-found' })
    }
  }
}
</script>
