<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini body-merchant font-proxima-nova">
        <div class="row q-pt-md q-px-sm">
          <span class="col-12 text-left text-bold q-my-sm">
            <q-input
              class="full-width"
              dense
              placeholder="Search ..."
              v-model="search"
              outlined
            />
          </span>
          <q-img
            :src="IlunaMerchant"
          />
          <div class="row col-12">
            <span class="col-8 q-my-md text-bold">Member Merchant</span>
            <q-icon
              name="apps"
              class="cursor-pointer col-1 offset-2 text-right"
              :style="layout === 'grid' ? 'color: #FD9F57' : 'color: #BDBDBD'"
              size="sm"
              @click="
                changeLayout('grid');
              "
            />
            <q-icon
              name="view_headline"
              class="cursor-pointer col-1 text-right"
              :style="layout === 'list' ? 'color: #FD9F57' : 'color: #BDBDBD'"
              size="sm"
              @click="
                changeLayout('list');
              "
            />
          </div>
        </div>
        <div class="row" v-if="layout === 'grid'">
          <q-card
            class="col-5 q-mx-auto q-py-sm text-center column items-center cursor-pointer text-bold"
            v-for="(d,index) in dataComputed"
            @click="popupModal(d)"
            :key="d.id"
            :style="`${evenOdd(index) ? `background: url(${BGOrange})` : `background: url(${BGGrey})`}; background-position: 50% 50%; background-repeat: no-repeat; background-size: cover;`"
          >
            <q-avatar :size="$store.state.style.isMobile ? '60px' : '70px'">
              <q-img
                class="rounded-borders"
                style="border-radius: 50%;"
                :src="d.member_profile ? d.member_profile : Profile"
                width="60px"
              />
            </q-avatar>
            <span>{{ d.member_name }}</span>
          </q-card>
        </div>
        <div class="row q-px-sm" v-if="layout === 'list'">
          <q-card
            class="col-12 q-pa-md q-my-sm text-left row items-center cursor-pointer text-bold"
            v-for="(d,index) in dataComputed"
            @click="popupModal(d)"
            :key="d.id"
            :style="`${evenOdd(index) ? `background: url(${BGOrange})` : `background: url(${BGGrey})`}; background-position: 50% 50%; background-repeat: no-repeat; background-size: cover;`"
          >
            <q-avatar :size="$store.state.style.isMobile ? '60px' : '70px'">
              <q-img
                class="rounded-borders"
                style="border-radius: 50%;"
                :src="d.member_profile ? d.member_profile : Profile"
                width="60px"
              />
            </q-avatar>
            <span>{{ d.member_name }}</span>
          </q-card>
        </div>
        <div v-if="data.length > 6 && dataExpand === 'collapse'" align="center" class="bg-white full-width q-my-md">
          <q-btn
            style="color: #FD9F59;"
            class="full-width text-capitalize"
            label="Show More"
            icon="expand_more"
            @click="dataExpand = 'more'"
            flat
          />
        </div>
      </q-page>
      <q-dialog v-model="modalDetail" persistent maximized>
        <q-card class="column flex-center q-pa-sm">
          <div class="fit" style="max-width: 425px;">
            <div class="text-right">
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary"
                  >Close</q-tooltip
                >
              </q-btn>
            </div>
            <div class="column text-center items-center q-mb-md">
              <q-avatar :size="$store.state.style.isMobile ? '60px' : '70px'">
                <q-img
                  class="rounded-borders"
                  :src="
                    dataDetail.member_profile
                      ? dataDetail.member_profile
                      : Profile
                  "
                  :width="$store.state.style.isMobile ? '60px' : '70px'"
                  :height="$store.state.style.isMobile ? '60px' : '70px'"
                />
              </q-avatar>
              <span class="text-bold q-pt-sm">{{ dataDetail.member_name }}</span>
            </div>
            <div class="row col-12 q-px-sm">
              <span class="col-8 q-my-md text-bold">Member Merchant</span>
              <q-icon
                name="apps"
                class="cursor-pointer col-1 offset-2 text-right"
                :style="layoutProduk === 'grid' ? 'color: #FD9F57' : 'color: #BDBDBD'"
                size="sm"
                @click="
                  changeLayoutProduk('grid');
                "
              />
              <q-icon
                name="view_headline"
                class="cursor-pointer col-1 text-right"
                :style="layoutProduk === 'list' ? 'color: #FD9F57' : 'color: #BDBDBD'"
                size="sm"
                @click="
                  changeLayoutProduk('list');
                "
              />
            </div>
            <div class="row q-my-md text-white">
              <q-btn class="col-5 rounded-borders" size="sm" label="Produk" @click="changeTab('product')" :style="tab === 'product' ? 'background: #FD9F59;' : 'background: #D9D9D9;'" />
              <q-btn class="col-5 offset-2 rounded-borders" size="sm" label="Deskripsi" @click="changeTab('description')" :style="tab === 'description' ? 'background: #FD9F59;' : 'background: #D9D9D9;'" />
            </div>

            <!-- <q-carousel
              v-if="layout === 'carousel'"
              v-model="slide"
              transition-prev="jump-right"
              transition-next="jump-left"
              swipeable
              animated
              control-color="teal"
              arrows
              class="bg-white text-black"
            >
              <q-carousel-slide
                v-for="(d, index) in dataDetail.file"
                :key="d.id"
                :name="index"
              >
                <q-img class="rounded-borders q-mx-auto items-center" :src="d.file"
                :class="$store.state.style.isMobile ? '' : 'full-height'"
                :style="$store.state.style.isMobile ? 'width: 100%' : 'max-width: 100%'"
                style="display: block;" />
              </q-carousel-slide>
            </q-carousel> -->
            <div
              v-if="tab === 'product' && layoutProduk === 'grid'"
              class="row q-pt-none text-center q-mb-md"
              style="min-height: 52vh; width: 100%"
            >
              <div
                class="col-4 col-sm-4 col-md-4 col-xs-4 q-mb-sm column text-center items-center"
                v-for="(data, index) in dataDetail.file"
                :key="index"
              >
                <q-img
                  class="rounded-borders"
                  :src="data.file ? data.file : Profile"
                  :width="$store.state.style.isMobile ? '60px' : '100px'"
                  :height="$store.state.style.isMobile ? '60px' : '100px'"
                />
                <!-- <q-avatar :size="$store.state.style.isMobile ? '60px' : '70px'">
                </q-avatar> -->
                <span class="text-bold q-mt-sm">{{ data.name }}</span>
              </div>
            </div>

            <div
              v-else-if="tab === 'product' && layoutProduk === 'list'"
              class="column q-pt-none text-center"
              style="min-height: 54vh; width: 100%"
            >
              <q-carousel
                v-model="slide"
                transition-prev="jump-right"
                transition-next="jump-left"
                swipeable
                animated
                control-color="teal"
                arrows
                class="bg-white text-black"
              >
                <q-carousel-slide
                  v-for="(d, index) in dataDetail.file"
                  :key="d.id"
                  :name="index"
                >
                  <q-img class="rounded-borders q-mx-auto items-center" :src="d.file"
                  :class="$store.state.style.isMobile ? '' : 'full-height'"
                  :style="$store.state.style.isMobile ? 'width: 100%' : 'max-width: 100%'"
                  style="display: block;" />
                </q-carousel-slide>
              </q-carousel>
            </div>

            <div class="column q-mb-md" style="min-height: 52vh" v-if="tab === 'description'">
              <span class="col-12 text-left" v-html="dataDetail.description" />
            </div>

            <div align="center" class="bg-white text-white full-width q-my-md">
              <q-btn
                style="background: #FD9F59;"
                class="full-width q-mb-md"
                label="Contact"
                @click="sendWhatsapp(dataDetail.member_phone)"
              />
            </div>
          </div>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import IlunaMerchant from 'src/assets/image/IlunaMerchant.png'
import BGOrange from 'src/assets/image/BGOrange.jpg'
import BGGrey from 'src/assets/image/BGGrey.jpg'

const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  data () {
    return {
      data: [],
      dataDetail: [],
      Profile,
      IlunaMerchant,
      BGOrange,
      BGGrey,
      modalDetail: false,
      layout: 'grid',
      layoutProduk: 'grid',
      tab: 'product',
      dataExpand: 'collapse',
      search: '',
      slide: 0,
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  },
  watch: {
    modalDetail (newValue, oldValue) {
      this.tab = 'product'
      this.slide = 0
      this.layoutProduk = 'grid'
    },
    layout (newValue, oldValue) {
      this.dataExpand = 'collapse'
    }
  },
  computed: {
    dataComputed () {
      if (this.search !== '') {
        return this.data.filter((d) => d.member_name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        if (this.dataExpand === 'collapse') {
          return this.data.slice(0, 6)
        } else {
          return this.data
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios
        .get(`member/merchant/list?username=${username}`)
        .then((response) => {
          this.data = response.data.data
          this.style = response.data.data[0].id
        })
    },
    popupModal (data) {
      this.modalDetail = true
      this.dataDetail = data
      // this.slide = data
    },
    sendWhatsapp (phone) {
      window.open(`https://wa.me/${phone}`)
    },
    changeLayout (index) {
      this.layout = index
    },
    changeLayoutProduk (index) {
      this.layoutProduk = index
    },
    changeTab (index) {
      this.tab = index
    },
    evenOdd (number) {
      if (number % 2 === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.body-merchant {
  background: white;
  width: 100%;
  height: 100%;
}
.q-carousel__slide,
.q-carousel .q-carousel--padding {
  padding: 6px 16px;
}
</style>
