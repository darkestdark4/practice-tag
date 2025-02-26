<template>
  <div class="q-pa-sm font-monserrat">
    <div class="q-mt-md">
      <div class="q-mb-sm text-grey-7">Membership Name*</div>
      <q-input class="full-width" v-model="data.name" :error="$v.data.name.$error"
        :error-message="validationMsg($v.data.name)" placeholder="Ex. Platinum" outlined />
    </div>
    <div class="q-mt-sm">
      <div class="q-mb-sm text-grey-7">Set Limit*</div>
      <q-input class="full-width" v-model="data.limit" :error="$v.data.limit.$error" type="number"
        :error-message="validationMsg($v.data.limit)" placeholder="100" outlined />
    </div>
    <!-- Button Save -->
    <div class="q-mt-md">
      <q-btn class="bg-secondary text-white full-width" @click="save()" :disabled="$v.$invalid" rounded>
        Save
      </q-btn>
    </div>
    <!-- Button Delete -->
    <div class="q-mt-md">
      <q-btn class="bg-red text-white full-width" @click="deleteData()" rounded>
        Delete
      </q-btn>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
const formMessages = {
  required: () => 'Form input required'
}

export default {
  data () {
    return {
      data: {
        name: '',
        limit: ''
      }
    }
  },
  validations: {
    data: {
      name: {
        required
      },
      limit: {
        required
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    getData () {
      axios.get('/member/corporate/sponsor/' + this.$route.params.id)
        .then(response => {
          this.data = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    save () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$q.loading.show()
      axios.post('/member/corporate/sponsor/' + this.$route.params.id, this.data).then(response => {
        if (response.data.status) {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          this.$q.loading.hide()
          this.$router.push({ path: '/dashboard/manage-corporate/sponsor' })
        }
      }).catch(error => {
        this.$q.loading.hide()
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    deleteData () {
      this.$q.dialog({
        title: 'Delete',
        message: 'Are you sure want to delete this data?',
        cancel: true
      }).onOk(() => {
        axios.delete('/member/corporate/sponsor/' + this.$route.params.id).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.$q.loading.hide()
            this.$router.push({ path: '/dashboard/manage-corporate/sponsor' })
          }
        }).catch(error => {
          this.$q.loading.hide()
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    }
  }
}
</script>
