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
            <div class="text-h3 text-bold">Login</div>
            <div class="text-subtitle2">to your account</div>
          </q-card-section>
          <q-card-section>
            <q-input placeholder="62" v-model="data.phone" :error="$v.data.phone.$error" :error-message="validationMsg($v.data.phone)" @input="inputPhone()" type="number" standout="bg-grey-2" input-style="color: black;" rounded dense/>
            <div class="text-subtitle2 text-left text-grey-4">*Terkoneksi dengan whatsapp</div>
            <q-input placeholder="Password" v-model="data.password" :error="$v.data.password.$error" :error-message="validationMsg($v.data.password)" type="password" standout="bg-grey-2" input-style="color: black;" rounded dense/>
            <div class="text-left text-black cursor-pointer" style="margin-top: -10px;" @click="$router.push('reset-password')">Lupa Password?</div>
            <q-btn class="text-white bg-black border-radius-30px q-mt-sm" padding="3px 40px 3px 40px" @click="loginProcess()" label="Login" dense/>
            <div class="text-subtitle2 q-mt-md">Belum punya akun?</div>
            <q-btn class="text-black border-radius-30px" to="/landingpage/register" padding="3px 40px 3px 40px" label="Daftar" dense/>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Merchant1 from 'src/assets/image/merchant-1.png'
import Merchant2 from 'src/assets/image/merchant-2.png'
import Merchant3 from 'src/assets/image/merchant-3.png'
import Merchant4 from 'src/assets/image/merchant-4.png'
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
      merchant: [
        {
          id: 1,
          source: Merchant1
        },
        {
          id: 2,
          source: Merchant2
        },
        {
          id: 3,
          source: Merchant3
        },
        {
          id: 4,
          source: Merchant4
        }
      ],
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
      },
      password: {
        required
      }
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    toSignUp () {
      window.location.href = 'https://tagid.ai/#pricing'
    },
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
          phone: this.data.phone,
          password: this.data.password
        }
        this.$axios.post('/member/login', form).then(response => {
          const data = response.data
          if (data.status) {
            notif({
              spinner: false,
              message: data.message,
              progress: true,
              position: 'top',
              type: 'positive'
            })
            // this.$store.dispatch('auth/submitLoggedIn', true)
            // this.$store.dispatch('userdata/submitUser', response.data.data)
            // this.$store.dispatch('userdata/submitCompany', response.data.data.company)
            // window.localStorage.setItem('userd', JSON.stringify(response.data.data))
            // window.localStorage.setItem('member', JSON.stringify(response.data.data.member))
            if (response.data.data.member.corporate_id !== 48) {
              notif({
                spinner: false,
                message: 'Anda Bukan Anggota MVP!',
                progress: true,
                position: 'top',
                type: 'negative'
              })
              this.data = {
                phone: '',
                password: ''
              }
            } else {
              window.sessionStorage.setItem('userd', JSON.stringify(response.data.data))
              window.sessionStorage.setItem('member', JSON.stringify(response.data.data.member))
              window.setTimeout(() => {
                const host = window.location.host
                window.location.href = window.location.protocol + '//' + host + '/landingpage/merchant-list'
              }, 1000)
            }
          } else {
            if (data.message) {
              if (data.message === 'Your email not found!') {
                notif({
                  spinner: false,
                  message: 'Your phone number not found!',
                  progress: true,
                  position: 'top',
                  type: 'negative'
                })
              } else {
                notif({
                  spinner: false,
                  message: data.message,
                  progress: true,
                  position: 'top',
                  type: 'negative'
                })
              }
            } else {
              notif({
                spinner: false,
                message: data.message,
                progress: true,
                position: 'top',
                type: 'negative'
              })
            }
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
