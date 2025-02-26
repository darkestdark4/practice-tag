<template>
  <q-page>
    <div v-if="corporate_id !== null">
      <div class="q-pa-md font-proxima-nova-alt">
        <p style="font-size: 12px">Expired</p>
        <q-card class="my-card">
          <q-card-section>
            <div class="row justify-between">
              <div class="col-7">
                Your current account active untill <p class="q-ma-none text-weight-bolder" style="font-size: 19px">{{ expired }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-md font-proxima-nova-alt">
        <p style="font-size: 12px">Renewal</p>
        <q-card class="my-card">
          <q-card-section>
            <div class="row justify-between">
              <div class="col-7">
                <div class="row" style="width: 80%">
                  <q-select
                    square outlined
                    type="text"
                    class="col"
                    input-class="text-center text-weight-bold"
                    style="height: 20px; font-size: 18px"
                    v-model="qty"
                    :options="options"
                    option-value="value"
                    option-label="label"
                    emit-value
                    map-options
                  />
                </div>
              </div>
              <div class="col-4 row">
                <div class="col-6 column">
                  <p class="q-mb-none">Biaya</p>
                  <p class="q-mb-none text-weight-bold text-secondary">{{ price }}</p>
                </div>
                <q-btn
                  no-caps
                  unelevated
                  class="col-6"
                  color="secondary"
                  text-color="white"
                  label="Convert"
                  v-if="qty >= 0"
                  :disable="qty == 0"
                  @click="kurs = !kurs"/>
                <q-btn
                  no-caps
                  unelevated
                  class="full-width self-end q-mt-lg col-12"
                  color="primary"
                  text-color="white"
                  label="Renewal"
                  @click="renewalConfirm = true"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else>
      <p class="text-center q-mt-md font-proxima-nova-alt">
        You should upgrade your package to enterprise
      </p>
    </div>

    <q-dialog v-model="renewalConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span>Are you sure to renewal?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" text-color="black" v-close-popup />
          <q-btn flat label="Yes" color="primary" @click="renewal()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Loading } from 'quasar'

export default {
  data () {
    return {
      corporate_id: null,
      total_member: 0,
      qty: 1,
      qtyPosition: 'positive',
      renewalConfirm: false,
      downgradeConfirm: false,
      expired: 0,
      diffMonth: 0,
      totalPrice: 0,
      kursIdr: 0,
      kurs: false,
      pricing: null,
      options: [
        {
          value: 1,
          label: '1 Bulan'
        },
        {
          value: 6,
          label: '6 Bulan'
        },
        {
          value: 12,
          label: '12 Bulan'
        }
      ]
    }
  },
  mounted () {
    this.getDataCorporate()
    this.kursUsd()
    this.$store.dispatch('style/submitTitlePage', 'Renewal')
  },
  computed: {
    price () {
      if (this.qty > 0 && this.qty < 12) {
        const price = this.qty * Math.ceil(this.pricing.monthly_price)
        const idrPrice = Math.ceil(price * this.kursIdr)
        return this.kurs === true ? `+ $ ${Math.round(price)}` : `+ Rp. ${idrPrice}`
      } else if (this.qty === 12) {
        const price = this.pricing.annual_price
        const idrPrice = Math.ceil(price * this.kursIdr)
        return this.kurs === true ? `+ $ ${Math.round(price)}` : `+ Rp. ${idrPrice}`
      } else {
        return 0
      }
    }
  },
  methods: {
    kursUsd () {
      this.$axios.get('https://v6.exchangerate-api.com/v6/f92a28ed89a6dea74c61355a/latest/USD')
        .then(response => {
          this.kursIdr = response.data.conversion_rates.IDR
        })
    },
    minusQTY (qty) {
      qty = parseInt(qty)
      const resultDowngrade = this.total_member + (qty - 1)

      if (resultDowngrade >= 5) {
        this.qty = qty - 1
        if (qty > 0) {
          const price = this.qty * Math.ceil(this.diffMonth)
          this.price = Math.round(price)

          this.qtyPosition = 'positive'
        } else {
          this.qtyPosition = 'negative'
        }
      }
    },
    plusQTY (qty) {
      qty = parseInt(qty)
      this.qty = qty + 1

      if (qty >= -1) {
        const price = this.qty * Math.ceil(this.diffMonth)
        this.price = Math.round(price)

        this.qtyPosition = 'positive'
      } else {
        this.qtyPosition = 'negative'
      }
    },
    getDataCorporate () {
      const userData = JSON.parse(localStorage.getItem('userd'))
      const user = JSON.parse(localStorage.getItem('user'))

      this.corporate_id = user.corporate_id

      if (user.corporate_id !== null) {
        const config = {
          headers: {
            Authorization: 'Bearer ' + userData.api_token
          }
        }
        this.$axios.get('/member/corporate/detail', config)
          .then(res => {
            const { data } = res.data
            this.total_member = data.total_member
            this.diffMonth = data.diff_month
            this.expired = data.expired
            this.pricing = data.pricing
          })

        // this.$axios.get('/pricing', config)
        //   .then(res => {
        //     const { data } = res.data
        //     this.pricing = data
        //   })
      }
    },
    renewal () {
      const userData = JSON.parse(localStorage.getItem('userd'))

      Loading.show({
        message: '<span class="font-proxima-nova-alt">Some important process is in progress. Hang on...</span>',
        html: true
      })

      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.api_token
        }
      }

      let priceTotal = 0
      if (this.qty > 0 && this.qty < 12) {
        const price = this.qty * Math.ceil(this.pricing.monthly_price)
        priceTotal = Math.round(price)
      } else if (this.qty === 12) {
        const price = this.pricing.annual_price
        priceTotal = Math.round(price)
      } else {
        priceTotal = 0
      }

      const data = {
        package: 0,
        qty: this.qty,
        price: priceTotal
      }

      this.$axios.post('/member/corporate/upgrade/renewal', data, config)
        .then(res => {
          const { data } = res.data

          setTimeout(() => {
            Loading.hide()
            this.$router.push({ path: `checkout/${data.bill_number}` })
          }, 2000)
        })
    }
  }
}
</script>

<style lang="sass">
  .q-field__control
    height: 51px !important
</style>
