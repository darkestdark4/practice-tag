<template>
  <div>
    <video-background
      v-if="video"
      :src="`${
        $store.state.userdata.user.background
          ? $store.state.userdata.user.corporate.background
            ? linkStorageCorporateBg + $store.state.userdata.user.background
            : linkStorageBg + $store.state.userdata.user.background
          : VideoExample
      }`"
      style="width: 100%; height: 500px"
    >
      <div class="row">
        <div class="col text-right">
          <q-avatar
            size="75px"
            round
            v-if="!this.$store.state.userdata.user.corporate_id"
          >
            <img
              @error="handlingCompanyLogoError"
              :src="
                $store.state.userdata.user.company_logo
                  ? linkStorageCompLogo +
                    $store.state.userdata.user.company_logo
                  : CompanyLogo
              "
            />
          </q-avatar>
          <q-avatar
            size="75px"
            round
            v-else-if="this.$store.state.userdata.user.corporate_id"
          >
            <img
              @error="handlingCorporateLogoError"
              :src="
                $store.state.userdata.corporate.logo
                  ? linkStorageCorpLogo + $store.state.userdata.corporate.logo
                  : CompanyLogo
              "
            />
          </q-avatar>
        </div>
      </div>
      <div class="q-mt-xl column flex flex-center">
        <q-btn round class="col q-mb-sm" style="border: 10px solid #e8e8e8">
          <q-avatar size="150px">
            <q-img
              @error="handlingProfileError"
              :src="
                $store.state.userdata.user.logo
                  ? linkStorageProfile + $store.state.userdata.user.logo
                  : Profile
              "
              width="100%"
              height="100%"
            />
          </q-avatar>
        </q-btn>
        <div
          class="col text-center text-bold text-white font-monserrat"
          style="font-size: 24px; text-shadow: 2px 2px #6d6d6d"
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
          class="col text-white"
          style="font-size: 20px; text-shadow: 2px 2px #6d6d6d"
        >
          {{
            $store.state.userdata.user.profil
              ? $store.state.userdata.user.profil
              : "-"
          }}
        </div>
        <div
          class="col text-white"
          style="font-size: 16px; text-shadow: 2px 2px #6d6d6d"
        >
          {{
            $store.state.userdata.corporate.corporate_name
              ? $store.state.userdata.corporate.corporate_name
              : "-"
          }}
        </div>
      </div>
      <div class="q-mt-lg column flex flex-center">
        <div
          class="col text-white font-menserrat"
          style="font-size: 13px; text-shadow: 2px 2px #6d6d6d"
        >
          Card Expired Date:
          {{
            moment($store.state.userdata.user.expired_date).format("DD-MM-YYYY")
              ? moment($store.state.userdata.user.expired_date).format(
                  "DD-MM-YYYY"
                )
              : "-"
          }}
        </div>
      </div>
    </video-background>
    <div
      v-else
      class="header q-pa-lg"
      :style="`background: url(${
        $store.state.userdata.user.background
          ? $store.state.userdata.corporate.background
            ? linkStorageCorporateBg + $store.state.userdata.user.background
            : linkStorageBg + $store.state.userdata.user.background
          : Background
      })`"
    >
      <div class="row">
        <div class="col text-right">
          <q-avatar
            size="75px"
            round
            v-if="!this.$store.state.userdata.user.corporate_id"
          >
            <img
              @error="handlingCompanyLogoError"
              :src="
                $store.state.userdata.user.company_logo
                  ? linkStorageCompLogo +
                    $store.state.userdata.user.company_logo
                  : CompanyLogo
              "
            />
          </q-avatar>
          <q-avatar
            size="75px"
            round
            v-else-if="this.$store.state.userdata.user.corporate_id"
          >
            <img
              @error="handlingCorporateLogoError"
              :src="
                $store.state.userdata.corporate.logo
                  ? linkStorageCorpLogo + $store.state.userdata.corporate.logo
                  : CompanyLogo
              "
            />
          </q-avatar>
        </div>
      </div>
      <q-card
        class="bg-red"
        v-if="
          broadcastPopupActive.length > 0 && $store.state.style.isMobile == true
        "
        style="max-width: 1500px; max-height: 100px"
      >
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          padding
          style="max-height: 100px"
          class="bg-red text-white q-mt-sm"
        >
          <q-carousel-slide
            v-for="br in broadcastPopupActive"
            :key="br.id"
            :name="br.id"
            class="column"
          >
            <div class="row text-center">
              <div class="col-12 row">
                <div class="col-6 text-left text-yellow-12">
                  <q-icon name="podcasts" class="text-yellow-12" size="1.5em" />
                  {{ br.title }}
                </div>
                <div class="text-right col-6 text-yellow-12">
                  To {{ divisi_name }}
                </div>
              </div>
              <div class="row q-mt-sm">
                <img
                  class="col-2"
                  :src="br.image ? br.image : Profile"
                  style="width: 50px; height: 50px"
                />
                <span class="col-9 text-center" style="font-size: 12px"
                  >{{ br.description.substring(0, 75) + "..."
                  }}<span
                    class="cursor-pointer text-bold"
                    @click="broadcastPopup(br)"
                  >
                    Selengkapnya</span
                  ></span
                >
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
      <q-card
        class="bg-red"
        v-else-if="
          broadcastPopupActive.length > 0 &&
          $store.state.style.isMobile == false
        "
        style="max-width: 1500px; max-height: 100px"
      >
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          padding
          style="max-height: 100px"
          class="bg-red text-white q-mt-sm"
        >
          <q-carousel-slide
            v-for="br in broadcastPopupActive"
            :key="br.id"
            :name="br.id"
            class="column"
          >
            <div class="row text-center">
              <div class="col-12 row">
                <div class="col-6 text-left text-yellow-12">
                  <q-icon name="podcasts" class="text-yellow-12" size="1.5em" />
                  {{ br.title }}
                </div>
                <div class="text-right col-6 text-yellow-12">
                  To {{ divisi_name }}
                </div>
              </div>
              <div class="row q-mt-sm">
                <img
                  class=""
                  :src="br.image ? br.image : Profile"
                  style="width: 50px; height: 50px"
                />
                <span class="col text-center q-ml-md" style="font-size: 12px"
                  >{{ br.description.substring(0, 250)
                  }}<span
                    class="cursor-pointer text-bold"
                    @click="broadcastPopup(br)"
                  >
                    Selengkapnya</span
                  ></span
                >
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
      <div class="q-mt-md column flex flex-center">
        <q-btn round class="col q-mb-sm" style="border: 10px solid #e8e8e8">
          <q-avatar size="150px">
            <q-img
              @error="handlingProfileError"
              :src="
                $store.state.userdata.user.logo
                  ? linkStorageProfile + $store.state.userdata.user.logo
                  : Profile
              "
              width="100%"
              height="100%"
            />
          </q-avatar>
        </q-btn>
        <div
          class="col text-center text-bold text-white font-monserrat"
          style="font-size: 24px; text-shadow: 2px 2px #6d6d6d"
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
          class="col text-white"
          style="font-size: 20px; text-shadow: 2px 2px #6d6d6d"
        >
          {{
            $store.state.userdata.user.profil
              ? $store.state.userdata.user.profil
              : "-"
          }}
        </div>
        <div
          class="col text-white"
          style="font-size: 16px; text-shadow: 2px 2px #6d6d6d"
        >
          {{
            $store.state.userdata.corporate.corporate_name
              ? $store.state.userdata.corporate.corporate_name
              : "-"
          }}
        </div>
      </div>
      <div class="q-mt-md column flex flex-center">
        <div
          class="col text-white font-menserrat"
          style="font-size: 13px; text-shadow: 2px 2px #6d6d6d"
        >
          Card Expired Date:
          {{
            moment($store.state.userdata.user.expired_date).format("DD-MM-YYYY")
              ? moment($store.state.userdata.user.expired_date).format(
                  "DD-MM-YYYY"
                )
              : "-"
          }}
        </div>
      </div>
    </div>
    <q-dialog class="q-pt-md" v-model="broadcastModal">
      <q-card class="bg-white text-black" style="width: 300px">
        <q-card-section>
          <div class="text-center">
            {{ broadcast.title }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <img
            class="q-mt-md"
            :src="broadcast.image ? broadcast.image : Profile"
            style="width: 150px; height: 150px"
          />
        </q-card-section>

        <q-card-actions align="center" class="bg-grey-5">
          <div class="q-mt-md q-mb-lg text-center">
            {{ broadcast.description }}
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'
import VideoBackground from 'vue-responsive-video-background-player'
import VideoExample from 'src/assets/video-example.mp4'
import moment from 'moment'

export default {
  components: { VideoBackground },
  data () {
    return {
      CompanyLogo,
      Background,
      VideoExample,
      video: false,
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageCorporateBg: 'https://api.the-netwerk.com/storage/app/public/corporate/background/',
      linkStorageCorpLogo: 'https://api.the-netwerk.com/storage/app/public/corporate/logo/',
      linkStorageCompLogo: 'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      broadcastPopupActive: [],
      slide: null,
      divisi_name: '',
      broadcastModal: false,
      broadcast: {},
      moment
    }
  },
  mounted () {
    this.checkExtensionBackground(this.$store.state.userdata.user.background)
    this.getBroadcastActive()
    this.getDivisi()
  },
  methods: {
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
      if (filename) {
        const fileExtension = filename.split('.').pop()
        if (imageExtensionLists.includes(fileExtension)) {
          this.video = false
        } else if (videoExtensionLists.includes(fileExtension)) {
          this.video = true
        } else {
          this.$store.state.userdata.user.background = null
        }
      }
    },
    broadcastPopup (data) {
      this.broadcast = data
      this.broadcastModal = true
    },
    getDivisi () {
      const divisiID = this.$store.state.userdata.user.divisiID
      this.$axios
        .get(`/member/corporate/divisi/${divisiID}`)
        .then((response) => {
          if (response.data.length > 0) {
            this.divisi_name = response.data.data[0].divisi_name
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getBroadcastActive () {
      this.$axios
        .get('/broadcast/active')
        .then((response) => {
          const broadcast = response.data.data.map((data) => {
            return {
              id: data.id,
              image: data.image,
              title: data.title,
              description: data.description,
              divisi_id: data.to.split('-'),
              type: data.type
            }
          })
          broadcast.forEach((data) => {
            if (
              data.divisi_id[2] === this.$store.state.userdata.user.divisi_id &&
              data.type === 'Popup Ads'
            ) {
              this.broadcastPopupActive.push(data)
            }
          })
          if (this.broadcastPopupActive.length > 0) {
            this.broadcastCard = true
            this.slide = this.broadcastPopupActive[0].id
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
    handlingCorporateLogoError (event) {
      event.target.src = this.CompanyLogo
    }
  }
}
</script>
