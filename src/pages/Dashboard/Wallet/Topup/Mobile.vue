<template>
  <div class="q-pa-sm">
    <q-card class="constrain-mobile border-radius-10px" style="margin-bottom:10px !important" flat bordered>
      <q-card-section class="text-center">
        <span>Pilih Minimal Saldo Top-up</span>
      </q-card-section>
      <q-card-section>
        <div class="row q-mb-sm flex flex-center">
            <div class="q-px-xs col-6">
                <q-btn class="full-width" color="secondary" label="100.000" @click="topupOptions(100000)" outline rounded />
            </div>
            <div class="q-px-xs col-6">
                <q-btn class="full-width" color="secondary" label="200.000" @click="topupOptions(200000)" outline rounded />
            </div>
        </div>
        <div class="row flex flex-center">
            <div class="q-px-xs col-6">
                <q-btn class="full-width" color="secondary" label="500.000" @click="topupOptions(500000)" outline rounded />
            </div>
            <div class="q-px-xs col-6">
                <q-btn class="full-width" color="secondary" label="1.000.000" @click="topupOptions(1000000)" outline rounded />
            </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="q-mb-sm">Atau masukan nominal top-up</div>
        <vue-numeric class="q-py-md topup-input full-width border-radius-30px" placeholder="Masukkan jumlah top-up" currency="Rp" separator="." v-model="data.topup"></vue-numeric>
        <div class="q-mt-sm text-bold"><u>*maksimal top-up saldo Rp 10.000.000</u></div>
      </q-card-section>
      <q-card-section>
          <div class="text-center">Metode Pembayaran</div>
          <q-list>
            <q-item  class="q-py-md" @click="$router.push('/dashboard/wallet/topup/linkaja')" clickable v-ripple>
                <q-item-section avatar>
                    <q-img :src="LinkAja" width="25px" />
                </q-item-section>
                <q-item-section>
                    <span class="text-bold" style="font-size: 14px">
                        Link Aja
                    </span>
                </q-item-section>
                <q-item-section avatar>
                    <q-icon name="chevron_right" color="grey-7" />
                </q-item-section>
            </q-item>
            <q-item  class="q-py-md" @click="$router.push('/dashboard/wallet/topup/bank-transfer')" clickable v-ripple>
                <q-item-section avatar>
                    <q-icon class="text-bold" name="fas fa-exchange-alt" color="positive" />
                </q-item-section>
                <q-item-section>
                    <span class="text-bold" style="font-size: 14px">
                        Bank Transfer
                    </span>
                </q-item-section>
                <q-item-section avatar>
                    <q-icon name="chevron_right" color="grey-7" />
                </q-item-section>
            </q-item>
          </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import VueNumeric from 'vue-numeric'
import LinkAja from 'src/assets/image/LinkAja.png'
export default {
  components: {
    VueNumeric
  },
  data () {
    return {
      LinkAja,
      data: {
        topup: 10000
      }
    }
  },
  methods: {
    topupOptions (value) {
      this.data.topup = value
    }
  }
}
</script>
<style lang="scss">
    .topup-input {
        text-align: center !important;
        outline: none;
        border: 1px solid #BDBDBD;
    }
</style>
