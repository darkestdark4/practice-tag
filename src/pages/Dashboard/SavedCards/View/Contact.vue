<template>
  <div class="q-pa-lg q-my-md font-proxima-nova-alt">
    <q-btn class="small-screen-only q-my-md q-py-sm text-capitalize full-width bg-white" :style="`color: ${data.member.main_color ? data.member.main_color : '#116C54'}`"
      icon="fas fa-phone" label="Make a Call" @click="makeCall(data.member.phone_code+data.member.member_phone)" rounded />
    <q-btn class="q-my-md q-py-sm text-capitalize full-width bg-white" :style="`color: ${data.member.main_color ? data.member.main_color : '#116C54'}`" icon="fab fa-whatsapp"
      label="Whatsapp" @click="sendWhatsapp(data.member.phone_code+data.member.member_phone)" rounded />
    <q-btn class="q-my-md q-py-sm text-capitalize full-width bg-white" :style="`color: ${data.member.main_color ? data.member.main_color : '#116C54'}`" icon="far fa-envelope"
      label="Send Email" @click="sendEmail(data.member.member_email)" rounded />
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        member: {}
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/member/' + this.$route.params.username).then(response => {
        this.data.member = response.data.member
        this.checkExtensionBackground(this.data.member.background)
      })
    },
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
