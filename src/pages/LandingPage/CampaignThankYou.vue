<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-page class="constrain-web-mini page-1 font-monserrat">
          <q-card class="q-mx-md q-pa-lg border-radius-10px card-bg" align="center">
            <q-card-section style="padding: 5px;">
              <q-img height="40px" width="120px" :ratio="16/9" :src="TagLogo" />
              <div class="q-mt-md">
                <p style="font-size: 22px" class="text-bold">
                  Thank you! You've unlocked the first step!
                </p>
              </div>
            </q-card-section>
          </q-card>

          <div class="q-ma-lg text-white text-center">
            <span style="font-size: 22px; font-weight: 900; line-height: 26px; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);">
              Now, Let’s schedule a quick call with our Business Advisor to set up your account
            </span>
          </div>

          <div class="row" id="formRegistrasi" v-if="campaign">
            <div class="col-11 q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Name
              </span>
              <q-input
                dense
                outlined
                readonly
                bg-color="white"
                v-model="campaign.name"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Set Date
              </span>
              <div style="position: relative">
                <datetime
                  type="datetime"
                  :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                  :minute-step="5"
                  :min-datetime="dateNow"
                  value-zone="Asia/Jakarta"
                  :format="{
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  }"
                  v-model="dateInput"
                  class="form-datetime"
                  input-class="input-datetime"
                  readonly
                />
                <q-icon style="position: absolute; right: 10px; top: 35%" name="far fa-calendar" />
              </div>
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <q-btn
                rounded
                @click="submit()"
                id="button-bayar-tagads"
                class="text-white full-width"
                :disabled="!dateInput"
                :style="{ background: (dateInput) ? '#1A488D' : '#616161' }"
              >
                SUBMIT
              </q-btn>
            </div>
          </div>
        </q-page>
      </transition>
    </q-page-container>

    <q-inner-loading :showing="loading" :dark="true">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <q-dialog v-model="dialogSuccess" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-check-circle" color="green" text-color="white" size="md" />
          <span class="q-ml-md">Thank you for your participation!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup @click="gotoHome()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import TagLogo from 'src/assets/image/Tag.png'
import { Datetime } from 'vue-datetime'

import 'vue-datetime/dist/vue-datetime.css'

export default {
  components: {
    Datetime
  },
  data () {
    return {
      TagLogo,
      loading: false,
      dialogSuccess: false,
      timeoutChangePage: null,
      dateNow: new Date().toISOString(),
      campaign: JSON.parse(localStorage.getItem('campaign-data')),
      dateInput: null
    }
  },
  created () {
    if (!localStorage.getItem('campaign-data')) {
      this.$router.push({ path: '/campaign-free-account' })
    } 
  },
  methods: {
    gotoHome () {
      clearTimeout(this.timeoutChangePage)
      localStorage.removeItem('campaign-data')
      this.$router.push({ path: '/' })
    },
    submit () {
      this.loading = true

      if (this.dateInput && this.campaign) {
        const campaignID = this.campaign.id
        const payload = {
          date: this.dateInput
        }

        this.$axios.put(`set-meeting-campaign-netwerk/${campaignID}`, payload)
          .then(() => {
            this.dialogSuccess = true

            this.timeoutChangePage = setTimeout(() => {
              this.gotoHome()
            }, 5000)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-1 {
    background: url('../../assets/image/bg-ads-1.png'), url('../../assets/image/bg-ads-2.png');
    background-position: top, bottom;
    background-size: cover, cover;
    background-repeat: no-repeat, no-repeat;
    padding: 25px 0;
}

.card-bg {
  background: url('../../assets/image/bg-card-eclipese.png') white;
  background-position: right top;
  background-repeat: no-repeat;
}

.q-checkbox {
  font-size: 12px;
  color: white;
  margin-left: -10px;
}

.form-datetime {
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.00937em;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
  border-radius: 0;
  background: none;
  color: rgba(0, 0, 0, 0.87);
  padding: 6px 0;
}
</style>

<style>
input.input-datetime {
  outline: 0 !important;
  width: 100%;
}
</style>
