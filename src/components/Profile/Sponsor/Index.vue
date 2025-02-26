<script>
import MVP from 'src/components/Profile/Sponsor/MVP.vue'
import Sponsor from 'src/assets/image/sponsor.png'
import BackgroundSponsor from 'src/assets/image/background-sponsor.png'
import moment from 'moment'

export default {
  components: {
    MVP
  },
  props: {
    sponsorData: { type: Object },
    corporateID: { type: Number },
    expiredDate: { type: String },
    secondaryColor: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String }
  },
  data () {
    return {
      Sponsor,
      BackgroundSponsor,
      moment
    }
  },
  computed: {
    fullName () {
      if (this.middleName) {
        return `${this.firstName} ${this.middleName} ${this.lastName}`
      }

      return `${this.firstName} ${this.lastName}`
    },
    isMobile () {
      return this.$store.state.style.isMobile
    }
  }
}
</script>

<template>
  <q-card
    v-if="sponsorData"
    class="bg-white border-radius-10px"
    style="max-height: 200px; background-color: #eef2f5"
  >
    <q-card-section
      v-if="corporateID != 48"
      horizontal
      class="q-my-md"
      :style="`
        background: url(${BackgroundSponsor});
        background-position: left bottom;
        background-repeat: no-repeat;
        background-size: 350px 150px;
      `"
    >
      <div class="col-7 q-mb-sm q-pa-lg column" style="color: #1c458e">
        <span class="col-6"></span>
        <span
          class="col q-mb-sm text-bold"
          :class="isMobile ? 'text-h6' : 'text-h4'"
        >
          Member Card
        </span>
        <span
          class="col q-my-md text-bold"
          :class="isMobile ? 'text-h6' : 'text-h5'"
        >
          {{ sponsorData.sponsor_name }}
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
        class="col-4 text-right q-mb-sm"
        :class="corporateID == 48 ? 'q-mt-lg' : ''"
      >
        <q-img
          alt="Logo Sponsor"
          :src="Sponsor"
          style="max-width: 100px"
          fit="contain"
        />
      </div>
    </q-card-section>

    <MVP
      v-else
      :fullName="fullName"
      :sponsorData="sponsorData"
    />
  </q-card>
</template>
