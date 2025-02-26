<template>
    <div class="q-pa-sm font-monserrat">
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Question</span>
            <q-input outlined v-model="polling.question" type="textarea" placeholder="Question Here..." />
        </div>
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Show To :</span>
            <q-select class="col-3" outlined v-model="polling.option" :options="showOptions" map-options emit-value />
            <!-- <q-select outlined v-model="polling.to" :options="pollingOption"  emit-value/> -->
        </div>
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Option</span>
            <div class="q-mb-sm row" v-for="(opt, index) in options" :key="index">
                <q-input outlined v-model="opt.name" placeholder="Option" class="col-lg-9 col-md-9" :disable="polling.option === 'swipe'" />
                <q-btn class="text-red text-capitalize col-lg-4 col-md-2 offset-1" label="Delete" size="sm" @click="deleteOption(index)" outline :disabled="polling.option === 'swipe'" />
            </div>
            <q-btn class="text-secondary text-capitalize q-mt-xl" label="Add More Option" size="md" @click="addOption()" outline rounded :disabled="polling.option === 'swipe'" />
        </div>
        <div class="q-my-md column" v-show="polling.option === 'default'">
            <span class="col q-mb-sm text-grey-7">Polling To :</span>
            <q-select class="col-3" outlined v-model="polling.to" :options="pollingOption" map-options emit-value />
            <!-- <q-select outlined v-model="polling.to" :options="pollingOption"  emit-value/> -->
        </div>
        <div class="q-my-md column">
            <div class="col row">
                <div class="col-5 q-mr-auto" style="max-width: 350px">
                    <span class="col q-mb-sm text-grey-7">Start Date :</span>
                    <q-input filled v-model="dateStart">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="dateStart" mask="YYYY-MM-DD" :options="optionsFn">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-5" style="max-width: 350px">
                    <span class="col q-mb-sm text-grey-7">End Date :</span>
                    <q-input filled v-model="dateEnd">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="dateEnd" mask="YYYY-MM-DD" :options="optionsFn2">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
        <div class="q-my-md column">
            <div class="col row">
                <div class="col-5 q-mr-auto" style="max-width: 350px">
                    <span class="col q-mb-sm text-grey-7">Start Time :</span>
                    <q-input filled v-model="timeStart">
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="timeStart" mask="HH:mm:ss" format24h :options="optionFnn">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-time>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-5" style="max-width: 350px">
                    <span class="col q-mb-sm text-grey-7">Start End :</span>
                    <q-input filled v-model="timeEnd">
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="timeEnd" mask="HH:mm:ss" format24h :options="optionFnn">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-time>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
        <!-- <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Show Option</span>
            <q-select outlined v-model="polling.show_option" :options="optionn" emit-value/>
        </div> -->
        <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Publish" size="lg" @click="sendpolling()" rounded />
    </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import moment from 'moment'
import axios from 'axios'

export default {
  data () {
    return {
      Profile,
      dateStart: null,
      dateEnd: null,
      timeStart: null,
      timeEnd: null,
      start: this.dateStart + ' ' + this.timeStart,
      end: this.dateEnd + ' ' + this.timeEnd,
      polling: {
        to: '',
        question: '',
        show_option: 'Show Always',
        option: 'default'
      },
      options: [
        {
          name: ''
        },
        {
          name: ''
        }
      ],
      showOptions: [
        { label: 'Member', value: 'default' },
        { label: 'All (Those Open Your Link)', value: 'swipe' }
      ],
      optionsFn (date) {
        return date >= moment(new Date().toISOString().substring(0, 10)).format('YYYY/MM/DD')
      },
      optionsFn2 (date) {
        return date >= moment(new Date().toISOString().substring(0, 10)).format('YYYY/MM/DD')
      },
      optionFnn (hr, min, sec) {
        return hr >= moment().format('HH')
      },
      optionn: [
        { label: 'Show Always', value: 'Show Always' },
        { label: 'Show & Close', value: 'Show & Close' }
      ],
      pollingOption: [
        { label: 'All', value: '' }
      ]
    }
  },
  watch: {
    'polling.option' (newValue, oldValue) {
      if (newValue === 'swipe') {
        this.options = [
          {
            name: 'Agree'
          },
          {
            name: 'Disagree'
          }
        ]
      } else {
        this.options = [
          {
            name: ''
          },
          {
            name: ''
          }
        ]
      }
    }
  },
  mounted () {
    this.getDivisi()
  },
  methods: {
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
    },
    sendpolling () {
      const data = {
        to: ''
      }
      if (this.polling.to !== '') {
        data.to = 'corporate-' + this.$store.state.userdata.user.corporate_id + '-' + this.polling.to
      }
      const formData = {
        question: this.polling.question,
        // show_option: this.polling.show_option,
        start: this.dateStart + ' ' + this.timeStart,
        end: this.dateEnd + ' ' + this.timeEnd,
        to: data.to,
        option: this.polling.option,
        polling: {
          options: []
        }
      }
      this.options.forEach(item => {
        const a = {
          name: item.name
        }
        formData.polling.options.push(a)
      })
      axios.post('/member/corporate/polling', formData)
        .then(res => {
          if (res.data.status === 'success') {
            this.$q.notify({
              message: res.data.message,
              position: 'top',
              type: 'positive'
            })
            setTimeout(() => this.$router.push({ path: '/dashboard/manage-corporate/polling' }), 1000)
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: res.data.data
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addOption () {
      const data = {
        name: ''
      }
      this.options.push(data)
    },
    deleteOption (id) {
      this.options.splice(id, 1)
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
