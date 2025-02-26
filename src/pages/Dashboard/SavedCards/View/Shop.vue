<template>
  <q-card class="bg-white border-radius-10px" style="height:500px">
    <q-card-section>
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title>Quasar Framework</q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>
    </q-card-section>
    <q-card-section>
      <iframe :src="data.member.commerce ? data.member.commerce : ''" height="100%"
        width="100%" />
    </q-card-section>
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
