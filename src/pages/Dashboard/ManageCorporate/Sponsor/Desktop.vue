<template>
  <div class="q-pa-sm font-monserra">
    <q-tabs dense class="text-grey border-radius-10px q-mb-md" active-color="secondary" indicator-color="secondary"
      align="justify" narrow-indicator outside-arrows mobile-arrows style="border: 1px solid #efefef">
      <!-- <q-route-tab class="text-capitalize" label="Company" to="/dashboard/manage-corporate/company" /> -->
      <q-route-tab class="text-capitalize" label="Users" to="/dashboard/manage-corporate/users" exact />
      <q-route-tab class="text-capitalize" label="Broadcast" to="/dashboard/manage-corporate/broadcast" exact />
      <q-route-tab class="text-capitalize" label="Log" to="/dashboard/manage-corporate/log" exact />
      <q-route-tab class="text-capitalize" label="Polling" to="/dashboard/manage-corporate/Polling" exact />
      <q-route-tab class="text-capitalize bg-secondary text-white " label="Sponsor"
        to="/dashboard/manage-corporate/sponsor" exact />
    </q-tabs>
    <div class="col row q-my-md">
      <div class="col row q-pa-sm">
        <span class="col-6 text-left text-bold">Sponsor ({{ data.length }} Sponsor)</span>
        <!-- <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer" @click="officeModalAdd = true">+ Add Office</span> -->
        <span class="col-6 text-right text-secondary cursor-pointer"
          @click="$router.replace({ path: `/dashboard/manage-corporate/sponsor/manage` })">
          Manage Sponsor
        </span>
      </div>
    </div>
    <div class="col row q-mb-sm q-ml-md" v-for="(card, index) in data" :key="index">
      <span class="col-10 text-bold text-secondary">{{ card.name }} ( {{ card.limit }} Limit )</span>
      <span class="col-2 text-right text-secondary cursor-pointer"
        @click="$router.replace({ path: `/dashboard/manage-corporate/sponsor/edit/` + card.id })">Edit</span>
    </div>
    <q-separator />
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/member/corporate/sponsor').then(response => {
        if (response.data.success) {
          this.data = response.data.data
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    }
  }
}
</script>
