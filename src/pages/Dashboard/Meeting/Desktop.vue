<template>
  <q-card class="constrain-web border-radius-10px font-monserrat" flat>
    <q-card-section>
      <div class="row">
        <div class="col-5">
          <q-select class="" options-selected-class="text-bold" v-model="month" :options="listMonths" @input="getDaysArray(); getDataMeeting(); getMeetingRangeDate()" map-options emit-value outlined rounded />
        </div>
        <div class="col-2 text-center q-mt-sm">
          <q-btn class="bg-secondary text-white border-radius-10px" icon="calendar_today"
            @click="getAllMeeting(); meeting_status = null" round push/>
          <!-- <q-icon name="calender_today" size="md" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" /> -->
        </div>
        <div class="col-5">
          <q-select class="" options-selected-class="text-bold" v-model="year" :options="listYears" @input="getDaysArray(); getDataMeeting(); getMeetingRangeDate()" outlined rounded />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-my-lg row flex-center">
        <div class="q-px-xs col-3">
          <q-btn :class="`${meeting_status === 'REVIEW' ? 'bg-primary text-white' : ''} q-px-sm full-width text-capitalize`"
            outline rounded color="primary" label="Review"
            @click="meeting_status === 'REVIEW' ? meeting_status = null : meeting_status = 'REVIEW'; getDataMeeting()" />
        </div>
        <div class="q-px-xs col-3">
          <q-btn
            :class="`${meeting_status === 'REJECT' ? 'bg-negative text-white' : ''} q-px-sm full-width text-capitalize`"
            outline rounded color="negative" label="Rejected"
            @click="meeting_status === 'REJECT' ? meeting_status = null : meeting_status = 'REJECT'; getDataMeeting() " />
        </div>
        <div class="q-px-xs col-3">
          <q-btn
            :class="`${meeting_status === 'ACCEPT' ? 'bg-secondary text-white' : ''} q-px-sm full-width text-capitalize`"
            outline rounded color="secondary" label="Approved"
            @click="meeting_status === 'ACCEPT' ? meeting_status = null : meeting_status = 'ACCEPT'; getDataMeeting()" />
        </div>
        <div class="q-px-xs col-3">
          <q-btn
            :class="`${meeting_status === 'RESCHEDULE' ? 'bg-warning text-white' : ''} q-px-sm full-width text-capitalize`"
            outline rounded color="warning" label="Reschedule"
            @click="meeting_status === 'RESCHEDULE' ? meeting_status = null : meeting_status = 'RESCHEDULE'; getDataMeeting()" />
        </div>
      </div>
      <div class="q-my-lg">
        <q-tabs v-model="tab_date" indicator-color="red" active-color="red" :outside-arrows="true"
          :mobile-arrows="true">
          <q-tab v-for="tabs in date_list" class="col-1 q-mx-lg" :active="tab_date === tabs.date" :name="tabs.date"
            :key="tabs.date" @click="getDataMeeting(tabs.date); getMeetingRangeDate()">
            <span class="col text-uppercase">{{tabs.day}}</span>
            <span class="col q-mb-sm text-h4 text-bold">{{tabs.date}}</span>
            <span v-for="(meeting, index) in meeting_range" :key="index">
              <div v-if="tabs.date == meeting.date">
                <!-- <div v-for="meetings in meeting" v-if="meetings == 'REVIEW'"> -->
                  <!-- <span>{{ meetings }}</span> -->
                  <q-icon v-if="meeting.status === 'REVIEW'" color="primary" name="circle" style="font-size:0.5em !important;" />
                  <!-- <q-icon v-else-if="meeting.status === 'APPROVED' || meeting.status === 'ACCEPTED'" color="secondary" name="circle" style="font-size:0.5em !important;" /> -->
                <!-- </div> -->
              </div>
            </span>
          </q-tab>
        </q-tabs>
      </div>
      <div class="q-my-lg">
        <q-tab-panels v-model="tab_date" animated>
          <q-tab-panel v-for="tabs in date_list" :key="tabs.date" :name="tabs.date">
            <div v-if="meeting_list.length > 0">
              <q-card class="row meetingrequest-card q-mb-md border-radius-10px"
                v-for="meeting in meeting_list" :key="meeting.id" flat bordered horizontal>
                <q-card-section class="q-pa-md col-2 bg-secondary text-white flex flex-center" horizontal
                  style="height:100px; border-radius:10px" v-if="moment(meeting.date).format('YYYY/MM/DD') >= moment(dateNow).format('YYYY/MM/DD')">
                  <div class="column">
                    <div class="col text-center" style="font-size:15px">{{ moment(meeting.date).format('ddd') }}</div>
                    <div class="col text-bold text-center" style="font-size:20px;">
                      {{ moment(meeting.date).format('DD') }}</div>
                    <div class="col text-center" style="font-size:14px">{{ moment(meeting.date).format('MMM') }}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-md col-2 bg-grey text-white flex flex-center" horizontal
                  style="height:100px; border-radius:10px" v-else-if="moment(meeting.date).format('YYYY/MM/DD') < moment(dateNow).format('YYYY/MM/DD')">
                  <div class="column">
                    <div class="col text-center" style="font-size:15px">{{ moment(meeting.date).format('ddd') }}</div>
                    <div class="col text-bold text-center" style="font-size:20px;">
                      {{ moment(meeting.date).format('DD') }}</div>
                    <div class="col text-center" style="font-size:14px">{{ moment(meeting.date).format('MMM') }}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="col-8">
                  <div class="column">
                    <div v-if="meeting.topik.length>50" class="col text-bold">{{ meeting.topik.substring(0,50)+"..." }}</div>
                    <div v-else class="col text-bold">{{ meeting.topik }}</div>
                    <div v-if="meeting.deskripsi.length>60" class="col text-grey-6">{{ meeting.deskripsi.substring(0,60)+"..." }}</div>
                    <div v-else class="col text-grey-6">{{ meeting.deskripsi }}</div>
                  </div>
                </q-card-section>
                <q-card-actions class="col-2" align="right" v-if="moment(meeting.date).format('YYYY/MM/DD') >= moment(dateNow).format('YYYY/MM/DD')">
                  <q-btn v-if="meeting.status === 'ACCEPT' || meeting.status === 'APPROVED'"
                    class="q-pa-sm bg-secondary text-white text-capitalize border-radius-10px"
                    style="padding-right: 14px;padding-left: 12px;"
                    size="sm"
                    flat>
                    Approved
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'RESCHEDULE'"
                    class="q-pa-sm bg-warning text-white text-capitalize border-radius-10px"
                    style="color: #F3AC1D"
                    size="sm"
                    flat>
                    Reschedule
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'REJECT' || meeting.status === 'REJECTED'"
                    class="q-pa-sm text-capitalize  bg-negative text-white border-radius-10px"
                    size="sm"
                    style="padding-right: 15px;padding-left: 15px;"
                    flat>
                    Rejected
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'REVIEW'"
                    class="q-pa-sm bg-primary text-capitalize  text-white border-radius-10px"
                    style="padding-right: 19px;padding-left: 19px;"
                    @click="reviewMeetingModal(meeting)"
                    size="sm"
                    flat>
                    Review
                  </q-btn>
                </q-card-actions>
                <q-card-actions class="col-2" align="right" v-else-if="moment(meeting.date).format('YYYY/MM/DD') < moment(dateNow).format('YYYY/MM/DD')">
                  <q-btn v-if="meeting.status === 'ACCEPT' || meeting.status === 'APPROVED'"
                    class="q-pa-sm bg-grey text-white text-capitalize border-radius-10px"
                    style="padding-right: 14px;padding-left: 12px;"
                    size="sm"
                    flat>
                    Approved
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'RESCHEDULE'"
                    class="q-pa-sm bg-grey text-white text-capitalize border-radius-10px"
                    style="color: #F3AC1D"
                    size="sm"
                    flat>
                    Reschedule
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'REJECT' || meeting.status === 'REJECTED'"
                    class="q-pa-sm text-capitalize  bg-grey text-white border-radius-10px"
                    size="sm"
                    style="padding-right: 15px;padding-left: 15px;"
                    flat>
                    Rejected
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'REVIEW'"
                    class="q-pa-sm bg-grey text-capitalize  text-white border-radius-10px"
                    style="padding-right: 19px;padding-left: 19px;"
                    size="sm"
                    flat>
                    Review
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
    </q-card-section>

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
              <div class="text-bold text-grey-6">{{ moment(meeting_detail.date).format('DD MMM YYYY') }}</div>
              <div class="text-h4 text-bold text-grey-6">{{ meeting_detail.startTime }}</div>
            </div>
            <div class="q-pa-sm col-6 text-right">
              <div class="column">
                <span class="col q-ml-sm text-bold text-secondary">Request By</span>
                <span class="col q-ml-sm text-bold">{{ meeting_detail.email }}</span>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column">
            <div class="col q-mb-md text-h5 text-bold">{{ meeting_detail.topik }}</div>
            <div class="col text-grey-6">{{ meeting_detail.deskripsi }}</div>
          </div>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <div class="col q-pa-xs">
            <q-btn class="full-width text-capitalize full-width" rounded color="primary" label="Re-schedule" @click="rescheduleModal = true"  />
          </div>
          <div class="col q-pa-xs">
            <q-btn class="full-width text-capitalize full-width" rounded outline color="negative" label="Reject" @click="changeStatusMeeting(meeting_detail.id, 'REJECTED')" />
          </div>
          <div class="col q-pa-xs">
            <q-btn class="full-width text-capitalize full-width" rounded color="secondary" label="Approve" @click="changeStatusMeeting(meeting_detail.id, 'APPROVED')" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="rescheduleModal">
      <q-card style="width: 700px; border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Reschedule Meeting</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <div class="q-my-md row">
            <span class="col-12 q-mb-sm text-grey-7">Date From*</span>
            <datetime type="date" :phrases="{ ok: 'Continue', cancel: 'Exit' }" class="col-4" :min-datetime="dateNow"
              value-zone="Asia/Jakarta" format="yyyy-MM-dd" v-model='meeting_detail.date' readonly>
            </datetime>
            <datetime type="time" :phrases="{ ok: 'Continue', cancel: 'Exit' }" :min-datetime="dateNow" class="col-4"
              format="HH:mm:ss" v-model='meeting_detail.time' readonly></datetime>
          </div>
          <div class="q-my-md row">
            <span class="col-12 q-mb-sm text-grey-7">Date To*</span>
            <datetime type="date" :phrases="{ ok: 'Continue', cancel: 'Exit' }" class="col-4"
              :min-datetime="meeting_detail.time" value-zone="Asia/Jakarta" format="yyyy-MM-dd"
              v-model='meeting_detail.due' readonly></datetime>
            <datetime type="time" :phrases="{ ok: 'Continue', cancel: 'Exit' }" :min-datetime="meeting_detail.time" class="col-4"
              value-zone="Asia/Jakarta" format="HH:mm:ss" v-model='meeting_detail.due_time' readonly>
            </datetime>
          </div>
        </q-card-section>
        <q-card-actions class="q-pb-md flex-center">
          <q-btn class="full-width bg-secondary text-white text-capitalize" label="Submit Reschedule"
            @click="rescheduleMeeting(meeting_detail.id, 'RESCHEDULE')" rounded />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script>
import moment from 'moment'
import { Datetime } from 'vue-datetime'

import 'vue-datetime/dist/vue-datetime.css'

const listMonths = [
  {
    label: 'January',
    value: 1
  },
  {
    label: 'February',
    value: 2
  },
  {
    label: 'March',
    value: 3
  },
  {
    label: 'April',
    value: 4
  },
  {
    label: 'May',
    value: 5
  },
  {
    label: 'June',
    value: 6
  },
  {
    label: 'July',
    value: 7
  },
  {
    label: 'August',
    value: 8
  },
  {
    label: 'September',
    value: 9
  },
  {
    label: 'October',
    value: 10
  },
  {
    label: 'November',
    value: 11
  },
  {
    label: 'December',
    value: 12
  }
]

export default {
  components: {
    Datetime
  },
  data () {
    return {
      moment,
      year: moment().year(),
      month: moment().month() + 1,
      datenumber: moment().date(),
      tab_date: moment().date(),
      date_list: [],
      dateNow: new Date().toISOString(),
      rescheduleModal: false,
      rescheduleData: {
        date: null,
        due: null
      },
      review_meeting: false,
      meeting_status: null,
      meeting_list: [],
      meeting_range: [],
      meeting_detail: {},
      listYears: [],
      listMonths
    }
  },
  mounted () {
    const date = moment().date()
    this.getDaysArray()
    this.getDataMeeting()
    this.getListYears()
    this.getMeetingRangeDate()
    this.tab_date = date
  },
  methods: {
    reviewMeetingModal (data) {
      this.meeting_detail = data
      this.meeting_detail.startTime = data.time
      setTimeout(() => {
        this.review_meeting = true
      }, 250)
    },
    changeStatusMeeting (id, status) {
      const data = {
        status: status
      }
      this.$axios.put(`/member/meeting/${id}/status`, data).then(response => {
        if (response.status) {
          this.$q.notify({
            message: `Success ${status} Meeting`,
            position: 'top',
            type: 'positive'
          })
          this.review_meeting = false
          this.getDataMeeting()
          this.getMeetingRangeDate()
        }
      })
    },
    rescheduleMeeting (id, status) {
      const data = {
        status: status,
        date: moment(this.meeting_detail.date).format('YYYY-MM-DD') + ' ' + moment(this.meeting_detail.time).format('HH:mm:ss'),
        due: moment(this.meeting_detail.due).format('YYYY-MM-DD') + ' ' + moment(this.meeting_detail.due_time).format('HH:mm:ss')
      }
      this.$axios.put(`/member/meeting/${id}/status`, data).then(response => {
        if (response.status) {
          this.$q.notify({
            message: 'Success Reschedule Meeting',
            position: 'top',
            type: 'positive'
          })
          this.review_meeting = false
          this.rescheduleModal = false
          this.getDataMeeting()
          this.getMeetingRangeDate()
        }
      })
    },
    getDay (date) {
      return moment(date).format('ddd')
    },
    getDate (date) {
      return moment(date).format('DD')
    },
    getMonth (date) {
      return moment(date).format('MMM')
    },
    getListYears () {
      const min = new Date().getFullYear() - 1
      const max = min + 6
      const years = []

      for (let i = max; i >= min; i--) {
        years.push(i)
      }
      this.listYears = years.sort()
    },
    getMeetingRangeDate () {
      const date = moment(this.year + '-' + this.month + '-' + this.datenumber)
      const data = {
        date_start: date.startOf('month').format('YYYY-MM-DD'),
        date_end: date.endOf('month').format('YYYY-MM-DD')
      }
      this.$axios.post('/member/meeting/filter_by_range_date', data).then(response => {
        if (response.data.success) {
          this.meeting_range = response.data.data.map(data => {
            return {
              date: moment(data.date).format('D'),
              status: data.status
            }
          })
        }
      })
    },
    getAllMeeting () {
      const date = moment(this.year + '-' + this.month + '-' + this.datenumber)
      const data = {
        date_start: date.startOf('month').format('YYYY-MM-DD'),
        date_end: date.endOf('month').format('YYYY-MM-DD')
      }
      this.tab_date = moment().date()
      this.$axios.post('/member/meeting/filter_by_range_date', data).then(response => {
        if (response.data.success) {
          this.meeting_list = response.data.data
        }
      })
    },
    getDaysArray () {
      const monthIndex = this.month - 1
      const names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      const date = new Date(this.year, monthIndex, 1)
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
    getDataMeeting (paramDate = null) {
      this.$q.loading.show({
        message: 'Get Data Meeting'
      })
      const datenumber = !paramDate ? this.tab_date : paramDate
      const tanggal = this.year + '-' + this.month + '-' + datenumber
      const params = {
        date: moment(tanggal).format('YYYY-MM-DD')
      }
      if (this.meeting_status != null) {
        params.status = this.meeting_status
      }
      this.$axios.post('/member/meeting/filter_by_date', params).then(response => {
        if (response.data.status) {
          this.meeting_list = response.data.data
          this.$q.loading.hide()
        }
      })
    }
  }
}
</script>
