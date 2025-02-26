<template>
  <div class="q-pa-sm">
    <q-tabs dense class="text-grey border-radius-10px" active-color="secondary" indicator-color="secondary"
      align="justify" narrow-indicator outside-arrows mobile-arrows style="border: 1px solid #efefef">
      <!-- <q-route-tab class="text-capitalize" label="Company" to="/dashboard/manage-corporate/company" exact /> -->
      <q-route-tab class="text-capitalize" label="Users" to="/dashboard/manage-corporate/users" />
      <q-route-tab class="text-capitalize" label="Broadcast" to="/dashboard/manage-corporate/broadcast" />
      <q-route-tab class="bg-secondary text-white text-capitalize" label="Log" to="/dashboard/manage-corporate/log" />
      <q-route-tab class="text-capitalize" label="Polling" to="/dashboard/manage-corporate/Polling" exact />
      <q-route-tab class="text-capitalize" label="Sponsor" to="/dashboard/manage-corporate/sponsor" exact />
    </q-tabs>
    <q-card flat>
      <div class="row q-pa-md" v-for="(logs, idx) in log" :key="idx">
        <div class="col-1 q-mr-md">
          <q-avatar round>
            <img :src="Profile" size="100px">
          </q-avatar>
        </div>
        <div class="col-8 q-mt-md">
          <span class="text-secondary">{{ logs.description }}</span>
        </div>
        <div class="col-2 text-center q-mt-md">
          <span class="text-secondary" style="font-size: 12px">{{ logs.created_at }}</span>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import moment from 'moment'
export default {
  data () {
    return {
      Profile,
      log: []
    }
  },
  mounted () {
    this.getDataLog()
  },
  methods: {
    getDataLog () {
      this.$axios.get('/member/activity/log').then(response => {
        if (response.data.status) {
          this.log = response.data.data.map(data => {
            return {
              description: data.description,
              created_at: moment(data.created_at).format('YYYY-MM-DD HH:mm')
            }
          })
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    }
  }
}
</script>
