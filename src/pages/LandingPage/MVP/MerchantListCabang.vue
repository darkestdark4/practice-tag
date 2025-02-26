<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini font-roboto" style="background: #D9D9D9;">
        <q-drawer
          v-model="drawerLeft"
          content-class="bg-warning"
          :width="200"
          :breakpoint="500"
          overlay
        >
          <q-scroll-area class="fit">
            <div class="q-pa-xs">
              <div class="row">
                <div class="col-3 q-ml-auto text-right">
                  <q-btn flat round dense icon="chevron_right" @click="drawerLeft = !drawerLeft" />
                </div>
              </div>
              <div class="text-bold drawer-content q-px-lg q-py-sm cursor-pointer" @click="$router.push('/landingpage/about')">
                Tentang MVP
              </div>
              <div class="text-bold drawer-content q-px-lg q-py-sm q-mt-sm cursor-pointer" @click="$router.push('/landingpage/merchant-list')">
                Merchant List
              </div>
            </div>
            <q-footer v-model="footer" class="row bg-warning" reveal>
              <div class="col-10 q-mx-auto q-py-sm">
                <q-btn class="full-width" color="black" label="Logout" @click="logout()" rounded dense />
              </div>
            </q-footer>
          </q-scroll-area>
        </q-drawer>
        <div class="row" style="background: #F2C581;">
          <div class="col-3 text-left">
            <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
          </div>
          <div class="col-6 text-center header-center">
            <span>Pilih Merchant</span>
          </div>
          <div class="col-12 q-pa-sm">
            <q-input placeholder="Cari Nama Merchant" v-model="search" type="text" standout="bg-white" bg-color="white" input-style="color: black;" rounded dense/>
          </div>
          <div class="col-12 q-pa-sm">
            <span class="content">Total Poin: {{ totalRedeem }}</span>
          </div>
          <!-- <div class="col-3 q-pa-sm text-right">
            <q-img
              :src="LogoMVP"
              height="20px"
              width="40px"
            />
          </div> -->
        </div>
        <div class="row q-pa-md items-center text-center">
          <q-card class="col-5 q-px-sm q-mx-auto q-mb-md cursor-pointer border-radius-10px" @click="$router.push(`/landingpage/merchant-detail/${d.id}`)"
          v-for="(d, index) in partnerFilter" :key="index">
            <img class="q-py-sm border-radius-10px" :src="d.partner_image" rounded>
            <div class="row q-pb-sm items-center">
              <div class="col-5 bg-red-14 border-radius-10px text-center text-white">
                {{ d.partner_info }}
              </div>
              <div style="font-size: 12px;" :class="d.partner_info != null ? 'col-6 q-ml-sm' : 'col-12'">{{ d.partner_name }}</div>
            </div>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import LogoMVP from 'src/assets/image/logo-mvp.png'
import Ongis from 'src/assets/image/OngisSmall.png'

const localStorage = JSON.parse(window.localStorage.getItem('user'))
const username = localStorage.username
const sponsorId = localStorage.sponsor_id

const localStorageUser = JSON.parse(window.sessionStorage.getItem('userd'))
const usernameUser = localStorageUser.username

export default {
  data () {
    return {
      slide: 0,
      drawerLeft: false,
      partnerList: [],
      totalRedeem: '',
      search: '',
      footer: true,
      LogoMVP,
      Ongis
    }
  },
  computed: {
    partnerFilter () {
      if (this.search !== '') {
        return this.partnerList.filter((d) => d.partner_name.toLowerCase().includes(this.search.toLowerCase()))
      } else {
        return this.partnerList
      }
    }
  },
  beforeCreate () {
    if (!JSON.parse(window.sessionStorage.getItem('member'))) {
      this.$router.push('/landingpage')
    }
  },
  mounted () {
    this.drawerLeft = false
    this.getPartner()
    this.getRedeemPartner()
  },
  methods: {
    getPartner () {
      this.$axios
        .get(`/sponsor/getPartnerSponsorByUsername/${username}/` + sponsorId)
        .then((response) => {
          this.partnerList = response.data.data.cabang.filter((d) => d.partner_id === this.$route.params.id)
        })
    },
    getRedeemPartner () {
      this.$axios
        .get(`/sponsor/getPartnerSponsorByUsername/${usernameUser}/` + sponsorId)
        .then((response) => {
          this.totalRedeem = response.data.data.countRedeen
        })
    },
    logout () {
      window.sessionStorage.removeItem('userd')
      window.sessionStorage.removeItem('member')
      window.setTimeout(() => {
        const host = window.location.host
        window.location.href = window.location.protocol + '//' + host + '/landingpage'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-content {
  background-color: #FFE5BD;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
}
.header-center {
  align-self: center;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
}
.content {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
}
.q-drawer--left {
  left: auto;
}
</style>
<style>
.q-drawer--left {
  left: auto;
}
</style>
