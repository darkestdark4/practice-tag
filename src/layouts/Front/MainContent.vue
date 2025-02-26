<template>
  <q-page-container>
    <div class="bawah absolute-bottom full-width">
      <q-card
        class="card-profile bg-white border-radius-10px"
        style="margin-bottom: 50px"
        flat
      >
        <q-card-section class="q-pa-md">
          <div class="row">
            <div class="col-8">
              <div class="column text-black q-ml-md">
                <div
                  class="col text-bold text-white font-monserrat"
                  style="drop-shadow(30px 10px 4px #6d6d6d)"
                  :style="{ fontSize: isMobile ? '20px' : '28px' }"
                >
                  {{ user.full_name }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="drop-shadow(30px 10px 4px #6d6d6d)"
                  :style="{ fontSize: isMobile ? '16px' : '20px' }"
                >
                  {{ user.profile || "-" }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="drop-shadow(30px 10px 4px #6d6d6d)"
                  :style="{ fontSize: isMobile ? '14px' : '16px' }"
                >
                  {{ corporate ? corporate.name : "" }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="drop-shadow(30px 10px 4px #6d6d6d)"
                  :style="{ fontSize: isMobile ? '14px' : '16px' }"
                >
                  {{ user.email }}
                </div>
                <div class="col">
                  <q-btn
                    outline
                    rounded
                    color="white"
                    icon="fab fa-whatsapp"
                    class="q-my-sm text-capitalize font-proxima-nova-alt"
                    :label="`${user.phone_code}${user.phone_number}`"
                    @click="sendWhatsapp(`${user.phone_code}${user.phone_number}`)"
                  />
                </div>

                <!-- Vaccine Info -->
                <Vaccine :data="user.vaccine" />
              </div>
            </div>
            <div class="col-4 q-mt-sm column">
              <div class="q-mb-lg" v-if="corporate">
                <img
                  class="border-radius-10px"
                  @error="handlingCompanyLogoError"
                  :width="isMobile ? '90px' : '120px'"
                  :height="isMobile ? '90px' : '120px'"
                  :src="corporate.logo || CompanyLogo"
                />
              </div>
              <div class="q-mb-lg" v-else-if="!corporate">
                <img
                  class="border-radius-10px"
                  @error="handlingCompanyLogoError"
                  :width="isMobile ? '90px' : '120px'"
                  :height="isMobile ? '90px' : '120px'"
                  :src="user.company_logo || CompanyLogo"
                />
              </div>
              <div>
                <img
                  class="border-radius-10px"
                  :src="user.logo || Logo"
                  :width="isMobile ? '90px' : '120px'"
                  :height="isMobile ? '90px' : '120px'"
                  @error="handlingProfileError"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- <vue-bottom-sheet
      ref="myBottomSheet"
      effect="fx-fadein-scale"
      @opened="switchComponent('profile')"
      :is-full-screen="true"
      max-height="95%"
      max-width="100%"
    > -->
    <swipeable-bottom-sheet ref="myBottomSheetMobile">
      <div class="q-pb-xl q-px-sm">
        <div class="card-profile" v-show="componentPage.profile">
          <Profile
            @open="openBottomSheet()"
            @close="closeBottomSheet()"
            @view-pdf="viewPDF()"
          />
        </div>
        <div class="card-bio" v-show="componentPage.bio">
          <Bio />
        </div>
        <div class="card-contact" v-show="componentPage.contact">
          <Contact />
        </div>
        <div class="card-connect" v-show="componentPage.connect">
          <Connect />
        </div>
        <div class="card-share" v-show="componentPage.share">
          <Share />
        </div>
        <div class="card-share" v-show="componentPage.shop">
          <Shop />
        </div>
        <div class="card-schedule" v-show="componentPage.addSchedule">
          <AddSchedule @close="closeBottomSheet()" />
        </div>
        <div class="card-schedule" v-show="componentPage.viewPDF">
          <ViewPdf />
        </div>
        <div class="card-schedule" v-show="componentPage.saveCard">
          <SaveCard />
        </div>
        <div class="card-bio" v-show="componentPage.shortcut">
          <Shortcut />
        </div>

        <q-dialog
          v-model="shopDialog"
          transition-show="slide-left"
          transition-hide="slide-right"
          maximized
        >
          <q-card class="bg-white border-radius-10px full-width">
            <q-toolbar>
              <q-btn flat round dense icon="arrow_back" v-close-popup />
              <q-toolbar-title
                class="text-center font-proxima-nova-alt"
                :style="`margin-left:-40px; color: ${user.secondary_color || defaultSecondaryColor}`"
              >
                Shop
              </q-toolbar-title>
            </q-toolbar>
            <iframe
              :src="user.commerce || ''"
              height="100%"
              width="100%"
            />
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="shopCommerceDialog"
          transition-show="slide-left"
          transition-hide="slide-right"
          maximized
        >
          <q-card class="bg-white border-radius-10px full-width">
            <q-toolbar>
              <q-btn flat round dense icon="arrow_back" v-close-popup />
              <q-toolbar-title
                class="text-center font-proxima-nova-alt"
                :style="`margin-left:-40px; color: ${user.secondary_color || defaultSecondaryColor}`"
              >
                Shop
              </q-toolbar-title>
            </q-toolbar>
            <iframe
              :src="corporate.commerce_group || ''"
              height="100%"
              width="100%"
            />
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="pdfDialog"
          transition-show="slide-left"
          transition-hide="slide-right"
          maximized
        >
          <q-card class="bg-white border-radius-10px full-width">
            <q-toolbar>
              <q-btn flat round dense icon="arrow_back" v-close-popup />
              <q-toolbar-title
                class="text-center font-proxima-nova-alt"
                :style="`margin-left:-40px; color: ${user.secondary_color || defaultSecondaryColor}`"
              >
                View PDF</q-toolbar-title
              >
            </q-toolbar>
            <iframe
              :src="`https://docs.google.com/viewerng/viewer?url=${corporate.pdf_file}&embedded=true`"
              frameborder="0"
              height="100%"
              width="100%"
            ></iframe>
          </q-card>
        </q-dialog>
      </div>
      <q-page-sticky position="bottom-right" :offset="[25, 15]" v-show="myBottomSheetMobile === 'open'">
        <q-fab
          icon="add"
          direction="up"
          color="white"
          text-color="primary"
        >
          <q-fab-action flat>
            <q-card
              class="border-radius-10px"
              style="margin-right: 200px; width: 220px"
            >
              <q-card-section>
                <q-list class="text-secondary">
                  <q-item
                    v-for="(menu, index) in bottomSheetMenu"
                    :key="index"
                    clickable v-ripple
                    @click="bottomSheetMenuHandler(menu.component)"
                    v-show="menu.showCondition"
                  >
                    <q-item-section avatar>
                      <q-icon
                        :style="`color: ${user.main_color || defaultMainColor}`"
                        :name="menu.icon"
                      />
                    </q-item-section>
                    <q-item-section
                      class="text-left"
                      :style="`color: ${user.main_color || defaultMainColor}`"
                    >
                      {{ menu.title }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </swipeable-bottom-sheet>
    <!-- </vue-bottom-sheet> -->

    <q-page-sticky
      position="top-right"
      :offset="[-25, 150]"
      v-if="corporate.commerce_group"
    >
      <q-btn
        class="btn-shop"
        color="black"
        @click="shopCommerceDialog = true"
        outline
      >
        <span
          class="text-capitalize font-monserrat"
          style="font-size: 18px"
          >Shop</span
        >
      </q-btn>
    </q-page-sticky>

    <q-page-sticky
      position="top-right"
      :offset="[-25, 150]"
      v-else-if="user.company_contact_website"
    >
      <q-btn
        class="btn-shop"
        color="black"
        @click="shopCommerceDialog = true"
        outline
      >
        <span
          class="text-capitalize font-monserrat"
          style="font-size: 18px"
          >Shop</span
        >
      </q-btn>
    </q-page-sticky>

    <q-page-sticky
      position="top-right"
      :offset="[-25, 250]"
      v-if="user.commerce"
    >
      <q-btn class="btn-shop" color="black" @click="shopDialog = true">
        <span
          class="text-capitalize font-monserrat"
          style="font-size: 18px"
          >Shop</span
        >
      </q-btn>
    </q-page-sticky>

    <q-page-sticky position="bottom" :offset="[15, 15]" v-show="myBottomSheetMobile === 'close'">
      <q-btn class="btn-swipeup" fab color="white" @click="openBottomSheet()">
        <q-icon
          class="text-bold"
          name="arrow_upward"
          :style="{ color: defaultMainColor }"
        />
      </q-btn>
    </q-page-sticky>
  </q-page-container>
</template>

<script>
// Components
import Profile from 'src/components/Front/Profile.vue'
import Bio from 'src/components/Front/Bio.vue'
import Contact from 'src/components/Front/Contact.vue'
import Connect from 'src/components/Front/Connect.vue'
import Share from 'src/components/Front/Share.vue'
import Shop from 'src/components/Front/Shop.vue'
import AddSchedule from 'src/components/Front/AddSchedule.vue'
import ViewPdf from 'src/components/Front/ViewPDF.vue'
import SaveCard from 'src/components/Front/SaveCard.vue'
import Shortcut from 'src/components/Front/Shortcut.vue'
import Vaccine from 'src/components/TheVaccine.vue'
import { SwipeableBottomSheet } from 'vue-swipeable-bottom-sheet'

import Logo from 'src/assets/image/TAGID-profile.jpg'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return null
      }
    },
    corporate: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  components: {
    Profile,
    Bio,
    Contact,
    Connect,
    Share,
    Shop,
    AddSchedule,
    ViewPdf,
    SaveCard,
    Shortcut,
    Vaccine,
    SwipeableBottomSheet
  },
  data () {
    return {
      Logo,
      Background,
      CompanyLogo,
      shopDialog: false,
      pdfDialog: false,
      shopCommerceDialog: false,
      componentPage: {
        profile: true,
        bio: false,
        contact: false,
        connect: false,
        share: false,
        addSchedule: false,
        viewPDF: false,
        shortcut: false
      },
      myBottomSheetMobile: 'close'
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.style.isMobile
    },
    defaultMainColor () {
      return this.$store.state.style.defaultMainColor
    },
    defaultSecondaryColor () {
      return this.$store.state.style.defaultSecondaryColor
    },
    bottomSheetMenu () {
      return [
        {
          title: 'Card Profile',
          icon: 'assignment_ind',
          component: 'profile',
          showCondition: true
        },
        {
          title: 'Detail Bio',
          icon: 'person_outline',
          component: 'bio',
          showCondition: true
        },
        {
          title: 'Contact',
          icon: 'send',
          component: 'contact',
          showCondition: this.corporate.id !== 48
        },
        {
          title: 'Connect',
          icon: 'mdi-recycle-variant',
          component: 'connect',
          showCondition: this.corporate.id !== 48
        },
        {
          title: 'Share',
          icon: 'share',
          component: 'share',
          showCondition: this.corporate.id !== 48
        },
        {
          title: 'Shop',
          icon: 'mdi-shopping-outline',
          component: 'shop',
          showCondition: this.user.commerce
        },
        {
          title: 'Add Schedule',
          icon: 'mdi-monitor-dashboard',
          component: 'schedule',
          showCondition: this.corporate.id !== 48
        },
        {
          title: 'Save Card',
          icon: 'save',
          component: 'save-card',
          showCondition: this.corporate.id !== 48
        },
        {
          title: 'Shortcut',
          icon: 'link',
          component: 'shortcut',
          showCondition: this.corporate.id !== 48
        },
        {
          title: 'Edit Profile',
          icon: 'login',
          component: 'edit-profile',
          showCondition: true
        }
      ]
    }
  },
  mounted () {
    this.$watch('$refs.myBottomSheetMobile.state', (newValue, oldValue) => {
      // The $refs.myElement has changed
      this.myBottomSheetMobile = newValue
      if (newValue === 'half') {
        this.$refs.myBottomSheetMobile.setState('close')
        this.myBottomSheetMobile = 'close'
      }
    }, { immediate: true })
  },
  methods: {
    openBottomSheet () {
      this.openMobile()
    },
    closeBottomSheet () {
      this.closeMobile()
    },
    handlingBackgroundError (event) {
      event.target.src = this.Background
    },
    handlingProfileError (event) {
      event.target.src = this.Logo
    },
    handlingCompanyLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    bottomSheetMenuHandler (val) {
      if (val === 'shop') {
        return this.showShopComponent()
      } else if (val === 'save-card') {
        return this.$router.push({ path: 'save-card' })
      } else if (val === 'edit-profile') {
        return this.toLogin()
      } else {
        return this.switchComponent(val)
      }
    },
    switchComponent (val) {
      Object.keys(this.componentPage).forEach((key) => {
        this.componentPage[key] = false
      })

      switch (val) {
        case 'profile':
          this.componentPage.profile = true
          break
        case 'bio':
          this.componentPage.bio = true
          break
        case 'contact':
          this.componentPage.contact = true
          break
        case 'connect':
          this.componentPage.connect = true
          break
        case 'share':
          this.componentPage.share = true
          break
        case 'schedule':
          this.componentPage.addSchedule = true
          break
        case 'shortcut':
          this.componentPage.shortcut = true
          break
      }
    },
    showShopComponent () {
      this.closeBottomSheet()
      this.shopDialog = true
    },
    viewPDF () {
      this.closeBottomSheet()
      this.pdfDialog = true
    },
    toLogin () {
      window.localStorage.clear()

      const host = window.location.host
      window.location.href = `${window.location.protocol}//${host}/login`
    },
    sendWhatsapp (phone) {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`)
    },
    enterRoom (link) {
      window.open(link)
    },
    halfMobile () {
      this.$refs.myBottomSheetMobile.setState('half')
    },
    openMobile () {
      if (this.$refs.myBottomSheetMobile) {
        this.$refs.myBottomSheetMobile.setState('open')
      }
    },
    closeMobile () {
      if (this.$refs.myBottomSheetMobile) {
        this.$refs.myBottomSheetMobile.setState('close')
      }
    }
  }
}
</script>

<style lang="scss">
  .bawah {
    background: linear-gradient(to bottom, transparent 0%, black 100%);
  }

  .card-profile {
    background: none !important;
  }

  .btn-swipeup {
    animation: shimmy 1s infinite;
    animation-direction: alternate;
  }

  @keyframes shimmy {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translateY(15px);
    }
  }

  .btn-shop {
    writing-mode: vertical-rl;
    text-orientation: sideways;
    transform: rotate(270deg);
  }

  .bottom-sheet__card {
    background: none !important;
  }

  .bottom-sheet__bar {
    background: white !important;
  }

  .q-fab__icon {
    color: #116c54;
    font-weight: bolder;
  }

  .q-fab__active-icon {
    color: #116c54;
    font-weight: bolder;
  }
</style>
