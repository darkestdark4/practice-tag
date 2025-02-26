<script>
import moment from 'moment'
export default {
  data () {
    return {
      moment,
      data: [],
      value: null,
      search: '',
      filter: 'All',
      bannerModal: false,
      bannerDetail: {},
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/'
    }
  },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Manage Banner')
    this.getData()
    this.getDataConfig()
  },
  computed: {
    filterBySearch () {
      return this.data
    }
  },
  methods: {
    filterData (data) {
      this.filter = data
    },
    getData () {
      this.$axios
        .get('/banner')
        .then((response) => {
          if (response.data.status) {
            this.data = response.data.data
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
    getDataConfig () {
      this.$axios
        .get('/banner/config')
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
            .delete(`/banner/${id}`)
            .then((response) => {
              if (response.data.status) {
                this.$q.notify({
                  message: response.data.message,
                  position: 'top',
                  type: 'positive'
                })
                this.getData()
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
        .post('/banner/config', data)
        .then((response) => {
          if (response.data.status === 'success') {
            this.$q.notify({
              message: 'Success to Update',
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
    },
    viewDetail (item) {
      this.bannerDetail = item
      this.bannerModal = true
    },
    visitWeb (link) {
      window.open(link)
    }
  }
}
</script>

<template>
  <div class="q-pa-sm font-monserra">
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
        />
      </span>
    </div>
    <div class="col row q-mb-md q-pa-sm" v-for="(d, index) in filterBySearch" :key="index">
      <div class="col-3 text-center">
        <q-img
          alt="Profile Logo"
          :src="d.image ? d.image : Profile"
          width="70px"
          height="70px"
          style="border-radius: 10px"
        />
      </div>
      <div class="col row">
        <div class="col-8 row" style="display: flex; flex-direction: column; gap: .25rem">
          <span class="col-9 text-bold" style="font-size: 14px;">{{ d.name }}</span>
          <span v-if="d.description" style="color: #83868A; line-height: 14px; font-size: 12px">
            <span
              class="col-8"
              v-if="d.description.length > 50"
              v-html="
                d.description.substring(0, d.description.lastIndexOf(' ', 50))
              "
            />
            <span
              class="col-8"
              v-else
              v-html="d.description"
            />
          </span>
          <span v-if="d.link != null && d.link != 'null'" class="col-8" style="
              font-size: 11px;
              line-height: 11px;
              display: flex;
              align-items: center;
              gap: .5rem;
              margin-top: .25rem
            ">
            <q-icon
              name="fiber_manual_record"
              color="secondary"
            />
            <p style="margin-bottom: 0;">
              {{ d.link }}
            </p>
          </span>
        </div>
        <span class="col-3 text-right text-secondary q-pt-md">
          <q-btn-dropdown flat dropdown-icon="more_horiz">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label @click="viewDetail(d)"> View </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-banner/edit/${d.id}`,
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="white">
        <q-icon
          name="add"
          color="secondary"
          @click="$router.replace({ path: `manage-banner/add` })"
        />
      </q-btn>
    </q-page-sticky>

    <!-- BANNER MODAL -->
    <q-dialog v-model="bannerModal" full-width full-height>
      <q-card class="font-proxima-nova-alt">
        <q-card-section class="row">
          <div class="col-2 text-h6 text-center"></div>
          <div class="col-8 text-h6 text-center">Detail Banner</div>
          <div class="col-2 text-right">
            <q-btn icon="close" flat round dense @click="bannerModal = false" />
          </div>
        </q-card-section>
        <q-card-section
          class="q-pt-none scroll"
          :style="
            $store.state.style.isMobile
              ? 'max-height: 70vh'
              : 'max-height: 80vh'
          "
        >
          <div class="row flex col-12">
            <div class="col-12 text-center">
              <q-img
                alt="Profile Logo"
                :src="bannerDetail.image ? bannerDetail.image : Profile"
                width="100%"
                :height="$store.state.style.isMobile ? '200px' : '300px'"
              />
            </div>
            <div class="col-12">
              <h5 class="text-bold text-center">{{ bannerDetail.name }}</h5>
              <span v-html="bannerDetail.description"></span>
            </div>
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white" v-if="bannerDetail.link">
          <q-card-actions align="center">
            <q-btn
              class="full-width text-white text-capitalize"
              :style="`background-color: #116C54`"
              @click="visitWeb(bannerDetail.link)"
              label="Click Here"
              rounded
            />
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>
  </div>
</template>
