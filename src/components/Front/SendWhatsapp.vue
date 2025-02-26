<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-white">
            <q-toolbar class="text-primary">
            <q-toolbar-title class="text-center text-bold font-proxima-nova-alt" :style="`font-size:16px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">Send VCF to your Whatsapp</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container v-if="$store.state.style.isMobile">
            <q-page class="">
                <div class="col row q-pa-sm">
                    <div class="col-12 q-my-md text-center">
                        <span class="text-grey-7">Your Whatsapp Number</span>
                        <div class="col row text-center q-mt-sm ">
                            <q-input class="col-3 q-mr-md q-ml-md text-center q-ml-auto" v-model="data.code" outlined />
                            <q-input class="col-8 text-center q-mr-auto" type="number" @input="inputPhone" v-model="data.nomor" outlined />
                        </div>
                    </div>
                    <div class="col-11 d-flex flex-column text-center q-mr-auto q-ml-auto q-py-lg">
                        <q-btn @click="sendWA()" class="col-6 q-px-lg full-width q-py-sm bg-secondary text-white" size="15px" padding="xs lg" no-caps rounded>
                            <div class="">
                                Send VCF
                            </div>
                        </q-btn>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <q-page-container v-else>
            <q-page>
                <div class="col row q-pa-sm">
                    <div class="col-12 q-my-md text-center">
                        <span class="text-grey-7">Your Whatsapp Number</span>
                        <div class="col row text-center q-mt-sm ">
                            <q-input class="col-1 q-mr-md q-ml-md text-center q-ml-auto" v-model="data.code" :error="$v.data.code.$error" :error-message="validationMsg($v.data.code)" outlined />
                            <q-input class="col-6 text-center q-mr-auto" type="number" @input="inputPhone" v-model="data.nomor" :error="$v.data.nomor.$error" :error-message="validationMsg($v.data.nomor)" outlined />
                        </div>
                    </div>
                    <div class="col-6 d-flex flex-column text-center q-mr-auto q-ml-auto q-py-lg">
                        <q-btn @click="sendWA()" class="col-6 q-px-lg full-width q-py-sm bg-secondary text-white" size="15px" padding="xs lg" no-caps rounded>
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
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

import axios from 'axios'

const formMessages = {
  required: () => 'Form input required'
}
export default {
  data () {
    return {
      Logo,
      Whatsapp,
      data: {
        nomor: '',
        code: '+62'
      }
    }
  },
  validations: {
    data: {
      nomor: {
        required
      },
      code: {
        required
      }
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    inputPhone () {
      this.$nextTick(() => {
        this.data.nomor = this.data.nomor.replace(/^0+/, '')
      })
    },
    sendWA () {
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
          send: 'whatsapp',
          username: parts[0],
          phone_number: this.data.nomor
        }
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'Please wait...',
          position: 'top',
          timeout: 15000
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
              this.$router.push({ path: '/save-card/success-send-wa' })
            }, 500)
          }
        }).catch(_error => {
          notif({
            spinner: false,
            message: _error,
            position: 'top',
            type: 'negative'
          })
        })
      }
    }
  }
}
</script>
