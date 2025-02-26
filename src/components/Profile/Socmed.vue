<script>
import Vue from 'vue'
import { Notify } from 'quasar'
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

export default {
  props: {
    socmedList: { type: Array },
    socmedDetail: { type: Array },
    secondaryColor: { type: String }
  },
  data () {
    return {
      socmedModal: false,
      activeSocmed: null,
      activeSocmedDetail: [],

      socialMediaSetting: {
        facebook: { color: 'primary', icon: 'fab fa-facebook-f' },
        twitter: { color: 'info', icon: 'fab fa-twitter' },
        linkedin: { color: 'primary', icon: 'fab fa-linkedin-in' },
        instagram: { color: 'accent', icon: 'fab fa-instagram' },
        tiktok: { color: 'black', icon: 'fab fa-tiktok' }
      }
    }
  },
  methods: {
    showSocmedModal (val) {
      this.$emit('close')
      this.socmedModal = true
      this.activeSocmed = this.socmedList.find(item => {
        return item.socmed_name === val
      })

      this.activeSocmedDetail = this.socmedDetail.filter(item => {
        return item.socmed_name === val
      })
    },
    doCopyLink (link) {
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
    }
  }
}
</script>

<template>
  <div>
    <q-card
      class="bg-white border-radius-10px"
      v-if="socmedList.length > 0"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${secondaryColor}`"
        >
          Social Links
        </div>
        <div class="row flex">
          <div v-for="(socmed, index) in socmedList" :key="index" class="col-2 q-mx-sm">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                :icon="socialMediaSetting[socmed.socmed_name].icon"
                :color="socialMediaSetting[socmed.socmed_name].color"
                @click="showSocmedModal(socmed.socmed_name)"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt">
                {{ socmed.socmed_title }}
                {{ socmed.socmed_total > 1 ? `(${socmed.socmed_total})` : "" }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-dialog v-model="socmedModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px" v-if="activeSocmed">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon
              size="sm"
              :name="socialMediaSetting[activeSocmed.socmed_name].icon"
              :color="socialMediaSetting[activeSocmed.socmed_name].color"
            />
          </div>
          <div class="col-4 text-h6 text-center">
            {{ activeSocmed.socmed_title }}
          </div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(socmed, index) in activeSocmedDetail" :key="index">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title {{ socmed.socmed_name }}
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ socmed.socmed_title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link {{ socmed.socmed_name }}
              </div>
              <div class="q-my-sm">
                <span class="q-mr-md text-bold" style="font-size: 18px">
                  {{ socmed.socmed_link }}
                </span>
                <q-icon
                  size="xs"
                  name="fas fa-link"
                  :color="socialMediaSetting[activeSocmed.socmed_name].color"
                  @click="doCopyLink(socmed.socmed_link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                rounded
                label="Visit Profile"
                class="full-width bg-primary text-white text-capitalize"
                :class="`bg-${socialMediaSetting[activeSocmed.socmed_name].color}`"
                @click="visitProfileSocmed(socmed.socmed_link)"
              />
            </div>
            <div v-if="index !== activeSocmedDetail.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
