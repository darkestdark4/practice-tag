<template>
  <div class="pdf-template">
    <div class="q-pa-md font-proxima-nova-alt">
      <div class="q-mb-md">
        <div class="top-side flex justify-between">
          <p class="text-weight-bold q-mb-none" style="font-size: 22px">TAG ID</p>
          <p class="text-weight-bold q-mb-none" style="font-size: 14px">Order #{{ receipt.orderNumber }}</p>
        </div>
        <div class="bottom-side flex justify-between">
          <p class="text-weight-bold" style="font-size: 14px">via Tagid.ai</p>
          <p style="font-size: 14px">{{ receipt.date }}</p>
        </div>
        <hr class="q-my-md">
      </div>
      <div class="body q-mt-lg">
        <div class="row justify-start q-mb-lg">
          <p class="text-weight-bold q-mb-none" style="font-size: 22px">Receipt</p>
          <q-badge color="positive" class="text-weight-bold q-ml-sm" style="height: 18px">
            PAID
          </q-badge>
        </div>
        <div class="row flex justify-between q-mb-lg">
          <div>
            <p class="text-weight-bold">Receipt to</p>
            <p class="q-mb-sm text-weight-bold">{{ receipt.name }}</p>
            <p class="q-mb-none">{{ receipt.address }},</p>
            <p class="q-mb-none">{{ receipt.city }}, {{ receipt.state }}</p>
            <p class="q-mb-none">{{ receipt.country }}</p>
            <p class="q-mb-none">Company Phone Number : {{ receipt.phone }}</p>
          </div>
          <div class="text-left">
            <p class="text-weight-bold">Receipt from</p>
            <p class="q-mb-sm text-weight-bold">tagid.ai The-Netwerk</p>
            <p class="q-mb-none">Pandanwangi Green Park, Blk 1,</p>
            <p class="q-mb-none">Malang City, East Java</p>
            <p class="q-mb-none">Indonesia</p>
            <p class="q-mb-none">Company Phone Number : 08510044 1777</p>
          </div>
        </div>
        <div class="column q-mb-lg">
          <p class="text-weight-bold">Your Order</p>
          <div class='row flex justify-between'>
            <div>
              <p class="q-mb-none">Customer : <span class="text-weight-bold">{{ receipt.email }}</span></p>
              <p class="q-mb-none">Order Number / Receipt :</p>
              <p class="q-mb-none text-weight-bold">#{{ receipt.orderNumber }}</p>
              <p class="q-mb-none">Billing date : <span class="text-weight-bold">{{ receipt.date }}</span></p>
            </div>
            <div class="text-right">
              <p class="q-mb-none">Payment Method : <span class="text-weight-bold">{{ receipt.payment.method }}</span></p>
              <p class="q-mb-none">Currency : <span class="text-weight-bold">{{ kurs }}</span></p>
            </div>
          </div>
        </div>
        <div class="q-mb-lg">
          <table width="100%">
            <thead style="border-bottom: 1px solid black">
              <tr>
                <th align="left" width="40%">Product</th>
                <th align="left">Billing period</th>
                <th align="left">Quantity</th>
                <th align="right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colspan="4" class="q-pa-none">
                  <hr class="q-pa-none q-ma-none">
                </th>
              </tr>
              <tr>
                <th align="left">{{ receipt.product.name }}</th>
                <td>{{ receipt.product.period }}</td>
                <td>{{ receipt.product.qty }}</td>
                <td align="right">{{ priceCurrency(receipt.product.price) }}</td>
              </tr>
              <tr>
                <th colspan="4" class="q-pa-none">
                  <hr class="q-pa-none q-ma-none">
                </th>
              </tr>
              <tr>
                <td colspan="2">VAT</td>
                <td colspan="2" align="right">{{ receipt.product.vat }}%</td>
              </tr>
              <tr>
                <td colspan="2" class="text-weight-bold q-pt-none">YOUR ORDER</td>
                <td colspan="2" class="text-weight-bold q-pt-none" style="font-size: 22px" align="right">{{ priceCurrency(receipt.product.total) }}</td>
              </tr>
              <tr>
                <th colspan="4" class="q-pa-none">
                  <hr class="q-pa-none q-ma-none">
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center text-weight-bold" style="font-size: 16px">
          <p>The {{ receipt.product.total }} payment will appear on your bank/card statement</p>
          <p>If you have a problem with your order (e.g. don’t recognise the charge, suspect a fraudulent transaction), please visit tagid.ai.</p>
          <img src="https://tagid.ai/dbc/dbc/home/image/png/Logo.png" alt="logo" class="text-center q-mt-md">
        </div>
      </div>
    </div>
    <div class="row justify-around q-mb-md except-media">
      <q-btn
        no-caps
        unelevated
        class="q-mt-lg col-4"
        color="primary"
        text-color="white"
        label="Download"
        @click="windowPrint()" />
      <q-btn
        no-caps
        unelevated
        class="q-mt-lg col-4"
        color="secondary"
        text-color="white"
        label="Convert Currency"
        @click="convertCurrency()" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Loading } from 'quasar'

export default {
  data () {
    return {
      receipt: {
        orderNumber: '22880429-20663632',
        date: '30 Nov 2021',
        name: 'Andreas S',
        email: 'andreas@gmail.com',
        payment: {
          method: 'MidTrans',
          currency: 'USD'
        },
        address: 'Puri Cirendeu Permai Street',
        city: 'Banten',
        state: 'Tangerang',
        country: 'Indonesia',
        phone: '087567492261',
        product: {
          name: 'Item : Package Upgrade Regular to Corporate, billed for 1 month',
          period: '30 Nov 2021 - 30 Des 2021',
          qty: 1,
          price: 'Rp 141.471',
          vat: 0,
          total: 'Rp. 141.471'
        }
      },
      kursIdr: 0,
      kurs: 'IDR'
    }
  },
  mounted () {
    this.getDetail()
    this.kursUsd()
  },
  methods: {
    kursUsd () {
      this.$axios.get('https://v6.exchangerate-api.com/v6/f92a28ed89a6dea74c61355a/latest/USD')
        .then(response => {
          this.kursIdr = response.data.conversion_rates.IDR
        })
    },
    priceCurrency (price) {
      return this.kurs === 'USD' ? '$ ' + price : 'Rp. ' + Math.ceil(price * this.kursIdr)
    },
    getDetail () {
      const id = this.$route.params.id

      Loading.show()

      this.$axios.get(`billing/${id}`)
        .then(res => {
          const { data } = res.data
          const receipt = this.receipt
          let member = null
          if (data.transaction.member === null) {
            member = data.transaction.corporate.member[0]
          } else {
            member = data.transaction.member
          }

          receipt.orderNumber = data.bill_number
          receipt.date = moment(data.bill_date).format('DD MMM YYYY')
          receipt.name = member.member_first_name + ' ' + member.member_last_name
          receipt.email = member.member_email
          receipt.address = data.address.address ? data.address.address : data.address.corporate_address
          receipt.city = data.address.city.name
          receipt.state = data.address.state.name
          receipt.country = data.address.country.name
          receipt.phone = `+${member.phone_code}${member.member_phone}`

          receipt.product.name = `Item : ${data.transaction.transaction_desc}`

          const periodFrom = moment(data.bill_date).format('DD MMM YYYY')
          const periodTo = moment(data.transaction.expired).format('DD MMM YYYY')
          receipt.product.period = `${periodFrom} - ${periodTo}`

          receipt.product.qty = 1

          receipt.product.price = `${data.price}`
          receipt.product.total = `${data.price}`

          setTimeout(() => {
            Loading.hide()
          }, 500)
        })
    },
    windowPrint () {
      window.print()
    },
    convertCurrency () {
      if (this.kurs === 'USD') {
        this.kurs = 'IDR'
      } else {
        this.kurs = 'USD'
      }
    }
  }
}
</script>

<style>
  th, td {
    padding: 10px 10px 10px 0;
    vertical-align: top;
  }

  @media print {
    .except-media {
      display: none;
    }
  }
</style>
