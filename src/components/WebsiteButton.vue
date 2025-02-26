<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  props: {
    corporateCommerce: { type: String },
    companyWebsite: { type: String },
    show: { type: Boolean },
    secondaryColor: { type: String }
  },
  methods: {
    toggleWebsite (val) {
      this.dialog = val
      this.$emit('update:show', val)
    }
  }
}
</script>

<template>
  <div>
    <q-page-sticky
      position="top-right"
      :offset="[-25, 150]"
      v-if="corporateCommerce || companyWebsite"
    >
      <q-btn outline class="btn-shop" color="black" @click="toggleWebsite(true)">
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
          <q-btn flat round dense v-close-popup icon="arrow_back" @click="toggleWebsite(false)" />
          <q-toolbar-title
            class="text-center font-proxima-nova-alt"
            :style="`margin-left:-40px; color: ${secondaryColor}`"
          >
            Shop
          </q-toolbar-title>
        </q-toolbar>
        <iframe
          width="100%" height="100%"
          :src="corporateCommerce || companyWebsite"
        />
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
