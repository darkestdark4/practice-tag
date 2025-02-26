<template>
  <div class="q-pa-sm">
    <div v-if="listMeetingRequest.length > 0">
      <q-card class="row meetingrequest-card q-mb-md border-radius-10px" v-for="meeting in listMeetingRequest"
        :key="meeting.id" flat bordered horizontal>
        <q-card-section class="q-pa-md col-2 bg-secondary text-white" horizontal
          style="height:100px; border-radius:10px">
          <div class="column">
            <div class="col text-right" style="font-size:12px">{{ moment(meeting.date).format('ddd') }}</div>
            <div class="col q-mb-sm text-bold text-right" style="font-size:20px;">
              {{ moment(meeting.date).format('DD') }}</div>
            <div class="col text-right" style="font-size:12px">{{ moment(meeting.date).format('MMM') }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="col-8">
          <div class="column">
            <div class="col text-bold">{{ meeting.topik }}</div>
            <div class="col text-grey-6">{{ meeting.deskripsi }}</div>
          </div>
        </q-card-section>
        <q-card-actions class="col-2" align="right">
          <q-btn v-if="meeting.status === 'ACCEPT' || meeting.status === 'APPROVED'"
            class="q-pa-sm bg-secondary text-white text-capitalize border-radius-10px" size="sm" flat>
            Approved
          </q-btn>
          <q-btn v-else-if="meeting.status === 'RESCHEDULE'"
            class="q-pa-sm bg-primary text-white text-capitalize border-radius-10px" size="sm" flat>
            Reschedule
          </q-btn>
          <q-btn v-else-if="meeting.status === 'REJECT'"
            class="q-pa-sm text-capitalize  bg-negative text-white border-radius-10px" size="sm" flat>
            Rejected
          </q-btn>
          <q-btn v-else-if="meeting.status === 'REVIEW'"
            class="q-pa-sm bg-primary text-capitalize  text-white border-radius-10px"
            @click="reviewMeetingModal(meeting)" size="sm" flat>
            Review
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div v-else class="text-center text-h6 text-primary">
      No Meeting
    </div>

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
              <span class="text-h6 text-bold text-grey-6">{{ moment(meeting_detail.date).format('LT') }}</span>
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
            <q-btn class="full-width text-capitalize full-width" rounded outline color="negative" label="Reject" @click="changeStatusMeeting(meeting_detail.id, 'REJECT')" />
          </div>
          <div class="col q-pa-xs">
            <q-btn class="full-width text-capitalize full-width" rounded color="secondary" label="Approve" @click="changeStatusMeeting(meeting_detail.id, 'ACCEPT')" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Reschedule Meeting -->
    <q-dialog v-model="rescheduleModal">
      <q-card style="width: 700px; border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Reschedule Meeting</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Date From*</span>
            <datetime format="YYYY-MM-DD H:i" v-model='meeting_detail.date' readonly></datetime>
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Date To*</span>
            <datetime format="YYYY-MM-DD H:i" v-model='meeting_detail.due' readonly></datetime>
          </div>
        </q-card-section>
        <q-card-actions class="q-pb-md flex-center">
          <q-btn class="full-width bg-secondary text-white text-capitalize" label="Submit Reschedule"
            @click="rescheduleMeeting(meeting_detail.id, 'RESCHEDULE')" rounded />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import datetime from 'vuejs-datetimepicker'
export default {
  components: {
    datetime
  },
  data () {
    return {
      moment,
      topic: null,
      review_meeting: false,
      meeting_detail: {},
      listMeetingRequest: [],
      rescheduleModal: false,
      rescheduleData: {
        date: null,
        due: null
      }
    }
  },
  mounted () {
    this.getAllRequestMeeting()
  },
  methods: {
    getAllRequestMeeting () {
      const localStorage = JSON.parse(window.localStorage.getItem('userd'))
      const username = localStorage.username
      const params = {
        topic: this.topic
      }
      this.$axios.post(`/member/meeting/requestmeeting/${username}/topic`, params).then((response) => {
        this.listMeetingRequest = response.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    reviewMeetingModal (data) {
      this.review_meeting = true
      this.meeting_detail = data
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
        }
      })
    },
    rescheduleMeeting (id, status) {
      const data = {
        status: status,
        date: this.meeting_detail.date,
        due: this.meeting_detail.due
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
        }
      })
    }
  }
}
</script>
