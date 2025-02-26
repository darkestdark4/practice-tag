<template>
  <div class="q-pa-sm font-monserra">
    <div class="col row q-my-md" v-for="(gr, index) in data" :key="index">
      <q-card class="my-card font-proxima-nova-alt full-width" style="border-right: 5px solid #116C54">
        <q-card-section>
          <div class="row col">
            <div class="col-9">
              <span class="col-10 text-secondary text-bold" style="font-size: 20px;">{{ gr.name }}</span> <br>
              <span class="col-10" style="font-size: 12px;">Limit {{ gr.limit }} Sponsor</span>
            </div>
            <div class="col-3 text-right">
              <q-btn color="primary q-mt-sm"
                @click="$router.replace({ path: `/dashboard/manage-corporate/sponsor/manage/` + gr.id })">
                Manage
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[50, 40]">
      <q-btn fab color="secondary" @click="$router.replace({ path: `/dashboard/manage-corporate/sponsor/add` })">
        <q-icon name="add" color="white" />
      </q-btn>
    </q-page-sticky>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {}
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
