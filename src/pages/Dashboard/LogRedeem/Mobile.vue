<template>
  <div class="q-pa-md">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      narrow-indicator
      v-show="$store.state.userdata.user.role == 'Admin'"
    >
      <q-tab name="log-history" label="Log History Admin" />
      <q-tab name="log-history-member" label="Log History Member" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="log-history">
        <q-card flat style="font-size: 12px">
          <div
            class="q-my-md column"
            v-show="$store.state.userdata.user.role == 'Admin'"
          >
            <q-input filled v-model="date" readonly label="Filter Date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateFilter" mask="DD-MM-YYYY" range>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row q-pa-md" v-for="(logs, idx) in logFilter" :key="idx">
            <div class="col-1">
              <q-avatar round>
                <img :src="logs.image ? logs.image : Profile" size="100px" />
              </q-avatar>
            </div>
            <div class="col-8">
              <span class="text-secondary"
                ><span class="text-bold">{{ logs.name }} </span
                >{{ logs.description }}</span
              >
            </div>
            <div class="col-2 text-center">
              <span class="text-secondary" style="font-size: 10px">{{
                logs.created_at
              }}</span>
            </div>
          </div>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="log-history-member">
        <q-card flat style="font-size: 12px">
          <div
            class="q-my-md column"
            v-show="$store.state.userdata.user.role == 'Admin'"
          >
            <q-input filled v-model="date" readonly label="Filter Date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateFilter" mask="DD-MM-YYYY" range>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row q-pa-md" v-for="(logs, idx) in logFilter" :key="idx">
            <div class="col-1">
              <q-avatar round>
                <img :src="logs.image ? logs.image : Profile" size="100px" />
              </q-avatar>
            </div>
            <div class="col-8 offset-1">
              <span class="text-secondary"
                ><span class="text-bold">{{ logs.name }} </span
                >{{ logs.description }}</span
              >
            </div>
            <div class="col-2 text-center">
              <span class="text-secondary" style="font-size: 10px">{{
                logs.created_at
              }}</span>
            </div>
          </div>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import Profile from 'src/assets/image/LogRedeem.jpeg'
export default {
  data () {
    return {
      Profile,
      tab: 'log-history',
      log: [],
      dateFilter: '',
      typeDate: '',
      date: null
    }
  },
  mounted () {
    this.getDataLog()
  },
  watch: {
    dateFilter (newDateFilter, oldDateFilter) {
      if (typeof newDateFilter === 'object') {
        this.typeDate = typeof newDateFilter
        this.date = newDateFilter.from + ' - ' + newDateFilter.to
      } else {
        this.typeDate = typeof newDateFilter
        this.date = newDateFilter
      }
    }
  },
  computed: {
    logFilter () {
      if (this.$store.state.userdata.user.role === 'Admin') {
        if (this.tab === 'log-history') {
          if (this.date === null) {
            return this.log.filter((log) => log.role === 'Admin')
          } else if (this.typeDate === 'object') {
            return this.log.filter((item) => {
              const dateSplit = this.date.split(' - ')
              const dateFrom = dateSplit[0]
              const dateTo = dateSplit[1]
              return (
                item.role === 'Admin' &&
                item.periode >= dateFrom &&
                item.periode <= dateTo
              )
            })
          } else {
            return this.log.filter(
              (item) => item.role === 'Admin' && item.periode === this.date
            )
          }
        } else {
          if (this.date === null) {
            return this.log.filter((log) => log.role !== 'Admin')
          } else if (this.typeDate === 'object') {
            return this.log.filter((item) => {
              const dateSplit = this.date.split(' - ')
              const dateFrom = dateSplit[0]
              const dateTo = dateSplit[1]
              return (
                item.role !== 'Admin' &&
                item.periode >= dateFrom &&
                item.periode <= dateTo
              )
            })
          } else {
            return this.log.filter(
              (item) => item.role !== 'Admin' && item.periode === this.date
            )
          }
        }
      } else {
        return this.log.filter(
          (log) => log.user_id === this.$store.state.userdata.user.user_id
        )
      }
    }
  },
  methods: {
    getDataLog () {
      this.$axios
        .get('/partner/member')
        .then((response) => {
          if (response.data.status) {
            this.log = response.data.data.map((data) => {
              return {
                user_id: data.user_id,
                name: data.name,
                description: `successfully redeemed voucher at ${data.partner}`,
                created_at: `${data.periode_text}, ${data.periode_time}`,
                periode: data.periode,
                image: data.image,
                role: data.role
              }
            })
          }
        })
        .catch((error) => {
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
