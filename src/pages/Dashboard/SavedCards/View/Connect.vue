<template>
  <q-card class="q-pa-lg text-secondary bg-white border-radius-10px">
    <div class="column flex flex-center" v-if="data.member.link_room">
      <img class="col" :src="ConnectLogo" @click="enterRoom(data.member.link_room)" width="50%" />
      <q-icon class="col q-my-md" :style="`color: ${data.member.main_color ? data.member.main_color : '#116C54'}`" size="md" name="arrow_upward" />
      <p class="col" :style="`color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">Click the button above to connect with me in Real Time.</p>
    </div>
    <div class="column flex flex-center" v-else>
      <p class="col" :style="`color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">
        Click the button above to connect with me in Real Time.
      </p>
    </div>
  </q-card>
</template>
<script>
import ConnectLogo from 'src/assets/image/connect-green.png'
export default {
  data () {
    return {
      ConnectLogo,
      data: {
        member: {}
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/member/' + this.$route.params.username).then(response => {
        this.data.member = response.data.member
        this.checkExtensionBackground(this.data.member.background)
      })
    },
    enterRoom (link) {
      window.open(link)
    }
  }
}
</script>
