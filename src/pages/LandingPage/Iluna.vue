<template>
  <div>
    <div class="" v-if="tipeMember === 'Koordinator'">
      <Koordinator />
    </div>
    <div class="" v-else-if="tipeMember === 'UMKM'">
      <UMKM />
    </div>
    <q-dialog v-model="cardModal" persistent>
      <q-card
        class="card-front-modal font-fira-sans"
        style="max-width: 340px; padding: 8px; min-height: 250px"
      >
        <q-card-actions>
          <div class="col-12 text-center row q-my-lg">
            <span
              class="text-black col-12"
              style="
                font-weight:600;
                font-size: 16px;
                line-height: 24px;
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
              "
            >
              Mendaftar Sebagai Apakah Anda?
            </span>
          </div>
          <div class="col-8 q-ml-auto q-mr-auto q-mb-md">
            <q-btn
              label="Pendeta / Koordinator"
              class="q-py-sm q-mb-sm text-white full-width"
              v-close-popup
              @click="tipeMember = 'Koordinator'"
              style="
                font-weight: 700;
                font-size: 12px;
                line-height: 14.4px;
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
                background: linear-gradient(180deg, #ac633c 40%, #361402 100%);
              "
              rounded
              outlined
              dense
            />
          </div>
          <div class="col-8 q-ml-auto q-mr-auto q-mt-md">
            <q-btn
              label="UMKM"
              class="q-py-sm q-mb-sm text-white full-width"
              v-close-popup
              @click="tipeMember = 'UMKM'"
              style="
                font-weight: 700;
                font-size: 12px;
                line-height: 14.4px;
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
                background: linear-gradient(180deg, #ac633c 40%, #361402 100%);
              "
              rounded
              outlined
              dense
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Koordinator from 'src/pages/LandingPage/Koordinator.vue'
import UMKM from 'src/pages/LandingPage/UMKM.vue'

export default {
  components: { Koordinator, UMKM },
  data () {
    return {
      tipeMember: '',
      cardModal: true
    }
  }
}
</script>
<style>
.card-front-modal {
  width: 80%;
  border-radius: 13px !important;
  background: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130.5%;
  /* or 13px */

  text-align: justify;
  margin-left: auto;
  margin-right: auto;
}
</style>
