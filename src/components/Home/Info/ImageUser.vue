<script>
import CompanyLogo from 'src/assets/image/TAGID-logo.png'

export default {
  data () {
    return {
      CompanyLogo,
      Logo: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      linkStorageCorpLogo: 'https://api.the-netwerk.com/storage/app/public/corporate/logo/',
      linkStorageCompLogo: 'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/'
    }
  },
  props: {
    corporateID: { type: Number },
    corporateLogo: { type: String },
    companyLogo: { type: String },
    logo: { type: String }
  },
  computed: {
    imageLogo () {
      if (this.logo) {
        return `${this.linkStorageProfile}${this.logo}`
      }

      return this.Logo
    },
    imageCorporateLogo () {
      if (this.corporateID) {
        if (this.corporateLogo) {
          return `${this.linkStorageCorpLogo}${this.corporateLogo}`
        }
      } else {
        if (this.companyLogo) {
          return `${this.linkStorageCompLogo}${this.companyLogo}`
        }
      }

      return this.CompanyLogo
    },
    isMobile () {
      return this.$store.state.style.isMobile
    }
  },
  methods: {
    handlingCompanyLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    handlingProfileError (event) {
      event.target.src = this.Logo
    }
  }
}
</script>

<template>
  <div>
    <div class="q-mb-lg">
      <q-img
        img-class="border-radius-10px"
        :img-style="{ backgroundSize: 'contain' }"
        :src="imageCorporateLogo"
        :width="isMobile ? '100px' : '120px'"
        :height="isMobile ? '100px' : '120px'"
        @error="handlingCompanyLogoError"
      />
    </div>

    <q-img
      contain
      img-class="border-radius-10px"
      :src="imageLogo"
      :width="isMobile ? '100px' : '120px'"
      :height="isMobile ? '100px' : '120px'"
      @error="handlingProfileError"
    />
  </div>
</template>
