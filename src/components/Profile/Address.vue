<script>
export default {
  props: {
    mainColor: { type: String },
    secondaryColor: { type: String },
    addressMember: { type: Array },
    addressCorporate: { type: Array }
  },
  computed: {
    addressData () {
      if (this.addressMember.length > 0) {
        return this.addressMember.map(item => {
          return {
            id: item.id,
            type: item.address_type,
            address: item.address
          }
        })
      } else if (this.addressCorporate) {
        return this.addressCorporate.map(item => {
          return {
            id: item.id,
            type: 'business',
            address: item.corporate_address
          }
        })
      }

      return null
    }
  },
  methods: {
    linkToMaps (val) {
      window.open(`https://maps.google.com/?q=${val}`)
    },
    getIconName (val) {
      if (val.toLowerCase() === 'home' || val.toLowerCase() === 'apartment') {
        return val.toLowerCase()
      } else {
        return 'business'
      }
    }
  }
}
</script>

<template>
  <q-card class="bg-white border-radius-10px" v-if="addressData">
    <div class="q-pa-lg q-my-md">
      <div
        class="text-h6 text-bold font-monserrat"
        :style="`color: ${secondaryColor}`"
      >
        Address
      </div>
      <div class="q-mt-sm">
        <div
          v-for="(address, index) in addressData"
          :key="index"
          class="row q-mb-lg"
        >
          <div class="col-1 text-center">
            <q-icon
              size="sm"
              class="q-mr-sm"
              :name="getIconName(address.type)"
              :style="`color: ${mainColor}`"
            />
          </div>
          <div class="col-9 q-ml-sm column font-proxima-nova-alt">
            <span class="col" style="font-size: 12px">
              {{ address.address || "Alamat tidak terdefinisi" }}
            </span>
            <q-btn
              class="text-white q-py-xs text-capitalize"
              label="View Map"
              @click="linkToMaps(address.address)"
              style="width: 80px; font-size: 10px"
              :style="`background: ${mainColor}`"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
