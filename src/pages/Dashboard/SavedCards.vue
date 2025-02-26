<template>
  <q-page class="q-pa-lg flex flex-center">
    <q-card class="constrain q-pa-lg border-radius-10px" flat>
      <q-card-section class="flex flex-center">
        <div class="text-h6 text-secondary">Saved Cards</div>
      </q-card-section>
      <q-card-section>
        <q-input class="full-width" placeholder="Search ..." outlined />
      </q-card-section>
      <q-card-section>
          <div class="text-right">
            <q-icon
                :name="layout == 'list' ? 'apps' : 'view_headline'"
                class="cursor-pointer"
                color="secondary"
                size="lg"
                @click="changeLayout()"
            />
        </div>
      </q-card-section>
      <q-card-section>
        <div v-if="layout === 'list'">
          <div class="row q-pa-md" v-for="cards in 9" :key="cards">
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-1 col-xs-4">
                <q-avatar round>
                    <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
                </q-avatar>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-1 col-xs-5">
                <div class="column">
                    <div class="col text-bold" style="font-size:16px">Putri Mulia</div>
                    <div class="col" style="font-size:16px">PT. Abipraya</div>
                </div>
            </div>
            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-3 text-right text-secondary">View</div>
            <q-separator />
          </div>
        </div>
        <div v-else-if="layout === 'grid'">
            <div class="row">
                <div class="q-pa-md q-pa-sm col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12" v-for="cards in 9" :key="cards">
                    <q-card class="my-card">
                        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                            <div class="absolute-bottom  text-center">
                                <q-avatar round>
                                    <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
                                </q-avatar>
                                <div class="q-mt-md text-bold" style="font-size:16px">Putri Mulia</div>
                            </div>
                        </q-img>
                    </q-card>
                </div>
            </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      layout: 'list'
    }
  },
  methods: {
    changeLayout () {
      if (this.layout === 'list') {
        this.layout = 'grid'
      } else {
        this.layout = 'list'
      }
    }
  }
}
</script>
