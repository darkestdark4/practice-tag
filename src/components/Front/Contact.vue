<template>
  <div class="q-pa-lg q-my-md font-proxima-nova-alt">
    <q-btn class="small-screen-only q-my-md q-py-sm text-capitalize full-width bg-white" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`"
      icon="fas fa-phone" label="Make a Call" @click="makeCall($store.state.userdata.user.phone_code+$store.state.userdata.user.member_phone)" rounded />
    <q-btn class="q-my-md q-py-sm text-capitalize full-width bg-white" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" icon="fab fa-whatsapp"
      label="Whatsapp" @click="sendWhatsapp($store.state.userdata.user.phone_code+$store.state.userdata.user.member_phone)" rounded />
    <q-btn class="q-my-md q-py-sm text-capitalize full-width bg-white" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" icon="far fa-envelope"
      label="Send Email" @click="sendEmail($store.state.userdata.user.member_email)" rounded />
  </div>
</template>
<script>
export default {
  methods: {
    sendEmail (email) {
      window.open('mailTo:' + email)
    },
    sendWhatsapp (phone) {
      window.open('https://wa.me/' + phone)
    },
    makeCall (phone) {
      window.open('tel:' + phone)
    }
  }
}
</script>
