<template>
  <div class="q-pa-sm">
    <q-tabs dense class="text-grey border-radius-10px" active-color="secondary" indicator-color="secondary"
      align="justify" narrow-indicator outside-arrows mobile-arrows style="border: 1px solid #efefef">
      <q-route-tab class="text-capitalize" label="Users" to="/dashboard/manage-corporate/users" />
      <q-route-tab class="text-capitalize" label="Broadcast" to="/dashboard/manage-corporate/broadcast" />
      <q-route-tab class="text-capitalize" label="Log" to="/dashboard/manage-corporate/log" />
      <q-route-tab class="bg-secondary text-white text-capitalize" label="Polling"
        to="/dashboard/manage-corporate/Polling" exact />
      <q-route-tab class="text-capitalize" label="Sponsor" to="/dashboard/manage-corporate/sponsor" />
    </q-tabs>
    <div class="q-my-md">
      <div class="col row q-pa-sm">
        <span class="col-7 text-right text-bold q-pt-md">Filter :</span>
        <span class="col-4 offset-1 text-right text-black cursor-pointer q-pa-sm">
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

              <q-item clickable v-close-popup @click="filterData('Inactive')">
                <q-item-section>
                  <q-item-label>Inactive</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </span>
      </div>
      <q-card v-for="poll in pollingFilter" :key="poll.id" class="q-pa-sm q-my-sm bg-grey-4" flat>
        <div class="q-my-sm row">
          <div class="col-6 text-bold text-left" @click="$router.replace({ path: `polling/detail/` + poll.id })">
            <q-icon name="podcasts" color="secondary" class="q-mr-sm"/>
            <span>Polling</span>
          </div>
          <div v-if="poll.end > date" class="col-2 offset-4 text-secondary text-right">
            <span class="cursor-pointer" @click="$router.replace({ path: `polling/edit/` + poll.id })">
              Edit
            </span>
          </div>
          <div v-else-if="poll.end < date" class="col-2 offset-4 text-secondary text-right">
            <span class="cursor-not-allowed">Edit</span>
          </div>
        </div>
        <div class="col-9">
          <span style="font-size:12px" class="cursor-pointer" @click="$router.replace({ path: `polling/detail/` + poll.id })">
            {{ poll.question }}
          </span>
        </div>
        <div class="q-my-sm" style="font-size:12px">
          <div class="text-black">Duration</div>
          <div class="row text-grey-8">
            <div class="col-6 column">
              <div class="col">Start: {{ moment(poll.start).format('DD MMMM YYYY') }}</div>
              <div class="col">End Date: {{ moment(poll.end).format('DD MMMM YYYY') }}</div>
            </div>
            <div class="col-6 col">
              <div class="col">Start Time: {{ moment(poll.start).format('hh:mm') }}</div>
              <div class="col">End Time: {{ moment(poll.end).format('HH:mm') }}</div>
            </div>
          </div>
        </div>
        <div class="q-my-sm column" style="font-size:12px">
          <div class="col">Polling To: {{ poll.to ? poll.to : 'All Member' }}</div>
          <!-- <div class="col">Group: All</div> -->
        </div>
      </q-card>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab color="white">
          <q-icon name="add" color="secondary" @click="$router.replace({ path: `polling/add` })" />
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
      pollings: [],
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      filter: 'All'
    }
  },
  computed: {
    pollingFilter () {
      if (this.filter === 'All') {
        return this.pollings
      } else if (this.filter === 'Active') {
        return this.pollings.filter(pl => pl.end > this.date)
      } else if (this.filter === 'Inactive') {
        return this.pollings.filter(pl => pl.end < this.date)
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
      this.$axios.get('/member/corporate/polling').then(response => {
        if (response.data.status) {
          this.pollings = response.data.data
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
