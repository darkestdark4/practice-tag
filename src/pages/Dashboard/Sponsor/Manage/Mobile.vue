<template>
  <div class="q-pa-sm font-monserra">
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
      <q-tab name="parent" label="Induk" />
      <q-tab name="cabang" label="Cabang" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="parent">
        <q-separator class="q-mt-sm" />
        <div class="col row q-mb-md q-ml-md q-mt-md">
          <span class="col-10 text-secondary" style="font-size: 16px"
            >Set Alias</span
          >
          <span
            class="col-2 text-right text-secondary cursor-pointer"
            style="font-size: 16px"
            @click="$router.replace({ name: 'set-alias' })"
          >
            <q-icon name="navigate_next" color="secondary" />
          </span>
        </div>
        <q-separator />
        <div class="col row q-pa-sm">
          <span class="col-6 text-left text-bold q-mt-sm"
            >Show On Card Profile</span
          >
          <span class="col-6 text-right text-secondary cursor-pointer">
            <q-toggle
              v-model="value"
              :label="value ? 'Yes' : 'No'"
              color="green"
              keep-color
              @input="changeStatus()"
            />
          </span>
        </div>
        <div class="col row q-pa-sm">
          <span class="col-8 text-left text-bold q-mt-sm">
            <q-input
              class="full-width"
              :dense="true"
              placeholder="Search ..."
              v-model="search"
              outlined
            />
          </span>
          <span class="col-4 text-right text-secondary cursor-pointer q-pa-sm">
            <q-btn-dropdown
              outline
              class="full-width text-secondary"
              :label="filter"
            >
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
                    <q-item-label>Expired</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </span>
        </div>
        <div class="col row q-mb-sm q-ml-md q-mt-sm">
          <span class="col-10 text-secondary" style="font-size: 12px"
            >Total :</span
          >
          <span
            class="col-2 text-right text-secondary cursor-pointer"
            style="font-size: 12px"
          >
            {{ data.length }} Sponsor
          </span>
        </div>
        <q-separator />
        <div
          class="col row q-mb-md q-pa-sm"
          v-for="d in filterBySearch"
          :key="d.id"
        >
          <div class="col-2 text-center">
            <q-avatar size="50px">
              <q-img
                alt="Profile Logo"
                :src="d.image ? d.image : Profile"
                width="80%"
                height="80%"
              />
            </q-avatar>
          </div>
          <div class="col-10 row">
            <div class="col-10 row">
              <span class="col-9 text-bold">{{ d.name }}</span>
              <span class="col-12" style="font-size: 12px" v-if="!d.is_expired">
                <q-icon
                  name="fiber_manual_record"
                  class="q-mr-sm q-pb-xs"
                  color="secondary"
                />{{ d.date }}
              </span>
              <span
                class="col-12 text-red"
                style="font-size: 12px"
                v-else-if="d.is_expired"
              >
                <q-icon
                  name="fiber_manual_record"
                  class="q-mr-sm q-pb-xs"
                  color="red"
                />Expired
              </span>
            </div>
            <span class="col-2 text-right text-secondary q-pt-md">
              <q-btn-dropdown flat dropdown-icon="more_horiz">
                <q-list>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      $router.replace({
                        path: `/dashboard/manage-partner/edit/${d.id}`,
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label class="text-green-9">Edit</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label @click="deleteData(d.id)" class="text-red">
                        Delete
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </span>
          </div>
          <q-separator />
        </div>
      </q-tab-panel>
      <q-tab-panel name="cabang">
        <q-separator class="q-mt-sm" />
        <div class="col row q-pa-sm">
          <span class="col-8 text-left text-bold q-mt-sm">
            <q-input
              class="full-width"
              :dense="true"
              placeholder="Search ..."
              v-model="search"
              outlined
            />
          </span>
          <span class="col-4 text-right text-secondary cursor-pointer q-pa-sm">
            <q-btn-dropdown
              outline
              class="full-width text-secondary"
              :label="filter"
            >
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
                    <q-item-label>Expired</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </span>
        </div>
        <div class="col row q-mb-sm q-ml-md q-mt-sm">
          <span class="col-10 text-secondary" style="font-size: 12px"
            >Total :</span
          >
          <span
            class="col-2 text-right text-secondary cursor-pointer"
            style="font-size: 12px"
          >
            {{ dataCabang.length }} Sponsor
          </span>
        </div>
        <q-separator />
        <div
          class="col row q-mb-md q-pa-sm"
          v-for="d in filterBySearch"
          :key="d.id"
        >
          <div class="col-2 text-center">
            <q-avatar size="50px">
              <q-img
                alt="Profile Logo"
                :src="d.image ? d.image : Profile"
                width="80%"
                height="80%"
              />
            </q-avatar>
          </div>
          <div class="col-10 row">
            <div class="col-10 row">
              <span class="col-9 text-bold">{{ d.name }}</span>
              <span class="col-12" style="font-size: 12px" v-if="!d.is_expired">
                <q-icon
                  name="fiber_manual_record"
                  class="q-mr-sm q-pb-xs"
                  color="secondary"
                />{{ d.date }}
              </span>
              <span
                class="col-12 text-red"
                style="font-size: 12px"
                v-else-if="d.is_expired"
              >
                <q-icon
                  name="fiber_manual_record"
                  class="q-mr-sm q-pb-xs"
                  color="red"
                />Expired
              </span>
            </div>
            <span class="col-2 text-right text-secondary q-pt-md">
              <q-btn-dropdown flat dropdown-icon="more_horiz">
                <q-list>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      $router.replace({
                        path: `/dashboard/manage-partner/edit/cabang/${d.id}`,
                      })
                    "
                  >
                    <q-item-section>
                      <q-item-label class="text-green-9">Edit</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label
                        @click="deleteDataCabang(d.id)"
                        class="text-red"
                      >
                        Delete
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </span>
          </div>
          <q-separator />
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-page-sticky position="bottom-right" :offset="[8, 4]">
      <q-btn fab color="white" size="xs">
        <q-icon
          name="add"
          color="secondary"
          @click="$router.replace({ path: `manage-partner/add` })"
        />
      </q-btn>
    </q-page-sticky>
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
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      data: [],
      dataCabang: [],
      value: false,
      search: '',
      filter: 'All',
      tab: 'parent'
    }
  },
  mounted () {
    this.getSponsor()
    this.getSponsorConfig()
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filterBySearch () {
      if (this.tab === 'parent') {
        if (this.search === '' && this.filter === 'All') {
          return this.data
        } else if (this.search === '' && this.filter === 'Active') {
          return this.data.filter((d) => d.is_expired === false)
        } else if (this.search === '' && this.filter === 'Expired') {
          return this.data.filter((d) => d.is_expired === true)
        } else if (this.search !== '' && this.filter === 'All') {
          return this.data.filter((d) =>
            d.name.toLowerCase().includes(this.search.toLowerCase())
          )
        } else if (this.search !== '' && this.filter === 'Active') {
          return this.data.filter(
            (d) =>
              d.is_expired === false &&
              d.name.toLowerCase().includes(this.search.toLowerCase())
          )
        } else if (this.search !== '' && this.filter === 'Expired') {
          return this.data.filter(
            (d) =>
              d.is_expired === true &&
              d.name.toLowerCase().includes(this.search.toLowerCase())
          )
        }
      } else if (this.tab === 'cabang') {
        if (this.search === '' && this.filter === 'All') {
          return this.dataCabang
        } else if (this.search === '' && this.filter === 'Active') {
          return this.dataCabang.filter((d) => d.is_expired === false)
        } else if (this.search === '' && this.filter === 'Expired') {
          return this.dataCabang.filter((d) => d.is_expired === true)
        } else if (this.search !== '' && this.filter === 'All') {
          return this.dataCabang.filter((d) =>
            d.name.toLowerCase().includes(this.search.toLowerCase())
          )
        } else if (this.search !== '' && this.filter === 'Active') {
          return this.dataCabang.filter(
            (d) =>
              d.is_expired === false &&
              d.name.toLowerCase().includes(this.search.toLowerCase())
          )
        } else if (this.search !== '' && this.filter === 'Expired') {
          return this.dataCabang.filter(
            (d) =>
              d.is_expired === true &&
              d.name.toLowerCase().includes(this.search.toLowerCase())
          )
        }
      } else {
        return this.data
      }
    }
  },
  methods: {
    filterData (data) {
      this.filter = data
    },
    getSponsor () {
      this.$axios
        .get('/partner')
        .then((response) => {
          if (response.data.status) {
            this.data = response.data.data.parent
            this.dataCabang = response.data.data.cabang
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    getSponsorConfig () {
      this.$axios
        .get('/partner/config')
        .then((response) => {
          if (response.data.status) {
            this.value = response.data.data.status
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    deleteData (id) {
      this.$q
        .dialog({
          message: 'You are about to Delete Are you sure?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete(`/partner/${id}`)
            .then((response) => {
              if (response.data.status === 'success') {
                this.$q.notify({
                  message: response.data.message,
                  position: 'top',
                  type: 'positive'
                })
                this.getSponsor()
              }
            })
            .catch((error) => {
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
        })
    },
    deleteDataCabang (id) {
      this.$q
        .dialog({
          message: 'You are about to Delete Are you sure?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete(`/partner/cabang/${id}`)
            .then((response) => {
              if (response.data.status === 'success') {
                this.$q.notify({
                  message: response.data.message,
                  position: 'top',
                  type: 'positive'
                })
                this.getSponsor()
              } else {
                this.$q.notify({
                  message: response.data.data,
                  position: 'top',
                  type: 'negative'
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
        })
    },
    changeStatus () {
      const data = {
        status: this.value
      }
      this.$axios
        .post('/partner/config', data)
        .then((response) => {
          if (response.data.status === 'success') {
            this.$q.notify({
              message: 'Success to update',
              position: 'top',
              type: 'positive'
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
