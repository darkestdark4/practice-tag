<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center">
                <q-card class="card-front q-pa-md q-my-md">
                    <q-card-section class="q-my-sm flex flex-center">
                        <q-img :src="Logo" width="175px" />
                    </q-card-section>
                    <q-card-section>
                        <div class="q-my-md full-width">
                            <span class="text-grey-7">New Password</span>
                            <q-input :type="isPwd ? 'password' : 'text'"
                            v-model="data.password"
                            :error="$v.data.password.$error"
                            :error-message="validationMsg($v.data.password)"
                            placeholder="*****"
                            outlined>
                                <template v-slot:prepend>
                                    <q-icon name="lock" />
                                </template>
                                <template v-slot:append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                    />
                                </template>
                            </q-input>
                        </div>
                        <div class="q-my-md full-width">
                            <span class="text-grey-7">Confirmation Password</span>
                            <q-input
                            v-on:keyup.enter="changePassword()"
                            :type="isConfirmPwd ? 'password' : 'text'"
                            v-model="data.confirmation"
                            placeholder="*****"
                            outlined>
                                <template v-slot:prepend>
                                    <q-icon name="lock" />
                                </template>
                                <template v-slot:append>
                                    <q-icon
                                        :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isConfirmPwd = !isConfirmPwd"
                                    />
                                </template>
                            </q-input>
                        </div>
                    </q-card-section>
                    <q-card-actions class="flex flex-center">
                        <q-btn
                            label="Change Password"
                            class="q-px-md q-py-sm q-mb-md bg-secondary text-white full-width"
                            :disable="!data.password || !data.confirmation"
                            @click="changePassword()"
                            rounded
                        />
                        <!-- <q-btn
                            icon="arrow_back"
                            label="Back to login"
                            class="q-px-md q-py-sm q-mb-md bg-grey-5 text-white full-width"
                            @click="$router.push({ path: `login` })"
                            rounded
                        >
                        </q-btn> -->
                    </q-card-actions>
                </q-card>
            </q-page>
        </q-page-container>
        <q-dialog v-model="successCard" persistent>
            <q-card class="card-front-card font-fira-sans" style="max-width: 400px; padding: 8px;">
                <q-card-actions>
                    <div class="col-12 text-center">
                        <span class="text-black"
                            style="font-weight: 800; font-size: 20px; line-height: 24px; text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);">
                            SUKSES
                        </span>
                        <br>
                        <span class="text-black" style="font-weight: 500; font-size: 12px; line-height: 14px;">
                            Ini Adalah Link Kartu Nama Anda!
                        </span>
                        <br> <br>
                        <span class="text-black cursor-pointer" @click="doClose()" style="font-weight: 500; font-size: 12px; line-height: 14px;">
                            {{ windowLocation }}
                        </span>
                        <q-btn push class="" padding="5px" size="sm" dense icon="content_copy" @click="doCopy()" color="primary" />
                    </div>
                    <div class="col-4 q-ml-auto q-mr-auto q-mt-md">
                        <q-btn label="CLOSE" class="q-py-sm q-mb-sm bg-white text-black full-width"
                            v-close-popup @click="doClose()"
                            style="font-weight: 700; font-size: 12px; line-height: 14.4px; text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);"
                            rounded outlined dense />
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-layout>
</template>
<script>
import Vue from 'vue'
import Logo from 'src/assets/image/logo.png'
import { required, minLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import VueClipboard from 'vue-clipboard2'
import { Notify } from 'quasar'

const formMessages = {
  required: () => 'Form input required',
  minLength: () => 'Form input must be at least 5 characters'
}

const windowLocation = window.location.protocol + '//' + window.location.host + '/'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  data () {
    return {
      Logo,
      windowLocation,
      password: '',
      isPwd: true,
      isConfirmPwd: true,
      agree: false,
      successCard: false,
      data: {
        otp: null,
        password: null,
        confirmation: null
      }
    }
  },
  validations: {
    data: {
      password: {
        required,
        minLength: minLength(5)
      }
    }
  },
  mounted () {
    this.data.otp = this.$route.params.otp
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    doCopy () {
      this.$copyText(windowLocation).then(
        function (e) {
          Notify.create({
            message: 'Copied',
            position: 'top',
            type: 'positive'
          })
        },
        function (e) {
          Notify.create({
            message: 'Can not copy',
            position: 'top',
            type: 'negative'
          })
        }
      )
    },
    doClose () {
      window.location.href = windowLocation
    },
    changePassword () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        if (this.data.password !== this.data.confirmation) {
          this.$q.notify({
            type: 'negative',
            spinner: false,
            message: 'Password and Confirmation Password not match',
            position: 'top'
          })
        } else {
          const notif = this.$q.notify({
            group: false,
            spinner: true,
            message: 'Please wait...',
            position: 'top'
          })
          this.$axios.post('/change-password', this.data).then(response => {
            if (response.data.status) {
              notif({
                spinner: false,
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              if (this.$store.state.userdata.corporate.id === 59) {
                this.successCard = true
              } else if (this.$store.state.userdata.corporate.id === 48) {
                window.location.href = 'https://mvp.tagid.ai/landingpage/login'
              } else {
                window.location.href = windowLocation + 'login'
              }
            } else {
              notif({
                spinner: false,
                message: response.data.message,
                position: 'top',
                type: 'negative'
              })
            }
          })
        }
      }
    }
  }
}
</script>
