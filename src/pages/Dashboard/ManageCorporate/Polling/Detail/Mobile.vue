<template>
  <div class="q-pa-sm font-monserrat q-mt-md">
    <div class="q-my-md column">
      <span class="col q-mb-sm">{{ polling.question }}</span>
    </div>
    <div class="q-my-md row" v-for="(opt, index) in polling.options" :key="index">
      <div class="col-9">
        {{ opt.name }}
        <q-linear-progress size="12px" :value="opt.sum" color="secondary" label="Change Model" rounded />
      </div>
      <div class="col-2 offset-1 q-mt-md">
        <span class="">
          {{ opt.percentage }}%
        </span>
      </div>
    </div>
    <div class="q-my-xl column">
      <span class="col q-mb-sm text-bold">
        Total Participant : {{ polling.participant }}
      </span>
    </div>
    <div class="column">
      <span class="col q-mb-sm text-bold">
        Duration
      </span>
      <span class="col text-grey-7 row">
        <span class="col-6">
          Start Date : {{ polling.date_start }}
        </span>
        <span class="col-5 offset-1">
          Start Time : {{ timeStart }}
        </span>
        <span class="col-6">
          End Date : {{ polling.date_end }}
        </span>
        <span class="col-5 offset-1">
          End Time : {{ timeEnd }}
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import axios from 'axios'

export default {
  data () {
    return {
      Profile,
      timeStart: '',
      timeEnd: '',
      polling: {
        to: '',
        question: '',
        show_option: 'Show Always'
      }
    }
  },
  mounted () {
    this.getData()
    this.getDivisi()
  },
  methods: {
    getData () {
      axios.get(`/member/corporate/polling/${this.$route.params.id}`).then((response) => {
        if (response.data.status === 'success') {
          this.polling = response.data.data
          this.options = this.polling.options
          this.dateStart = response.data.data.start.substring(0, 10)
          this.timeStart = response.data.data.start.substring(11, 16)
          this.dateEnd = response.data.data.end.substring(0, 10)
          this.timeEnd = response.data.data.end.substring(11, 16)
        } else {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'negative'
          })
        }
      })
    },
    getDivisi () {
      axios.get('/member/corporate/divisi').then(response => {
        const data = response.data.data.map(data => {
          return {
            label: data.divisi_name,
            value: data.id
          }
        })
        this.pollingOption.push(...data)
      })
    }
  }
}
</script>
