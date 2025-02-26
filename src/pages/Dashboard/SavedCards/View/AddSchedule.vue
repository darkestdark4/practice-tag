<template>
  <q-card class="bg-white border-radius-10px font-proxima-nova-alt">
    <q-card-section>
      <q-toolbar>
        <q-toolbar-title
          class="text-center font-proxima-nova-alt"
          :style="`margin-left:40px; color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Schedule a Meeting</q-toolbar-title
        >
        <q-btn
          class="text-right"
          flat
          round
          dense
          icon="close"
          @click="close"
        />
      </q-toolbar>
    </q-card-section>
    <q-card-section>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Phone Number*</span>
        <div class="col row">
          <select class="col-4 q-mr-xs" v-model="data.phone_code">
            <option
              v-for="(phone, idx) in phoneCodeList"
              :key="idx"
              :value="phone.value"
            >
              {{ phone.label }}
            </option>
          </select>
          <q-input
            class="col-7"
            type="number"
            v-model="data.phone"
            onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
            placeholder=""
            outlined
          />
        </div>
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Email*</span>
        <q-input
          class="full-width"
          type="email"
          v-model="data.email"
          :error="$v.data.email.$error"
          :error-message="validationMsg($v.data.email)"
          placeholder="email@netwerk.com"
          outlined
        />
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Meeting Topic*</span>
        <q-input
          class="full-width"
          v-model="data.topik"
          :error="$v.data.topik.$error"
          :error-message="validationMsg($v.data.topik)"
          placeholder="Just Meeting"
          outlined
        />
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Type of Meeting*</span>
        <div class="q-gutter-sm">
          <q-radio
            v-model="data.type_meeting"
            :error="$v.data.type_meeting.$error"
            val="offline"
            label="Offline"
          />
          <q-radio
            v-model="data.type_meeting"
            :error="$v.data.type_meeting.$error"
            val="online"
            label="Online"
          />
        </div>
        <small>{{ validationMsg($v.data.type_meeting) }}</small>
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Date From*</span>
        <!-- format="yyyy-MM-dd HH:mm:ss" -->
        <datetime
          type="datetime"
          :phrases="{ ok: 'Continue', cancel: 'Exit' }"
          :minute-step="5"
          :min-datetime="dateNow"
          :format="{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
          }"
          :error="$v.data.due.$error"
          v-model="data.date"
          readonly
        ></datetime>
        <small class="text-negative">{{ validationMsg($v.data.date) }}</small>
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Date To*</span>
        <!-- format="yyyy-MM-dd HH:mm:ss" -->
        <datetime
          type="datetime"
          :phrases="{ ok: 'Continue', cancel: 'Exit' }"
          :minute-step="5"
          :min-datetime="data.date"
          :format="{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
          }"
          :error="$v.data.due.$error"
          v-model="data.due"
          readonly
        ></datetime>
        <small class="text-negative">{{ validationMsg($v.data.due) }}</small>
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Meeting Description*</span>
        <q-input
          class="full-width"
          type="textarea"
          v-model="data.deskripsi"
          placeholder="A Creative Technology Company 10 years experience in digital industry, we believe the keys of success in business are able to FORECAST & ADAPT."
          outlined
          :error="$v.data.deskripsi.$error"
          :error-message="validationMsg($v.data.deskripsi)"
        />
      </div>
    </q-card-section>
    <q-card-actions class="q-pb-md flex-center">
      <q-btn
        class="full-width text-white text-capitalize"
        label="Create Schedule"
        :disable="!data.phone"
        @click="saveMeeting()"
        :style="`background-color: ${
          $store.state.userdata.user.main_color
            ? $store.state.userdata.user.main_color
            : '#116C54'
        }`"
        rounded
      />
    </q-card-actions>
  </q-card>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import { Datetime } from 'vue-datetime'
// import datetime from 'vuejs-datetimepicker'
import axios from 'axios'
import moment from 'moment'
import 'vue-datetime/dist/vue-datetime.css'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

export default {
  components: {
    Datetime
  },
  validations: {
    data: {
      email: {
        required,
        email
      },
      topik: {
        required
      },
      type_meeting: {
        required
      },
      date: {
        required
      },
      due: {
        required
      },
      deskripsi: {
        required
      },
      phone: {
        required
      }
    }
  },
  data () {
    return {
      phoneCodeList: [],
      dateNow: new Date().toISOString().substring(0, 10),
      datee: null,
      duee: null,
      data: {
        username: this.$route.params.username,
        phone_code: 62,
        phone: null,
        email: null,
        topik: null,
        type_meeting: 'online',
        status: 'REVIEW',
        date: moment(this.datee).format('YYYY-M-DD, hh:mm'),
        due: moment(this.duee).format('YYYY-M-DD, hh:mm'),
        deskripsi: null
      }
    }
  },
  mounted () {
    this.getPhoneCodeCountries()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    close () {
      this.$emit('close')
    },
    getPhoneCodeCountries () {
      axios
        .get('https://api.the-netwerk.com/api/all/csc/countries')
        .then((response) => {
          this.phoneCodeList = response.data.data.map((data) => {
            return {
              label: `${data.name} (+${data.phonecode})`,
              value: data.phonecode
            }
          })
        })
    },
    customFormatter (date) {
      return moment(date).format('Do MM YYYY, h:mm:ss')
    },
    saveMeeting () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        const data = this.data
        this.data.phone = this.data.phone_code + this.data.phone
        this.$q.loading.show({
          message: 'Adding data'
        })
        this.$axios
          .post('/member/meeting', data)
          .then((response) => {
            this.$emit('close')
            this.$q.notify({
              message: response.status
                ? 'Success add schedule'
                : 'Failed add schedule',
              position: 'top',
              type: response.status ? 'positive' : 'negative'
            })
            this.$q.loading.hide()
            this.data = {
              username: this.$route.params.username,
              phone: null,
              email: null,
              topik: null,
              type_meeting: 'online',
              status: 'REVIEW',
              date: null,
              due: null,
              deskripsi: null
            }
            window.setTimeout(function () {
              location.reload()
            }, 1000)
          })
          .catch((error) => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
      }
    }
  }
}
</script>
<style lang="scss">
#tj-datetime-input {
  padding: 25px 10px !important;
}

.year-month-wrapper {
  background-color: #17478f !important;
}

.nav-r {
  background-color: #17478f !important;
}

.nav-l {
  background-color: #17478f !important;
}

.activePort {
  background-color: #17478f !important;
}

.okButton {
  color: #17478f !important;
}

.days {
  color: #17478f !important;
}
</style>
