<template>
  <div id="q-app">
    <router-view />

    <!-- Dialog for campaign -->
    <q-dialog v-model="campaignDialog" full-height>
      <q-card class="bg-white border-radius-10px" style="width: 350px">
        <q-img src="https://api.the-netwerk.com/public/storage/banner/campaign-netwerk-banner.png" class="full-height full-width" alt="Image campaign for The-Netwerk">
          <div class="column justify-between full-height full-width" style="background: transparent">
            <q-btn round icon="close" color="white" text-color="black" size="xs" class="q-ml-auto" @click="closeCampaignDialog('close')" />
            <q-btn style="background: #116C54" @click="gotoCampaignNetwerk">
              Tap to Claim
            </q-btn>
          </div>
          <p class="text-center text-bold text-white font-monserrat" style="margin-top: 6.5rem; padding: 0 2rem">
            <span style="font-size: 24px">
              Are You Interested in This?
            </span>
            <br><br>
            <span style="font-size: 18px">Unlock Exclusive Deals:</span>
            <br>
            <span style="font-size: 18px">Claim Your Free Personalized TAG!</span>
          </p>
        </q-img>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      windowWidth: window.innerWidth
    }
  },
  mounted () {
    this.setLayoutStatus()
    window.onresize = () => {
      this.windowWidth = window.innerWidth
      this.setLayoutStatus()
    }
  },
  beforeDestroy: function () {
    localStorage.removeItem('userd')
  },
  computed: {
    campaignDialog () {
      return this.$store.state.style.campaignDialog
    }
  },
  methods: {
    setLayoutStatus () {
      if (this.windowWidth < 600) {
        this.$store.dispatch('style/submitIsMobile', true)
      } else {
        this.$store.dispatch('style/submitIsMobile', false)
      }
    },
    gotoCampaignNetwerk () {
      this.$router.push({ path: 'campaign-free-account' })
    },
    closeCampaignDialog (val) {
      this.$store.dispatch('style/setCampaignDialog', 'close')
    }
  }
}
</script>
