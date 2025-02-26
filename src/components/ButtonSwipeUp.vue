<script>
export default {
  props: {
    mainColor: { type: String }
  }
}
</script>

<template>
  <q-page-sticky position="bottom" :offset="[15, 15]">
    <q-btn class="btn-swipeup" fab color="white">
      <q-icon
        class="text-bold"
        name="arrow_upward"
        :style="`color: ${mainColor || '#116C54'}`"
      />
    </q-btn>
  </q-page-sticky>
</template>

<style lang="scss">
@keyframes shimmy {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translateY(15px);
  }
}

.btn-swipeup {
  animation: shimmy 1s infinite;
  animation-direction: alternate;
}
</style>
