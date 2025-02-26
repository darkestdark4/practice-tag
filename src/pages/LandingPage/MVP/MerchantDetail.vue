<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container style="padding-bottom: 10px;">
      <q-page class="constrain-web-mini font-roboto" style="background: white;">
        <q-drawer
          v-model="drawerLeft"
          content-class="bg-warning"
          :width="200"
          :breakpoint="500"
          overlay
        >
          <q-scroll-area class="fit">
            <div class="q-pa-xs">
              <div class="row">
                <div class="col-3 q-ml-auto text-right">
                  <q-btn flat round dense icon="chevron_right" @click="drawerLeft = !drawerLeft" />
                </div>
              </div>
              <div class="text-bold drawer-content q-px-lg q-py-sm cursor-pointer" @click="$router.push('/landingpage/about')">
                Tentang MVP
              </div>
              <div class="text-bold drawer-content q-px-lg q-py-sm q-mt-sm cursor-pointer" @click="$router.push('/landingpage/merchant-list')">
                Merchant List
              </div>
            </div>
            <q-footer v-model="footer" class="row bg-warning" reveal>
              <div class="col-10 q-mx-auto q-py-sm">
                <q-btn class="full-width" color="black" label="Logout" @click="logout()" rounded dense />
              </div>
            </q-footer>
          </q-scroll-area>
        </q-drawer>
        <div class="row" style="background: #F2C581;">
          <div class="col-3 text-left">
            <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
          </div>
          <div class="col-6 text-center header-center">
            <span>{{ partnerDetail.partner_name }}</span>
          </div>
          <div class="col-3 q-pa-sm text-right">
            <q-img
              :src="LogoMVP"
              height="20px"
              width="40px"
            />
          </div>
        </div>
        <div class="column">
          <q-img
            :src="partnerDetail.partner_image"
            spinner-color="primary"
            spinner-size="40px"
          />
          <div class="column text-center q-pa-md">
            <span style="font-weight: 700; font-size: 14px; line-height: 16px;">Deskripsi</span>
            <span class="text-left q-mt-md" style="font-weight: 400; font-size: 12px; line-height: 14px;" v-html="partnerDetail.partner_description" />
          </div>
        </div>
        <div class="row">
          <div class="col-10 q-mr-auto q-ml-auto">
            <q-btn class="full-width" color="black" label="Redeem" @click="partnerInput = true" rounded dense />
          </div>
        </div>
      </q-page>
    </q-page-container>
    <!-- Input Code Modal -->
    <q-dialog v-model="partnerInput">
      <q-card
        class="font-proxima-nova-alt"
        style="min-width: 350px; min-height: 150px"
      >
        <q-card-section align="center" class="row">
          <div class="q-ml-auto q-mr-auto row">
            <!-- <q-input class="full-width" v-model="input_code" label="Input PIN Code" mask="# # # # # #" fill-mask /> -->
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              v-model="input_code"
              separator=""
              :num-inputs="6"
              :should-auto-focus="true"
              :is-input-num="true"
              @on-complete="handleOnComplete"
            />
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white text-center">
          <span class="text-bold text-black text-h6" style="font-size: 12px"
            >Serahkan Kepada Kasir</span
          >
          <q-card-actions align="center" class="row">
            <div class="col-5 q-mr-auto">
              <q-btn
                class="full-width text-white text-capitalize"
                v-close-popup
                :style="`background-color: #CF2E2E`"
                label="CANCEL"
                rounded
                dense
              />
            </div>
            <div class="col-5 q-ml-auto">
              <q-btn
                class="full-width text-white text-capitalize"
                :style="`background-color: black`"
                @click="redeemPartner()"
                label="REDEEM"
                rounded
                dense
              />
            </div>
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>

    <!-- Partner Success MODAL -->
    <q-dialog v-model="partnerSuccessModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <!-- <q-icon name="far fa-check-circle" color="secondary" size="sm" /> -->
          </div>
          <div class="col-4 text-h6 text-bold text-center text-black">
            Information
          </div>
          <div class="col-4 text-right text-danger">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm text-center">
            <q-icon name="far fa-check-circle" color="secondary" size="xl" />
            <div class="q-my-sm text-secondary" style="font-size: 18px">
              Success Redeem
            </div>
            <div class="q-my-sm text-black" style="font-size: 18px">
              Selamat Anda Telah Mendapatkan {{ partnerDetail.partner_info }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import Vue from 'vue'
import OtpInput from '@bachdgvn/vue-otp-input'

Vue.component('v-otp-input', OtpInput)

import LogoMVP from 'src/assets/image/logo-mvp.png'
import Ongis from 'src/assets/image/OngisSmall.png'
import ImgDetail from 'src/assets/image/ImageMerchantDetail.png'

const localStorage = JSON.parse(window.localStorage.getItem('user'))
const username = localStorage.username
const sponsorId = localStorage.sponsor_id

const localStorage2 = JSON.parse(window.sessionStorage.getItem('userd'))
const username2 = localStorage2.username
export default {
  data () {
    return {
      slide: 0,
      drawerLeft: false,
      partnerDetail: {},
      partnerInput: false,
      footer: true,
      input_code: null,
      partnerSuccessModal: false,
      LogoMVP,
      Ongis,
      ImgDetail
    }
  },
  beforeCreate () {
    if (!JSON.parse(window.sessionStorage.getItem('member'))) {
      this.$router.push('/landingpage')
    }
  },
  mounted () {
    this.getPartner()
  },
  methods: {
    getPartner () {
      this.$axios
        .get(`/sponsor/getPartnerSponsorByUsername/${username}/` + sponsorId)
        .then((response) => {
          response.data.data.cabang.forEach((data) => {
            if (`${data.id}` === this.$route.params.id) {
              this.partnerDetail = data
            }
          })
        })
    },
    handleOnComplete (value) {
      this.input_code = value
    },
    redeemPartner () {
      const notif = this.$q.notify({
        group: false,
        spinner: true,
        message: 'Please wait...',
        position: 'top'
      })
      if (parseInt(this.partnerDetail.pin_code) !== parseInt(this.input_code)) {
        notif({
          spinner: false,
          message: 'Kode Pin Salah!',
          position: 'top',
          type: 'negative'
        })
      } else {
        this.$axios
          .post(`/partner/redeem/username/${this.partnerDetail.id}`, {
            pin_code: this.input_code,
            username: username2
          })
          .then(({ data }) => {
            if (data.status === 'success') {
              notif({
                spinner: false,
                message: data.message,
                position: 'top',
                type: 'positive'
              })
              this.input_code = ''
              this.partnerInput = false
              window.setTimeout(() => {
                this.partnerSuccessModal = true
                window.setTimeout(() => {
                  this.partnerSuccessModal = false
                }, 15000)
              }, 1000)
            } else {
              notif({
                spinner: false,
                message: data.data,
                position: 'top',
                type: 'negative'
              })
            }
          })
          .catch((error) => {
            this.$q.notify.create({
              message: error.response.data.data,
              position: 'bottom',
              type: 'negative'
            })
          })
      }
    },
    logout () {
      window.sessionStorage.removeItem('userd')
      window.sessionStorage.removeItem('member')
      window.setTimeout(() => {
        const host = window.location.host
        window.location.href = window.location.protocol + '//' + host + '/landingpage'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-content {
  background-color: #FFE5BD;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
}
.header-center {
  align-self: center;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
}
</style>
<style lang="scss">
.otp-input {
  width: 25px;
  height: 30px;
  padding: 5px;
  margin: 0 3px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;

  &.error {
    border: 1px solid red !important;
  }
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
