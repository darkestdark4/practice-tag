<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar class="text-primary">
      <q-toolbar-title class="text-center text-bold font-proxima-nova-alt" :style="`font-size:16px; color: ${$store.state.userdata.user.secondary_color ? $store.state.userdata.user.secondary_color : '#116C54'}`">Send VCF to your Email</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container v-if="$store.state.style.isMobile">
        <q-page class="flex flex-center">
            <div class="col row q-pa-sm">
                <div class="col-10 q-mr-auto q-ml-auto text-center q-mb-lg">
                    <q-img :src="Logo" width="150px" />
                    <h5 class="text-bold q-mt-lg">Success !</h5>
                    <p class="text-grey-6 col-4 q-mt-lg q-mb-lg">Check your email to find out the vcf file that was sent.
                      Email and phone numbers can changes.
                      Always have {{ username }} latest contact information with TAG.</p>
                    <q-img :src="LogoTag" width="125px" />
                </div>
                <div class="col-12 text-center">
                    <q-btn
                    @click="toSaveCard()"
                    label="Create Account"
                    class="full-width q-py-sm q-mt-md text-secondary"
                    color="secondary"
                    size="15px"
                    padding="xs lg"
                    no-caps
                    rounded
                    />
                    <p @click="toHome()" class="text-grey-6 q-mt-lg q-mb-lg cursor-pointer">Maybe Later</p>
                </div>
            </div>
        </q-page>
    </q-page-container>
    <q-page-container v-else>
        <q-page class="flex flex-center">
            <div class="col row q-pa-sm">
                <div class="col-4 q-mr-auto q-ml-auto text-center q-mb-lg">
                    <q-img :src="Logo" width="150px" />
                    <h5 class="text-bold q-mt-lg">Success !</h5>
                    <p class="text-grey-6 col-4 q-mt-lg q-mb-lg">Check your email to find out the vcf file that was sent.
                      Email and phone numbers can changes.
                      Always have {{ username }} latest contact information with TAG.</p>
                </div>
                <div class="col-12 text-center q-mt-sm">
                    <q-img :src="LogoTag" width="125px" />
                </div>
                <div class="col-6 q-mr-auto q-ml-auto text-center q-mt-sm">
                    <q-btn
                    @click="toSaveCard()"
                    label="Create Account"
                    class="full-width q-px-md q-py-sm q-mt-lg text-secondary"
                    color="secondary"
                    size="15px"
                    padding="xs lg"
                    no-caps
                    rounded
                    />
                    <p @click="toHome()" class="text-grey-6 q-mt-lg q-mb-lg cursor-pointer">Maybe Later</p>
                </div>
            </div>
        </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Logo from 'src/assets/image/success.png'
import LogoTag from 'src/assets/image/TAGID-logo.png'
import Whatsapp from 'src/assets/image/wa-logo.png'

const host = window.location.host
const parts = host.split('.')

export default {
  data () {
    return {
      Logo,
      LogoTag,
      Whatsapp,
      username: parts[0]
    }
  },
  methods: {
    toSaveCard () {
      window.location.href = 'https://tagid.ai/#pricing'
    },
    toHome () {
      // window.location.href = 'https://' + parts[0] + '.tagid.ai/'
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 1000)
    }
  }
}
</script>
