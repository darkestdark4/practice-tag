<template>
  <div class="q-pa-sm">
    <q-card class="constrain-mobile border-radius-10px" style="margin-bottom:10px !important" flat bordered>
      <q-card-section>
        <div class="row">
          <div class="col-3">
            <q-img :src="LinkAja" width="60px" />
          </div>
          <div class="col-9">
            <div class="colum">
              <div class="col text-bold">
                LinkAja!
              </div>
              <div class="col text-grey-7">Pembayaran, Pinjaman, & Investasi Online dalam satu genggaman.</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-my-md full-width">
          <span class="text-grey-7">Username</span>
          <q-input v-model="data.username" placeholder="username" outlined />
        </div>
        <div class="q-my-md full-width">
          <span class="text-grey-7">Password</span>
          <q-input type="password" v-model="data.password" placeholder="*****" outlined>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions class="flex flex-center">
        <q-btn label="Connect" class="q-px-md q-py-sm q-mb-md bg-secondary text-white text-capitalize full-width" rounded />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import LinkAja from 'src/assets/image/LinkAja.png'
export default {
  data () {
    return {
      LinkAja,
      data: {
        username: null,
        password: null
      }
    }
  }
}
</script>
