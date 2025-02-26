<template>
  <q-layout view="lHh Lpr lff" @keydown.esc="leftDrawerOpen = false">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="1000"
      appear
    >
      <q-header elevated class="bg-white">
        <q-toolbar class="text-primary">
          <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm"
            @click="leftDrawerOpen = true"
          />
          <q-toolbar-title
            class="text-center font-bold font-proxima-nova-alt"
            :style="`font-size:16px; margin-left:-40px; color: ${
              $store.state.userdata.user.secondary_color
                ? $store.state.userdata.user.secondary_color
                : '#116C54'
            }`"
          >
            {{ $store.state.style.titlePage }}</q-toolbar-title
          >
        </q-toolbar>
      </q-header>
    </transition>
    <q-drawer v-model="leftDrawerOpen" :width="330" :breakpoint="500" overlay>
      <q-scroll-area
        class="q-py-lg"
        style="
          height: calc(100% - 180px);
          margin-top: 160px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <template v-for="(menuItem, index) in menuList">
            <q-item
              :key="index"
              class="q-py-md"
              :to="menuItem.url"
              @click="leftDrawerOpen = false"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" color="primary" />
              </q-item-section>
              <q-item-section>
                <span
                  class="text-secondary font-proxima-nova-alt"
                  style="font-size: 16px"
                >
                  {{ menuItem.label }}
                  <q-badge
                    v-if="menuItem.name && meetingUnread > 0"
                    rounded
                    :label="meetingUnread"
                  />
                </span>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="chevron_right" color="grey-7" />
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
          <template>
            <q-item class="q-py-md" @click="processLogout()" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" color="primary" />
              </q-item-section>
              <q-item-section>
                <span
                  class="text-secondary font-proxima-nova-alt"
                  style="font-size: 16px"
                >
                  Logout
                </span>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="chevron_right" color="grey-7" />
              </q-item-section>
            </q-item>
            <q-separator />
          </template>
          <div
            v-if="$store.state.userdata.user.role == 'Admin'"
            class="flex flex-center q-mt-sm"
          >
            <q-img :src="Logo" width="150px" />
          </div>
          <div
            v-else-if="$store.state.userdata.user.role == 'Anggota'"
            class="flex flex-center q-mt-xl q-pt-xl"
          >
            <q-img :src="Logo" width="150px" />
          </div>
        </q-list>
      </q-scroll-area>
      <div v-if="video" class="absolute-top">
        <video-background
          :src="`${
            $store.state.userdata.user.background
              ? $store.state.userdata.user.corporate.background
                ? linkStorageCorporateBg + $store.state.userdata.user.background
                : linkStorageBg + $store.state.userdata.user.background
              : VideoExample
          }`"
          style="vertical-align: top; height: 180px"
          @keydown.esc="leftDrawerOpen = false"
        >
          <div class="absolute-top q-px-md">
            <div class="row">
              <div class="col-11 q-py-md">
                <q-avatar size="56px" class="q-mb-sm">
                  <img
                    @error="handlingProfileError"
                    :src="
                      $store.state.userdata.user.logo
                        ? linkStorageProfile + $store.state.userdata.user.logo
                        : Profile
                    "
                  />
                </q-avatar>
                <div
                  class="col text-bold text-white font-monserrat"
                  style="font-size: 14px; text-shadow: 2px 2px #6d6d6d"
                >
                  {{
                    $store.state.userdata.user.member_first_name
                      ? $store.state.userdata.user.member_first_name
                      : ""
                  }}
                  {{
                    $store.state.userdata.user.member_middle_name
                      ? $store.state.userdata.user.member_middle_name
                      : ""
                  }}
                  {{
                    $store.state.userdata.user.member_last_name
                      ? $store.state.userdata.user.member_last_name
                      : ""
                  }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="font-size: 14px; text-shadow: 2px 2px #6d6d6d"
                >
                  {{
                    $store.state.userdata.user.profil
                      ? $store.state.userdata.user.profil
                      : "-"
                  }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="font-size: 16px; text-shadow: 2px 2px #6d6d6d"
                >
                  {{
                    $store.state.userdata.corporate.corporate_name
                      ? $store.state.userdata.corporate.corporate_name
                      : "-"
                  }}
                </div>
              </div>
              <div class="col-1">
                <q-btn dense flat icon="close" @click="leftDrawerOpen = false">
                </q-btn>
              </div>
            </div>
          </div>
        </video-background>
      </div>
      <div v-else>
        <q-img
          class="absolute-top"
          @error="handlingBackgroundError"
          :src="`${
            $store.state.userdata.user.background
              ? $store.state.userdata.corporate.background
                ? linkStorageCorporateBg +
                  $store.state.userdata.corporate.background
                : linkStorageBg + $store.state.userdata.user.background
              : Background
          }`"
          style="height: 180px"
          @keydown.esc="leftDrawerOpen = false"
        >
          <div class="absolute-bottom bg-transparent">
            <div class="row">
              <div class="col-11 q-py-md">
                <q-avatar size="56px" class="q-mb-sm">
                  <img
                    @error="handlingProfileError"
                    :src="
                      $store.state.userdata.user.logo
                        ? linkStorageProfile + $store.state.userdata.user.logo
                        : Profile
                    "
                  />
                </q-avatar>
                <div
                  class="col text-bold text-white font-monserrat"
                  style="font-size: 14px; text-shadow: 2px 2px #6d6d6d"
                >
                  {{
                    $store.state.userdata.user.member_first_name
                      ? $store.state.userdata.user.member_first_name
                      : ""
                  }}
                  {{
                    $store.state.userdata.user.member_middle_name
                      ? $store.state.userdata.user.member_middle_name
                      : ""
                  }}
                  {{
                    $store.state.userdata.user.member_last_name
                      ? $store.state.userdata.user.member_last_name
                      : ""
                  }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="font-size: 14px; text-shadow: 2px 2px #6d6d6d"
                >
                  {{
                    $store.state.userdata.user.profil
                      ? $store.state.userdata.user.profil
                      : "-"
                  }}
                </div>
                <div
                  class="col text-white font-proxima-nova-alt"
                  style="font-size: 16px; text-shadow: 2px 2px #6d6d6d"
                >
                  {{
                    $store.state.userdata.corporate.corporate_name
                      ? $store.state.userdata.corporate.corporate_name
                      : "-"
                  }}
                </div>
              </div>
              <div class="col-1 q-mt-sm">
                <q-btn dense flat icon="close" @click="leftDrawerOpen = false">
                </q-btn>
              </div>
            </div>
          </div>
        </q-img>
      </div>
    </q-drawer>

    <q-footer class="bg-white text-primary" bordered>
      <q-toolbar>
        <span>© {{ getYear }} - TAGID</span>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky
      class="large-screen-only"
      v-if="windowTop > 150"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="keyboard_arrow_up"
        color="primary"
        @click="scrollToTop()"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>
import moment from 'moment'
import VideoBackground from 'vue-responsive-video-background-player'

import Logo from 'src/assets/image/logo.png'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'
import VideoExample from 'src/assets/video-example.mp4'

const menuList = []

export default {
  components: { VideoBackground },
  data () {
    return {
      leftDrawerOpen: false,
      visible: false,
      windowTop: 0,
      video: false,
      Logo,
      CompanyLogo,
      Background,
      menuList,
      VideoExample,
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageCorporateBg: 'https://api.the-netwerk.com/storage/app/public/corporate/background/',
      linkStorageCompLogo: 'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      meetingUnread: '0'
    }
  },
  mounted: function () {
    if (
      this.$store.state.userdata.user.role === 'Admin' &&
      this.$store.state.userdata.user.corporate_id !== 48
    ) {
      this.menuList = [
        {
          icon: 'dashboard',
          label: 'Dashboard',
          url: '/dashboard',
          separator: true
        },
        {
          icon: 'account_circle',
          label: 'My Profile',
          url: '/dashboard/profile',
          separator: true
        },
        {
          icon: 'contacts',
          label: 'Saved Cards',
          url: '/dashboard/saved-cards',
          separator: true
        },
        {
          icon: 'desktop_mac',
          label: 'Manage My Meetings',
          name: 'meeting',
          url: '/dashboard/meetings',
          separator: true
        },
        {
          icon: 'admin_panel_settings',
          label: 'Manage Corporate',
          url: '/dashboard/manage-corporate/users',
          separator: true
        },
        {
          icon: 'apartment',
          label: 'Manage Our Partner',
          url: '/dashboard/manage-partner',
          separator: true
        },
        {
          icon: 'apartment',
          label: 'Manage Banner',
          url: '/dashboard/manage-banner',
          separator: true
        },
        {
          icon: 'request_quote',
          label: 'Manage Billing',
          url: '/dashboard/manage-billing',
          separator: true
        },
        {
          icon: 'link',
          label: 'Manage Shortcut',
          url: '/dashboard/manage-shortcut',
          separator: true
        }
      ]
    } else if (
      this.$store.state.userdata.user.role !== 'Admin' &&
      this.$store.state.userdata.user.corporate_id !== 48
    ) {
      this.menuList = [
        {
          icon: 'dashboard',
          label: 'Dashboard',
          url: '/dashboard',
          separator: true
        },
        {
          icon: 'account_circle',
          label: 'My Profile',
          url: '/dashboard/profile',
          separator: true
        },
        {
          icon: 'contacts',
          label: 'Saved Cards',
          url: '/dashboard/saved-cards',
          separator: true
        },
        {
          icon: 'desktop_mac',
          label: 'Manage My Meetings',
          name: 'meeting',
          url: '/dashboard/meetings',
          separator: true
        },
        {
          icon: 'link',
          label: 'Manage Shortcut',
          url: '/dashboard/manage-shortcut',
          separator: true
        }
      ]
    } else if (
      this.$store.state.userdata.user.role === 'Admin' &&
      this.$store.state.userdata.user.corporate_id === 48
    ) {
      this.menuList = [
        {
          icon: 'dashboard',
          label: 'Dashboard',
          url: '/dashboard',
          separator: true
        },
        {
          icon: 'account_circle',
          label: 'My Profile',
          url: '/dashboard/profile',
          separator: true
        },
        {
          icon: 'admin_panel_settings',
          label: 'Manage Corporate',
          url: '/dashboard/manage-corporate/users',
          separator: true
        },
        {
          icon: 'apartment',
          label: 'Manage Our Partner',
          url: '/dashboard/manage-partner',
          separator: true
        },
        {
          icon: 'apartment',
          label: 'Manage Banner',
          url: '/dashboard/manage-banner',
          separator: true
        },
        {
          icon: 'request_quote',
          label: 'Manage Billing',
          url: '/dashboard/manage-billing',
          separator: true
        }
      ]
    } else if (
      this.$store.state.userdata.user.role !== 'Admin' &&
      this.$store.state.userdata.user.corporate_id === 48
    ) {
      this.menuList = [
        {
          icon: 'account_circle',
          label: 'My Profile',
          url: '/dashboard/profile',
          separator: true
        },
        {
          icon: 'admin_panel_settings',
          label: 'Manage Corporate',
          url: '/dashboard/manage-corporate/users',
          separator: true
        },
        {
          icon: 'apartment',
          label: 'Manage Our Partner',
          url: '/dashboard/manage-partner',
          separator: true
        },
        {
          icon: 'apartment',
          label: 'Manage Banner',
          url: '/dashboard/manage-banner',
          separator: true
        },
        {
          icon: 'request_quote',
          label: 'Manage Billing',
          url: '/dashboard/manage-billing',
          separator: true
        }
      ]
    }

    this.$axios.get('/partner/config').then((response) => {
      const partner = response.data.data
      if (partner.status) {
        if (this.menuList.length < 2 || this.menuList.length === 4) {
          this.menuList.push({
            icon: 'history',
            label: 'Log History Redeem',
            url: '/dashboard/log-redeem',
            separator: true
          })
        } else if (this.menuList.length === 9 || this.menuList.length === 6) {
          this.menuList.push({
            icon: 'history',
            label: 'Log History Redeem',
            url: '/dashboard/log-redeem',
            separator: true
          })
        }
      }
    })

    if (this.$store.state.userdata.user.corporate_id === 59) {
      this.menuList.push({
        icon: 'store',
        label: 'Manage Merchant',
        url: '/dashboard/manage-merchant',
        separator: true
      })
    }

    if (this.$store.state.userdata.user.background) {
      this.checkExtensionBackground(this.$store.state.userdata.user.background)
    }
    window.addEventListener('scroll', this.scrollListener)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.leftDrawerOpen = false
      }
    })
    this.getMeeting()
    this.getPartnerConfig()
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.scrollListener)
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    getYear () {
      return moment().year()
    }
  },
  methods: {
    getData () {
      this.$axios
        .get('/member')
        .then((response) => {
          if (response.data.status) {
            this.data.member = response.data.member
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    checkExtensionBackground (filename) {
      const imageExtensionLists = [
        'jpeg',
        'jpg',
        'png',
        'gif',
        'tiff',
        'raw',
        'bin'
      ]
      const videoExtensionLists = [
        'webm',
        'mkv',
        'mp4',
        'avi',
        'mov',
        'mpg',
        'mpeg',
        '3gp'
      ]
      const fileExtension = filename.split('.').pop()
      if (imageExtensionLists.includes(fileExtension)) {
        this.video = false
      } else if (videoExtensionLists.includes(fileExtension)) {
        this.video = true
      } else {
        this.$store.state.userdata.user.background = null
      }
    },
    handlingBackgroundError (event) {
      event.target.src = this.Background
    },
    handlingProfileError (event) {
      event.target.src = this.Profile
    },
    handlingCompanyLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    onScroll (e) {
      this.windowTop = e.target.documentElement.scrollTop
    },
    scrollToTop () {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId)
        }
        window.scroll(0, window.pageYOffset - 50)
      }, 20)
    },
    scrollListener: function () {
      this.visible = window.scrollY > 150
    },
    processLogout () {
      window.localStorage.clear()
      const host = window.location.host
      // const parts = host.split('.')
      // parts.splice(0, 1)
      // const url = parts.join('.')
      window.location.href = window.location.protocol + '//' + host
    },
    getMeeting () {
      this.$axios
        .get('/member/meeting/getisreadmeeting')
        .then((response) => {
          if (response.data.status === true) {
            this.meetingUnread = response.data.data.length
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    getPartnerConfig () {
      this.$axios.get('/partner/config').then((response) => {
        const partner = response.data.data
        if (partner.status) {
          if (this.menuList.length < 2 || this.menuList.length === 4) {
            this.menuList.push({
              icon: 'history',
              label: 'Log History Redeem',
              url: '/dashboard/log-redeem',
              separator: true
            })
          } else if (this.menuList.length === 9 || this.menuList.length === 6) {
            this.menuList.push({
              icon: 'history',
              label: 'Log History Redeem',
              url: '/dashboard/log-redeem',
              separator: true
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="sass">
.header
  background-repeat: no-repeat !important
  background-size: 100% 500px !important
.header
  width: 100%
  height: 500px
  border-bottom-left-radius: 50px 40px
  border-bottom-right-radius: 50px 40px
.q-toolbar
  height: 55px
.q-toolbar__title
  font-size: 14px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
.q-footer
  .q-tab__icon
    font-size: 30px
  .q-tab__label
    font-size: 11px
</style>
