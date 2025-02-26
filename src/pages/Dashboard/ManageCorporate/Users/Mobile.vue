<template>
  <div class="q-pa-sm font-monserra">
    <q-tabs
      dense
      class="text-grey border-radius-10px q-mb-md"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      narrow-indicator
      outside-arrows
      mobile-arrows
      style="border: 1px solid #efefef"
    >
      <!-- <q-route-tab class="text-capitalize" label="Company" to="/dashboard/manage-corporate/company" /> -->
      <q-route-tab
        class="bg-secondary text-white text-capitalize"
        label="Users"
        to="/dashboard/manage-corporate/users"
        exact
      />
      <q-route-tab
        class="text-capitalize"
        label="Broadcast"
        to="/dashboard/manage-corporate/broadcast"
        exact
      />
      <q-route-tab
        class="text-capitalize"
        label="Log"
        to="/dashboard/manage-corporate/log"
        exact
      />
      <q-route-tab
        class="text-capitalize"
        label="Polling"
        to="/dashboard/manage-corporate/Polling"
        exact
      />
      <q-route-tab
        class="text-capitalize"
        label="Sponsor"
        to="/dashboard/manage-corporate/sponsor"
        exact
      />
    </q-tabs>
    <!-- <div class="flex-center q-pt-md">
            <q-btn icon="warning" class="full-width bg-secondary text-black text-capitalize" color="amber" size="md" rounded disable>
                You Have Reach Maximum Users
            </q-btn>
        </div>
        <div class="flex flex-center q-my-md">\
            <span class="text-secondary text-bold cursor-pointer">Upgrade User Limit</span>
        </div> -->
    <q-separator />
    <div class="col row q-pa-sm">
      <span class="col-6 text-left text-bold"
        >Member Divisi ({{ group.length }} Divisi)</span
      >
      <!-- <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer" @click="officeModalAdd = true">+ Add Office</span> -->
      <span
        class="col-6 text-right text-secondary cursor-pointer"
        @click="$router.replace({ path: `divisi/manage-divisi` })"
      >
        Manage Divisi
      </span>
    </div>
    <div
      class="col row q-mb-sm q-ml-md"
      v-for="(card, index) in group"
      :key="index"
    >
      <span class="col-10 text-bold text-secondary"
        >{{ card.divisi_name }} ( {{ card.jumlah_anggota }} User )</span
      >
      <!-- <span class="col-6 text-left">Set Private To Other Member ?</span>
            <span class="col-4 text-right">
              <q-option-group
                type="toggle"
                color="secondary"
                v-model="card.private"
                :options="[
                  { label: 'Battery too low', value: 'bat' },
                  { label: 'Friend request', value: 'friend' }
                ]"
              />
              <q-toggle
                v-model="card[index].private"
                checked-icon="check"
                :label="card.private"
                false-value="No"
                true-value="Yes"
                color="green"
                unchecked-icon="clear"
              />
            </span> -->
      <span
        class="col-2 text-right text-secondary cursor-pointer"
        @click="
          $router.replace({
            path: `/dashboard/manage-corporate/divisi/edit-divisi/` + card.id,
          })
        "
        >Edit</span
      >
    </div>
    <q-separator />
    <div class="col row q-pa-sm">
      <span class="col-9 text-left text-bold q-mt-sm" style="font-size: 12px"
        >Show the expiration date for each member?</span
      >
      <span class="col-3 text-right text-secondary cursor-pointer">
        <q-toggle
          v-model="value"
          :label="value ? 'Yes' : 'No'"
          color="green"
          keep-color
        />
      </span>
    </div>
    <q-separator />
    <div class="col row q-pa-sm">
      <span class="col-7 text-left text-bold q-mt-sm">
        <q-input
          class="full-width"
          :dense="true"
          placeholder="Search ..."
          v-model="search"
          outlined
        />
      </span>
      <span class="col-2 text-center text-bold q-pt-md">Filter :</span>
      <span class="col-3 text-right text-black cursor-pointer q-pa-sm">
        <q-btn-dropdown
          outline
          class="full-width text-black"
          color="white"
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

            <q-item clickable v-close-popup @click="filterData('Not-Active')">
              <q-item-section>
                <q-item-label>Inactive</q-item-label>
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
    <div
      class="col row q-mb-md q-pa-sm"
      v-for="mem in userFilter"
      :key="mem.id"
    >
      <div class="col-2 text-center q-mr-lg">
        <q-avatar size="75px">
          <q-img
            v-if="
              mem.expired_date > moment().format('YYYY-MM-DD') ||
              !mem.expired_date
            "
            alt="Profile Logo"
            :src="mem.logo ? linkStorageProfile + mem.logo : Profile"
            width="100%"
            height="100%"
          />
          <q-img
            v-else-if="mem.expired_date < moment().format('YYYY-MM-DD')"
            alt="Profile Logo"
            :src="mem.logo ? linkStorageProfile + mem.logo : Profile"
            width="100%"
            height="100%"
            img-class="myImage"
          />
        </q-avatar>
      </div>
      <div class="col row" v-if="mem.user.created_at === mem.user.updated_at">
        <div class="col-9 row text-grey">
          <span class="col-9"
            >{{ mem.member_first_name }} {{ mem.member_middle_name }}
            {{ mem.member_last_name }}</span
          >
          <span class="col-8">{{ mem.profil }}</span>
          <span class="col-12" v-if="mem.divisi">{{
            mem.divisi.divisi_name
          }}</span>
        </div>
        <span class="col-3 row text-right text-grey q-pt-md">
          <q-btn-dropdown class="col-12" flat dropdown-icon="more_horiz">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/edit/${mem.user.username}`,
                  })
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Edit</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="toView(mem)">
                <q-item-section>
                  <q-item-label class="text-green-9">View</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                v-if="
                  mem.id != $store.state.userdata.user.id && mem.role != 'Admin'
                "
              >
                <q-item-section>
                  <q-item-label
                    @click="changeStatusMember(mem)"
                    class="text-red"
                  >
                    Action
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                v-else-if="
                  moment(mem.created_at).format('YYYY-MM-DD') > date_user
                "
              >
                <q-item-section>
                  <q-item-label
                    @click="changeStatusMember(mem)"
                    class="text-red"
                  >
                    Action
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="shareAccount(mem.user.username)"
                v-if="mem.id != $store.state.userdata.user.id"
              >
                <q-item-section>
                  <q-item-label class="text-green-9"
                    >Share Via Whatsapp</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="col-12 row">
            <q-chip
              v-if="mem.user.created_at === mem.user.updated_at"
              class="text-left"
              size="sm"
              color="red"
              text-color="white"
            >
              Not Active
            </q-chip>
          </div>
        </span>
        <q-chip
          v-if="mem.role"
          class="text-left"
          size="sm"
          color="grey"
          text-color="white"
        >
          {{ mem.role }}
        </q-chip>
      </div>
      <div
        class="col row"
        v-else-if="
          mem.expired_date > moment().format('YYYY-MM-DD') || !mem.expired_date
        "
      >
        <div class="col-8 row">
          <span class="col-9"
            >{{ mem.member_first_name }} {{ mem.member_middle_name }}
            {{ mem.member_last_name }}</span
          >
          <span class="col-8">{{ mem.profil }}</span>
          <span class="col-12" v-if="mem.divisi">{{
            mem.divisi.divisi_name
          }}</span>
        </div>
        <span class="col-4 row text-right text-secondary q-pt-md">
          <q-btn-dropdown class="col-12" flat dropdown-icon="more_horiz">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/edit/${mem.user.username}`,
                  })
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Edit</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="toView(mem)">
                <q-item-section>
                  <q-item-label class="text-green-9">View</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="shareAccount(mem.user.username)"
                v-if="
                  mem.id != $store.state.userdata.user.id && mem.role != 'Admin'
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9"
                    >Share Via Whatsapp</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                v-if="
                  mem.id != $store.state.userdata.user.id && mem.role != 'Admin'
                "
              >
                <q-item-section>
                  <q-item-label
                    @click="changeStatusMember(mem)"
                    class="text-red"
                  >
                    Action
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                v-else-if="
                  moment(mem.created_at).format('YYYY-MM-DD') > date_user
                "
              >
                <q-item-section>
                  <q-item-label
                    @click="changeStatusMember(mem)"
                    class="text-red"
                  >
                    Action
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/renewal/${mem.user.username}`,
                  })
                "
                v-if="
                  mem.id != $store.state.userdata.user.id && mem.role != 'Admin'
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Renewal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/renewal/${mem.user.username}`,
                  })
                "
                v-else-if="
                  moment(mem.created_at).format('YYYY-MM-DD') > date_user
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Renewal</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="col-12 row">
            <span
              v-if="value === true"
              style="font-size: 12px"
              class="col-12 text-small text-left"
              >Exp:
              {{
                mem.expired_date
                  ? moment(mem.expired_date).format("DD-MM-YYYY")
                  : ""
              }}</span
            >
            <q-chip
              v-if="
                value === true &&
                mem.expired_date < moment().format('YYYY-MM-DD')
              "
              class="text-left"
              size="sm"
              color="red"
              text-color="white"
            >
              Renewal
            </q-chip>
          </div>
        </span>
        <q-chip
          v-if="mem.role"
          class="text-left"
          size="sm"
          color="teal"
          text-color="white"
        >
          {{ mem.role }}
        </q-chip>
      </div>
      <div
        class="col row"
        v-else-if="mem.expired_date < moment().format('YYYY-MM-DD')"
      >
        <div class="col-8 row text-grey">
          <span class="col-9"
            >{{ mem.member_first_name }} {{ mem.member_middle_name }}
            {{ mem.member_last_name }}</span
          >
          <span class="col-8">{{ mem.profil }}</span>
          <span class="col-12" v-if="mem.divisi">{{
            mem.divisi.divisi_name
          }}</span>
        </div>
        <span class="col-4 row text-right text-grey q-pt-md">
          <q-btn-dropdown class="col-12" flat dropdown-icon="more_horiz">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/edit/${mem.user.username}`,
                  })
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Edit</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="toView(mem)">
                <q-item-section>
                  <q-item-label class="text-green-9">View</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                v-if="
                  mem.id != $store.state.userdata.user.id && mem.role != 'Admin'
                "
              >
                <q-item-section>
                  <q-item-label
                    @click="changeStatusMember(mem)"
                    class="text-red"
                  >
                    Action
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                v-else-if="
                  moment(mem.created_at).format('YYYY-MM-DD') > date_user
                "
              >
                <q-item-section>
                  <q-item-label
                    @click="changeStatusMember(mem)"
                    class="text-red"
                  >
                    Action
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/renewal/${mem.user.username}`,
                  })
                "
                v-if="
                  mem.id != $store.state.userdata.user.id && mem.role != 'Admin'
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Renewal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="
                  $router.replace({
                    path: `/dashboard/manage-corporate/users/renewal/${mem.user.username}`,
                  })
                "
                v-else-if="
                  moment(mem.created_at).format('YYYY-MM-DD') > date_user
                "
              >
                <q-item-section>
                  <q-item-label class="text-green-9">Renewal</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="col-12 row">
            <span v-if="value === true" class="col-12 text-small text-left"
              >Exp:
              {{
                mem.expired_date
                  ? moment(mem.expired_date).format("DD-MM-YYYY")
                  : ""
              }}</span
            >
            <q-chip
              v-if="
                value === true &&
                mem.expired_date < moment().format('YYYY-MM-DD')
              "
              class="text-left"
              size="sm"
              color="red"
              text-color="white"
            >
              Renewal
            </q-chip>
          </div>
        </span>
        <q-chip
          v-if="mem.role"
          class="text-left"
          size="sm"
          color="grey"
          text-color="white"
        >
          {{ mem.role }}
        </q-chip>
      </div>
      <q-separator />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 8]">
      <q-btn
        fab
        color="white"
        size="12px"
        v-if="
          member.length >=
          $store.state.userdata.corporate.corporate_total_member
        "
        disable
      >
        <q-icon name="add" style="color: #ccc" />
      </q-btn>
      <q-btn
        fab
        color="white"
        size="12px"
        v-else-if="
          member.length < $store.state.userdata.corporate.corporate_total_member
        "
      >
        <q-icon
          name="add"
          color="secondary"
          @click="
            $router.replace({ path: `/dashboard/manage-corporate/users/add` })
          "
        />
      </q-btn>
    </q-page-sticky>

    <!-- Action Modal -->
    <q-dialog v-model="actionModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="row">
            <div class="text-h6 text-right col-8">Action Card</div>
            <div class="col-4 text-right">
              <q-btn dense flat icon="close" @click="actionModal = false" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-mb-md">
          <q-btn
            label="InActive"
            color="primary"
            @click="changeStatus('inactive')"
          />
          <q-btn
            label="Delete"
            color="negative"
            @click="changeStatus('delete')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      linkStorageProfile:
        'https://api.the-netwerk.com/storage/app/public/member/profile/',
      toggle: [],
      member: [],
      member_edit: [],
      divisi: [],
      group: {},
      date_user: moment(this.$store.state.userdata.user.created_at).format(
        'YYYY-MM-DD'
      ),
      actionModal: false,
      value: false,
      filter: 'All',
      search: ''
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    userFilter () {
      if (this.search === '' && this.filter === 'All') {
        return this.member
      } else if (this.search === '' && this.filter === 'Active') {
        return this.member.filter(
          (d) => d.expired_date >= moment().format('YYYY-MM-DD')
        )
      } else if (this.search === '' && this.filter === 'Expired') {
        return this.member.filter(
          (d) => d.expired_date < moment().format('YYYY-MM-DD')
        )
      } else if (this.search === '' && this.filter === 'Not-Active') {
        return this.member.filter(
          (d) => d.user.created_at === d.user.updated_at
        )
      } else if (this.search !== '' && this.filter === 'All') {
        return this.member.filter((item) => {
          const fullName =
            `${item.member_first_name}${item.member_last_name}`.toLowerCase()
          const reversedFullName =
            `${item.member_last_name}${item.member_first_name}`.toLowerCase()
          const trimmedSearchValue = this.search
            .replace(/\s+/g, '')
            .toLowerCase()
          return (
            fullName.includes(trimmedSearchValue) ||
            reversedFullName.includes(trimmedSearchValue)
          )
        })
      } else if (this.search !== '' && this.filter === 'Active') {
        return this.member.filter((item) => {
          const fullName =
            `${item.member_first_name}${item.member_last_name}`.toLowerCase()
          const reversedFullName =
            `${item.member_last_name}${item.member_first_name}`.toLowerCase()
          const trimmedSearchValue = this.search
            .replace(/\s+/g, '')
            .toLowerCase()
          return (
            item.expired_date >= moment().format('YYYY-MM-DD') &&
            (fullName.includes(trimmedSearchValue) ||
              reversedFullName.includes(trimmedSearchValue))
          )
        })
      } else if (this.search !== '' && this.filter === 'Not-Active') {
        return this.member.filter((item) => {
          const fullName =
            `${item.member_first_name}${item.member_last_name}`.toLowerCase()
          const reversedFullName =
            `${item.member_last_name}${item.member_first_name}`.toLowerCase()
          const trimmedSearchValue = this.search
            .replace(/\s+/g, '')
            .toLowerCase()
          return (
            item.user.created_at === item.user.updated_at &&
            (fullName.includes(trimmedSearchValue) ||
              reversedFullName.includes(trimmedSearchValue))
          )
        })
      } else if (this.search !== '' && this.filter === 'Expired') {
        return this.member.filter((item) => {
          const fullName =
            `${item.member_first_name}${item.member_last_name}`.toLowerCase()
          const reversedFullName =
            `${item.member_last_name}${item.member_first_name}`.toLowerCase()
          const trimmedSearchValue = this.search
            .replace(/\s+/g, '')
            .toLowerCase()
          return (
            item.expired_date < moment().format('YYYY-MM-DD') &&
            (fullName.includes(trimmedSearchValue) ||
              reversedFullName.includes(trimmedSearchValue))
          )
        })
      }
    }
  },
  mounted () {
    this.getGroup()
    this.getMember()
    this.getStatusExpired()
  },
  watch: {
    value (val) {
      this.changeStatusExpired()
    }
  },
  methods: {
    filterData (data) {
      this.filter = data
    },
    toView (data) {
      if (window.localStorage.getItem('page')) {
        window.localStorage.removeItem('page')
        window.localStorage.setItem('page', 'manage-corporate')
      } else {
        window.localStorage.setItem('page', 'manage-corporate')
      }
      setTimeout(
        () => this.$router.replace({ path: `/view/${data.user.username}` }),
        750
      )
    },
    shareAccount (username) {
      const data = {
        username: username
      }
      this.$q.loading.show({
        message: 'Sending Account'
      })
      this.$axios
        .post('/member/corporate/user/share', data)
        .then((response) => {
          if (response.data.status) {
            this.$q.loading.hide()
            this.$q.notify({
              message: response.data.message,
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
    getGroup () {
      this.$axios
        .get('/member/corporate/divisi')
        .then((response) => {
          if (response.data.success) {
            this.group = response.data.data
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
    getMember () {
      this.$axios
        .get('/member/corporate/user')
        .then((response) => {
          if (response.data.status) {
            this.member = response.data.data
            this.divisi = response.data.data.divisi
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
    changeStatusMember (data) {
      this.actionModal = true
      this.member_edit = data
    },
    changeStatus (status) {
      this.actionModal = false
      this.$q
        .dialog({
          message: `You are about to ${status} ${this.member_edit.user.username}. Are you sure?`,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .post(`/member/corporate/user/${this.member_edit.id}`, {
              status: status
            })
            .then((response) => {
              if (response.data.status) {
                this.$q.notify({
                  message: response.data.message,
                  position: 'top',
                  type: 'positive'
                })
                this.getMember()
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
        .onCancel(() => {
          this.actionModal = true
        })
    },
    getStatusExpired () {
      this.$axios
        .get('/member/corporate/detail')
        .then((response) => {
          if (response.data.status) {
            this.value = response.data.data.show_expired
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
    changeStatusExpired () {
      const data = {
        show_expired: this.value
      }
      this.$axios
        .post('/member/corporate/edit_expired', data)
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
<style lang="scss">
.myImage {
  opacity: 0.4;
  filter: alpha(opacity=40);
  /* msie */
}
</style>
