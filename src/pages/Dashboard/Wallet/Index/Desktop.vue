<template>
  <div class="q-pa-lg">
    <q-card class="constrain-web border-radius-10px" style="margin-bottom:10px !important" flat bordered>
      <q-card-section class="text-center">
        <span class="text-h5 text-secondary text-uppercase">Your Balance</span>
      </q-card-section>
      <q-card-section class="text-center">
        <span class="text-h2 text-bold">$ 1500</span>
      </q-card-section>
      <q-card-section>
        <div class="row flex flex-center">
          <div class="col column">
            <q-btn class="col bg-white q-py-lg q-mx-lg border-radius-30px text-secondary" color="secondary" outline>
              <q-icon name="account_balance_wallet" size="lg" />
            </q-btn>
            <span class="q-mt-md text-center">Topup</span>
          </div>
          <div class="col column">
            <q-btn class="col bg-white q-py-lg q-mx-lg border-radius-30px text-secondary" color="secondary" outline>
              <q-icon name="mdi-scan-helper" size="lg" />
            </q-btn>
            <span class="q-mt-md text-center">Scan</span>
          </div>
          <div class="col column">
            <q-btn class="col bg-white q-py-lg q-mx-lg border-radius-30px text-secondary" color="secondary" outline>
              <q-icon name="mdi-qrcode" size="lg" />
            </q-btn>
            <span class="q-mt-md text-center">Code</span>
          </div>
          <div class="col column">
            <q-btn class="col bg-white q-py-lg q-mx-lg border-radius-30px text-secondary" color="secondary" outline>
              <q-icon name="system_update_alt" size="lg" />
            </q-btn>
            <span class="q-mt-md text-center">Request</span>
          </div>
          <div class="col column">
            <q-btn class="col bg-white q-py-lg q-mx-lg border-radius-30px text-secondary" color="secondary" outline>
              <q-icon name="send" size="lg" />
            </q-btn>
            <span class="q-mt-md text-center">Send</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="constrain-web border-radius-10px" flat bordered>
            <q-card-section>
                <div class="text-h6 text-bold text-secondary">Last Transaction</div>
            </q-card-section>
            <q-card-section>
                <div class="row q-pa-md" v-for="transaction in transactionList" :key="transaction.id">
                    <div class="col-6 column">
                        <span class="col text-bold" style="font-size:18px">{{ transaction.name }}</span>
                        <span class="col text-grey-7">{{ transaction.date }}</span>
                    </div>
                    <div class="col-6 text-h6 text-right">
                        <span :class="transaction.status === 'plus' ? 'text-positive' : 'text-negative'"> {{ transaction.status === 'minus' ? '-' : '' }} $ {{ transaction.total }} </span>
                    </div>
                </div>
            </q-card-section>
        </q-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transactionList: [
        {
          id: 1,
          name: 'Subscription',
          date: '03 March 2021',
          total: '9.9',
          status: 'minus'
        },
        {
          id: 2,
          name: 'Gift from ...',
          date: '01 March 2021',
          total: '14.2',
          status: 'plus'
        },
        {
          id: 3,
          name: 'Payment from ...',
          date: '01 March 2021',
          total: '34.2',
          status: 'plus'
        },
        {
          id: 4,
          name: 'Gift from ...',
          date: '01 March 2021',
          total: '1',
          status: 'plus'
        },
        {
          id: 5,
          name: 'Payment from ...',
          date: '01 March 2021',
          total: '2',
          status: 'plus'
        }
      ]
    }
  }
}
</script>
