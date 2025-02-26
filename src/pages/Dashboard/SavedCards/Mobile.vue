<template>
  <q-card class="constrain-mobile border-radius-10px" flat>
    <q-card-section class="flex flex-center">
      <div class="text-h6 text-secondary">Saved Cards</div>
    </q-card-section>
    <q-card-section>
      <q-input class="full-width" placeholder="Search ..." outlined v-model="search" />
    </q-card-section>
    <q-card-section style="margin-top: -20px">
      <div class="col row">
        <q-icon
          name="add"
          class="cursor-pointer col-1 q-mr-auto"
          color="secondary"
          size="md"
          @click="$router.replace({ path: `saved-cards/add` })"
        />
        <q-icon
          name="apps"
          class="cursor-pointer col-1 text-right"
          color="secondary"
          size="md"
          @click="changeLayout('grid');"
        />
        <q-icon
          name="view_headline"
          class="cursor-pointer col-1 text-right"
          color="secondary"
          size="md"
          @click="changeLayout('list');"
        />
      </div>
    </q-card-section>
    <q-card-section style="margin-top: -20px">
      <div v-if="layout === 'list'">
        <div
          class="row q-pa-md"
          v-for="(cards, index) in cardList"
          :key="index"
        >
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-1 col-xs-4">
            <q-avatar round>
              <img
                :src="`${
                  cards.logo ? linkStorageProfile + cards.logo : Profile
                }`"
              />
            </q-avatar>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-9 col-sm-1 col-xs-5">
            <div class="column">
              <div class="col text-bold" style="font-size: 16px">
                {{ cards.member_first_name }}
              </div>
              <div v-if="cards.corporate" class="col" style="font-size: 16px">
                {{ cards.corporate.corporate_name }}
              </div>
            </div>
          </div>
          <div
            class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-3 q-mt-sm text-right text-secondary"
          >
            <q-btn-dropdown flat dropdown-icon="more_horiz">
              <q-list>
                <q-item clickable v-close-popup @click="toView(cards.username)">
                  <q-item-section>
                    <q-item-label class="text-green-9">View</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="deleteCard(cards.id)">
                  <q-item-section>
                    <q-item-label class="text-red">Delete</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <q-separator />
        </div>
      </div>
      <div v-else-if="layout === 'grid'">
        <div class="row">
          <div
            class="q-pa-sm col-4"
            v-for="(cards, index) in cardList"
            :key="index"
          >
            <q-card
              class="full-width"
              style="height: 150px"
              v-if="
                videoExtensionLists.includes(
                  `${
                    cards.background
                      ? linkStorageBg + cards.background
                      : Background
                  }`
                    .split('.')
                    .pop()
                )
              "
            >
              <video-background
                :src="getVideoBg(cards)"
                style="height: 150px"
                @click="toView(cards.username)"
              >
                <!-- <q-img :src="VideoExample" height="150px"> -->
                <div class="absolute-bottom text-center">
                  <q-avatar round>
                    <img
                      :src="`${
                        cards.logo ? linkStorageProfile + cards.logo : Profile
                      }`"
                    />
                  </q-avatar>
                  <div
                    class="q-mt-sm q-mb-md text-bold"
                    style="font-size: 10px; padding-top: 5px"
                  >
                    {{ cards.member_first_name }}
                  </div>
                </div>
                <!-- </q-img> -->
              </video-background>
            </q-card>
            <q-card
              class="full-width"
              style="height: 150px"
              v-else-if="
                imageExtensionLists.includes(
                  `${
                    cards.background
                      ? linkStorageBg + cards.background
                      : Background
                  }`
                    .split('.')
                    .pop()
                )
              "
            >
              <q-img
                :src="`${
                  cards.background
                    ? linkStorageBg + cards.background
                    : Background
                }`"
                height="150px"
                @click="toView(cards.username)"
              >
                <div
                  class="absolute-bottom text-center"
                  style="background: none"
                >
                  <q-avatar round>
                    <img
                      :src="`${
                        cards.logo ? linkStorageProfile + cards.logo : Profile
                      }`"
                    />
                  </q-avatar>
                  <div class="q-mt-md text-bold" style="font-size: 10px">
                    {{ cards.member_first_name }}
                  </div>
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import Background from 'src/assets/image/TAGID-circle.gif'
import VideoBackground from 'vue-responsive-video-background-player'
import VideoExample from 'src/assets/video-example.mp4'

export default {
  components: { VideoBackground },
  data () {
    return {
      VideoExample,
      Background,
      Profile,
      layout: 'list',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      linkStorageCorporateBg: 'https://api.the-netwerk.com/storage/app/public/corporate/background/',
      card_list: [],
      search: '',
      imageExtensionLists: ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'raw'],
      videoExtensionLists: [
        'webm', 'mkv', 'mp4', 'avi',
        'mov', 'mpg', 'mpeg', '3gp',
        'm4v'
      ]
    }
  },
  mounted () {
    this.getDataCard()
  },
  computed: {
    cardList () {
      if (this.search === '') {
        return this.card_list
      } else {
        return this.card_list.filter((card) => {
          return card.member_first_name
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
      }
    }
  },
  methods: {
    toView (data) {
      if (window.localStorage.getItem('page')) {
        window.localStorage.removeItem('page')
        window.localStorage.setItem('page', 'saved-cards')
      } else {
        window.localStorage.setItem('page', 'saved-cards')
      }
      setTimeout(() => this.$router.replace({ path: `/view/${data}` }), 750)
    },
    changeLayout (layout) {
      this.layout = layout
    },
    getDataCard () {
      this.$axios
        .get('/member/phonebook/show')
        .then((response) => {
          this.card_list = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$q.notify({
              message: 'Unauthenticated -- Please Login',
              position: 'top',
              type: 'negative',
              timeout: 3000
            })
            this.$router.replace({ path: '/login' })
          }
        })
    },
    deleteCard (id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Sure to Delete Card?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete('/member/phonebook/' + id)
            .then((response) => {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive',
                timeout: 3000
              })
              window.setTimeout(function () {
                location.reload()
              }, 1500)
            })
            .catch((error) => {
              if (error.response.status === 401) {
                this.$q.notify({
                  message: 'Unauthenticated -- Please Login',
                  position: 'top',
                  type: 'negative',
                  timeout: 3000
                })
                this.$router.replace({ path: '/login' })
              }
            })
        })
    },
    getVideoBg (data) {
      const userBg = data.background
      const corporateBg = data.corporate.background

      if (userBg && corporateBg) {
        if (data.corporate) {
          return `${this.linkStorageCorporateBg}${corporateBg}`
        } else {
          return `${this.linkStorageBg}${userBg}`
        }
      } else {
        return this.VideoExample
      }
    }
  }
}
</script>
