<template>
  <div>
    <div class="" v-if="$store.state.style.isMobile">
      <q-layout view="hHh lpR fFf">
        <q-page-container>
          <q-toolbar class="text-primary">
            <q-btn flat round dense icon="arrow_back" class="q-mr-sm"
              @click="$router.replace({ path: `/dashboard/manage-corporate/sponsor/` })" />
            <q-toolbar-title class="text-center font-bold font-proxima-nova-alt"
              :style="`font-size:16px; margin-left:-40px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">
              {{ $store.state.style.titlePage }}</q-toolbar-title>
          </q-toolbar>
          <Mobile />
        </q-page-container>
      </q-layout>
    </div>
    <div v-else>

      <q-layout view="hHh lpR fFf">
        <q-page-container>
          <q-toolbar class="text-primary">
            <q-btn flat round dense icon="arrow_back" class="q-mr-sm"
              @click="$router.replace({ path: `/dashboard/manage-corporate/sponsor/` })" />
            <q-toolbar-title class="text-center font-bold font-proxima-nova-alt"
              :style="`font-size:16px; margin-left:-40px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">
              {{ $store.state.style.titlePage }}</q-toolbar-title>
          </q-toolbar>
          <Desktop />
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import Mobile from 'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/Index/Mobile.vue'
import Desktop from 'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/Index/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Manage Sponsor')
  }
}
</script>
