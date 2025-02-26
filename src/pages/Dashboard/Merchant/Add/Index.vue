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
import Mobile from 'src/pages/Dashboard/Merchant/Add/Mobile.vue'
import Desktop from 'src/pages/Dashboard/Merchant/Add/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Add Merchant')
  }
}
</script>
