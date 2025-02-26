<template>
  <q-card class="q-pa-lg text-secondary bg-white border-radius-10px">
    <div class="column flex flex-center" v-if="$store.state.userdata.user.link_room">
      <img class="col" :src="ConnectLogo" @click="enterRoom($store.state.userdata.user.link_room)" width="50%" />
      <q-icon class="col q-my-md" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" size="md" name="arrow_upward" />
      <p class="col" :style="`color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">Click the button above to connect with me in Real Time.</p>
    </div>
    <div class="column flex flex-center" v-else>
      <p class="col" :style="`color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">
        Connect link is not available
      </p>
    </div>
  </q-card>
</template>
<script>
import ConnectLogo from 'src/assets/image/connect-green.png'
export default {
  data () {
    return {
      ConnectLogo
    }
  },
  methods: {
    enterRoom (link) {
      window.open(link)
    }
  }
}
</script>
