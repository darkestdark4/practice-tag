<script>
import VueBottomSheet from '@webzlodimir/vue-bottom-sheet'
import { SwipeableBottomSheet } from 'vue-swipeable-bottom-sheet'

export default {
  props: {
    showDesktop: { type: Boolean },
    showMobile: { type: String }
  },
  components: {
    VueBottomSheet,
    SwipeableBottomSheet
  },
  computed: {
    isMobile () {
      return this.$store.state.style.isMobile
    }
  },
  watch: {
    showDesktop (val) {
      if (val) {
        this.$refs.myBottomSheet.open()
      } else {
        this.$refs.myBottomSheet.close()
      }
    },
    showMobile (val) {
      this.$refs.myBottomSheetMobile.setState(val)
    }
  },
  mounted () {
    this.$watch('$refs.myBottomSheetMobile.state', (newValue) => {
      this.$emit('update:showMobile', newValue)

      if (newValue === 'half') {
        this.$emit('update:showMobile', 'close')
      }
    }, { immediate: true })
  },
  methods: {
    closedBottomSheet () {
      this.$emit('update:showDesktop', false)
    }
  }
}
</script>

<template>
  <div>
    <vue-bottom-sheet
      max-height="95%"
      max-width="100%"
      ref="myBottomSheet"
      effect="fx-fadein-scale"
      :is-full-screen="true"
      @closed="closedBottomSheet()"
      v-if="!isMobile"
    >
      <slot></slot>
    </vue-bottom-sheet>
    <swipeable-bottom-sheet
      ref="myBottomSheetMobile"
      v-else-if="isMobile"
    >
      <slot></slot>
    </swipeable-bottom-sheet>
  </div>
</template>
