<script>
import TagLogo from 'src/assets/image/icon.png'
import FreeGold from 'src/assets/image/free-gold.png'
import Background from 'src/assets/image/TAGID-circle.gif'
import VideoExample from 'src/assets/video-example.mp4'

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

import HomeInfoUser from 'src/components/Home/Info/User.vue'
import HomeBackground from 'src/components/Home/HomeBackground.vue'
import HomeBottomSheet from 'src/components/Home/HomeBottomSheet.vue'
import WebsiteButton from 'src/components/WebsiteButton.vue'
import CommerceButton from 'src/components/CommerceButton.vue'
import ButtonSwipeUp from 'src/components/ButtonSwipeUp.vue'
import MenuHome from 'src/components/Menu/Home/Index.vue'

const localStorage = JSON.parse(window.localStorage.getItem('user'))
const username = localStorage.username

export default {
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

    HomeBackground,
    HomeBottomSheet,
    HomeInfoUser,
    WebsiteButton,
    CommerceButton,
    ButtonSwipeUp,
    MenuHome
  },
  metaInfo: {
    meta: [
      {
        name: 'Title',
        content: `Hi my name is ${username}, let's get connected!`
      },
      {
        name: 'og:title',
        content: `Hi my username is ${username}, let's get connected!`
      },
      {
        name: 'og:description',
        content:
          'Get your TAG and explore our powerful features to boost your business.'
      },
      {
        name: 'og:content',
        content: 'TAGID.gif'
      }
    ]
    // Get your TAG and explore our powerful features to boost your business.
    // Hi my name is _username_, let's get connected!
  },
  data () {
    return {
      TagLogo,
      Background,
      VideoExample,
      FreeGold,
      srcSaveCard: window.location.protocol + '//' + window.location.host + '/save-card',
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageCorporateBg: 'https://api.the-netwerk.com/storage/app/public/corporate/background/',
      shopDialog: false,
      pdfDialog: false,
      video: false,
      pwaDialog: false,

      componentPageActive: 'Profile',

      // handling bottom sheet
      bsDesktop: false,
      bsMobile: '',

      pollingActive: {},
      pollingModal: false,
      myBottomSheetMobile: 'close'
    }
  },
  computed: {
    user () {
      return this.$store.state.userdata.user
    },
    corporate () {
      const corporate = this.$store.state.userdata.corporate

      // detect dialog box for only netwerk user
      // if (corporate.id == 1) {
      //   this.campaignDialog = true
      // }

      return corporate
    },
    isMobile () {
      return this.$store.state.style.isMobile
    }
  },
  beforeMount () {
    if (this.user.corporate_id === 48) {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        this.installEvent = e
        this.pwaDialog = true
      })
    }
    this.checkExtensionBackground(this.user.background)
  },
  mounted () {
    this.closeBottomSheet()
    this.getPollingActive()
  },
  methods: {
    handleClickPolling (direction) {
      if (direction === 'right') {
        const data = {
          pollingValue: 'yes'
        }
        window.localStorage.setItem('participatePolling', true)
        this.$axios.post('/polling/' + this.pollingActive.id, data)
          .then((response) => {
            this.$q.notify({
              message: 'Success Polling',
              position: 'top',
              type: 'positive'
            })
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (direction === 'left') {
        const data = {
          pollingValue: 'no'
        }
        window.localStorage.setItem('participatePolling', true)
        this.$axios.post('/polling/' + this.pollingActive.id, data)
          .then((response) => {
            this.$q.notify({
              message: 'Success Polling',
              position: 'top',
              type: 'positive'
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
      window.setTimeout(() => {
        this.pollingActive = {}
        this.pollingModal = false
      }, 500)
    },
    handleSwipe ({ evt, ...newInfo }) {
      if (newInfo.direction === 'right') {
        const data = {
          pollingValue: 'yes'
        }
        window.localStorage.setItem('participatePolling', true)
        this.$axios.post('/polling/' + this.pollingActive.id, data)
          .then((response) => {
            this.$q.notify({
              message: 'Success Polling',
              position: 'top',
              type: 'positive'
            })
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (newInfo.direction === 'left') {
        const data = {
          pollingValue: 'no'
        }
        window.localStorage.setItem('participatePolling', true)
        this.$axios.post('/polling/' + this.pollingActive.id, data)
          .then((response) => {
            this.$q.notify({
              message: 'Success Polling',
              position: 'top',
              type: 'positive'
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
      window.setTimeout(() => {
        this.pollingActive = {}
        this.pollingModal = false
      }, 500)
    },
    checkExtensionBackground (filename) {
      const imageExtensionLists = [
        'jpeg', 'jpg', 'png',
        'gif', 'tiff', 'raw',
        'bin'
      ]
      const videoExtensionLists = [
        'webm', 'mkv', 'mp4',
        'avi', 'mov', 'mpg',
        'mpeg', '3gp'
      ]

      if (filename) {
        const fileExtension = filename.split('.').pop()
        if (imageExtensionLists.includes(fileExtension)) {
          this.video = false
        } else if (videoExtensionLists.includes(fileExtension)) {
          this.video = true
        } else {
          this.user.background = null
        }
      }
    },
    installPWA () {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        // this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          this.pwaDialog = false
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },
    getPollingActive () {
      this.$axios
        .get('/polling/' + username)
        .then((response) => {
          const participate = window.localStorage.getItem('participatePolling')
          if (!participate) {
            const polling = response.data.data.map((data) => {
              return {
                id: data.id,
                title: data.title,
                question: data.question,
                is_expired: data.is_expired,
                option: data.option
              }
            })
            polling.forEach((data) => {
              if (data.option === 'swipe') {
                this.pollingActive = data
                this.pollingModal = true
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    openBottomSheet () {
      this.bsMobile = 'open'

      if (!this.isMobile) {
        this.bsDesktop = true
      }
    },
    closeBottomSheet () {
      this.bsMobile = 'close'

      if (!this.isMobile) {
        this.bsDesktop = false
      }
    },
    toggleMenuComponent (val) {
      if (val === 'shop') {
        if (!this.isMobile) {
          this.bsDesktop = false
        } else {
          this.bsMobile = 'close'
        }

        this.shopDialog = true
      } else if (val === 'save_card') {
        this.$router.push({ path: 'save-card' })
      } else if (val === 'edit_profile') {
        window.localStorage.clear()
        const host = window.location.host
        window.location.href = window.location.protocol + '//' + host + '/login'
      }

      // add here if there's new menu in homepage (submit name and component name)
      switch (val) {
        case 'profile':
          this.componentPageActive = 'Profile'
          break
        case 'bio':
          this.componentPageActive = 'Bio'
          break
        case 'contact':
          this.componentPageActive = 'Contact'
          break
        case 'connect':
          this.componentPageActive = 'Connect'
          break
        case 'share':
          this.componentPageActive = 'Share'
          break
        case 'shop':
          this.componentPageActive = 'Shop'
          break
        case 'schedule':
          this.componentPageActive = 'AddSchedule'
          break
        case 'viewPDF':
          this.componentPageActive = 'ViewPdf'
          break
        case 'shortcut':
          this.componentPageActive = 'Shortcut'
          break
        default:
          this.componentPageActive = 'Profile'
          break
      }
    },
    showViewPdfComponent () {
      if (!this.isMobile) {
        this.bsDesktop = false
      } else {
        this.bsMobile = 'close'
      }

      this.pdfDialog = true
    },
    getBackground (type = 'image') {
      const userBg = this.user.background
      const corporateBg = this.corporate.background
      const linkStorage = this.linkStorageBg

      if (type === 'image') {
        if (userBg) {
          return corporateBg ? `${this.linkStorageCorporateBg}${userBg}` : `${linkStorage}${userBg}`
        } else {
          return this.Background
        }
      } else if (type === 'video') {
        if (userBg && corporateBg) {
          return `${this.linkStorageCorporateBg}${corporateBg}`
        } else {
          return this.VideoExample
        }
      }
    },
    getPDFViewerURL (val) {
      return `https://docs.google.com/viewerng/viewer?url=${this.linkStoragePdf}${val}&embedded=true`
    }
  }
}
</script>

<template>
  <div>
    <HomeBackground
      :type="video ? 'video' : 'image'"
      :background="getBackground()"
    >
      <q-page-container>
        <!-- User info in front of the homepage -->
        <HomeInfoUser :user="user" :corporate="corporate" />

        <!-- Place for bottom sheet & homepage menu when bottom button are hit -->
        <HomeBottomSheet
          :showDesktop.sync="bsDesktop"
          :showMobile.sync="bsMobile"
        >
          <div class="q-pb-xl q-px-sm">
            <!-- Showing component from menu when bottom sheet is open -->
            <component
              @open="openBottomSheet"
              @close="closeBottomSheet"
              @view-pdf="showViewPdfComponent"
              :is="componentPageActive"
            />
          </div>

          <!-- List menu in fab bottom sheet -->
          <MenuHome
            v-show="bsMobile === 'open' || !isMobile"
            :commerce="user.commerce"
            :corporateID="user.corporate_id"
            :mainColor="user.main_color || '#116C54'"
            @toggleMenuComponent="toggleMenuComponent"
          />
        </HomeBottomSheet>

        <!-- Showing dialog website company user or corporate commerce group -->
        <WebsiteButton
          :corporateCommerce="corporate.commerce_group"
          :companyWebsite="user.company_contact_website"
          :secondaryColor="user.secondary_color || '#116C54'"
        />

        <!-- Showing commerce URL from user -->
        <CommerceButton
          :show.sync="shopDialog"
          :commerce="user.commerce"
          :secondaryColor="user.secondary_color || '#116C54'"
        />

        <!-- Showing free gold promo - unused -->
        <!-- <q-page-sticky position="top-left" :offset="[0, 0]" v-if="user.username === 'netwerk'">
          <q-btn class="btn-swipeup" to="/lp3" flat>
            <q-avatar size="90px" square>
              <q-img
                :src="FreeGold"
                spinner-color="primary"
                spinner-size="82px"
              />
            </q-avatar>
          </q-btn>
        </q-page-sticky> -->

        <!-- Button bottom sheet -->
        <div @click="openBottomSheet()">
          <ButtonSwipeUp
            :mainColor="user.main_color"
            v-show="bsMobile === 'close' || !isMobile"
          />
        </div>
      </q-page-container>
    </HomeBackground>

    <q-dialog maximized v-model="pdfDialog" transition-show="slide-left" transition-hide="slide-right">
      <q-card class="bg-white border-radius-10px full-width">
        <q-toolbar>
          <q-btn flat round dense icon="arrow_back" v-close-popup />
          <q-toolbar-title
            class="text-center font-proxima-nova-alt"
            :style="`margin-left:-40px; color: ${user.secondary_color || '#116C54'}`"
          >
            View PDF
          </q-toolbar-title>
        </q-toolbar>
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          :src="getPDFViewerURL(corporate.file_pdf)"
        ></iframe>
      </q-card>
    </q-dialog>
    <q-dialog v-model="pollingModal" full-width full-height>
      <q-card class="font-proxima-nova-alt swipeable-card"
      v-touch-swipe.mouse.right.left="handleSwipe">
        <q-card-section class="row">
          <div class="col-2 text-h6 text-center"></div>
          <div class="col-8 text-h6 text-center">Polling</div>
          <div class="col-2 text-right">
            <q-btn
              icon="close"
              flat
              round
              dense
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
            <div class="col-12">
              <h5 class="text-bold text-center">{{ pollingActive.question }}</h5>
            </div>
          </div>
        </q-card-section>
        <q-footer class="">
          <q-card-actions align="center" class="row">
            <q-btn
              flat
              @click="handleClickPolling('left')"
              class="col-2 text-white text-bold bg-secondary"
              label="No"
              align="center"
            />
            <q-btn
              flat
              @click="handleClickPolling('right')"
              class="col-2 text-white text-bold bg-negative"
              label="Yes"
              align="center"
            />
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>
    <q-dialog v-model="pwaDialog">
      <q-card style="width: 300px">
        <div class="q-px-md">
          <q-card class="bg-white no-box-shadow column q-my-md">
            <div class="row">
              <div class="col-2 q-ml-auto text-right">
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
            </div>
            <div class="q-mb-md text-center row">
              <img class="col-2" :src="TagLogo" width="40px" height="40px" />
              <span class="col-8 text-bold self-center"
                >Tambahkan Ikon TAGID ke LAYAR BERANDA untuk mengakses Akun
                Membership lebih mudah</span
              >
            </div>
            <div class="row">
              <q-btn class="col-8 q-mr-auto q-ml-auto" @click="installPWA()"
                >Yes</q-btn
              >
            </div>
          </q-card>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss">
.q-layout {
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
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
