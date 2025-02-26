<template>
  <q-page>
    <div class="q-pa-md font-proxima-nova-alt" style="width: 100%">
      <div class="image-logo q-my-sm q-mb-md">
        <img src="https://tagid.ai/dbc/dbc/home/image/png/Logo.png" alt="logo" class="text-center">
      </div>
      <q-card class="q-py-sm q-px-md">
        <h6 class="text-center text-weight-bold q-my-sm">Billing Details</h6>
        <div class="billing-name q-mt-md">
          <p class="q-mb-none">Name</p>
          <p>{{ data.first_name+" "+data.last_name }}</p>
        </div>
        <div class="billing-email">
          <p class="q-mb-none">Your Email</p>
          <b>{{ data.email }}</b>
        </div>
        <div class="billing-phone q-mt-md">
          <p class="q-mb-none">Phone</p>
          <p><font class="text-grey">+{{ data.phoneCode }}</font> {{ data.phone }}</p>
        </div>
        <div class="billing-address q-mt-md">
          <p class="q-mb-none">Address</p>
          <p>{{ data.address }}</p>
        </div>
        <div class="billing-agreement q-mt-md" v-if="data.order.status == 'unpaid'">
          <q-checkbox
            v-model="agreement"
            val="teal"
            label="By clicking the button you agree the"
            color="teal"
            size="xs"
            style="margin-left: -8px"
          />
        </div>
        <p
          v-if="data.order.status == 'unpaid'"
          class="text-secondary q-my-none q-mb-md"
          style="margin-left: 22px; text-decoration: underline; cursor: pointer">
            Terms &amp; Condition
        </p>
      </q-card>

      <div>
        <p class="text-center text-weight-bold q-my-md" style="font-size: 16px">
          Order Details
        </p>
        <q-card class="q-py-sm q-px-md" style="border-radius: 10px">
          <div class="row q-py-sm">
            <div>
              <img src="https://tagid.ai/dbc/dbc/home/image/png/Logo2.png" alt="logo"
                width="45" style="margin-top: 5px">
            </div>
            <div class="q-ml-md">
              <p style="font-size: 16px" class="text-weight-bold q-mb-none">{{ data.order.description }}</p>
              <p style="font-size: 16px" class="text-weight-bold text-secondary q-mb-none"> $ {{ data.order.price }}</p>
            </div>
          </div>
        </q-card>
      </div>

      <div class="q-mt-lg">
        <p class="text-center" style="font-size: 12px">
          You should pay this billing until
          <span class="text-weight-bold text-secondary">
            {{ data.order.payment_exp }}
          </span>
        </p>
        <div class="subtotal-price flex justify-between">
          <p class="text-secondary">Subtotal</p>
          <p class="text-secondary">$ {{ data.order.subtotal }}</p>
        </div>
        <div class="discount-price flex justify-between">
          <p class="text-red">Discount</p>
          <p class="text-red">$ {{ data.order.discount }}</p>
        </div>
        <div class="total-price flex justify-between">
          <p class="text-weight-bold">Total Price</p>
          <p class="text-weight-bold">$ {{ data.order.total }}</p>
        </div>
      </div>

      <div class="q-mt-lg">
        <q-btn
          v-if="data.order.status === 'unpaid'"
          unelevated
          rounded
          no-caps
          @click="process()"
          color="primary"
          label="Checkout with Midtrans"
          class="full-width q-py-sm text-weight-bold"/>
        <q-btn
          v-else
          unelevated
          rounded
          no-caps
          @click="download()"
          color="primary"
          label="Download Invoice"
          class="full-width q-py-sm text-weight-bold"/>

        <q-btn
          v-if="data.order.status == 'unpaid'"
          unelevated
          rounded
          no-caps
          @click="cancel()"
          color="negative"
          label="Cancel Transaction"
          class="full-width q-py-sm q-mt-md text-weight-bold"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import { jsPDF } from 'jspdf'
import { Loading } from 'quasar'

export default {
  data () {
    return {
      data: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        phoneCode: null,
        address: null,
        order: {
          type: null,
          total_user: 0,
          description: null,
          price: 0,
          subtotal: 0,
          discount: 0,
          total: 0,
          status: null,
          payment_exp: null,
          month_subscribe: 0
        }
      },
      agreement: false
    }
  },
  mounted () {
    this.getBilling()
    this.$store.dispatch('style/submitTitlePage', 'Checkout')
  },
  methods: {
    getBilling () {
      const id = this.$route.params.id

      this.$axios.get(`billing/${id}`)
        .then(res => {
          const { data } = res.data

          const trx = data.transaction
          const member = data.transaction.member
          const dataOutput = this.data

          dataOutput.first_name = member.member_first_name
          dataOutput.last_name = member.member_last_name
          dataOutput.email = member.member_email
          dataOutput.phone = member.member_phone
          dataOutput.phoneCode = member.phone_code
          dataOutput.address = member.member_address

          dataOutput.order.type = trx.transaction_type
          dataOutput.order.total_user = trx.total_user
          dataOutput.order.description = trx.transaction_desc
          dataOutput.order.price = data.price
          dataOutput.order.subtotal = data.price
          dataOutput.order.total = dataOutput.order.subtotal - dataOutput.order.discount
          dataOutput.order.status = data.payment_status
          dataOutput.order.month_subscribe = data.month_subscribe
          dataOutput.order.payment_exp = moment(trx.payment_expired).format('DD MMMM YYYY H:mm')
        })
    },
    download () {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF()

      doc.text('Hello world!', 10, 10)
      doc.save('a4.pdf')
    },
    process () {
      let idItem = ''
      // let qtyItem = 0
      const dataOutput = this.data
      const userData = JSON.parse(localStorage.getItem('userd'))

      Loading.show({
        message: '<span class="font-proxima-nova-alt">Some important process is in progress. Hang on...</span>',
        html: true
      })

      if (this.data.order.type === 'upgrade_limit') {
        idItem = `LIMIT${this.data.order.total_user}`
        // qtyItem = this.data.order.total_user
      } else if (this.data.order.type === 'upgrade_package') {
        idItem = 'PACKAGEENTERPRISE'
        // qtyItem = 1
      } else if (this.data.order.type === 'renewal') {
        idItem = 'RENEWAL'
        // qtyItem = this.data.order.month_subscribe
      }

      const data = {
        transaction_details: {
          order_id: this.$route.params.id,
          gross_amount: dataOutput.order.total
        },
        item_details: [
          {
            id: idItem,
            price: dataOutput.order.subtotal / dataOutput.order.total_user,
            quantity: dataOutput.order.total_user,
            name: dataOutput.order.description,
            brand: 'TAG',
            category: 'Card',
            merchant_name: 'Midtrans'
          }
        ],
        customer_detail: {
          first_name: dataOutput.first_name,
          last_name: dataOutput.last_name,
          email: dataOutput.email,
          phone: `+${dataOutput.phoneCode}${dataOutput.phone}`,
          shipping_address: {
            first_name: dataOutput.first_name,
            last_name: dataOutput.last_name,
            email: dataOutput.email,
            phone: `+${dataOutput.phoneCode}${dataOutput.phone}`,
            address: dataOutput.address
          }
        },
        credit_card: {
          secure: true
        }
      }

      const config = {
        headers: {
          Authorization: 'Bearer ' + userData.api_token
        }
      }

      this.$axios.post('/member/corporate/upgrade/payment', data, config)
        .then(res => {
          const { data } = res.data

          location.href = data.payment_link
        })
    },
    cancel () {
      const id = this.$route.params.id
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

      this.$axios.get(`/member/corporate/upgrade/cancel/${id}`, config)
        .then(res => {
          this.$router.push({ path: '../invoice-history' })
          Loading.hide()
        })
    }
  }
}
</script>

<style scoped>
  .image-logo {
    width: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .image-logo img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 40px;
  }
</style>
