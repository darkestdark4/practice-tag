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
                            <span class="text-grey-7">Your Email</span>
                            <q-input type="email" v-model="data.email" :error="$v.data.email.$error" :error-message="validationMsg($v.data.email)" placeholder="email@yourmail.com" outlined>
                                <template v-slot:prepend>
                                    <q-icon name="mail" />
                                </template>
                            </q-input>
                        </div>
                        <div class="q-my-md full-width">
                            <span class="text-grey-7">Your Password</span>
                            <q-input :type="isPwd ? 'password' : 'text'" v-model="data.password" :error="$v.data.password.$error" :error-message="validationMsg($v.data.password)" placeholder="*****" outlined>
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
                              <span class="text-bold text-secondary cursor-pointer" @click="$router.push({ path: `/forgot-password` })">Click here</span>
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
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

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
        required,
        email
      },
      password: {
        required
      }
    }
  },
  mounted () {
    // window.localStorage.clear()
    // const host = window.location.host
    // const parts = host.split('.')
    // const username = parts[0]
    // if (host !== 'the-netwerk.co.id' && host !== 'tagid.ai') {
    //   if (parts.length > 1) {
    //     parts.splice(0, 1)
    //     const url = parts.join('.')
    //     window.location.href = window.location.protocol + '//' + username + '.' + url + '/login'
    //   }
    // }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    loginProcess () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
      } else {
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'Please wait...',
          position: 'top'
        })
        const form = this.data
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
            // this.$q.notify({
            //   message: data.message,
            //   progress: true,
            //   position: 'top',
            //   type: 'positive'
            // })
            this.$store.dispatch('auth/submitLoggedIn', true)
            this.$store.dispatch('userdata/submitUser', response.data.data)
            this.$store.dispatch('userdata/submitCompany', response.data.data.company)
            this.$store.dispatch('userdata/submitName', response.data.data.username)
            window.localStorage.setItem('userd', JSON.stringify(response.data.data))
            window.sessionStorage.setItem('userd', JSON.stringify(response.data.data))
            const host = window.location.host
            const parts = host.split('.')
            const userr = response.data.data.username
            const namee = parts[0]
            this.addFriend(namee, userr)
            // if (parts.length > 2) {
            //   window.location.href = window.location.protocol + '//' + host + '/dashboard'
            //   } else {
            //   // window.location.href = window.location.protocol + '//' + username + parts[1] + '.' + parts[2] + '.' + parts[3] + '/dashboard'
            //   window.location.href = window.location.protocol + '//' + username + '.' + host + '/dashboard'
            // }
            // // window.location.href = window.location.protocol + '//' + host + '/dashboard/saved-cards/add'
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
    },
    toSignUp () {
      window.location.href = 'https://tagid.ai/#pricing'
    },
    addFriend (uu, uuu) {
      const data = {
        username: uuu,
        url_friend: 'https://' + uu + '.tagid.ai'
      }
      this.$axios.post('/member/phonebook', data).then(response => {
        this.$q.notify({
          spinner: true,
          message: 'Please wait...',
          position: 'top'
        })
        if (response.data.status) {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          window.setTimeout(function () {
            const host = window.location.host
            const parts = host.split('.')
            window.location.href = window.location.protocol + '//' + uuu + '.' + parts[1] + '.' + parts[2] + '/save-card/success-login'
            // window.location.href = window.location.protocol + '//' + uuu + '.' + parts[1] + '.' + parts[2] + '/dashboard'
          }, 1500)
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    }
  }
}
</script>
