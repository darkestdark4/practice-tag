<template>
  <div class="q-pa-sm font-monserrat">
    <div class="q-my-md">
      <div class="q-mb-sm text-grey-7">Choose Package</div>
      <q-select class="full-width" v-model="data.value" placeholder="Your Phone Type" :options="valueOptions"
        outlined map-options emit-value />
    </div>
    <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Save" size="lg"
      @click="saveData()" rounded />
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        value: 1
      },
      valueOptions: [
        {
          label: '1 Month',
          value: 1
        },
        {
          label: '3 Month',
          value: 3
        },
        {
          label: '6 Month',
          value: 6
        },
        {
          label: '12 Month',
          value: 12
        }
      ]
    }
  },
  methods: {
    saveData () {
      const data = {
        date: this.data.value
      }
      this.$axios.post('/member/corporate/add_expired_member/' + this.$route.params.username, data).then(response => {
        if (response.data.status === true) {
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: response.data.message
          })
          this.$router.push('/dashboard/manage-corporate/users')
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: response.data.message
          })
        }
      })
    }
  }
}
</script>
<style>
::placeholder {
  color: #9e9e9e;
  font-size: 12px;
}
</style>
