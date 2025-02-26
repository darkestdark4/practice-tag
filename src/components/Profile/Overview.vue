<script>
export default {
  props: {
    firstName: { type: String, default: '' },
    middleName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    profile: { type: String, default: '-' },
    email: { type: String, default: '' },
    phoneCode: { type: String },
    phoneNumber: { type: String },
    mainColor: { type: String }
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
    }
  }
}
</script>

<template>
  <q-card
    class="border-radius-10px"
    :style="`background: ${mainColor}`"
  >
    <div class="q-pa-lg q-my-md">
      <div class="column">
        <div class="col text-white text-h5 font-monserrat">
          {{ fullName }}
        </div>
        <div class="col text-white text-h6 font-proxima-nova-alt">
          {{ profile || "-" }}
        </div>
        <div class="col q-mt-md text-white font-proxima-nova-alt">Phone:</div>
        <div class="col text-white text-bold font-monserrat">
          {{ fullPhoneNumber }}
        </div>
        <div class="col q-mt-md text-white font-proxima-nova-alt">Email:</div>
        <div class="col text-white text-bold font-monserrat">
          {{ email || "-" }}
        </div>
      </div>
    </div>
  </q-card>
</template>
