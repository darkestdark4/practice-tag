<template>
  <div class="q-pa-sm font-monserra">
    <div class="col row q-pa-sm" v-if="this.data.length > 0">
      <span class="col-12 text-left text-bold q-mt-sm">
        <q-input
          readonly
          class="full-width input-primary"
          :dense="true"
          placeholder=""
          v-model="shortcut_code"
          outlined
        >
          <template v-slot:append>
            <q-btn
              class="q-px-sm"
              dense
              label="Copy"
              @click="doCopy()"
              color="primary"
            />
            <!-- <q-btn
              dense
              icon="open_in_new"
              @click="visitWeb(shortcut_code)"
              color="primary"
            /> -->
          </template>
        </q-input>
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

            <q-item clickable v-close-popup @click="filterData('Enable')">
              <q-item-section>
                <q-item-label>Enable</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="filterData('Disable')">
              <q-item-section>
                <q-item-label>Disable</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </span>
    </div>
    <q-separator />
    <q-btn
      class="full-width text-secondary text-capitalize q-my-md"
      label="Update Description"
      size="md"
      v-if="this.data.length > 0"
      @click="descriptionModal = true"
    />
    <q-separator class="q-mb-md" />
    <q-card
      class="col row q-mb-md q-pa-sm cursor-pointer"
      @click="$router.replace({ path: `manage-shortcut/edit/${d.id}` })"
      v-for="d in filterBySearch"
      :key="d.id"
    >
      <div class="col-2 text-center">
        <q-avatar size="50px">
          <q-img
            alt="Profile Logo"
            :src="d.icon_image ? d.icon_image : Profile"
          />
        </q-avatar>
      </div>
      <div class="col row">
        <div class="col-12">
          <span class="text-bold">{{ d.title }}</span>
        </div>
        <div class="col-12">
          <span class="text-grey">{{ d.link.substring(0, 45) }}</span
          ><span class="text-grey" v-if="d.link.length > 45">...</span>
        </div>
      </div>
      <q-separator />
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="white" size="sm">
        <q-icon
          name="add"
          color="secondary"
          @click="$router.replace({ path: `manage-shortcut/add` })"
        />
      </q-btn>
    </q-page-sticky>
    <q-dialog v-model="descriptionModal">
      <q-card class="q-pa-md" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Description Shortcut</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Description</div>
            <q-input
              outlined
              v-model="shortcutDescription"
              type="textarea"
              placeholder="Description"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Save"
            class="text-bold"
            @click="saveDescription()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import Profile from 'src/assets/image/TAGID-profile.jpg'
import moment from 'moment'
import VueClipboard from 'vue-clipboard2'
import { Notify } from 'quasar'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  data () {
    return {
      Profile,
      moment,
      linkStorageProfile:
        'https://api.the-netwerk.com/storage/app/public/member/profile/',
      data: [],
      value: false,
      search: '',
      filter: 'All',
      shortcut_code: '',
      descriptionModal: false,
      shortcutDescription: ''
    }
  },
  mounted () {
    this.getShortcut()
  },
  computed: {
    filterBySearch () {
      if (this.search === '' && this.filter === 'All') {
        return this.data
      } else if (this.search === '' && this.filter === 'Enable') {
        return this.data.filter((d) => d.display === 'true')
      } else if (this.search === '' && this.filter === 'Disable') {
        return this.data.filter((d) => d.display === 'false')
      } else if (this.search !== '' && this.filter === 'All') {
        return this.data.filter((d) =>
          d.title.toLowerCase().includes(this.search.toLowerCase())
        )
      } else if (this.search !== '' && this.filter === 'Enable') {
        return this.data.filter(
          (d) =>
            d.display === 'true' &&
            d.title.toLowerCase().includes(this.search.toLowerCase())
        )
      } else if (this.search !== '' && this.filter === 'Disable') {
        return this.data.filter(
          (d) =>
            d.display === 'false' &&
            d.title.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return null
      }
    }
  },
  methods: {
    filterData (data) {
      this.filter = data
    },
    visitWeb (link) {
      window.open(link)
    },
    doCopy () {
      this.$copyText(this.shortcut_code).then(
        function (e) {
          Notify.create({
            message: 'Copied',
            position: 'top',
            type: 'positive'
          })
        },
        function (e) {
          Notify.create({
            message: 'Can not copy',
            position: 'top',
            type: 'negative'
          })
        }
      )
    },
    getShortcut () {
      this.$axios
        .get('/shortcut')
        .then((response) => {
          if (response.data.status === 'success') {
            this.data = response.data.data.data
            this.shortcutDescription = response.data.data.description
            if (response.data.data.code) {
              this.shortcut_code = `https://tagid.ai/shortcut/${response.data.data.code.kode}`
            }
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
    saveDescription () {
      const data = {
        shortcut_description: this.shortcutDescription
      }
      this.$axios
        .post('/shortcut/description', data)
        .then((response) => {
          if (response.data.status === 'success') {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.descriptionModal = false
          } else {
            this.$q.notify({
              message: response.data.message,
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
    }
  }
}
</script>
<style lang="scss">
.q-field--readonly .q-placeholder {
  color: green !important;
}
</style>
