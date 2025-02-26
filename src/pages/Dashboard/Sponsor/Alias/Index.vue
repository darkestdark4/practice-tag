<template>
    <q-page>
        <div class="" v-if="$store.state.style.isMobile">
            <Mobile />
        </div>
        <div class="q-pa-lg" v-else>
            <Desktop />
        </div>
    </q-page>
</template>
<script>
import Mobile from 'src/pages/Dashboard/Sponsor/Alias/Mobile.vue'
import Desktop from 'src/pages/Dashboard/Sponsor/Alias/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Set Alias')
  }
}
</script>
