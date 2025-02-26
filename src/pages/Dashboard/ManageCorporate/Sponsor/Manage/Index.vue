<template>
    <div>
        <div class="" v-if="$store.state.style.isMobile">
            <Mobile />
        </div>
        <div v-else>
            <Desktop />
        </div>
    </div>
</template>
<script>
import Mobile from 'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/Mobile.vue'
import Desktop from 'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Manage Sponsor')
  }
}
</script>
