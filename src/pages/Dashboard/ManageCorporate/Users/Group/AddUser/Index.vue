<template>
    <div>
        <div class="" v-if="$store.state.style.isMobile">
          <q-toolbar class="text-primary">
            <q-btn flat round dense icon="arrow_back" class="q-mr-sm" @click="$router.replace({ path: `/dashboard/manage-corporate/divisi/edit-divisi/` + $route.params.id })" />
            <q-toolbar-title class="text-center font-bold font-proxima-nova-alt" :style="`font-size:16px; margin-left:-40px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">{{ $store.state.style.titlePage }}</q-toolbar-title>
          </q-toolbar>
            <Mobile />
        </div>
        <div v-else>
          <q-toolbar class="text-primary">
            <q-btn flat round dense icon="arrow_back" class="q-mr-sm" @click="$router.replace({ path: `/dashboard/manage-corporate/divisi/edit-divisi/`  + $route.params.id })" />
            <q-toolbar-title class="text-center font-bold font-proxima-nova-alt" :style="`font-size:16px; margin-left:-40px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">{{ $store.state.style.titlePage }}</q-toolbar-title>
          </q-toolbar>
            <Desktop />
        </div>
    </div>
</template>
<script>
import Mobile from 'src/pages/Dashboard/ManageCorporate/Users/Group/AddUser/Mobile.vue'
import Desktop from 'src/pages/Dashboard/ManageCorporate/Users/Group/AddUser/Desktop.vue'

export default {
  components: { Mobile, Desktop },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Add User Divisi')
  }
}
</script>
