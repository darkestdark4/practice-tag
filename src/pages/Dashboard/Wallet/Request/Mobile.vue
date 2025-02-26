<template>
  <div class="q-pa-sm">
    <q-card class="constrain-mobile border-radius-10px" flat>
      <q-card-section class="flex flex-center">
        <div class="text-h6 text-secondary">Request</div>
      </q-card-section>
      <q-card-section>
        <q-input class="full-width" placeholder="Search ..." outlined />
      </q-card-section>
      <q-card-section style="margin-top: -20px">
        <div class="text-right">
          <q-icon name="apps" class="cursor-pointer" color="secondary" size="sm" @click="changeLayout('grid')" />
          <q-icon name="view_headline" class="cursor-pointer" color="secondary" size="sm"
            @click="changeLayout('list')" />
        </div>
      </q-card-section>
      <q-card-section style="margin-top: -20px">
        <div v-if="layout === 'list'">
          <div class="row q-py-md" v-for="cards in 9" :key="cards" @click="$router.push('/dashboard/wallet/request-to')">
            <div class="col-4">
              <q-avatar round>
                <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
              </q-avatar>
            </div>
            <div class="col-5">
              <div class="column">
                <div class="col text-bold" style="font-size:14px">Putri Mulia</div>
                <div class="col" style="font-size:14px">PT. Abipraya</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="layout === 'grid'">
          <div class="row">
            <div class="col-4 q-mb-sm flex flex-center" v-for="cards in 9" :key="cards" @click="$router.push('/dashboard/wallet/request-to')">
              <q-card style="width:105px; height:150px">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" height="150px">
                  <div class="absolute-bottom text-center" style="background: none">
                    <q-avatar round>
                      <img src="https://cdn.quasar.dev/img/avatar.png" size="50px">
                    </q-avatar>
                    <div class="q-mt-md text-bold" style="font-size:10px">Putri Mulia</div>
                  </div>
                </q-img>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      layout: 'list'
    }
  },
  methods: {
    changeLayout (layout) {
      this.layout = layout
    }
  }
}
</script>
