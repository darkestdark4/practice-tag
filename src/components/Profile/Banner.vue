<script>
export default {
  props: {
    bannerData: { type: Array },
    status: { type: Boolean }
  },
  data () {
    return {
      slide: 0,
      autoplay: true,
      bannerDetail: null,
      bannerModal: false
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.style.isMobile
    }
  },
  methods: {
    showBannerModal (item) {
      this.$emit('close')
      this.bannerDetail = item
      this.bannerModal = true
    },
    visitWeb (link) {
      window.open(link)
    }
  }
}
</script>

<template>
  <div v-if="bannerData.length > 0 && status">
    <q-carousel
      v-model="slide"
      infinite
      animated
      swipeable
      control-color="white"
      transition-next="jump-left"
      transition-prev="jump-right"
      class="bg-primary text-white shadow-1 rounded-borders"
      :autoplay="autoplay"
      :height="isMobile ? '200px' : '300px'"
      :navigation="bannerData.length > 1 ? true : false"
    >
      <q-carousel-slide
        v-for="(banner, index) in bannerData"
        class="cursor-pointer"
        :key="index"
        :name="index"
        :img-src="banner.image"
        @click="showBannerModal(banner)"
      />
    </q-carousel>

    <q-dialog v-model="bannerModal" full-width full-height>
      <q-card class="font-proxima-nova-alt" v-if="bannerModal">
        <q-card-section class="row">
          <div class="col-2 text-h6 text-center"></div>
          <div class="col-8 text-h6 text-center">Detail Banner</div>
          <div class="col-2 text-right">
            <q-btn
              flat
              round
              dense
              icon="close"
              v-close-popup
              @click="$emit('open')"
            />
          </div>
        </q-card-section>
        <q-card-section
          class="q-pt-none scroll"
          :style="
            isMobile
              ? 'max-height: 70vh'
              : 'max-height: 80vh'
          "
        >
          <div class="row flex col-12">
            <div class="col-12 text-center">
              <q-img
                alt="Profile Logo"
                :src="bannerDetail.image ? bannerDetail.image : Profile"
                width="100%"
                :height="isMobile ? '200px' : '300px'"
                :ratio="4 / 3"
                contain
              />
            </div>
            <div class="col-12">
              <h5 class="text-bold text-center">{{ bannerDetail.name }}</h5>
              <span v-html="bannerDetail.description" />
            </div>
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white" v-if="bannerDetail.link">
          <q-card-actions align="center">
            <q-btn
              class="full-width text-white text-capitalize"
              :style="`background-color: #116C54`"
              @click="visitWeb(bannerDetail.link)"
              label="Click Here"
              rounded
            />
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>
  </div>
</template>
