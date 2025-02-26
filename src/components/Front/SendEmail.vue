<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar class="text-primary">
      <q-toolbar-title class="text-center text-bold font-proxima-nova-alt" :style="`font-size:16px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">Send VCF to your Email</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container v-if="$store.state.style.isMobile">
      <q-page class="">
        <div class="col row q-pa-xl">
          <div class="col-12 q-my-md text-center">
            <span class="text-grey-7 text-bold">Your Email : </span>
            <div class="col row text-center q-mt-sm">
              <q-input class="col-12 q-ml-auto q-mr-auto text-center" type="email" v-model="data.email" :error="$v.data.email.$error" :error-message="validationMsg($v.data.email)" outlined />
            </div>
          </div>
          <div class="col-12 d-flex flex-column text-center">
            <q-btn
            @click="sendEmail"
            class="col-6 q-px-lg q-py-sm bg-secondary text-white" size="15px" padding="xs lg" no-caps rounded>
            <div class="">
              Send VCF
            </div>
            </q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <q-page-container v-else>
      <q-page class="">
        <div class="col row q-pa-sm">
          <div class="col-12 q-my-md text-center">
            <span class="text-grey-7 text-bold">Your Email : </span>
            <div class="col row text-center q-mt-sm">
              <q-input class="col-6 q-ml-auto q-mr-auto text-center" type="email" v-model="data.email" :error="$v.data.email.$error" :error-message="validationMsg($v.data.email)" outlined />
            </div>
          </div>
          <div class="col-6 d-flex flex-column q-mr-auto q-ml-auto text-center">
            <q-btn
              @click="sendEmail"
              class="col-6 q-px-lg q-py-sm full-width bg-secondary text-white" size="15px" padding="xs lg" no-caps rounded>
              <div class="">
                Send VCF
              </div>
            </q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Logo from 'src/assets/image/logo.png'
import Whatsapp from 'src/assets/image/wa-logo.png'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

import axios from 'axios'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

export default {
  data () {
    return {
      Logo,
      Whatsapp,
      data: {
        email: ''
      }
    }
  },
  validations: {
    data: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    sendEmail () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
      } else {
        const host = window.location.host
        const parts = host.split('.')

        const data = {
          send: 'email',
          username: parts[0],
          email: this.data.email
        }
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'Please wait...',
          position: 'top'
        })
        axios.post('/send_vcf_whatsapp', data).then(response => {
          if (response.data.status) {
            notif({
              spinner: false,
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            setTimeout(() => {
              this.$router.push({ path: '/save-card/success-send-email' })
            }, 1000)
          }
        }).catch(error => {
          const response = error.response

          notif({
            spinner: false,
            message: response.data.message,
            position: 'top',
            type: 'negative'
          })
        })
      }
    }
  }
}
</script>
