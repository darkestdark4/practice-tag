<template>
    <q-page>
        <div class="" v-if="$store.state.style.isMobile">
            <Mobile />
        </div>
        <div v-else>
            <Desktop />
        </div>
    </q-page>
</template>
<script>
import Mobile from 'src/pages/Dashboard/Wallet/RequestTo/Mobile.vue'
import Desktop from 'src/pages/Dashboard/Wallet/RequestTo/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Request To')
  }
}
</script>
