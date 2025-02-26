<script>
import VideoBackground from 'vue-responsive-video-background-player'

export default {
  components: {
    VideoBackground
  },
  props: {
    type: { type: String },
    background: { type: String }
  }
}
</script>

<template>
  <div>
    <video-background
      v-if="type == 'video'"
      :src="background"
      style="width: 100%; height: 100vh"
    >
      <q-layout view="lHh Lpr lff">
        <slot></slot>
      </q-layout>
    </video-background>

    <q-layout
      v-else-if="type == 'image'"
      view="lHh Lpr lff"
      :style="`background: url(${background});`"
    >
      <slot></slot>
    </q-layout>
  </div>
</template>
