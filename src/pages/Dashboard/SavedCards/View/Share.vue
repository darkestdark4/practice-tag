<template>
  <q-card class="q-pa-sm text-secondary bg-white border-radius-10px font-proxima-nova-alt">
    <q-card-section class="flex-center column">
      <div class="col qr-code">
        <img :src="qrGenerate" width="250px" height="250px" style="border-radius:25px">
      </div>
      <div class="col" :style="`color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">Scan Barcode or Share With Link :</div>
      <div class="col" :style="`color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">{{ link }}</div>
      <div class="q-pa-md col">
        <q-btn class="text-white text-capitalize" label="Copy Link" @click="doCopyLink()" :style="`background: ${data.member.main_color ? data.member.main_color : '#116C54'}`" flat rounded />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import QRCode from 'qrcode'
import { Notify } from 'quasar'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  data () {
    return {
      qrGenerate: '',
      link: window.location.protocol + '//' + this.$route.params.username + '.tagid.ai',
      data: {
        member: {}
      }
    }
  },
  mounted () {
    this.getData()
    QRCode.toDataURL(this.link).then(url => {
      this.qrGenerate = url
    })
  },
  methods: {
    getData () {
      this.$axios.get('/member/' + this.$route.params.username).then(response => {
        this.data.member = response.data.member
        this.checkExtensionBackground(this.data.member.background)
      })
    },
    doCopyLink () {
      this.$copyText(this.link).then(function (e) {
        Notify.create({
          message: 'Copied',
          position: 'bottom',
          type: 'positive'
        })
      }, function (e) {
        Notify.create({
          message: 'Can not copy',
          position: 'bottom',
          type: 'negative'
        })
      })
    }
  }
}
</script>
