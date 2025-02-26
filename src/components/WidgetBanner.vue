<template>
  <div v-if="data.length > 0 && config">
    <q-carousel
      infinite
      animated
      swipeable
      control-color="white"
      transition-prev="jump-right"
      transition-next="jump-left"
      class="bg-primary text-white shadow-1 rounded-borders"
      v-model="slide"
      :autoplay="autoplay"
      :navigation="data.length > 1 ? true : false"
      :height="$store.state.style.isMobile ? '200px' : '300px'"
    >
      <q-carousel-slide
        class="cursor-pointer"
        v-for="(banner, index) in data"
        :key="index"
        :name="index"
        :img-src="banner.thumbnail"
        @click="showBannerModal(banner)"
      />
    </q-carousel>

    <!-- BANNER MODAL -->
    <q-dialog v-model="modal" full-width full-height>
      <q-card class="font-proxima-nova-alt">
        <q-card-section class="row">
          <div class="col-2 text-h6 text-center"></div>
          <div class="col-8 text-h6 text-center">Detail Banner</div>
          <div class="col-2 text-right">
            <q-btn
              v-close-popup
              flat round dense
              icon="close"
              @click="$emit('open')"
            />
          </div>
        </q-card-section>
        <q-card-section
          class="q-pt-none scroll"
          :style="
            $store.state.style.isMobile
              ? 'max-height: 70vh'
              : 'max-height: 80vh'
          "
        >
          <div class="row flex col-12">
            <div class="col-12 text-center">
              <q-img
                alt="Profile Logo"
                :src="selectedBanner.thumbnail || Profile"
                width="100%"
                :height="$store.state.style.isMobile ? '200px' : '300px'"
                :ratio="4 / 3"
                contain
              />
            </div>
            <div class="col-12">
              <h5 class="text-bold text-center">{{ selectedBanner.name }}</h5>
              <span v-html="selectedBanner.description" />
            </div>
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white" v-if="selectedBanner.link">
          <q-card-actions align="center">
            <q-btn
              class="full-width text-white text-capitalize"
              :style="`background-color: #116C54`"
              @click="visitWeb(selectedBanner.link)"
              label="Click Here"
              rounded
            />
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    config: {
      type: Boolean
    }
  },
  data () {
    return {
      Profile,
      slide: 0,
      modal: false,
      autoplay: true,
      selectedBanner: {
        name: null,
        description: null,
        link: null,
        thumbnail: null
      }
    }
  },
  methods: {
    showBannerModal (item) {
      this.selectedBanner.name = item.name
      this.selectedBanner.description = item.description
      this.selectedBanner.link = item.link
      this.selectedBanner.thumbnail = item.thumbnail

      this.$emit('close')
      this.modal = true
    },
    visitWeb (link) {
      window.open(link)
    }
  }
}
</script>
