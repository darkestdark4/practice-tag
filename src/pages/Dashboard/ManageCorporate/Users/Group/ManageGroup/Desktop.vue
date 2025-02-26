<template>
  <div class="q-pa-lg font-monserra">
    <div class="col row q-my-md" v-for="(gr, index) in group" :key="index">
      <q-card class="my-card font-proxima-nova-alt full-width" style="border-right: 5px solid #116C54">
        <q-card-section>
          <div class="row col">
            <div class="col-10">
              <span class="col-10 text-secondary text-bold" style="font-size: 20px;">{{ gr.divisi_name }}</span> <br>
              <span class="col-10" style="font-size: 12px;">{{ gr.jumlah_anggota }} User</span>
            </div>
            <div class="col-2 text-right">
              <q-btn color="primary q-mt-sm" @click="$router.replace({ path: `/dashboard/manage-corporate/divisi/edit-divisi/`+ gr.id })">
                Manage
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[50, 40]">
      <q-btn fab color="secondary" @click="$router.replace({ path: `/dashboard/manage-corporate/divisi/add-divisi` })">
        <q-icon name="add" color="white" />
      </q-btn>
    </q-page-sticky>
  </div>
</template>
<script>
export default {
  data () {
    return {
      group: {
        divisi_name: '',
        jumlah_anggota: 0,
        private: 'Pimpinan'
      }
    }
  },
  mounted () {
    this.getGroup()
  },
  methods: {
    getGroup () {
      this.$axios.get('/member/corporate/divisi').then(response => {
        if (response.data.success === true) {
          this.group = response.data.data
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
