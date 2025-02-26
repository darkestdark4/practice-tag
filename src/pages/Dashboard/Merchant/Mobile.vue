<template>
  <div class="q-pa-sm font-monserra">
    <div class="col row q-pa-sm">
      <span class="col-12 text-left text-bold q-mt-sm">
        <q-input
          class="full-width"
          :dense="true"
          placeholder="Search ..."
          v-model="search"
          outlined
        />
      </span>
    </div>
    <q-separator />
    <div class="row q-pa-sm items-center" v-for="d in data" :key="d.id">
      <div class="col-2 text-center">
        <q-avatar
          size="75px"
        >
          <q-img
            :src="d.member_profile ? d.member_profile : Profile"
            width="100%"
            height="100%"
          />
        </q-avatar>
      </div>
      <div class="col-6 offset-1 column">
        <span>{{ d.member_name }}</span>
        <span>{{ d.member_phone }}</span>
      </div>
      <div class="col-2 offset-1 text-right">
        <q-btn-dropdown flat dropdown-icon="more_horiz">
          <q-list>
            <q-item clickable @click="$router.push({path: `/dashboard/manage-merchant/edit/${d.id}`,})">
              <q-item-section>
                <q-item-label>Edit</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="deleteData(d.id)">
              <q-item-section>
                <q-item-label>Delete</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="white" size="sm">
        <q-icon
          name="add"
          color="secondary"
          @click="$router.replace({ path: `manage-merchant/add` })"
        />
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'

const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  data () {
    return {
      Profile,
      data: [],
      search: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`member/merchant/list?username=${username}`).then(response => {
        this.data = response.data.data
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
          this.$axios.delete(`member/merchant/${id}`).then(response => {
            if (response.data.status === 'success') {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.getData()
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
        })
    }
  }
}
</script>

<style style="scss" scoped></style>
