<template>
  <q-page>
    <div v-if="corporate_id !== null">
      <div class="q-pa-md font-proxima-nova-alt">
        <p style="font-size: 12px">Your current limit</p>
        <q-card class="my-card">
          <q-card-section>
            <div class="row justify-between">
              <div class="col-7">
                <p class="q-ma-none text-weight-bolder" style="font-size: 19px">Limit {{ total_member }} Member</p>
                <p class="q-mb-none" style="font-size: 9px">
                  Limit is {{ total_member }} members in your Group / Organization
                </p>
              </div>
              <div class="col-4">
                <q-btn
                  unelevated
                  disable
                  no-caps
                  class="full-width"
                  color="grey-5"
                  text-color="white"
                  label="Aktif"/>
                <!-- <p
                  class="q-mt-sm q-mb-none text-right text-secondary"
                  style="font-size: 10px">
                  ${{ total_member }}/mo | $20/yr
                </p> -->
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-md font-proxima-nova-alt">
        <p style="font-size: 12px">Upgrade or Downgrade</p>
        <q-card class="my-card">
          <q-card-section>
            <div class="row justify-between">
              <div class="col-7">
                <div class="row" style="width: 80%">
                  <q-btn
                    flat
                    label="-"
                    :style="{ background: (qtyPosition == 'positive') ? '#116C54' : '#c10015'}"
                    style="
                      color: white;
                      font-weight: 600; font-size: 20px;
                      border-radius: 10px 0 0 10px"
                    :repeat-timeout="1000"
                    @click="minusQTY(qty)"
                  />
                  <q-input
                    square outlined
                    type="text"
                    class="col"
                    input-class="text-center text-weight-bold"
                    style="height: 20px; font-size: 18px"
                    v-model="showQTY"
                  />
                  <q-btn
                    flat
                    label="+"
                    :style="{ background: (qtyPosition == 'positive') ? '#116C54' : '#c10015'}"
                    style="
                      color: white;
                      font-weight: 600; font-size: 20px;
                      border-radius: 0 10px 10px 0"
                    :repeat-timeout="1000"
                    @click="plusQTY(qty)"
                  />
                </div>
                <p v-if="notifikasiBatasMax" style="font-size: 10px" class="q-mt-sm q-mb-none text-red">
                  Batas maksimum downgrade
                </p>
                <p style="font-size: 10px" class="q-mt-sm q-mb-none">
                  Your current active limit is {{ total_member }} members, you can increase the user limit above
                </p>
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
                  label="Upgrade"
                  v-if="qty >= 0"
                  :disable="qty == 0"
                  @click="upgradeConfirm = true"/>
                <q-btn
                  no-caps
                  unelevated
                  v-else
                  class="full-width self-end q-mt-lg"
                  color="primary"
                  text-color="white"
                  label="Downgrade"
                  @click="downgradeConfirm = true"/>
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

    <q-dialog v-model="upgradeConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span>Are you sure to upgrade limit member?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" text-color="black" v-close-popup />
          <q-btn flat label="Upgrade" color="primary" @click="upgrade()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="downgradeConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span>Are you sure to downgrade limit member?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" text-color="black" v-close-popup />
          <q-btn flat label="Upgrade" color="primary" @click="downgrade()"/>
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
      upgradeConfirm: false,
      downgradeConfirm: false,
      diffMonth: 0,
      totalPrice: 0,
      kursIdr: 0,
      kurs: false,
      harga: {
        pricePerQty: 0,
        hargaPerQty: 0
      }
    }
  },
  mounted () {
    this.getDataCorporate()
    // this.kursUsd()
    this.getPrice()
    this.$store.dispatch('style/submitTitlePage', 'Upgrade atau Downgrade')
  },
  computed: {
    price () {
      if (this.qty > 0 && this.qtyPosition === 'positive') {
        const price = this.qty * this.harga.pricePerQty
        const idrPrice = this.qty * this.harga.hargaPerQty
        // const idrPrice = Math.ceil(price * this.kursIdr)
        return this.kurs === true ? `+ $ ${price}` : `+ Rp. ${idrPrice}`
      } else {
        return 0
      }
    },
    showQTY () {
      if (this.qtyPosition === 'negative') {
        let tempQty = this.qty
        tempQty = tempQty.toString()
        tempQty = tempQty.replace('-', '')
        return parseInt(tempQty)
      }

      return this.qty
    },
    notifikasiBatasMax () {
      const resultDowngrade = this.total_member + (this.qty - 1)

      if (resultDowngrade >= 5) {
        return false
      }

      return true
    }
  },
  methods: {
    kursUsd () {
      this.$axios.get('https://v6.exchangerate-api.com/v6/f92a28ed89a6dea74c61355a/latest/USD')
        .then(response => {
          this.kursIdr = response.data.conversion_rates.IDR
        })
    },
    getPrice () {
      const userData = JSON.parse(localStorage.getItem('userd'))
      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.api_token
        }
      }
      this.$axios.post('/member/corporate/upgrade/count_price', config)
        .then(res => {
          const { data } = res.data
          this.harga = data.data
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
          })
      }
    },
    upgrade () {
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

      const data = {
        package: 0,
        qty: this.qty
      }

      this.$axios.post('/member/corporate/upgrade/add_limit_user', data, config)
        .then(res => {
          const { data } = res.data

          setTimeout(() => {
            this.$router.push({ path: `checkout/${data.message.bill_number}` })
            Loading.hide()
          }, 2000)
        })
    },
    downgrade () {
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

      const data = {
        package: 0,
        qty: this.qty
      }

      this.$axios.post('/member/corporate/upgrade/downgrade_limit', data, config)
        .then(res => {
          setTimeout(() => {
            // this.$router.push({ path: 'upgrade-downgrade' })
            location.reload()
            Loading.hide()
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
