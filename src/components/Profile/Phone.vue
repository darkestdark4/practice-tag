<script>
export default {
  props: {
    mainColor: { type: String },
    secondaryColor: { type: String },
    phoneData: { type: Array }
  }
}
</script>

<template>
  <q-card
    v-if="phoneData.length > 0"
    class="bg-white border-radius-10px"
  >
    <div class="q-pa-lg q-my-md">
      <div
        class="q-mb-sm text-h6 text-bold font-monserrat"
        :style="`color: ${secondaryColor}`"
      >
        Contact
      </div>
      <div
        v-for="phone in phoneData"
        :key="phone.id"
        class="q-ml-sm q-mb-sm row"
      >
        <div class="col-1">
          <q-icon
            name="phone"
            :style="`color: ${mainColor}`"
          />
        </div>
        <div class="col-11">
          <span class="font-proxima-nova-alt">
            {{ phone.phone_number }}
          </span>
        </div>
      </div>
    </div>
  </q-card>
</template>
