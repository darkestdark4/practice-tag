<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-fira-sans">
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
            <span>Tentang</span>
          </div>
          <!-- <div class="col-3 q-pa-sm text-right">
            <q-img
              :src="LogoMVP"
              height="20px"
              width="40px"
            />
          </div> -->
        </div>
        <div class="row q-mt-lg" ref="topFirst" style="background: rgba(242,197,129,1); border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;">
          <div class="col-12 text-center q-pb-xl">
            <q-img
              :src="LogoMVP"
              height="90px"
              width="180px"
              spinner-color="primary"
              spinner-size="40px"
            />
          </div>
          <div class="col-10 text-justify q-mx-auto">
              <span class="text-black text-formulir1">
                MVP adalah <span style="font-weight: 700;">Program Keanggotaan Bernilai dalam bentuk MVP Digital Virtual Card.</span>
                Dimana setiap anggota mempunyai Hak Istimewa Keanggotaan (Previlege),
                berupa Ragam Manfaat dan Reward untuk memperoleh Diskon/Cashback, Program Promosi dan/atau Manfaat
                lainnya dari Partner Merchant yang telah bergabung dan Sponsor yang mendukung program ini.
              </span>
          </div>
          <div class="col-12 text-center q-mt-xl">
              <span class="text-white text-formulir">FORMULIR PENDAFTARAN</span>
          </div>
          <div class="col-12 text-center">
              <span class="text-white text-formulir-secondary">
                  ONGISNADE - MEMBERSHIP VALUE PROGRAM
                  (MVP)
              </span>
          </div>
          <q-card class="card-front col-10">
              <q-card-actions>
                  <div class="col-12 text-center">
                      <span class="text-black" style="font-weight: 700; font-size: 30px; line-height: 40px;">
                          DAFTAR SEKARANG!
                      </span>
                      <br>
                      <span class="text-black" style="font-weight: 600; font-size: 16px; line-height: 20px;">
                          GRATIS MVP GOLD
                      </span>
                      <br>
                      <span class="text-black" style="font-weight: 400; font-size: 10px; line-height: 20px;">
                          (*Berlaku hingga 28 Februari 2023)
                      </span>
                  </div>
              </q-card-actions>
          </q-card>
          <q-card class="card-front col-10">
            <div class="col-12 text-center">
              <span class="text-black"
                  style="font-weight: 400; font-size: 14px; line-height: 25px; letter-spacing: 0.355em;">
                  LAYANAN MEMBERSHIP
              </span>
              <br>
              <q-card class="card-front" style="background: white; max-width: 65%;">
                  <q-card-actions>
                      <div class="col-12 text-center">
                          <span class="text-black cursor-pointer" @click="toWhatsapp()"
                              style="font-weight: 600; font-size: 24px; line-height: 34px;">
                              +62 817-788-722
                          </span>
                      </div>
                  </q-card-actions>
              </q-card>
              <span class="text-black" style="font-weight: 400; font-size: 16px; line-height: 20px;">
                  (WhatsApp, Chat Only)
              </span>
            </div>
          </q-card>
        </div>
        <q-card class="card-front q-mt-md" style="background: white;">
          <q-card-actions>
            <div class="col-12 text-center">
              <span class="text-black" style="font-weight: 400; font-size: 14px; line-height: 25px;">
                Daftar merchant yang telah bergabung:
              </span>
              <q-carousel v-model="slide" swipeable animated :navigation="navigation" height="250px"
                class="bg-white text-grey" control-color="grey" infinite :autoplay="autoplay">
                <template v-slot:navigation-icon="{ active, btnProps, onClick }">
                  <q-btn v-if="active"
                    style="margin: -3px; color: #2B2B2B; -webkit-text-stroke: 3px grey;"
                    size="sm" icon="horizontal_rule" flat round dense @click="onClick" />
                  <q-btn v-else style="font-size: 5px; margin: -3px;" :icon="btnProps.icon"
                    color="grey" flat round @click="onClick" />
                </template>
                <q-carousel-slide v-for="(d, index) in merchant" :key="index" :name="index"
                  style="padding: 10px 16px;">
                  <div class="col-3 q-gutter-y-sm bg-white">
                    <q-img alt="Profile Logo" :src="d.source" width="100%" height="100%" />
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
          </q-card-actions>
        </q-card>
        <div class="text-center column q-mt-xl">
          <span style="font-size: 16px; font-weight: 400; line-height: 9px;">Media Partner</span>
          <div class="text-center q-mt-md">
            <q-img
              :src="Ongis"
              height="18px"
              width="130px"
              spinner-color="primary"
              spinner-size="40px"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Merchant1 from 'src/assets/image/merchant-1.png'
import Merchant2 from 'src/assets/image/merchant-2.png'
import Merchant3 from 'src/assets/image/merchant-3.png'
import Merchant4 from 'src/assets/image/merchant-4.png'
import LogoMVP from 'src/assets/image/logo-mvp.png'
import Ongis from 'src/assets/image/OngisSmall.png'
// Vue Script Export Default Structure
export default {
  name: '',
  data () {
    return {
      LogoMVP,
      Ongis,
      merchant: [
        {
          id: 1,
          source: Merchant1
        },
        {
          id: 2,
          source: Merchant2
        },
        {
          id: 3,
          source: Merchant3
        },
        {
          id: 4,
          source: Merchant4
        }
      ],
      loadingBtn: false,
      slide: 0,
      navigation: true,
      autoplay: true,
      drawerLeft: false,
      footer: true
    }
  },
  beforeCreate () {
    if (!JSON.parse(window.sessionStorage.getItem('member'))) {
      this.$router.push('/landingpage')
    }
  },
  methods: {
    toWhatsapp () {
      window.open('https://wa.me/62817788722')
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
.page-1 {
    // background: rgba(242,197,129,1);
    background: linear-gradient(180deg, rgba(242,197,129,1) 22%, rgba(255,255,255,1) 23%);
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
}

.page-2 {
    background-color: #000000 !important;
    filter: blur(80px);
}

.text-formulir {
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.5em;
}
.text-formulir1 {
    font-weight: 400;
    font-size: 12px;
    line-height: 10px;
}

.text-formulir-secondary {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.05em;
}

.card-front {
    border-radius: 13px;
    background: #FFFFFFA8;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 130.5%;
    /* or 13px */

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

.card-front-card {
    border-radius: 13px;
    background: #ffffff;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 130.5%;
    /* or 13px */

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

.q-dialog__backdrop.fixed-full {
    backdrop-filter: blur(20px);
}
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
</style>
<style>
.q-placeholder::placeholder,
::-webkit-input-placeholder,
input::-webkit-input-placeholder,
.q-placeholder::placeholder,
::-webkit-input-placeholder,
select::-webkit-input-placeholder {
    font-size: 11px !important;
    font-weight: 300;
    font-style: italic !important;
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
