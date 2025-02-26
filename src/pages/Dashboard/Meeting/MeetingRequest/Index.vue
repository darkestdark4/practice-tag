<template>
    <q-page>
        <div v-if="$store.state.style.isMobile">
            <Mobile />
        </div>
        <div class="q-pa-lg" v-else>
            <Desktop />
        </div>
    </q-page>
</template>
<script>
import Mobile from 'src/pages/Dashboard/Meeting/MeetingRequest/Mobile.vue'
import Desktop from 'src/pages/Dashboard/Meeting/MeetingRequest/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'All Request Meeting')
  }
}
</script>
