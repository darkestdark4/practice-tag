<script>
import SponsorMvp from 'src/assets/image/gold.png'
import LogoMvp from 'src/assets/image/logo-mvp.png'
import BackgroundSponsorMvp from 'src/assets/image/kartu.jpg'
import moment from 'moment'

export default {
  props: {
    sponsorData: { type: Object },
    corporateID: { type: Number },
    expiredDate: { type: String },
    secondaryColor: { type: String },
    fullName: { type: String }
  },
  data () {
    return {
      SponsorMvp,
      LogoMvp,
      BackgroundSponsorMvp,
      moment
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.style.isMobile
    }
  }
}
</script>

<template>
  <q-card-section
    horizontal
    class="q-my-md"
    :style="`background: url(${BackgroundSponsorMvp});background-repeat: no-repeat; background-size: cover;`"
  >
    <div
      class="col-8 q-mb-sm q-pa-md column justify-between"
      :style="`color: ${secondaryColor}`"
    >
      <span class="col-8 column">
        <div class="col-7">
          <q-img
            alt="Logo Sponsor"
            :src="LogoMvp"
            style="max-width: 50px"
            fit="contain"
          />
        </div>
        <span
          class="col"
          :class="isMobile ? 'text-h6' : 'text-h5'"
        >
          {{ fullName }}
        </span>
      </span>
      <span
        class="col q-mb-sm font-proxima-nova-alt"
        :style="isMobile ? 'font-size: 1rem' : ''"
        :class="isMobile ? 'text-h6' : 'text-h5'"
      >
        MVP
        <span
          class="col q-mb-sm"
          :class="isMobile ? '' : 'text-h5'"
        >
          {{ sponsorData.sponsor_name }}
        </span>
      </span>
      <span
        class="col text-h6"
        style="font-size: 12px"
        v-show="expiredDate"
      >
        Valid thru :
        {{ expiredDate ? moment(expiredDate).format("DD-MM-YYYY") : "" }}
      </span>
    </div>
    <div
      class="col-4 text-center q-mb-sm"
      :class="corporateID == 48 ? 'q-mt-lg' : ''"
    >
      <q-img
        alt="Logo Sponsor"
        :src="SponsorMvp"
        style="max-width: 100px"
        fit="contain"
      />
    </div>
  </q-card-section>
</template>
