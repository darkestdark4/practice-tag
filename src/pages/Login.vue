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
                            <span class="text-grey-7">Your Email or Your Phone</span>
                            <q-input type="email" v-model="data.email" :error="$v.data.email.$error" :error-message="validationMsg($v.data.email)" placeholder="email@yourmail.com or 082312345678" outlined>
                                <template v-slot:prepend>
                                    <q-icon name="mail" />
                                </template>
                            </q-input>
                        </div>
                        <div class="q-my-md full-width">
                            <span class="text-grey-7">Your Password</span>
                            <q-input v-on:keyup.enter="loginProcess()" :type="isPwd ? 'password' : 'text'" v-model="data.password" :error="$v.data.password.$error" :error-message="validationMsg($v.data.password)" placeholder="*****" outlined>
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
                    </q-card-section>
                    <q-card-actions class="flex flex-center">
                        <q-btn
                            label="Login"
                            class="q-px-md q-py-sm q-mb-md bg-secondary text-white full-width"
                            @click="loginProcess()"
                            :disable="!data.email || !data.password"
                            rounded
                        />
                        <div class="text-center">
                          <div class="col-12">
                              <span class="text-grey-7">Dont have an account? </span>
                              <span class="text-bold text-secondary cursor-pointer" @click="toSignUp()">Sign Up</span>
                          </div>
                          <div class="col-12">
                              <span class="text-grey-7">Forgot your password? </span>
                              <span class="text-bold text-secondary cursor-pointer" @click="$router.push({ path: `forgot-password` })">Click here</span>
                          </div>
                        </div>
                    </q-card-actions>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>
import Logo from 'src/assets/image/logo.png'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

const host = window.location.host
const parts = host.split('.')
const username = parts[0]

export default {
  data () {
    return {
      Logo,
      data: {
        email: '',
        password: ''
      },
      isPwd: true
    }
  },
  validations: {
    data: {
      email: {
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
        let form = {}
        if (isNaN(this.data.email)) {
          form = {
            email: this.data.email,
            password: this.data.password,
            username: username
          }
        } else {
          form = {
            phone: this.data.email,
            password: this.data.password,
            username: username
          }
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
            this.$store.dispatch('auth/submitLoggedIn', true)
            this.$store.dispatch('userdata/submitUser', response.data.data)
            this.$store.dispatch('userdata/submitCompany', response.data.data.company)
            window.localStorage.setItem('userd', JSON.stringify(response.data.data))
            window.sessionStorage.setItem('userd', JSON.stringify(response.data.data))
            if (this.$store.state.userdata.corporate.id === 48) {
              window.setTimeout(() => {
                const host = window.location.host
                window.location.href = window.location.protocol + '//' + host + '/dashboard/profile'
              }, 1000)
            } else {
              window.setTimeout(() => {
                const host = window.location.host
                window.location.href = window.location.protocol + '//' + host + '/dashboard'
              }, 1000)
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
        })
      }
    }
  }
}
</script>
