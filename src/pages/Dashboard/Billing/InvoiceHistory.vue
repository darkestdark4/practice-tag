<template>
  <q-page>
    <div class="q-pa-md font-proxima-nova-alt">
      <div class="q-mb-md" v-for="(item, index) in invoice" :key="index">
        <p class="text-weight-bold text-secondary q-ml-md q-mb-md" style="font-size: 16px">{{ item.transaction_date }}
        </p>
        <q-card class="my-card">
          <q-card-section>
            <div class="row">
              <div class="col-9">
                <p class="q-mb-none text-weight-bold" style="font-size: 14px">
                  {{ item.description }}
                </p>
                <p class="q-mb-md text-grey" style="font-size: 12px">{{ item.bill_number }}</p>
                <div v-if="item.status === 'paid'">
                  <q-btn no-caps unelevated @click="gotoInvoice(item.bill_number)" color="primary" text-color="white"
                    label="Download Invoice" />
                </div>
                <div v-else-if="item.status === 'failed'">
                  <q-btn no-caps unelevated disabled color="red" text-color="white"
                    label="Expired" />
                </div>
                <div v-else>
                  <q-btn no-caps unelevated @click="gotoPaymentBilling(item.bill_number)" color="primary"
                    text-color="white" label="Pay Billing" />
                </div>
              </div>
              <div class="col-3">
                <p class="q-mb-none text-weight-bold text-secondary text-right" style="font-size: 16px">
                  $ {{ item.price }}
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      invoice: []
    }
  },
  mounted () {
    this.getDataInvoice()
    this.$store.dispatch('style/submitTitlePage', 'Invoice / History')
  },
  methods: {
    getDataInvoice () {
      const userData = JSON.parse(localStorage.getItem('userd'))

      const config = {
        headers: {
          Authorization: `Bearer ${userData.api_token}`
        }
      }
      this.$axios.get('/member/invoice/show', config)
        .then(res => {
          const { data } = res.data
          this.invoice = data
        })
    },
    gotoPaymentBilling (billNumber) {
      this.$router.push({ path: `checkout/${billNumber}` })
    },
    gotoInvoice (billNumber) {
      this.$router.push({ path: `../../invoice/${billNumber}` })
    }
  }
}
</script>
