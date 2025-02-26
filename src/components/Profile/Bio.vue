<script>
export default {
  props: {
    mainColor: { type: String },
    secondaryColor: { type: String },
    name: { type: String },
    description: { type: String },
    website: { type: String },
    filePDF: { type: String }
  },
  methods: {
    visitWeb (link) {
      window.open(link)
    },
    viewPDF () {
      this.$emit('view-pdf')
    }
  }
}
</script>

<template>
  <div>
    <q-card class="bg-white border-radius-10px">
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${secondaryColor}`"
        >
          {{ name || "Company Name" }}
        </div>
        <div class="font-proxima-nova-alt">
          <p v-html="description" />
        </div>
        <div class="q-mt-md row text-center">
          <div v-if="filePDF" class="col-6">
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="View PDF"
              @click="viewPDF()"
              :style="`background: ${mainColor}`"
            />
          </div>
          <div v-if="website" class="col-6">
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="Visit Web"
              @click="visitWeb(website)"
              :style="`background: ${secondaryColor}`"
            />
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>
