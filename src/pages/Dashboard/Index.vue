<script>
import Vue from 'vue'
import BackgroundComponent from 'src/components/Dashboard/Background.vue'
import moment from 'moment'
import { Datetime } from 'vue-datetime'
import VueBarcode from 'vue-barcode'
import VueClipboard from 'vue-clipboard2'
import QRCode from 'qrcode'
import { Notify } from 'quasar'

import Background from 'src/assets/image/TAGID-circle.gif'
import VideoBackground from 'vue-responsive-video-background-player'
import VideoExample from 'src/assets/video-example.mp4'

import 'vue-datetime/dist/vue-datetime.css'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

import Headphone from 'src/assets/image/headphone.png'
import LinkAja from 'src/assets/image/LinkAja.png'

export default {
  components: { VideoBackground, BackgroundComponent, Datetime, VueBarcode },
  data () {
    return {
      Headphone,
      VideoExample,
      Background,
      LinkAja,
      moment,
      windowWidth: 1000,
      maxSlice: 9,
      navPos: 'left',
      slide: 'balance',
      meeting: 'meeting-1',
      dateNow: new Date().toISOString().substring(0, 10),
      firstEmail: '',
      lastEmail: '',
      vertical: true,
      qrGenerate: '',
      barcode: false,
      selectBarcode: false,
      nextMeetingDetail: false,
      rescheduleModal: false,
      idNumberModal: false,
      broadcastModal: false,
      broadcastPopupModal: false,
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageBgCorporate: 'https://api.the-netwerk.com/storage/app/public/corporate/background/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      nextMeetingDataDetail: [],
      meetingRequestDetail: false,
      slide2: null,
      broadcastActive: [],
      broadcastPopupActive: [],
      pollingActive: [],
      pollingModal: false,
      optionId: null,
      participatePolling: false,
      participateId: null,
      meetingRequestDataDetail: {
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        startTime: new Date().toISOString().substring(0, 10),
        endTime: '23:59:59'
      },
      listMeetingRequest: [],
      nextMeetingList: [],
      cardList: [],
      imageExtensionLists: ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'raw'],
      videoExtensionLists: ['webm', 'mkv', 'mp4', 'avi', 'mov', 'mpg', 'mpeg', '3gp', 'm4v']
    }
  },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Dashboard')
    this.getNextMeeting()
    this.getDataCard()
    this.getMeetingRequest()
    this.getBroadcastActive()
    this.getPollingActive()
    QRCode.toDataURL(this.$store.state.userdata.user.identity_number).then(
      (url) => {
        this.qrGenerate = url
      }
    )
    window.onresize = () => {
      this.windowWidth = window.innerWidth
      this.setMaxSlice()
    }
  },
  computed: {
    meetingRequest () {
      // Filter Meeting Request.date >= this.dateNow and Slice to 5
      return this.listMeetingRequest
        .filter((item) => {
          return item.date >= this.dateNow
        })
        .slice(0, 5)
    }
  },
  methods: {
    getBroadcastActive () {
      this.$axios
        .get('/broadcast/active')
        .then((response) => {
          const broadcast = response.data.data.map((data) => {
            return {
              id: data.id,
              image: data.image,
              title: data.title,
              description: data.description,
              divisi_id: data.to ? data.to.split('-') : null,
              type: data.type
            }
          })
          broadcast.forEach((data) => {
            if (Array.isArray(data.divisi_id)) {
              if (parseInt(data.divisi_id[2]) === this.$store.state.userdata.user.divisi_id && data.type === 'Broadcast') {
                this.broadcastActive.push(data)
              } else if (parseInt(data.divisi_id[2]) === this.$store.state.userdata.user.divisi_id && data.type === 'Popup Ads') {
                this.broadcastPopupActive.push(data)
              } else if ((data.divisi_id.length < 3 || data.divisi_id === null) && data.type === 'Broadcast') {
                this.broadcastActive.push(data)
              } else if ((data.divisi_id.length < 3 || data.divisi_id === null) && data.type === 'Popup Ads') {
                this.broadcastPopupActive.push(data)
              }
            } else if (data.divisi_id === null && data.type === 'Broadcast') {
              this.broadcastActive.push(data)
            } else if (data.divisi_id === null && data.type === 'Popup Ads') {
              this.broadcastPopupActive.push(data)
            }
          })
          if (this.broadcastActive.length > 0) {
            this.broadcastModal = true
            this.slide2 = this.broadcastActive[0].id
          } else if (this.broadcastPopupActive.length > 0) {
            this.broadcastPopupModal = true
            this.slide2 = this.broadcastPopupActive[0].id
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getPollingActive () {
      this.$axios.get('/member/corporate/polling/active').then((response) => {
        if (response.data.status === 'success') {
          this.pollingActive = response.data.data
          if (this.pollingActive.length > 0) {
            this.pollingModal = true
            this.slide2 = response.data.data[0].id
          }
        }
      })
    },
    doParticipate (id, value) {
      const data = {
        is_participate: value
      }
      this.$axios
        .post(`/member/corporate/polling/participate/${id}`, data)
        .then((response) => {
          if (response.data.status === 'success') {
            if (value === 'yes') {
              this.participatePolling = true
              this.participateId = response.data.data.id
            } else {
              this.pollingModal = false
            }
          }
        })
    },
    doPolling () {
      const data = {
        pollingOptionId: this.optionId
      }
      this.$axios
        .post(`/member/corporate/polling/doPolling/${this.participateId}`, data)
        .then((response) => {
          if (response.data.status === 'success') {
            this.pollingModal = false
            Notify.create({
              message: 'Success Participate Polling',
              position: 'top',
              type: 'positive'
            })
          }
        })
    },
    setMaxSlice () {
      if (this.windowWidth > 900) {
        this.maxSlice = 8
      } else if (this.windowWidth > 800) {
        this.maxSlice = 4
      } else if (this.windowWidth > 600) {
        this.maxSlice = 3
      } else if (this.windowWidth < 600) {
        this.maxSlice = 2
      }
    },
    doCopyIdNumber () {
      this.$copyText(this.$store.state.userdata.user.identity_number).then(
        function (e) {
          Notify.create({
            message: 'Copied',
            position: 'bottom',
            type: 'positive'
          })
        },
        function (e) {
          Notify.create({
            message: 'Can not copy',
            position: 'bottom',
            type: 'negative'
          })
        }
      )
    },
    getMeetingRequest () {
      const localStorage = JSON.parse(window.localStorage.getItem('userd'))
      const username = localStorage.username
      this.$axios
        .get(`/member/meeting/requestmeeting/${username}`)
        .then((response) => {
          this.listMeetingRequest = response.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getNextMeeting () {
      const localStorage = JSON.parse(window.localStorage.getItem('userd'))
      const username = localStorage.username
      this.$axios
        .get(`/member/meeting/nextmeeting/${username}`)
        .then((response) => {
          this.nextMeetingList = response.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDataCard () {
      this.$axios
        .get('/member/phonebook/show')
        .then((response) => {
          this.cardList = response.data.data
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    changeStatusMeeting (id, status) {
      const data = {
        status: status
      }
      this.$axios.put(`/member/meeting/${id}/status`, data).then((response) => {
        if (response.status) {
          this.$q.notify({
            message: `Success ${status} Meeting`,
            position: 'top',
            type: 'positive'
          })
          this.meetingRequestDetail = false
        }
        this.getMeetingRequest()
        // window.setTimeout(function () {
        //   location.reload()
        // }, 1500)
      })
    },
    rescheduleMeeting (id, status) {
      const data = {
        status: status,
        date:
          moment(this.meetingRequestDataDetail.startDate).format('YYYY-MM-DD') +
          ' ' +
          moment(this.meetingRequestDataDetail.startTime).format('HH:mm:ss'),
        due:
          moment(this.meetingRequestDataDetail.endDate).format('YYYY-MM-DD') +
          ' ' +
          moment(this.meetingRequestDataDetail.endTime).format('HH:mm:ss')
      }
      this.$axios.put(`/member/meeting/${id}/status`, data).then((response) => {
        if (response.status) {
          this.$q.notify({
            message: 'Success Reschedule Meeting',
            position: 'top',
            type: 'positive'
          })
          this.nextMeetingDetail = false
          this.meetingRequestDataDetail.time = moment(
            this.meetingRequestDataDetail.time
          ).format('HH:mm:ss')
          this.rescheduleModal = false
        }
        window.setTimeout(function () {
          location.reload()
        }, 1500)
      })
    },
    popupMeetingRequest (data) {
      this.meetingRequestDetail = true
      this.meetingRequestDataDetail.id = data.id
      this.meetingRequestDataDetail.date = data.date
      this.meetingRequestDataDetail.time = data.time
      this.meetingRequestDataDetail.due = data.due
      this.meetingRequestDataDetail.due_time = data.due_time
      this.meetingRequestDataDetail.email = data.email
      this.meetingRequestDataDetail.topik = data.topik
      this.meetingRequestDataDetail.deskripsi = data.deskripsi
      this.meetingRequestDataDetail.dateTime = data.date + ' ' + data.time
      this.meetingRequestDataDetail.dueTime = data.due + ' ' + data.due_time
      if (this.meetingRequestDataDetail.email.length > 10) {
        this.firstEmail = this.meetingRequestDataDetail.email.substring(
          0,
          this.meetingRequestDataDetail.email.lastIndexOf('@')
        )
        this.lastEmail = this.meetingRequestDataDetail.email.substring(
          0,
          this.meetingRequestDataDetail.email.lastIndexOf('@') + 1
        )
      }
    },
    popupNextMeeting (data) {
      this.nextMeetingDetail = true
      this.nextMeetingDataDetail = data
    }
  },
  watch: {
    vertical (val) {
      this.navPos = val === true ? 'right' : 'bottom'
    }
  }
}
</script>

<template>
  <q-page>
    <BackgroundComponent />
    <q-card class="constrain-mobile font-monserrat" flat>
      <!-- ID NUMBER -->
      <q-card-section v-if="$store.state.userdata.user.identity_number">
        <div class="text-secondary text-bold q-mb-sm">ID NUMBER</div>
        <div style="display: flex; gap: .5rem; width: 100%; justify-content: stretch;">
          <div style="width: 100%">
            <q-input
              :label="
                $store.state.userdata.user.identity_number
                  ? $store.state.userdata.user.identity_number
                  : '-'
              "
              outlined
              readonly
            />
          </div>
          <div>
            <q-btn
              class="bg-secondary text-white border-radius-10px"
              v-if="$store.state.userdata.user.identity_number"
              icon="qr_code"
              style="height: 56px"
              @click="
                idNumberModal = true;
                barcode = false;
              "
              flat
            />
            <q-btn
              class="bg-grey-5 text-white border-radius-10px"
              v-else
              icon="qr_code"
              style="height: 56px"
              flat
              disable
            />
          </div>
        </div>
      </q-card-section>
      <!-- BALANCE TOPUP -->
      <!-- <q-card-section>
        <q-carousel class="text-white" height="100px" style="border-radius:30px" :navigation-position="navPos"
          :vertical="vertical" v-model="slide" transition-next="swipe-up" transition-prev="swipe-down" swipeable
          animated navigation padding>
          <q-carousel-slide name="balance" class="row bg-primary flex flex-center">
            <div class="q-pa-sm col">
              <div class="column">
                <span class="col text-white">Balance</span>
                <span class="col text-white">$0</span>
              </div>
            </div>
            <div class="q-pa-sm col">
              <q-btn class="bg-white text-primary" label="Topup" style="border-radius: 10px" flat />
            </div>
            <div class="q-pa-sm col text-right">
              <q-btn class="text-white" icon="list" rounded flat />
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="linkaja" class="row bg-negative flex-center">
            <div class="col">
              <q-img :src="LinkAja" width="50px" />
            </div>
            <div class="col">
              <span class="text-white">Link Aja!</span>
            </div>
            <div class="col">
              <q-btn class="bg-white text-capitalize text-negative border-radius-10px" label="Connect" flat />
            </div>
            <div class="col text-right">
              <q-btn class="text-white" icon="list" rounded flat />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section> -->
      <!-- E-COMMERCE OVERVIEW -->
      <!-- <q-card-section>
        <div class="row q-mb-sm">
          <div class="text-bold text-secondary">E-COMMERCE OVERVIEW</div>
        </div>
        <q-markup-table class="full-width" flat>
          <tr class="col">
            <td class="col text-secondary">Orders</td>
            <td class="col text-secondary">Revenue</td>
            <td class="col"></td>
          </tr>
          <tr class="col">
            <td class="col text-grey-6">This Month</td>
            <td class="col text-grey-6">This Month</td>
            <td class="col text-grey-6">Last Month</td>
          </tr>
          <tr class="col">
            <td class="col text-h5 text-bold">154</td>
            <td class="col text-h5 text-bold">$2541</td>
            <td class="col text-h5 text-bold">$2310</td>
          </tr>
        </q-markup-table>
      </q-card-section> -->
      <!-- <q-separator /> -->
      <!-- RECENT ACTIVITY -->
      <!-- <q-card-section>
        <div class="col text-bold text-secondary">RECENT ACTIVITY</div>
        <div class="row q-pa-md" v-for="prod in 3" :key="prod">
          <div class="col-4">
            <q-avatar round>
              <img :src="Headphone" size="100px">
            </q-avatar>
          </div>
          <div class="col-5">
            <div class="column">
              <div class="col" style="font-size:14px">Mi Headphone</div>
              <div class="col" style="font-size:14px">1 hours ago</div>
            </div>
          </div>
          <div class="col-3 text-right text-secondary">+ $30</div>
          <q-separator />
        </div>
      </q-card-section> -->
      <!-- MY NEXT MEETING -->
      <q-card-section>
        <div class="row q-mb-sm">
          <div class="col text-bold text-secondary">MY NEXT MEETING</div>
          <div
            class="col text-bold text-secondary text-right cursor-pointer"
            v-if="nextMeetingList.length > 0"
            @click="$router.replace({ path: `dashboard/meetings` })"
          >
            See All
          </div>
        </div>
        <div v-if="nextMeetingList.length > 0">
          <div class="next-meeting-list" style="display: flex; align-items: stretch;">
            <div
              class="meeting-list"
              v-for="nextmeet in nextMeetingList"
              :key="nextmeet.name"
            >
              <q-card
                style="border-right: 10px solid #116c54; min-width: 300px; max-width: 300px; height: 100%"
                flat
                bordered
              >
                <q-card-section style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div class="q-mb-sm" style="display: flex; justify-content: space-between;">
                      <div class="text-bold" style="font-size: 18px; line-height: 21.92px">
                        {{ moment(nextmeet.date).format("DD MMMM") }}
                      </div>
                      <div class="text-right" style="font-size: 14px; line-height: 17px; align-self: center;">
                        {{ moment(nextmeet.time, "HH:mm:ss").format("hh:mm") }}
                      </div>
                    </div>
                    <div class="q-mb-sm column">
                      <div class="col text-secondary" style="
                        overflow: hidden;
                        max-width: 90%;
                        text-overflow: ellipsis;
                        width: fit-content;
                        white-space: nowrap;
                      ">
                        {{ nextmeet.topik }}
                      </div>
                      <div style="font-size: .75em; color: #3F4249; margin-top: .25rem">
                        <p style="
                          margin: 0;
                          display: -webkit-box;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          -webkit-line-clamp: 3;
                          -webkit-box-orient: vertical;
                          white-space: break-spaces;
                        ">{{ nextmeet.deskripsi }}</p>
                      </div>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center">
                    <div>
                      <q-btn
                        class="bg-secondary text-white text-capitalize border-radius-10px"
                        size="sm"
                        style="font-size: 12px; font-weight: 400;"
                        @click="popupNextMeeting(nextmeet)"
                      >
                        <span>See Details</span>
                      </q-btn>
                    </div>
                    <div>
                      <q-avatar round @click="broadcastModal = true">
                        <img :src="Profile" size="100px" />
                      </q-avatar>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="text-center text-secondary">No Data Next Meeting</div>
        </div>
      </q-card-section>
      <!-- MEETING REQUEST -->
      <q-card-section>
        <div class="q-mb-sm row">
          <div class="col-9 text-bold text-secondary">MEETING REQUEST</div>
          <div
            class="col-3 text-bold text-secondary text-right cursor-pointer"
            v-if="meetingRequest.length > 0"
            @click="$router.replace({ path: `dashboard/meetings` })"
          >
            See All
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem" v-if="meetingRequest.length > 0">
          <q-card
            flat
            style="display: flex; max-width: 100%"
            v-for="meet_request in meetingRequest"
            :key="meet_request.id"
          >
            <div style="display: flex; border-radius: 10px; border: 1px solid #CCC; min-width: 100%;">
              <div
                class="q-pa-sm bg-secondary text-white flex flex-center"
                style="
                  text-align: right;
                  height: 100px;
                  border-top-left-radius: 10px;
                  border-bottom-left-radius: 10px;
                  border-top-right-radius: 0px;
                  min-width: 70px;
                  max-width: 70px;
                  justify-content: end;
                "
              >
                <div>
                  <div class="col" style="font-size: 10px; line-height: 12.18px; font-weight: 400;">
                    {{ moment(meet_request.date).format("ddd") }}
                  </div>
                  <div class="col text-bold" style="font-size: 30px; line-height: 36px;">
                    {{ moment(meet_request.date).format("DD") }}
                  </div>
                  <div class="col" style="font-size: 10px; line-height: 12.18px; font-weight: 400;">
                    {{ moment(meet_request.date).format("MMMM") }}
                  </div>
                  <div class="col" style="font-size: 11px; line-height: 12.18px; font-weight: 400; margin-top: .25rem">
                    {{ moment(meet_request.time, "HH:mm:ss").format("hh:mm") }}
                  </div>
                </div>
              </div>
              <div class="q-pa-sm" style="display: flex; min-width: calc(100% - 70px); gap: .5rem">
                <div style="display: flex; flex-direction: column; min-width: calc(100% - 100px);">
                  <p style="
                    margin: 0;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 1.25em;
                  ">{{ meet_request.topik }}</p>
                  <p style="
                    margin: 0;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    white-space: break-spaces;
                    font-size: .75em;
                  ">{{ meet_request.deskripsi }}</p>
                </div>
                <div style="display: flex; justify-content: end; align-items: center; width: 100px">
                  <q-btn
                    style="font-size: 12px"
                    class="q-py-xs text-bold bg-primary text-white text-capitalize border-radius-10px"
                    @click="popupMeetingRequest(meet_request)"
                    size="sm"
                    flat
                  >
                    Review
                  </q-btn>
                  <!-- <q-btn v-if="meet_request === ''" class="q-pa-sm bg-primary text-white border-radius-10px"
                    @click="meetingRequestDetail = true" flat>
                    Review
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'APPROVED'"
                    class="q-pa-sm bg-secondary text-white border-radius-10px" flat>
                    Approved
                  </q-btn>
                  <q-btn v-else-if="meeting.status === 'REJECT'" class="q-pa-sm bg-negative text-white border-radius-10px"
                    flat>
                    Rejected
                  </q-btn> -->
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <div v-else>
          <div class="text-center text-secondary">No Data Meeting Request</div>
        </div>
      </q-card-section>
      <!-- RECENT CARD -->
      <q-card-section>
        <div class="row q-mb-sm">
          <div class="col-10 text-bold text-secondary">RECENT CARDS</div>
          <div
            class="col-2 text-secondary text-bold text-right cursor-pointer"
            @click="$router.replace({ path: `dashboard/saved-cards` })"
          >
            See All
          </div>
        </div>
        <div class="recent-card-list">
          <div style="display: flex; gap: .5rem; overflow-x: auto;">
            <div
              class="card-list q-mb-md"
              v-for="(cards, index) in cardList.slice(0, maxSlice)"
              :key="index"
            >
              <q-card style="width: 100px; height: 150px"
                v-if="
                  imageExtensionLists.includes(
                    `${cards.background ? linkStorageBg + cards.background : Background}`
                      .split('.')
                      .pop()
                  )
                "
              >
                <q-img
                  v-if="
                    imageExtensionLists.includes(
                      `${cards.background ? linkStorageBg + cards.background : Background}`
                        .split('.')
                        .pop()
                    )
                  "
                  :src="`${cards.background ? linkStorageBg + cards.background : Background}`"
                  style="height: 150px"
                >
                  <div class="absolute-bottom text-center" style="background: none">
                    <q-avatar round>
                      <img
                        :src="`${cards.logo ? linkStorageProfile + cards.logo : Profile}`"
                        size="150px"
                      />
                    </q-avatar>
                    <div class="q-mt-md text-bold" style="font-size: 10px">
                      {{ cards.member_first_name }}
                    </div>
                  </div>
                </q-img>
              </q-card>
              <q-card style="width: 100px; height: 150px"
                v-else-if="
                  videoExtensionLists.includes(
                    `${
                      cards.background
                        ? linkStorageBg + cards.background
                        : Background
                    }`
                      .split('.')
                      .pop()
                  )
                "
              >
                <video-background
                  :src="`${
                    cards.background
                      ? (cards.corporate)
                        ? `${linkStorageBgCorporate}${cards.corporate.background}`
                        : `${linkStorageBg}${cards.background}`
                      : VideoExample
                  }`"
                  style="height: 150px"
                >
                  <div class="absolute-bottom text-center" style="padding: 16px; color: white">
                    <q-avatar round>
                      <img
                        :src="`${cards.logo ? linkStorageProfile + cards.logo : Profile}`"
                        size="150px"
                      />
                    </q-avatar>
                    <div class="q-mt-md text-bold" style="font-size: 10px">
                      {{ cards.member_first_name }}
                    </div>
                  </div>
                </video-background>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Meeting Details -->
      <q-dialog v-model="nextMeetingDetail">
        <q-card style="width: 700px; border-top: 15px solid #116c54">
          <q-toolbar class="text-secondary">
            <q-toolbar-title class="q-ml-xl text-center text-h6"
              >Meeting Detail</q-toolbar-title
            >
            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="q-pa-sm col-6">
                <div class="column">
                  <div class="col" style="margin-top: -5px">
                    <span class="text-h5 text-bold">{{
                      moment(nextMeetingDataDetail.date).format("DD MMM")
                    }}</span>
                  </div>
                  <div class="col">
                    <span class="text-h5 text-bold text-grey-6">
                      {{ moment(nextMeetingDataDetail.time, "HH:mm:ss").format("h:mm:ss") }}
                    </span>
                  </div>
                  <div class="col">
                    <span class="text-secondary"
                      >{{ nextMeetingDataDetail.type_meeting }} Meeting</span
                    >
                  </div>
                </div>
              </div>
              <div class="q-pa-sm col-6 text-right">
                <div class="column">
                  <span class="col q-ml-sm text-bold text-secondary"
                    >Created By</span
                  >
                  <span class="col q-ml-sm text-bold">{{
                    nextMeetingDataDetail.email
                  }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="column">
              <div class="col q-mb-md text-h5 text-bold">
                {{ nextMeetingDataDetail.topik }}
              </div>
              <div class="col text-grey-6">
                {{ nextMeetingDataDetail.deskripsi }}
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-mb-md flex-center">
            <q-btn
              class="full-width text-capitalize"
              rounded
              color="primary"
              label="Re-schedule"
              @click="rescheduleModal = true"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Meeting Review -->
      <q-dialog v-model="meetingRequestDetail">
        <q-card style="width: 700px; border-top: 15px solid #116c54">
          <q-toolbar class="text-secondary">
            <q-toolbar-title class="q-ml-xl text-center text-h6"
              >Meeting Review</q-toolbar-title
            >
            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="q-pa-sm col-6">
                <div class="text-bold text-grey-6">
                  {{
                    moment(meetingRequestDataDetail.date).format("DD MMM YYYY")
                  }}
                </div>
                <div class="text-h4 text-bold text-grey-6">
                  {{ moment(meetingRequestDataDetail.time, "HH:mm:ss").format("h:mm:ss") }}
                </div>
              </div>
              <div class="q-pa-sm col-6 text-right">
                <div class="column">
                  <span class="col q-ml-sm text-bold text-secondary"
                    >Request By</span
                  >
                  <span class="col q-ml-sm text-bold">{{
                    meetingRequestDataDetail.email
                  }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="column">
              <div class="col q-mb-md text-h5 text-bold">
                {{ meetingRequestDataDetail.topik }}
              </div>
              <div class="col text-grey-6">
                {{ meetingRequestDataDetail.deskripsi }}
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="row flex-center">
            <div class="col q-pa-sm">
              <q-btn
                class="text-capitalize full-width"
                rounded
                color="primary"
                label="Re-schedule"
                @click="rescheduleModal = true"
              />
            </div>
            <div class="col q-pa-sm">
              <q-btn
                class="text-capitalize full-width"
                rounded
                outline
                color="negative"
                label="Reject"
                @click="
                  changeStatusMeeting(meetingRequestDataDetail.id, 'REJECT')
                "
              />
            </div>
            <div class="col q-pa-sm">
              <q-btn
                class="text-capitalize full-width"
                rounded
                color="secondary"
                label="Approve"
                @click="
                  changeStatusMeeting(meetingRequestDataDetail.id, 'APPROVED')
                "
              />
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Reschedule Meeting -->
      <q-dialog v-model="rescheduleModal">
        <q-card style="width: 700px; border-top: 15px solid #116c54">
          <q-toolbar class="text-secondary">
            <q-toolbar-title class="q-ml-xl text-center text-h6"
              >Reschedule Meeting</q-toolbar-title
            >
            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <div class="q-my-md row">
              <span class="col-12 q-mb-sm text-grey-7">Date From*</span>
              <!-- <datetime format="YYYY-MM-DD H:i" v-model='nextMeetingDataDetail.date' readonly></datetime> -->
              <datetime
                type="date"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                class="col-4"
                :min-datetime="dateNow"
                value-zone="Asia/Jakarta"
                format="yyyy-MM-dd"
                v-model="meetingRequestDataDetail.startDate"
                readonly
              >
              </datetime>
              <datetime
                type="time"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                :min-datetime="dateNow"
                class="col-4"
                format="HH:mm:ss"
                v-model="meetingRequestDataDetail.startTime"
                readonly
              ></datetime>
            </div>
            <div class="q-my-md row">
              <span class="col-12 q-mb-sm text-grey-7">Date To*</span>
              <!-- <datetime format="YYYY-MM-DD H:i" v-model='nextMeetingDataDetail.due' readonly></datetime> -->
              <datetime
                type="date"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                class="col-4"
                :min-datetime="meetingRequestDataDetail.time"
                value-zone="Asia/Jakarta"
                format="yyyy-MM-dd"
                v-model="meetingRequestDataDetail.endDate"
                readonly
              ></datetime>
              <datetime
                type="time"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                :min-datetime="dateNow"
                class="col-4"
                value-zone="Asia/Jakarta"
                format="HH:mm:ss"
                v-model="meetingRequestDataDetail.endTime"
                readonly
              >
              </datetime>
            </div>
          </q-card-section>
          <q-card-actions class="q-pb-md flex-center">
            <q-btn
              class="full-width bg-secondary text-white text-capitalize"
              label="Submit Reschedule"
              @click="
                rescheduleMeeting(meetingRequestDataDetail.id, 'RESCHEDULE')
              "
              rounded
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="selectBarcode" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Please choose to display between Barcode or QR code
            </span>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              flat
              label="QR Code"
              color="primary"
              @click="
                idNumberModal = true;
                barcode = false;
              "
              v-close-popup
            />
            <q-btn
              flat
              label="Barcode"
              color="primary"
              @click="
                idNumberModal = true;
                barcode = true;
              "
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="idNumberModal">
        <q-card
          class="q-pa-sm text-secondary bg-white border-radius-10px font-proxima-nova-alt"
        >
          <q-card-section class="flex-center column">
            <div v-if="barcode" class="col barcode">
              <vue-barcode :value="$store.state.userdata.user.identity_number">
              </vue-barcode>
            </div>
            <div v-else class="col qr-code">
              <img
                :src="qrGenerate"
                width="250px"
                height="250px"
                style="border-radius: 25px"
              />
            </div>
            <div
              class="col"
              :style="`color: ${
                $store.state.userdata.user.secondary_color
                  ? $store.state.userdata.user.secondary_color
                  : '#116C54'
              }`"
            >
              Scan {{ barcode ? "Barcode" : "QR Code" }} or Share With ID Number
              :
            </div>
            <div
              class="col"
              :style="`color: ${
                $store.state.userdata.user.secondary_color
                  ? $store.state.userdata.user.secondary_color
                  : '#116C54'
              }`"
            >
              {{ $store.state.userdata.user.identity_number }}
            </div>
            <div class="q-pa-md col" v-if="barcode">
              <q-btn
                class="text-white text-capitalize"
                label="Switch to QR Code"
                @click="
                  idNumberModal = true;
                  barcode = false;
                "
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
                flat
                rounded
              />
            </div>
            <div class="q-pa-md col" v-else>
              <q-btn
                class="text-white text-capitalize"
                label="Switch to Barcode"
                @click="
                  idNumberModal = true;
                  barcode = true;
                "
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
                flat
                rounded
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>
    <q-dialog v-model="broadcastPopupModal" full-width>
      <q-card>
        <q-carousel
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          v-model="slide2"
          control-color="primary"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          style="max-height: 500px"
          class="bg-white shadow-1 rounded-borders"
        >
          <q-carousel-slide
            v-for="br in broadcastPopupActive"
            :key="br.id"
            :name="br.id"
            class="column no-wrap flex-center"
          >
            <div class="text-center">
              {{ br.title }}
            </div>
            <!-- <q-icon name="style" color="primary" size="56px" /> -->
            <img
              class="q-mt-md"
              :src="br.image ? br.image : Profile"
              style="width: 150px; height: 150px"
            />
            <div class="q-mt-md q-mb-lg text-center">
              {{ br.description.substring(0, 500) + "..." }}
            </div>
          </q-carousel-slide>
        </q-carousel>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog class="q-pt-md" v-model="broadcastModal">
      <q-card-section class="row items-center">
        <q-carousel
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          v-model="slide2"
          control-color="primary"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          style="max-height: 450px"
          class="bg-white shadow-1 rounded-borders"
        >
          <q-btn icon="close" flat round dense v-close-popup />
          <q-carousel-slide
            v-for="br in broadcastActive"
            :key="br.id"
            :name="br.id"
            class="column no-wrap flex-center"
          >
            <div class="text-center">
              {{ br.title }}
            </div>
            <!-- <q-icon name="style" color="primary" size="56px" /> -->
            <img
              class="q-mt-md"
              :src="br.image ? br.image : Profile"
              style="width: 150px; height: 150px"
            />
            <div class="q-mt-md q-mb-lg text-center">
              {{ br.description.substring(0, 500) + "..." }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
    </q-dialog>
    <q-dialog v-model="pollingModal">
      <q-card v-if="pollingModal && !participateId" style="min-width: 250px">
        <q-card-section>
          <span>
            <q-icon name="podcasts" size="1.5em" />
            Polling
          </span>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="column">
          <span>
            {{ pollingActive[0].question }}
          </span>
          <span class="q-mt-md text-bold"> Do You Want To Participate? </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="No"
            color="danger"
            @click="doParticipate(pollingActive[0].id, 'no')"
          />
          <q-btn
            flat
            label="Yes"
            color="primary"
            @click="doParticipate(pollingActive[0].id, 'yes')"
          />
        </q-card-actions>
      </q-card>

      <q-card v-if="pollingModal && participateId" style="min-width: 250px">
        <q-card-section>
          <div class="q-mt-md q-mb-lg text-center">
            {{ pollingActive[0].question }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="text-center row" v-for="(opt, index) in pollingActive[0].options" :key="index">
            <span class="col-8 text-left">{{ opt.name }}</span>
            <span class="col-2 offset-2 text-right">
              <q-radio
                v-model="optionId"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="opt.id"
              />
            </span>
          </div>
        </q-card-section>
        <!-- <q-carousel transition-prev="slide-right" transition-next="slide-left" swipeable animated v-model="slide2"
            control-color="primary" navigation-icon="radio_button_unchecked" :navigation="pollingActive.length > 1 ? true : false" padding style="max-height: 500px"
            class="bg-white shadow-1 rounded-borders">
            <q-carousel-slide v-for="pl in pollingActive" :key="pl.id" :name="pl.id"
              class="column no-wrap flex-center">
            </q-carousel-slide>
          </q-carousel> -->
        <q-card-actions align="right">
          <q-btn flat label="Submit" color="primary" @click="doPolling()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style lang="scss">
.q-carousel__navigation .q-btn {
  margin-top: -3px !important;
  margin-bottom: -3px !important;
}

.meetingrequest-card {
  height: 100px;
}

.next-meeting-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  .meeting-list {
    display: inline-block;
    margin-right: 10px;
  }

  .meeting-list:last-of-type {
    margin-right: none;
  }
}
</style>
