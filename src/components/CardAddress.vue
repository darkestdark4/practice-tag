<template>
  <q-card v-if="data" class="bg-white border-radius-10px">
    <div class="q-pa-lg q-my-md">
      <div
        class="text-h6 text-bold font-monserrat"
        :style="`color: ${user.secondary_color || defaultSecondaryColor}`"
      >
        Address
      </div>
      <div class="q-mt-sm">
        <div
          v-for="address in data"
          :key="address.id"
          class="row q-mb-lg"
        >
          <div class="col-1">
            <div v-if="address.type">
              <q-icon
                size="sm"
                name="home"
                class="q-mr-sm"
                v-if="address.type.toLowerCase() === 'home'"
                :style="`color: ${user.main_color || defaultMainColor}`"
              />
              <q-icon
                size="sm"
                class="q-mr-sm"
                name="apartment"
                v-else-if="address.type.toLowerCase() === 'apartment'"
                :style="`color: ${user.main_color || defaultMainColor}`"
              />
            </div>
            <q-icon
              v-else
              size="sm"
              class="q-mr-sm"
              name="business"
              :style="`color: ${user.main_color || defaultMainColor}`"
            />
          </div>
          <div class="col-11 column font-proxima-nova-alt">
            <span class="col" style="font-size: 14px">
              {{ address.address }}
            </span>
            <q-btn
              label="View Map"
              style="width: 87px; font-size: 10px; height: auto"
              class="col text-white q-py-xs text-capitalize"
              @click="linkToMaps(address.address)"
              :style="`background: ${user.main_color || defaultMainColor}`"
            />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    user: {
      type: Object,
      default: () => {
        return null
      }
    },
    defaultMainColor: {
      type: String
    },
    defaultSecondaryColor: {
      type: String
    }
  },
  methods: {
    linkToMaps (address) {
      window.open(`https://maps.google.com/?q=${address}`)
    }
  }
}
</script>
