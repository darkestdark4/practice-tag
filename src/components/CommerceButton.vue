<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  props: {
    commerce: { type: String },
    show: { type: Boolean },
    secondaryColor: { type: String }
  },
  watch: {
    show (newVal) {
      this.dialog = newVal
    }
  },
  methods: {
    toggleCommerce (val) {
      this.dialog = true
      this.$emit('update:show', val)
    }
  }
}
</script>

<template>
  <div>
    <q-page-sticky
      position="top-right"
      :offset="[-25, 250]"
      v-if="commerce"
    >
      <q-btn class="btn-shop" color="black" @click="toggleCommerce(true)">
        <span
          class="text-capitalize font-monserrat"
          style="font-size: 18px"
          >Shop</span
        >
      </q-btn>
    </q-page-sticky>

    <q-dialog
      maximized
      v-model="dialog"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="bg-white border-radius-10px full-width">
        <q-toolbar>
          <q-btn flat round dense  v-close-popup icon="arrow_back" @click="toggleCommerce(false)" />
          <q-toolbar-title
            class="text-center font-proxima-nova-alt"
            :style="`margin-left:-40px; color: ${secondaryColor}`"
          >
            Shop
          </q-toolbar-title>
        </q-toolbar>
        <iframe width="100%" height="100%" :src="commerce" />
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss">
.btn-shop {
  text-orientation: sideways;
  transform: rotate(270deg);
}
</style>
