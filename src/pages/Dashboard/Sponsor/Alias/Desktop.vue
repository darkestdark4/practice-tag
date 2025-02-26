<template>
  <q-layout class="constrain-web">
    <div class="col row q-pa-sm">
      <div class="col-12 q-my-md text-center">
        <span class="text-grey-7 text-bold">Alias</span>
        <div class="text-center q-mt-sm">
          <q-input class="text-center" v-model="data.alias" placeholder="Ex. Our Partner" outlined />
        </div>
      </div>
      <div class="col-12 d-flex flex-column text-center q-mt-md">
        <q-btn @click="showConfirmModal()" class="col-6 q-px-lg q-py-sm bg-secondary text-white" size="15px"
          padding="xs lg" no-caps rounded>
          <div>
            Save
          </div>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="confirmModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure to Set Alias?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="danger" v-close-popup />
          <q-btn flat @click="setAlias()" label="Yes" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      data: {
        alias: ''
      },
      confirmModal: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    setAlias () {
      const data = this.data
      this.$axios.post('/partner/config', data).then(response => {
        if (response.data.status === 'success') {
          this.$q.notify({
            message: 'Success Update Alias',
            position: 'top',
            type: 'positive'
          })
          setTimeout(() => this.$router.push({ path: '/dashboard/manage-partner' }), 750)
        } else {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'negative'
          })
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    showConfirmModal () {
      this.confirmModal = true
    },
    getData () {
      this.$axios.get('/partner/config').then(response => {
        if (response.data.status === 'success') {
          this.data = response.data.data
        }
      })
    }
  }
}
</script>
