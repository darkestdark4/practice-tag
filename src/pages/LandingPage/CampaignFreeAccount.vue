<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-page class="constrain-web-mini page-1 font-monserrat">
          <div class="row items-center" style="color: white; cursor: pointer" @click="gotoHome()">
            <q-icon name="fas fa-arrow-left" style="padding: 24px 16px" />
            <p style="font-size: 18px; margin: 0; padding: 0; font-weight: 700;">Back</p>
          </div>

          <q-card class="q-mx-md q-pa-lg border-radius-10px card-bg" align="center">
            <q-card-section style="padding: 5px;">
              <q-img height="40px" width="120px" :ratio="16/9" :src="TagLogo" />
              <div class="q-mt-md">
                <p style="font-size: 22px" class="text-bold">
                  Thank you for your interest in TagID!
                </p>
                <p style="font-size: 14px;" class="q-mt-md">
                  We know the struggle of overflowing business card holders and outdated information. That's why we created TagID, <b>the future of digital networking.</b>
                </p>
                <p style="font-size: 14px;" class="q-mt-md">
                  <b>Upgrade your networking game with TagID!</b> It's a <b>sleek, digital</b> business card that lets you ditch the paper chase and <b>connect like a boss.</b>
                </p>
              </div>
            </q-card-section>
          </q-card>

          <div class="q-ma-lg text-white text-center">
            <span style="font-size: 22px; font-weight: 900; line-height: 26px; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);">
              Ready to join the networking revolution?
              <br><br>
              Claim Your Free TagID Account
            </span>
          </div>

          <div class="row" id="formRegistrasi">
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Name
              </span>
              <q-input
                dense
                outlined
                bg-color="white"
                placeholder="Name"
                v-model="input.name"
                :error="errorListener.name.status"
                :error-message="errorListener.name.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Title (Job Position)
              </span>
              <q-input
                dense
                outlined
                bg-color="white"
                placeholder="Title (Job Position)"
                v-model="input.title"
                :error="errorListener.title.status"
                :error-message="errorListener.title.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Email
              </span>
              <q-input
                dense
                outlined
                type="email"
                bg-color="white"
                placeholder="Email"
                v-model="input.email"
                :error="errorListener.email.status"
                :error-message="errorListener.email.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400">
                Country
              </span>
              <q-select
                outlined dense
                map-options emit-value
                behavior="menu"
                bg-color="white"
                label="Select country"
                v-model="input.country"
                :options="countries"
                @input="selectCountry()"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Phone Number
              </span>
              <div style="display: flex; flex-direction: column;">
                <q-input
                  dense
                  outlined
                  type="number"
                  bg-color="white"
                  placeholder="Phone Number (081xxxxxxxx)"
                  v-model="input.phoneNumber"
                  :prefix="input.phoneCode"
                  :error="errorListener.phone_number.status"
                  :error-message="errorListener.phone_number.message"
                  :hide-bottom-space="true"
                  onkeydown="
                    return event.keyCode !== 69 &&
                    event.keyCode != 189 &&
                    event.keyCode != 187 &&
                    event.keyCode != 190
                  "
                />
              </div>
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
                Company Name
              </span>
              <q-input
                dense
                outlined
                bg-color="white"
                placeholder="Company Name"
                v-model="input.companyName"
                :error="errorListener.company_name.status"
                :error-message="errorListener.company_name.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400">
                Company Size
              </span>
              <q-select
                outlined dense
                map-options emit-value
                behavior="menu"
                bg-color="white"
                label="Select your company size"
                :options="companySize"
                v-model="input.companySize"
                :error="errorListener.company_size.status"
                :error-message="errorListener.company_size.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400">
                Industry
              </span>
              <q-select
                outlined dense
                map-options emit-value
                behavior="menu"
                bg-color="white"
                label="Select your company industry"
                :options="companyIndustry"
                v-model="input.industry"
                :error="input.industry === 'Other' ? false : errorListener.industry.status"
                :error-message="errorListener.industry.message"
                :hide-bottom-space="true"
              />
              <q-input
                dense
                outlined
                bg-color="white"
                class="q-mt-sm"
                placeholder="Other Industry"
                v-model="input.otherIndustry"
                v-show="input.industry === 'Other'"
                :error="errorListener.industry.status"
                :error-message="errorListener.industry.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400">
                Why are you interested in using TagID?
              </span>
              <q-select
                outlined dense
                map-options emit-value
                behavior="menu"
                bg-color="white"
                label="Select your reason"
                :options="companyReason"
                v-model="input.interest"
                :error="input.interest === 'Other' ? false : errorListener.reason_interest.status"
                :error-message="errorListener.reason_interest.message"
                :hide-bottom-space="true"
              />
              <q-input
                dense
                outlined
                bg-color="white"
                class="q-mt-sm"
                placeholder="Other reason"
                v-model="input.otherInterest"
                v-show="input.interest === 'Other'"
                :error="errorListener.reason_interest.status"
                :error-message="errorListener.reason_interest.message"
                :hide-bottom-space="true"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <p style="font-size: 12px; color: white">
                We would like to keep you updated on TagID news and product developments.
                By checking the box below, you agree to receive occasional emails from us.
                You can unsubscribe at any time.
              </p>
              <q-checkbox
                v-model="input.agreement"
                label="I agree to receive emails from TagID"
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <q-btn
                rounded
                @click="submit()"
                id="button-bayar-tagads"
                class="text-white full-width"
                :disable="!input.agreement"
                :style="{ background: (input.agreement) ? '#1A488D' : '#616161' }"
              >
                CLAIM
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
          <q-btn flat label="Close" color="primary" v-close-popup @click="gotoThankYouPage()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import TagLogo from 'src/assets/image/Tag.png'

export default {
  data () {
    return {
      TagLogo,
      companySize: [
        { label: '1 - 10 employees', value: '1 - 10' },
        { label: '11 - 50 employees', value: '11 - 50' },
        { label: '51 - 250 employees', value: '51 - 250' },
        { label: '251 - 1000 employees', value: '251 - 1000' },
        { label: '1000+ employees', value: '1000+' }
      ],
      companyIndustry: [
        { label: 'Technology', value: 'Technology' },
        { label: 'Marketing & Sales', value: 'Marketing & Sales' },
        { label: 'Finance & Accounting', value: 'Finance & Accounting' },
        { label: 'Healthcare', value: 'Healthcare' },
        { label: 'Education', value: 'Education' },
        { label: 'Other', value: 'Other' }
      ],
      companyReason: [
        { label: 'Reduce paper waste and be more eco-friendly', value: 'Reduce paper waste and be more eco-friendly' },
        { label: 'Easy to share contact information', value: 'Easy to share contact information' },
        { label: 'Looks more professional than a physical business card', value: 'Looks more professional than a physical business card' },
        { label: 'Integrates with my social media profiles', value: 'Integrates with my social media profiles' },
        { label: 'Includes a call to action (e.g., link to website)', value: 'Includes a call to action (e.g., link to website)' },
        { label: 'Tracks how many people view my card', value: 'Tracks how many people view my card' },
        { label: 'Other', value: 'Other' }
      ],
      countries: [],
      input: {
        name: null,
        title: null,
        country: null,
        email: null,
        phoneNumber: null,
        phoneCode: null,
        companyName: null,
        companySize: null,
        industry: null,
        otherIndustry: null,
        interest: null,
        otherInterest: null,
        agreement: false
      },
      errorListener: {
        name: { status: false, message: '' },
        title: { status: false, message: '' },
        email: { status: false, message: '' },
        phone_number: { status: false, message: '' },
        company_name: { status: false, message: '' },
        company_size: { status: false, message: '' },
        industry: { status: false, message: '' },
        reason_interest: { status: false, message: '' }
      },
      loading: false,
      dialogSuccess: false,
      timeoutChangePage: null
    }
  },
  created () {
    this.fetchCountry()
  },
  watch: {
    'input.industry': function (val) {
      if (val !== 'Other') {
        this.input.otherIndustry = null
      }
    },
    'input.interest': function (val) {
      if (val !== 'Other') {
        this.input.otherInterest = null
      }
    },
  },
  methods: {
    gotoHome () {
      this.$router.push({ path: '/' })
    },
    fetchCountry () {
      this.$axios.get('csc/countries')
        .then((res) => {
          const { data } = res.data
          this.countries = data.map(country => {
            return {
              label: country.name,
              value: country.id,
              phoneCode: country.phonecode
            }
          })
        })
    },
    selectCountry () {
      const searchCountry = this.countries.find(country => {
        return country.value === this.input.country
      })

      if (searchCountry) {
        this.input.phoneCode = searchCountry.phoneCode
      }
    },
    gotoThankYouPage () {
      clearTimeout(this.timeoutChangePage)
      this.$router.push({ path: '/campaign-thank-you' })
    },
    resetValidation () {
      Object.keys(this.errorListener).forEach((item) => {
        this.errorListener[item].status = false
        this.errorListener[item].message = ''
      })
    },
    submit () {
      this.loading = true
      this.resetValidation()

      const input = this.input

      // set industry
      let industry = input.industry
      if (input.industry === 'Other') {
        industry = input.otherIndustry
      }

      // set interest
      let interest = input.interest
      if (input.interest === 'Other') {
        interest = input.otherInterest
      }

      const formInput = {
        name: input.name,
        title: input.title,
        email: input.email,
        phone_number: input.phoneNumber,
        phone_code: input.phoneCode,
        company_name: input.companyName,
        company_size: input.companySize,
        industry: industry,
        reason_interest: interest
      }

      this.$axios.post('campaign-netwerk', formInput)
        .then((res) => {
          const { data } = res.data

          const storeCampaignData = {
            id: data.id,
            name: data.name,
          }
          localStorage.setItem('campaign-data', JSON.stringify(storeCampaignData))

          this.dialogSuccess = true

          this.timeoutChangePage = setTimeout(() => {
            this.gotoThankYouPage()
          }, 5000)
        })
        .catch(error => {
          const { data } = error.response.data

          if (data) {
            const keys = Object.keys(data)
            keys.forEach((item) => {
              this.errorListener[item].status = true
              this.errorListener[item].message = data[item][0]
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
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

.q-placeholder {
  font-weight: 200;
}

input.q-field__native[type="number"]::-webkit-inner-spin-button {
	display: none
}

input.q-field__native[type="number"] {
	-moz-appearance: textfield;
}
</style>
