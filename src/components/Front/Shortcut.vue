<template>
  <q-card class="bg-white border-radius-10px">
    <div
      class="q-pt-md q-ml-md text-h6 text-left font-proxima-nova-alt text-bold"
      :style="`color: ${
        $store.state.userdata.user.secondary_color
          ? $store.state.userdata.user.secondary_color
          : '#116C54'
      }`"
    >
      Shortcut
    </div>
    <div
      :class="
        $store.state.style.isMobile === true
          ? 'q-px-sm q-py-sm'
          : 'q-px-lg q-py-sm'
      "
      v-for="d in data"
      :key="d.id"
    >
      <q-card
        class="bg-white border-radius-30px no-box-shadow col row q-mb-sm q-pa-sm cursor-pointer"
        @click="toLink(d.link)"
        style="border: 1px solid black"
      >
        <div class="col-1 text-left">
          <q-avatar
            :size="$store.state.style.isMobile === true ? '25px' : '40px'"
          >
            <q-img
              alt="Profile Logo"
              :src="d.icon_image ? d.icon_image : Profile"
            />
          </q-avatar>
        </div>
        <div class="col-10 text-center self-center">
          <span class="text-bold">{{ d.title }}</span>
        </div>
      </q-card>
    </div>
  </q-card>
</template>
<script>
const localStorage = JSON.parse(window.localStorage.getItem('user'))
const username = localStorage.username
export default {
  data () {
    return {
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      data: []
    }
  },
  created () {
    const fetchData = async () => {
      await this.$axios
        .get(`/shortcut/username/${username}`)
        .then((response) => {
          this.data = response.data.data
        })
    }

    fetchData()
  },
  methods: {
    toLink (link) {
      window.open(link)
    }
  }
}
</script>
