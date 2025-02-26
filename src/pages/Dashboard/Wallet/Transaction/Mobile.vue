<template>
    <div class="q-pa-sm">
        <q-card class="constrain-mobile border-radius-10px" flat bordered>
        <q-card-section>
            <div class="text-h6 text-bold text-secondary text-center">All Transactions</div>
        </q-card-section>
        <q-card-section>
            <div class="row q-mb-sm flex flex-center">
                <div class="q-px-xs col-4">
                    <q-btn class="text-capitalize full-width" color="secondary" label="Income" outline rounded />
                </div>
                <div class="q-px-xs col-4">
                    <q-btn class="text-capitalize full-width" color="negative" label="Outcome" outline rounded />
                </div>
                <div class="q-px-xs col-4">
                    <q-btn class="text-capitalize full-width" color="primary" label="All" outline rounded />
                </div>
            </div>
        </q-card-section>
        <q-card-section>
          <q-select v-model="monthFilter" :options="monthFilterOptions" rounded outlined emit-value map-options />
        </q-card-section>
        <q-card-section>
            <div class="row q-pa-md" v-for="transaction in transactionList" :key="transaction.id">
            <div class="col-6 column">
                <span class="col text-bold" style="font-size:14px">{{ transaction.name }}</span>
                <span class="col text-grey-7">{{ transaction.date }}</span>
            </div>
            <div class="col-6 text-h6 text-right">
                <span :class="transaction.status === 'plus' ? 'text-positive' : 'text-negative'">
                {{ transaction.status === 'minus' ? '-' : '' }} $ {{ transaction.total }} </span>
            </div>
            </div>
        </q-card-section>
        </q-card>
    </div>
</template>
<script>
import moment from 'moment'
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
        },
        {
          id: 6,
          name: 'Payment from ...',
          date: '01 March 2021',
          total: '2',
          status: 'plus'
        },
        {
          id: 7,
          name: 'Payment from ...',
          date: '01 March 2021',
          total: '2',
          status: 'plus'
        }
      ],
      monthFilter: parseInt(moment().format('M')),
      monthFilterOptions: []
    }
  },
  mounted () {
    const startDate = moment().startOf('year').format('MM-DD-YYYY')
    const endDate = moment().format('MM-DD-YYYY')
    this.getMonthFilterOptions(startDate, endDate)
  },
  methods: {
    getMonthFilterOptions (startDateParam, endDateParam) {
      const resultList = []
      const date = new Date(startDateParam)
      const endDate = new Date(endDateParam)
      const monthNameList = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]

      // eslint-disable-next-line no-unmodified-loop-condition
      while (date <= endDate) {
        const stringDate = monthNameList[date.getMonth()] + ' ' + date.getFullYear()

        resultList.push({
          label: stringDate,
          value: date.getMonth() + 1
        })
        date.setMonth(date.getMonth() + 1)
      }
      this.monthFilterOptions = resultList
    }
  }
}
</script>
