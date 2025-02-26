<template>
  <q-page class="q-pa-lg flex-center">
    <q-card :class="`${windowWidth < 450 ? 'constrain-mobile' : 'constrain-web q-pa-xl'} border-radius-10px`" flat>
      <div class="q-pa-xl">
        <div class="text-h6 text-secondary text-center">Meeting Schedule</div>
        <div class="q-my-lg row flex-center">
          <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-btn :class="`${meeting_status === null ? 'bg-primary text-white' : ''} full-width`" outline rounded
              color="primary" label="Review"
              @click="meeting_status === null ? meeting_status = 'all' : meeting_status = null; getDataMeeting()" />
          </div>
          <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-btn :class="`${meeting_status === 'reject' ? 'bg-negative text-white' : ''} full-width`" outline rounded
              color="negative" label="Rejected"
              @click="meeting_status === 'reject' ? meeting_status = 'all' : meeting_status = 'reject'; getDataMeeting() " />
          </div>
          <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-btn :class="`${meeting_status === 'approved' ? 'bg-secondary text-white' : ''} full-width`" outline
              rounded color="secondary" label="Approved"
              @click="meeting_status === 'approved' ? meeting_status = 'all' : meeting_status = 'approved'; getDataMeeting()" />
          </div>
        </div>
        <div class="q-my-lg">
          <q-tabs v-model="tab_date" indicator-color="red" active-color="red" outside-arrows mobile-arrows>
            <q-tab v-for="tabs in date_list" class="column" :active="tab_date === tabs.date" :name="tabs.date"
              :key="tabs.date" @click="getDataMeeting(tabs.date)">
              <span class="col text-uppercase">{{tabs.day}}</span>
              <span class="col q-mb-md text-h4 text-bold">{{tabs.date}}</span>
              <div class="col">
                <q-icon name="circle" color="primary" />
                <q-icon name="circle" color="negative" />
                <q-icon name="circle" color="secondary" />
              </div>
            </q-tab>
          </q-tabs>
        </div>
        <div class="q-my-lg">
          <q-tab-panels v-model="tab_date" animated>
            <q-tab-panel v-for="tabs in date_list" :key="tabs.date" :name="tabs.date">
              <div v-if="meeting_list.length > 0">
                <q-card class="q-mb-md row" horizontal v-for="meeting in meeting_list" :key="meeting.id" flat bordered>
                  <div class="q-pa-md col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 bg-secondary text-white"
                    horizontal>
                    <div class="column">
                      <div class="col text-h6 text-center text-capitalize">{{ getDay(meeting.date) }}</div>
                      <div class="col q-my-md text-h4 text-center">{{ getDate(meeting.date) }}</div>
                      <div class="col text-center">{{ getMonth(meeting.date) }}</div>
                    </div>
                  </div>
                  <div class="q-pa-md col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                    <div class="column">
                      <div class="col text-h5 text-bold">{{ meeting.topik }}</div>
                      <div class="col text-grey-6">{{ meeting.deskripsi }}</div>
                    </div>
                  </div>
                  <q-card-actions class="q-pa-md col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12" align="right">
                    <q-btn v-if="!meeting.status" class="q-pa-sm bg-primary text-white border-radius-10px"
                      @click="review_meeting = true" flat>
                      Review
                    </q-btn>
                    <q-btn v-else-if="meeting.status === 'APPROVED'"
                      class="q-pa-sm bg-secondary text-white border-radius-10px" flat>
                      Approved
                    </q-btn>
                    <q-btn v-else-if="meeting.status === 'REJECT'"
                      class="q-pa-sm bg-negative text-white border-radius-10px" flat>
                      Rejected
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
              <div v-else class="text-center text-h6 text-primary">
                No Meeting
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card>
    <!-- Meeting Review -->
    <q-dialog v-model="review_meeting">
      <q-card style="width: 700px; border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Meeting Review</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <div class="row">
            <div class="q-pa-sm col-6">
              <span class="text-h4 text-bold text-grey-6">10:00</span>
              <span class="q-ml-sm text-bold text-grey-6">AM</span>
            </div>
            <div class="q-pa-sm col-6 text-right">
              <div class="column">
                <span class="col q-ml-sm text-bold text-secondary">Request By</span>
                <span class="col q-ml-sm text-bold">Liza M</span>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column">
            <div class="col q-mb-md text-h5 text-bold">Meeting Request</div>
            <div class="col text-grey-6">Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk
              mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.</div>
          </div>
        </q-card-section>
        <q-card-actions class="row" align="right">
          <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-btn class="full-width" size="lg" rounded color="primary" label="Re-schedule" />
          </div>
          <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-btn class="full-width" size="lg" rounded outline color="negative" label="Reject" />
          </div>
          <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-btn class="full-width" size="lg" rounded color="secondary" label="Approve" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      windowWidth: window.innerWidth,
      year: moment().year(),
      month: moment().month() + 1,
      datenumber: moment().date(),
      tab_date: moment().date(),
      date_list: [],
      review_meeting: false,
      meeting_status: 'all',
      meeting_list: []
    }
  },
  mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
    const year = moment().year()
    const month = moment().month() + 1
    const date = moment().date()
    this.getDaysArray(year, month)
    this.getDataMeeting()
    this.tab_date = date
  },
  methods: {
    getDay (date) {
      return moment(date).format('ddd')
    },
    getDate (date) {
      return moment(date).format('DD')
    },
    getMonth (date) {
      return moment(date).format('MMM')
    },
    getDaysArray (year, month) {
      const monthIndex = month - 1
      const names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      const date = new Date(year, monthIndex, 1)
      const result = []
      while (date.getMonth() === monthIndex) {
        result.push({
          date: date.getDate(),
          day: names[date.getDay()]
        })
        date.setDate(date.getDate() + 1)
      }
      this.date_list = result
    },
    getDataMeeting (datenumber = null) {
      let tanggal = this.tab_date
      if (datenumber) {
        tanggal = datenumber
      }
      const params = {
        username: window.localStorage.getItem('username'),
        year: this.year,
        month: this.month,
        datenumber: tanggal,
        status: this.meeting_status
      }

      this.$q.loading.show({
        message: 'Getting data'
      })
      this.$axios.get('/meeting', { params }).then(response => {
        this.$q.loading.hide()
        if (response.data.status) {
          this.meeting_list = response.data.data
        }
      })
    },
    rejectMeeting () {
    },
    approveMeeting () {
    }
  }
}
</script>
