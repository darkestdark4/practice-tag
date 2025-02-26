<template>
    <q-page style="min-height:200px !important">
        <q-card :class="`${$store.state.style.isMobile ? 'constrain-mobile' : 'constrain-web'} border-radius-10px`" flat>
          <div>
              <div class="" v-if="$store.state.style.isMobile">
                  <Mobile />
              </div>
              <div v-else>
                  <Desktop />
              </div>
          </div>
        </q-card>
    </q-page>
</template>
<script>
import Mobile from 'src/pages/Dashboard/LogRedeem/Mobile.vue'
import Desktop from 'src/pages/Dashboard/LogRedeem/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Log History Redeem')
  }
}
</script>
