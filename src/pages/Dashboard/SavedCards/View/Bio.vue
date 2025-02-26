<template>
  <q-card class="bg-white border-radius-10px">
    <div class="q-pa-lg q-my-md">
      <div class="q-mb-sm text-h6 text-center font-proxima-nova-alt" :style="`color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">Biography</div>
      <div class="font-proxima-nova-alt">
        {{ data.member.biography ? data.member.biography : '' }}
      </div>
    </div>
  </q-card>
</template>
<script>
export default {
  data () {
    return {
      data: {
        member: {}
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/member/' + this.$route.params.username).then(response => {
        this.data.member = response.data.member
        this.checkExtensionBackground(this.data.member.background)
      })
    }
  }
}
</script>
