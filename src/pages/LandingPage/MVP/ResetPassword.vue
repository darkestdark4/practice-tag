<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-roboto q-pt-lg">
        <div class="text-center">
          <q-img
            :src="LogoMVP"
            height="102px"
            width="190px"
            spinner-color="primary"
            spinner-size="40px"
          />
        </div>
        <q-card class="q-mt-xl q-mx-md text-center border-radius-30px">
          <q-card-section>
            <div class="text-h5 text-bold">Reset Password</div>
            <div class="text-subtitle2">input your phone</div>
          </q-card-section>
          <q-card-section>
            <q-input placeholder="62" v-model="data.phone" :error="$v.data.phone.$error" :error-message="validationMsg($v.data.phone)" @input="inputPhone()" type="number" standout="bg-grey-2" input-style="color: black;" rounded dense/>
            <q-btn class="text-white bg-black border-radius-30px q-mt-sm" padding="3px 40px 3px 40px" @click="loginProcess()" label="Submit" dense/>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import LogoMVP from 'src/assets/image/logo-mvp.png'
import Ongis from 'src/assets/image/OngisSmall.png'

import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  required: () => 'Form input required'
}
export default {
  data () {
    return {
      LogoMVP,
      Ongis,
      slide: 0,
      navigation: true,
      data: {
        phone: '',
        password: ''
      }
    }
  },
  validations: {
    data: {
      phone: {
        required
      }
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    inputPhone () {
      this.$nextTick(() => {
        this.data.phone = this.data.phone.replace(/\b0+/g, '62')
      })
    },
    loginProcess () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'Please wait...',
          position: 'top'
        })
        const form = {
          phone: this.data.phone
        }
        this.$axios.post('/member/reset-password', form).then(response => {
          const data = response.data
          if (data.status) {
            notif({
              spinner: false,
              message: data.message,
              progress: true,
              position: 'top',
              type: 'positive'
            })
            window.setTimeout(() => {
              const host = window.location.host
              window.location.href = window.location.protocol + '//' + host + '/landingpage/login'
            }, 1000)
          } else {
            notif({
              spinner: false,
              message: data.message,
              progress: true,
              position: 'top',
              type: 'negative'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-1 {
    background: url('../../../assets/image/mvp-login.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    padding-top: 50px;
}
.card-front {
    border-radius: 13px;
    background: #F2C581;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
}
.card-front-carousel {
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);
}
</style>
<style>
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
