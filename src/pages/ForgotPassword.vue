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
              <span class="text-grey-7">Enter Your Email</span>
              <q-input v-on:keyup.enter="resetPassword()" v-model="data.email" outlined placeholder="email@netwerk.com">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions class="flex flex-center">
            <q-btn label="Send Reset Link" icon-right="send"
              class="q-px-md q-py-sm q-mb-md bg-secondary text-white full-width" :disable="!data.email"
              @click="resetPassword()" rounded />
            <q-btn icon="arrow_back" label="Back to login"
              class="q-px-md q-py-sm q-mb-md bg-secondary text-white full-width"
              @click="$router.push({ path: `login` })" rounded>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Logo from 'src/assets/image/logo.png'
const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  data () {
    return {
      Logo,
      password: '',
      isPwd: true,
      agree: false,
      data: {
        username: username,
        emailDefault: '',
        email: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('member/' + this.data.username).then(response => {
        if (response.data.status) {
          this.data.emailDefault = response.data.member.member_email
        }
      })
    },
    resetPassword () {
      // if (this.data.email != this.data.emailDefault) {
      //   this.$q.notify({
      //     type: 'negative',
      //     spinner: false,
      //     message: 'Email not match',
      //     position: 'top'
      //   })
      // } else {
      const notif = this.$q.notify({
        group: false,
        spinner: true,
        message: 'Please wait...',
        position: 'top'
      })
      this.$axios.post('/reset-password', this.data).then(response => {
        if (response.data.status) {
          notif({
            spinner: false,
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
        } else {
          if (this.data.email !== this.data.emailDefault) {
            notif({
              type: 'negative',
              spinner: false,
              message: 'Email not match',
              position: 'top'
            })
          }
          notif({
            spinner: false,
            message: response.data.message,
            position: 'top',
            type: 'negative'
          })
        }
      }).catch(error => {
        if (error.response) {
          notif({
            spinner: false,
            message: error.response.data.message,
            position: 'top',
            type: 'negative'
          })
        }
      })
      // }
    }
  }
}
</script>
