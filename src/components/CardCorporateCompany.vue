<template>
  <q-card class="bg-white border-radius-10px" v-if="data">
    <div class="q-pa-lg q-my-md">
      <div
        class="q-mb-sm text-h6 text-bold font-monserrat"
        :style="`color: ${user.secondary_color || defaultSecondaryColor}`"
      >
        {{ data.name }}
      </div>
      <div class="font-proxima-nova-alt">
        <p v-html="data.description" />
      </div>
      <div class="q-mt-md row text-center">
        <div v-if="pdfFile" class="col-6">
          <q-btn
            class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
            label="View PDF"
            @click="showPDFView()"
            :style="`background: ${user.main_color || defaultMainColor}`"
          />
        </div>
        <div v-if="websiteURL" class="col-6">
          <q-btn
            class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
            label="Visit Web"
            @click="visitWeb(websiteURL)"
            :style="`background: ${user.secondary_color || defaultSecondaryColor}`"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    corporate: {
      type: Object,
      default: () => {
        return null
      }
    },
    company: {
      type: Object,
      default: () => {
        return null
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
  computed: {
    data () {
      if (this.corporate) {
        return this.corporate
      }

      return this.company
    },
    websiteURL () {
      if (this.corporate) {
        return this.corporate.website
      }

      return this.company.website
    },
    pdfFile () {
      if (this.corporate) {
        return this.corporate.pdf_file
      }

      return this.user.pdf_file
    }
  },
  methods: {
    visitWeb (link) {
      window.open(link)
    },
    showPDFView () {
      this.$emit('view-pdf')
    }
  }
}
</script>
