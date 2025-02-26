<template>
  <q-card class="bg-white border-radius-10px">
    <iframe
      :src="`${linkStoragePdf + $store.state.userdata.corporate.file_pdf}`"
      style="height: 500px; width: 100%"
    ></iframe>
    <!-- <iframe id="fred" style="border:1px solid #666CCC" title="PDF in an i-Frame" src="PDFData.pdf" frameborder="1" scrolling="auto" height="1100" width="850" ></iframe> -->
  </q-card>
</template>
<script>
export default {
  data () {
    return {
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/'
    }
  }
}
</script>
