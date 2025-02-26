<template>
  <div>
    <q-card
      v-if="data.length > 0"
      class="bg-white border-radius-10px"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${user.secondary_color || defaultSecondaryColor}`"
        >
          Contact
        </div>
        <div
          class="q-ml-sm q-mb-sm row"
          :key="phone.id"
          v-for="phone in data"
        >
          <div class="col-1">
            <q-icon name="phone" :style="`color: ${user.main_color || defaultMainColor}`" />
          </div>
          <div class="col-11">
            <span class="font-proxima-nova-alt">
              {{ `${phone.phone_code || "" }${phone.phone}` }}
            </span>
          </div>
        </div>
      </div>
    </q-card>
  </div>
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
  }
}
</script>
