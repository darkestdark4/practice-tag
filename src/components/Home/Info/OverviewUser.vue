<script>
import HomeInfoVaccine from 'src/components/Home/Info/Vaccine.vue'

export default {
  components: {
    HomeInfoVaccine
  },
  props: {
    firstName: { type: String, default: '' },
    middleName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    profile: { type: String, default: '-' },
    corporateName: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneCode: { type: String },
    phoneNumber: { type: String },
    vaccine: { type: String }
  },
  computed: {
    fullName () {
      if (this.middleName) {
        return `${this.firstName} ${this.middleName} ${this.lastName}`
      }

      return `${this.firstName} ${this.lastName}`
    },
    fullPhoneNumber () {
      if (this.phoneNumber) {
        if (this.phoneCode) {
          return `+${this.phoneCode}${this.phoneNumber}`
        } else {
          return this.phoneNumber
        }
      } else {
        return ''
      }
    },
    isMobile () {
      return this.$store.state.style.isMobile
    }
  },
  methods: {
    sendWhatsapp (phone) {
      window.open('https://api.whatsapp.com/send?phone=' + phone)
    }
  }
}
</script>

<template>
  <div class="column text-black" :class="isMobile ? '' : 'q-ml-md'">
    <div
      class="col text-bold text-white font-monserrat"
      :style="{ fontSize: isMobile ? '20px' : '28px' }"
    >
      {{ fullName }}
    </div>
    <div
      class="col text-white font-proxima-nova-alt"
      :style="{ fontSize: isMobile ? '16px' : '20px' }"
    >
      {{ profile || '-' }}
    </div>
    <div
      class="col text-white font-proxima-nova-alt"
      :style="{ fontSize: isMobile ? '14px' : '16px' }"
    >
      {{ corporateName }}
    </div>
    <div
      class="col text-white font-proxima-nova-alt"
      :style="{ fontSize: isMobile ? '14px' : '16px' }"
    >
      {{ email }}
    </div>
    <div class="col">
      <q-btn
        outline
        rounded
        color="white"
        icon="fab fa-whatsapp"
        class="q-my-sm text-capitalize font-proxima-nova-alt"
        :label="fullPhoneNumber"
        @click="sendWhatsapp(`${phoneCode}${phoneNumber}`)"
      />
    </div>
    <HomeInfoVaccine :vaccine="vaccine" />
  </div>
</template>
