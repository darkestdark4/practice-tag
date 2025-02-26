<template>
  <div>
    <!-- Show profile user -->
    <ProfileOverview
      :firstName="user.member_first_name"
      :middleName="user.member_middle_name"
      :lastName="user.member_last_name"
      :profile="user.profil"
      :email="user.member_email"
      :phoneCode="user.phone_code"
      :phoneNumber="user.member_phone"
      :mainColor="user.main_color || '#116C54'"
    />

    <ProfileSponsor
      :corporateID="corporate.id"
      :sponsorData="user.sponsor"
      :expiredDate="user.expired_date"
      :secondaryColor="user.secondary_color || '#116C54'"
      :firstName="user.member_first_name"
      :middleName="user.member_middle_name"
      :lastName="user.member_last_name"
    />

    <ProfilePartner
      @open="$emit('open')"
      @close="$emit('close')"
      :corporateID="corporate.id"
      :partner="partner"
      :partnerData="partnering"
      :partnerList="partnerList"
      :redeemPartnerCount="redeemPartnerCount"
      :secondaryColor="user.secondary_color || '#116C54'"
    />

    <ProfileSocmed
      @close="$emit('close')"
      :socmedList="socialMediaList"
      :socmedDetail="socialMediaDetail"
      :secondaryColor="user.secondary_color || '#116C54'"
    />

    <ProfileBanner
      @open="$emit('open')"
      @close="$emit('close')"
      :bannerData="bannerList"
      :status="banner.status"
    />

    <div v-if="listVideo" class="youtube-list scrolling-wrapper q-mt-md">
      <div class="youtube-video" v-for="(video, index) in listVideo" :key="index">
        <q-video :src="video.socmed_link" />
      </div>
    </div>

    <ProfileBio
      @view-pdf="$emit('view-pdf')"
      :mainColor="user.main_color || '#116C54'"
      :secondaryColor="user.secondary_color || '#116C54'"
      :name="user.corporate_id ? corporate.corporate_name : user.company_name"
      :description="user.corporate_id ? corporate.corporate_description : user.company_description"
      :website="user.corporate_id ? corporate.corporate_website : user.company_contact_website"
      :filePDF="user.corporate_id ? user.corporate.file_pdf : user.pdf_file"
    />

    <ProfilePhone
      :mainColor="user.main_color || '#116C54'"
      :secondaryColor="user.secondary_color || '#116C54'"
      :phoneData="listContactPhone"
    />

    <ProfileAddress
      :mainColor="user.main_color || '#116C54'"
      :secondaryColor="user.secondary_color || '#116C54'"
      :addressMember="listAddress"
      :addressCorporate="corporate.corporate_address"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { Notify } from 'quasar'
import Sponsor from 'src/assets/image/sponsor.png'
import OtpInput from '@bachdgvn/vue-otp-input'
import moment from 'moment'

import ProfileOverview from 'src/components/Profile/Overview.vue'
import ProfileSocmed from 'src/components/Profile/Socmed.vue'
import ProfileBanner from 'src/components/Profile/Banner.vue'
import ProfileBio from 'src/components/Profile/Bio.vue'
import ProfileAddress from 'src/components/Profile/Address.vue'
import ProfilePhone from 'src/components/Profile/Phone.vue'
import ProfileSponsor from 'src/components/Profile/Sponsor/Index.vue'
import ProfilePartner from 'src/components/Profile/Partner.vue'

Vue.component('v-otp-input', OtpInput)

const localStorage = JSON.parse(window.localStorage.getItem('user'))
const userId = localStorage.user_id
const corporateID = localStorage.corporate_id
const username = localStorage.username
const sponsorId = localStorage.sponsor_id

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  components: {
    ProfileOverview,
    ProfileSocmed,
    ProfileBanner,
    ProfileBio,
    ProfileAddress,
    ProfilePhone,
    ProfileSponsor,
    ProfilePartner
  },
  mounted () {
    this.getAddress()
    this.getPhone()
    this.getVideo()
    this.getVideoCorporate()
    this.getPartner()
    this.getPartnerConfig()
    this.getBanner()
    this.getBannerConfig()
    this.getSocialMedia()
  },
  data () {
    return {
      pdfDialog: false,
      corporateID,
      Sponsor,
      moment,

      socialLink: false,
      passwordInputModal: false,
      redeemPartnerCount: '',
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      listContactPhone: [],
      listAddress: [],
      listVideo: [],
      listCorporateVideo: [],
      partnerList: [],
      partner: {},
      partnerDetail: [],
      bannerList: [],
      banner: [],
      socialMediaList: [],
      socialMediaDetail: []
    }
  },
  computed: {
    user () {
      return this.$store.state.userdata.user
    },
    corporate () {
      return this.$store.state.userdata.corporate
    },
    partnering () {
      return this.partnerList
        .filter((partner) => partner.is_expired === false)
        .splice(0, 12)
    }
  },
  methods: {
    embedYoutube (link) {
      if (link) {
        const linkEmbeded = link.split('/').pop()
        return `https://youtube.com/embed/${linkEmbeded}`
      }
      return 'https://youtube.com/embed/'
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
    },
    getAddress () {
      this.$axios.get('/member/address/user/' + userId).then((response) => {
        if (response.data.data.length > 0) {
          this.listAddress = response.data.data
        }
      })
    },
    getPhone () {
      this.$axios.get(`/member/phone/${userId}`).then((response) => {
        this.listContactPhone = response.data.data
      })
    },
    getVideo () {
      const params = {
        socmed_name: 'youtube'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: params })
        .then((response) => {
          const listCorporateVideo = response.data.data.map((data) => {
            return {
              order: data.order,
              socmed_name: 'youtube',
              socmed_link: this.embedYoutube(data.socmed_link),
              status: 'active'
            }
          })
          this.listVideo = this.listVideo.concat(listCorporateVideo)
        })
    },
    getVideoCorporate () {
      const params = {
        socmed_name: 'youtube'
      }
      if (this.$store.state.userdata.user.corporate_id) {
        this.$axios
          .get('/member/corporate/socialmediacorporate/' + corporateID, {
            params: params
          })
          .then((response) => {
            const listCorporateVideo = response.data.data.map((data) => {
              return {
                order: '1',
                socmed_name: 'youtube',
                socmed_link: this.embedYoutube(data.link),
                status: 'active'
              }
            })
            this.listVideo = this.listVideo.concat(listCorporateVideo)
          })
      }
    },

    getSocialMedia () {
      this.$axios.get(`/member/socialmedia/${userId}`)
        .then(res => {
          const { data } = res.data
          const filterSocmed = data.filter(item => {
            return item.socmed_name !== 'youtube'
          })

          filterSocmed.forEach(item => {
            const getTotalNameSocmed = filterSocmed.filter(socmed => {
              return socmed.socmed_name === item.socmed_name
            }).length

            const searchAvailableNameSocmed = this.socialMediaList.find(socmed => {
              return socmed.socmed_name === item.socmed_name
            })

            if (!searchAvailableNameSocmed) {
              this.socialMediaList.push({
                socmed_name: item.socmed_name,
                socmed_title: item.socmed_title,
                socmed_link: item.socmed_link,
                socmed_total: getTotalNameSocmed,
                name: 'Corporate'
              })
            }
          })
        })

      this.$axios.get(`/member/corporate/socialmediacorporate/${corporateID}`)
        .then(res => {
          const { data } = res.data
          const filterSocmed = data.filter(item => {
            return item.name !== 'youtube'
          })

          filterSocmed.forEach(item => {
            const getTotalNameSocmed = filterSocmed.filter(socmed => {
              return socmed.name === item.name
            }).length

            const searchAvailableNameSocmed = this.socialMediaList.find(socmed => {
              return socmed.socmed_name === item.name
            })

            if (!searchAvailableNameSocmed) {
              this.socialMediaList.push({
                socmed_name: item.name,
                socmed_title: item.title,
                socmed_link: item.link,
                socmed_total: getTotalNameSocmed,
                name: 'Corporate'
              })
            }

            this.socialMediaDetail.push({
              socmed_name: item.name,
              socmed_title: item.title,
              socmed_link: item.link,
              name: 'Corporate'
            })
          })
        })
    },

    getPartner () {
      this.$axios
        .get(`/sponsor/getPartnerSponsorByUsername/${username}/` + sponsorId)
        .then((response) => {
          Object.values(response.data.data.partner).forEach((data) => {
            this.partnerList.push(data.partner)
          })
          this.partnerListLength = Object.values(response.data.data.partner).length
          this.redeemPartnerCount = response.data.data.countRedeen
        })
    },
    getPartnerConfig () {
      this.$axios.get('/partner/config/' + username).then((response) => {
        this.partner = response.data.data
      })
    },
    getBanner () {
      this.$axios.get('/banner/username/' + username).then((response) => {
        this.bannerList = response.data.data
      })
    },
    getBannerConfig () {
      this.$axios.get('/banner/config/' + username).then((response) => {
        this.banner = response.data.data
      })
    },
    visitWeb (link) {
      window.open(link)
    }
  }
}
</script>
<style lang="scss">
.button-sosmed {
  width: 56px !important;
  padding: 10px;
}

.otp-input {
  width: 25px;
  height: 30px;
  padding: 5px;
  margin: 0 3px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;

  &.error {
    border: 1px solid red !important;
  }
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  .youtube-video {
    display: inline-block;
    margin-right: 10px;
  }

  .youtube-video:last-of-type {
    margin-right: none;
  }
}
</style>
