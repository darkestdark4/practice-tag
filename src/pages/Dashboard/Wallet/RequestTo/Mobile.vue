<template>
  <div class="q-pa-sm">
    <q-card class="constrain-mobile border-radius-10px" flat bordered>
      <q-card-section class="flex flex-center">
        <div class="text-h6 text-secondary">Request To</div>
      </q-card-section>
      <q-card-section class="flex flex-center">
        <div class="column">
          <q-avatar class="col q-mb-sm" size="75px" round>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <div class="col text-bold" style="font-size:14px">Putri Mulia</div>
          <div class="col text-grey-7" style="font-size:14px">PT. Abipraya</div>
        </div>
      </q-card-section>
      <q-card-section class="flex flex-center">
        <vue-numeric class="q-py-md request-input full-width border-radius-30px" placeholder="Masukkan jumlah request" currency="Rp" separator="." v-model="data.request"></vue-numeric>
      </q-card-section>
      <q-card-section class="flex flex-center">
        <div class="q-mb-sm text-grey-7">Note (Additional)</div>
        <q-input type="textarea" class="full-width" outlined />
      </q-card-section>
      <q-card-actions class="flex flex-center">
        <q-btn label="Send Request" class="q-px-md q-py-sm q-mb-md bg-secondary text-white text-capitalize full-width" rounded />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import VueNumeric from 'vue-numeric'

export default {
  components: {
    VueNumeric
  },
  data () {
    return {
      data: {
        request: 0
      }
    }
  }
}
</script>
<style lang="scss">
  .request-input {
      text-align: center !important;
      outline: none;
      border: 1px solid #BDBDBD;
  }
</style>
