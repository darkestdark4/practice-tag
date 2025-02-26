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
import Mobile from 'src/pages/Dashboard/SavedCards/Add/Mobile.vue'
import Desktop from 'src/pages/Dashboard/SavedCards/Add/Desktop.vue'

export default {
  components: { Mobile, Desktop }
}
</script>
