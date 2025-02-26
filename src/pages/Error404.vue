<template>
<div>
  <div v-if="$store.state.style.isMobile" class="fullscreen text-center flex flex-center font-proxima-nova-alt" style="background: #F8FCFF">
    <img :src="img" alt="error404">
    <div style="width: 100%">
      <h5 class="text-center q-mb-md text-bold">Page Not Found</h5>
      <p class="text-center text-grey-6">The page you are looking for was moved, removed, renamed, or might never existed.</p>
      <q-btn class="bg-secondary text-white text-capitalize q-px-xl q-mt-md" size="16px" @click="sendWa()" rounded>
        <img :src="wa" width="20" height="20">
        <div class="q-ml-sm">Contact TAG Support</div>
      </q-btn>
    </div>
  </div>
  <div v-else class="fullscreen text-center flex flex-center font-proxima-nova-alt" style="background: #F8FCFF">
    <img :src="img" alt="error404">
    <div style="width: 100%">
      <h3 class="text-center q-mb-md text-bold">Page Not Found</h3>
      <p class="text-center text-grey-6">The page you are looking for was moved, removed, renamed, or might never existed.</p>
      <q-btn class="bg-secondary text-white text-capitalize q-px-xl q-mt-md" size="16px" @click="sendWa()" rounded>
        <img :src="wa" width="20" height="20">
        <div class="q-ml-sm">Contact TAG Support</div>
      </q-btn>
    </div>
  </div>
</div>
</template>

<script>
import img from 'src/assets/image/404image.png'
import wa from 'src/assets/image/wa-logo.png'
export default {
  name: 'Error404',
  data () {
    return {
      img,
      wa
    }
  },
  methods: {
    sendWa () {
      window.location.href = 'https://api.whatsapp.com/send?phone=6285100441777'
    }
  }
}
</script>
