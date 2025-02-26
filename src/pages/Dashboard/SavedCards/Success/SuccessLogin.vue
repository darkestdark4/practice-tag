<template>
<q-layout view="lHh Lpr lFf">
    <q-page-container>
        <q-page class="flex flex-center">
            <div class="col row q-pa-sm">
                <div class="col-12 text-center q-mb-lg">
                    <q-img :src="Logo" width="150px" />
                    <h5 class="text-bold q-mt-lg">Success !</h5>
                    <p class="text-grey-6 q-mt-lg q-mb-lg">Success to save card</p>
                </div>
                <div class="col-12 text-center q-mt-sm">
                    <q-btn
                    @click="toSaveCard()"
                    label="Go to Saved Card List"
                    class="col-12 q-px-md q-py-sm q-mt-lg text-secondary"
                    color="secondary"
                    size="15px"
                    padding="xs lg"
                    no-caps
                    rounded
                    />
                </div>
            </div>
        </q-page>
    </q-page-container>
</q-layout>
</template>
<script>
import Logo from 'src/assets/image/success.png'
import Whatsapp from 'src/assets/image/wa-logo.png'
export default {
  data () {
    return {
      Logo,
      Whatsapp
    }
  },
  methods: {
    toSaveCard () {
      const parts = window.location.host.split('.')
      window.localStorage.setItem('username', parts[0])
      const host = window.location.host
      window.location.href = window.location.protocol + '//' + host + '/dashboard/saved-cards'
    }
  }
}
</script>
