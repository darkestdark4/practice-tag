<template>
  <div class="q-pa-sm">
    <q-tabs dense class="text-grey border-radius-10px" active-color="secondary" indicator-color="secondary"
      align="justify" narrow-indicator outside-arrows mobile-arrows style="border: 1px solid #efefef">
      <!-- <q-route-tab class="text-capitalize" label="Company" to="/dashboard/manage-corporate/company" exact /> -->
      <q-route-tab class="text-capitalize" label="Users" to="/dashboard/manage-corporate/users" />
      <q-route-tab class="bg-secondary text-white text-capitalize" label="Broadcast"
        to="/dashboard/manage-corporate/broadcast" />
      <q-route-tab class="text-capitalize" label="Log" to="/dashboard/manage-corporate/log" />
      <q-route-tab class="text-capitalize" label="Polling" to="/dashboard/manage-corporate/Polling" exact />
      <q-route-tab class="text-capitalize" label="Sponsor" to="/dashboard/manage-corporate/sponsor" exact />
    </q-tabs>
    <div class="q-my-md">
      <div class="col row q-pa-sm">
        <span class="col-10 text-right text-bold q-pt-md">Filter :</span>
        <span class="col-2 text-right text-black cursor-pointer q-pa-sm">
          <q-btn-dropdown outline class="full-width text-black" color="white" :label="filter">
          <q-list>
            <q-item clickable v-close-popup @click="filterData('All')">
            <q-item-section>
              <q-item-label>All</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="filterData('Active')">
            <q-item-section>
              <q-item-label>Active</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="filterData('Expired')">
            <q-item-section>
              <q-item-label>Inactive</q-item-label>
            </q-item-section>
            </q-item>
          </q-list>
          </q-btn-dropdown>
        </span>
      </div>
      <q-card v-for="bc in broadcastFilter" :key="bc.id" class="q-pa-sm q-my-sm bg-grey-4" flat>
        <div class="q-my-sm row">
          <div class="col text-bold">
            <span>{{ bc.title }}</span>
          </div>
          <div v-if="bc.end > date" class="col text-secondary text-right cursor-pointer"
            @click="$router.replace({ path: `broadcast/edit/` + bc.id })">
            Edit
          </div>
          <div v-else-if="bc.end < date" class="col text-secondary text-right cursor-not-allowed">
            Edit
          </div>
        </div>
        <div class="q-my-sm row">
          <div class="col-3">
            <img :src="Profile" width="75px" height="75px">
          </div>
          <div class="col-9">
            <span style="font-size:12px">
              {{ bc.description }}
            </span>
          </div>
        </div>
        <div class="q-my-sm" style="font-size:12px">
          <div class="text-black">Duration</div>
          <div class="row text-grey-8">
            <div class="col-6 column">
              <div class="col">Start: {{ moment(bc.start).format('DD MMMM YYYY') }}</div>
              <div class="col">End Date: {{ moment(bc.end).format('DD MMMM YYYY') }}</div>
            </div>
            <div class="col-6 col">
              <div class="col">Start Time: {{ moment(bc.start).format('hh:mm') }}</div>
              <div class="col">End Time: {{ moment(bc.end).format('HH:mm') }}</div>
            </div>
          </div>
        </div>
        <div class="q-my-sm column" style="font-size:12px">
          <div class="col">Type: {{ bc.type }}</div>
          <!-- <div class="col">Group: All</div> -->
        </div>
      </q-card>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab color="white">
          <q-icon name="add" color="secondary" @click="$router.replace({ path: `broadcast/add` })" />
        </q-btn>
      </q-page-sticky>
    </div>
  </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import moment from 'moment'
export default {
  data () {
    return {
      Profile,
      moment,
      count: 0,
      broadcast: [],
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      filter: 'All'
    }
  },
  computed: {
    broadcastFilter () {
      if (this.filter === 'All') {
        return this.broadcast
      } else if (this.filter === 'Active') {
        return this.broadcast.filter(bc => bc.end > this.date)
      } else if (this.filter === 'Expired') {
        return this.broadcast.filter(bc => bc.end < this.date)
      }

      return null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    filterData (data) {
      this.filter = data
    },
    getData () {
      this.$axios.get('/broadcast').then(response => {
        if (response.data.status) {
          this.broadcast = response.data.data.data
          this.count = response.data.data.count
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
