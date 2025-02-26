<template>
  <q-card
    v-if="user.sponsor"
    class="bg-white border-radius-10px"
    style="max-height: 200px; background-color: #eef2f5"
  >
    <q-card-section
      horizontal
      class="q-my-md"
      :style="`
        background: url(${BackgroundSponsor});
        background-position: left bottom;
        background-repeat: no-repeat;
        background-size: 350px 150px;
      `"
      v-if="corporate.id !== 48"
    >
      <div class="col-7 q-mb-sm q-pa-lg column" style="color: #1c458e">
        <span class="col-6"></span>
        <span
          class="col q-mb-sm text-bold"
          :class="$store.state.style.isMobile ? 'text-h6' : 'text-h4'"
        >
          Member Card
        </span>
        <span
          class="col q-my-md text-bold"
          :class="$store.state.style.isMobile ? 'text-h6' : 'text-h5'"
        >
          {{ user.sponsor || "" }}
        </span>
        <span
          class="col text-h6"
          style="font-size: 12px"
          v-show="user.expired_date"
        >
          Valid thru :
          {{ user.expired_date ? moment(user.expired_date).format("DD-MM-YYYY") : "" }}
        </span>
      </div>
      <div
        class="col-4 text-right q-mb-sm"
        :class="corporate.id === 48 ? 'q-mt-lg' : ''"
      >
        <q-img
          fit="contain"
          alt="Logo Sponsor"
          style="max-width: 100px"
          :src="corporate.id === 48 ? SponsorMvp : Sponsor"
        />
      </div>
    </q-card-section>
    <q-card-section
      class="q-my-md"
      horizontal
      v-else
      :style="`
        background: url(${BackgroundSponsorMvp});
        background-repeat: no-repeat;
        background-size: cover;
      `"
    >
      <div
        class="col-8 q-mb-sm q-pa-md column justify-between"
        :style="`color: ${user.secondary_color || defaultSecondaryColor}`"
      >
        <span class="col-8 column">
          <div class="col-7">
            <q-img
              fit="contain"
              alt="Logo Sponsor"
              style="max-width: 50px"
              :src="corporate.id === 48 ? LogoMvp : Sponsor"
            />
          </div>
          <span
            class="col"
            :class="$store.state.style.isMobile ? 'text-h6' : 'text-h5'"
          >
            {{ user.full_name }}
          </span>
        </span>
        <span
          class="col q-mb-sm font-proxima-nova-alt"
          :style="$store.state.style.isMobile ? 'font-size: 1rem' : ''"
          :class="$store.state.style.isMobile ? 'text-h6' : 'text-h5'"
        >
          MVP
          <span
            class="col q-mb-sm"
            :class="$store.state.style.isMobile ? '' : 'text-h5'"
          >
            {{ data || "" }}
          </span>
        </span>
        <span
          class="col text-h6"
          style="font-size: 12px"
          v-show="$store.state.userdata.user.expired_date"
        >
          Valid thru :
          {{ user.expired_date ? moment(user.expired_date).format("DD-MM-YYYY") : "" }}
        </span>
      </div>
      <div
        class="col-4 text-center q-mb-sm"
        :class="corporate.id === 48 ? 'q-mt-lg' : ''"
      >
        <q-img
          fit="contain"
          alt="Logo Sponsor"
          style="max-width: 100px"
          :src="corporate.id === 48 ? SponsorMvp : Sponsor"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from 'moment'
import LogoMvp from 'src/assets/image/logo-mvp.png'
import Sponsor from 'src/assets/image/sponsor.png'
import SponsorMvp from 'src/assets/image/gold.png'
import BackgroundSponsor from 'src/assets/image/background-sponsor.png'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return null
      }
    },
    corporate: {
      type: Object,
      default: () => {
        return null
      }
    },
    defaultSecondaryColor: {
      type: String
    }
  },
  data () {
    return {
      moment,
      LogoMvp,
      Sponsor,
      SponsorMvp,
      BackgroundSponsor
    }
  }
}
</script>
