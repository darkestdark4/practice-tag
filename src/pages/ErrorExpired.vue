<template>
  <div>
    <div v-if="$store.state.style.isMobile" class="fullscreen text-center flex flex-center font-proxima-nova-alt"
      style="background: #F8FCFF">
      <img :src="img" alt="error404">
      <div style="width: 100%">
        <h5 class="text-center q-mb-md text-bold">Your Tag Account was Expired</h5>
        <p class="text-center text-grey-6">Your TAG account was expired. To activate your account again, please contact
          CS TAG.</p>
        <q-btn class="bg-secondary text-white text-capitalize q-px-xl q-mt-md" size="16px" @click="sendWa()" rounded>
          <img :src="wa" width="20" height="20">
          <div class="q-ml-sm">Contact TAG Support</div>
        </q-btn>
      </div>
    </div>
    <div v-else class="fullscreen text-center flex flex-center font-proxima-nova-alt" style="background: #F8FCFF">
      <img :src="img" alt="error404">
      <div style="width: 100%">
        <h3 class="text-center q-mb-md text-bold">Your Tag Account was Expired</h3>
        <p class="text-center text-grey-6">Your TAG account was expired. To activate your account again, please contact
          CS TAG.</p>
        <q-btn class="bg-secondary text-white text-capitalize q-px-xl q-mt-md" size="16px" @click="sendWa()" rounded>
          <img :src="wa" width="20" height="20">
          <div class="q-ml-sm">Contact TAG Support</div>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import img from 'src/assets/image/error-expired.png'
import wa from 'src/assets/image/wa-logo.png'
export default {
  name: 'ExpiredMember',
  data () {
    return {
      img,
      wa,
      adminPhone: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    sendWa () {
      window.open(`https://api.whatsapp.com/send?phone=${this.adminPhone}`)
    },
    getData () {
      const admin = this.$store.state.userdata.corporate.admin_username ? this.$store.state.userdata.corporate.admin_username : null
      axios.get(`/member/${admin}`).then(response => {
        const member = response.data.member
        const phone = member.member_phone ? member.member_phone : ''
        this.adminPhone = member.phone_code + phone
      })
    }
  }
}
</script>
