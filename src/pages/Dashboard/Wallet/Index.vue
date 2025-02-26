<template>
    <q-page class="q-pa-lg flex-center">
        <q-card :class="`${windowWidth < 450 ? 'constrain-mobile' : 'constrain-web q-pa-xl'} border-radius-10px`" style="margin-bottom:10px !important" flat bordered>
            <q-card-section class="text-center">
                <span class="text-h6 text-secondary text-uppercase">Your Balance</span>
            </q-card-section>
            <q-card-section class="text-center">
                <span class="text-h3 text-bold">$ 1500</span>
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="q-pa-sm col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <q-card class="border-radius-10px column q-pa-lg flex flex-center text-secondary cursor-pointer" flat bordered>
                            <q-icon name="post_add" size="xl" />
                            <span class="text-center">Topup</span>
                        </q-card>
                    </div>
                    <div class="q-pa-sm col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <q-card class="border-radius-10px column q-pa-lg flex flex-center text-secondary cursor-pointer" flat bordered>
                            <q-icon name="qr_code" size="xl" />
                            <span class="text-center">Code</span>
                        </q-card>
                    </div>
                    <div class="q-pa-sm col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <q-card class="border-radius-10px column q-pa-lg flex flex-center text-secondary cursor-pointer" flat bordered>
                            <q-icon name="system_update_alt" size="xl" />
                            <span class="text-center">Request</span>
                        </q-card>
                    </div>
                    <div class="q-pa-sm col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6">
                        <q-card class="border-radius-10px column q-pa-lg flex flex-center text-secondary cursor-pointer" flat bordered>
                            <q-icon name="send" size="xl" />
                            <span class="text-center">Send</span>
                        </q-card>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-card :class="`${windowWidth < 450 ? 'constrain-mobile' : 'constrain-web q-pa-xl'} border-radius-10px`" flat bordered>
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
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      windowWidth: window.innerWidth,
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
  },
  mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>
