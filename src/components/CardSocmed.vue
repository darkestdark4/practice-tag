<template>
  <div>
    <q-card class="bg-white border-radius-10px" v-if="data.length > 0">
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${user.secondary_color || defaultSecondaryColor}`"
        >
          Social Links
        </div>
        <div class="row flex">
          <div v-for="(socmed, index) in category" :key="index">
            <div v-if="socmed.total > 0" class="col-2 q-mx-sm">
              <div class="column flex flex-center">
                <q-btn
                  @click="showSocmedModal(socmed.name)"
                  :icon="`fab fa-${socmed.name}`"
                  :color="getSocmedColor(socmed.name)"
                  class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                />
                <small class="col q-mb-md text-center font-proxima-nova-alt">
                  {{ socmed.name }}
                  {{ socmed.total > 1 ? `(${socmed.total})` : '' }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-dialog v-model="modal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon
              size="sm"
              :name="`fab fa-${selectedData.name}`"
              :color="getSocmedColor(selectedData.name)"
            />
          </div>
          <div class="col-4 text-h6 text-center">{{ selectedData.name }}</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(socmed, index) in selectedData.data" :key="index">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title {{ socmed.name }}
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ socmed.title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link {{ socmed.name }}
              </div>
              <div class="q-my-sm">
                <span class="q-mr-md text-bold" style="font-size: 18px">
                  {{ socmed.link }}
                </span>
                <q-icon
                  name="fas fa-link"
                  color="info"
                  size="xs"
                  @click="copyLink(socmed.link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                class="full-width bg-info text-white text-capitalize"
                label="Visit Profile"
                @click="visitWeb(socmed.link)"
                rounded
              />
            </div>
            <div v-if="index !== selectedData.total - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { Notify } from 'quasar'
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return null
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    category: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultSecondaryColor: {
      type: String
    }
  },
  data () {
    return {
      modal: false,
      selectedData: {
        data: [],
        total: 0,
        name: null
      }
    }
  },
  methods: {
    visitWeb (link) {
      window.open(link)
    },
    copyLink (link) {
      this.$copyText(link).then(
        function (e) {
          Notify.create({
            message: 'Copied',
            position: 'bottom',
            type: 'positive'
          })
        },
        function (e) {
          Notify.create({
            message: 'Can not copy',
            position: 'bottom',
            type: 'negative'
          })
        }
      )
    },
    showSocmedModal (name) {
      this.selectedData.name = name
      this.selectedData.total = this.category.find(item => item.name === name).total
      this.selectedData.data = this.data.filter(item => item.name === name)

      this.$emit('close')
      this.modal = true
    },
    getSocmedColor (name) {
      let color = 'primary'

      switch (name) {
        case 'instagram':
          color = 'accent'
          break
        case 'twitter':
          color = 'info'
          break
        case 'youtube':
          color = 'negative'
          break
        case 'tiktok':
          color = 'black'
          break
      }

      return color
    }
  }
}
</script>

<style lang="scss">
.button-sosmed {
  width: 56px !important;
  padding: 10px;
}
</style>
