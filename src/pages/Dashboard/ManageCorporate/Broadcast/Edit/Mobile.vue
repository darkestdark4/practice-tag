<template>
  <div class="q-pa-sm font-monserrat">
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Type</span>
      <q-select outlined v-model="broadcast.type" :options="typeOption" emit-value/>
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Broadcast Title</span>
      <q-input outlined v-model="broadcast.title" placeholder="Broadcast" />
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Description</span>
      <q-input outlined v-model="broadcast.description" type="textarea" placeholder="Description" />
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Image :</span>
      <!-- <q-input filled outlined v-model="broadcast.image" type="file" placeholder="Description" /> -->
      <q-file filled bottom-slots v-model="broadcast.image" :label="broadcast.image" counter>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop="broadcast.image = null" class="cursor-pointer" />
        </template>
      </q-file>
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Broadcast To :</span>
      <q-select class="full-width" v-model="broadcast.to" :options="broadcastOption" outlined map-options emit-value />
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
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Show Option</span>
      <q-select outlined v-model="broadcast.show_option" :options="optionn" emit-value/>
    </div>
    <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Publish" size="lg" @click="sendBroadcast()" rounded />
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
      broadcast: {
        type: 'Popup Ads',
        to: '',
        title: '',
        description: '',
        show_option: 'Show Always',
        image: null
      },
      optionsFn (date) {
        return date >= moment(new Date().toISOString().substring(0, 10)).format('YYYY/MM/DD')
      },
      optionsFn2 (date) {
        return date >= moment(new Date().toISOString().substring(0, 10)).format('YYYY/MM/DD')
      },
      optionFnn (hr, min, sec) {
        return hr >= moment().format('HH')
      },
      typeOption: [
        { label: 'Popup Ads', value: 'Popup Ads' },
        { label: 'Broadcast', value: 'Broadcast' }
      ],
      optionn: [
        { label: 'Show Always', value: 'Show Always' },
        { label: 'Show & Close', value: 'Show & Close' }
      ],
      broadcastOption: [
        { label: 'All', value: '' }
      ]
    }
  },
  mounted () {
    this.getDivisi()
  },
  methods: {
    getData () {
      axios.get('/broadcast/' + this.$route.params.id)
        .then(res => {
          this.broadcast.title = res.data.data.title
          this.broadcast.description = res.data.data.description
          this.broadcast.image = res.data.data.image
          this.broadcast.show_option = res.data.data.show_option
          this.broadcast.type = res.data.data.type
          this.broadcast.to = parseInt(res.data.divisi_id[2]) ? parseInt(res.data.divisi_id[2]) : ''
          this.dateStart = res.data.data.start.substring(0, 10)
          this.timeStart = res.data.data.start.substring(11, 16)
          this.dateEnd = res.data.data.end.substring(0, 10)
          this.timeEnd = res.data.data.end.substring(11, 16)
        })
        .catch(err => {
          console.log(err)
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
        this.broadcastOption.push(...data)
        this.getData()
      })
    },
    sendBroadcast () {
      const data = {
        _method: 'PUT',
        id: this.$route.params.id,
        type: this.broadcast.type,
        // to: 'corporate-'+this.$store.state.userdata.user.corporate_id+'-'+this.broadcast.to,
        to: 'corporate-' + this.$store.state.userdata.user.corporate_id + '-' + this.broadcast.to,
        title: this.broadcast.title,
        description: this.broadcast.description,
        show_option: this.broadcast.show_option,
        image: this.broadcast.image,
        start: this.dateStart + ' ' + this.timeStart,
        end: this.dateEnd + ' ' + this.timeEnd
      }
      axios.post('/broadcast', data)
        .then(res => {
          if (res.data.status === 'success') {
            this.$q.notify({
              message: res.data.message,
              position: 'top',
              type: 'positive'
            })
            setTimeout(() => this.$router.push({ path: '/dashboard/manage-corporate/broadcast' }), 1000)
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Broadcast failed'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
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
