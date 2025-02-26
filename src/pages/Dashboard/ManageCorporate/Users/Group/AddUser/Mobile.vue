<template>
  <div class="q-pa-lg font-monserra">
    <div class="col row">
      <div class="col-12 q-my-sm q-mb-md">
        <q-input
          class="full-width"
          v-model="data.divisi_name"
          placeholder="Search"
          outlined
          disable
        />
      </div>
    </div>
    <q-separator />
    <!-- <div class="q-my-md">
            <span class="text-bold q-mt-md">Member Choosed ( 2 User )</span>
        </div> -->
    <div class="col row q-mb-md q-my-md" v-for="(mem, index) in user" :key="index">
      <div class="col-4" v-if="mem.divisi_id == $route.params.id">
        <q-checkbox disable v-model="checkbox" />
        <q-avatar size="75px">
          <q-img
            alt="Profile Logo"
            :src="mem.logo ? linkStorageProfile + mem.logo : Profile"
            width="100%"
            height="100%"
          />
        </q-avatar>
      </div>
      <div class="col-4" v-else>
        <q-checkbox v-model="members.data" :val="mem.id" />
        <q-avatar size="75px">
          <q-img
            alt="Profile Logo"
            :src="mem.logo ? linkStorageProfile + mem.logo : Profile"
            width="100%"
            height="100%"
          />
        </q-avatar>
      </div>
      <!-- <div class="col-2 q-ml-md">
            <q-avatar size="75px">
              <q-img alt="Profile Logo" :src="mem.logo ? linkStorageProfile + mem.logo : Profile" width="100%" height="100%" />
            </q-avatar>
          </div> -->
      <div class="col-6 row text-left">
        <span class="col-9 text-bold"
          >{{ mem.member_first_name }} {{ mem.member_middle_name }}
          {{ mem.member_last_name }}</span
        >
        <span class="col-9">{{ mem.profil }}</span>
        <span class="col-12">{{ mem.role }}</span>
      </div>
      <q-separator />
    </div>
    <div class="text-center">
      <q-btn
        label="Add To Group"
        class="bg-secondary text-white full-width q-mt-md text-capitalize"
        @click="saveData()"
        rounded
      />
    </div>
  </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import axios from 'axios'
export default {
  data () {
    return {
      Profile,
      linkStorageProfile:
        'https://api.the-netwerk.com/storage/app/public/member/profile/',
      user: {
        member_first_name: '',
        member_middle_name: '',
        member_last_name: '',
        profil: '',
        role: '',
        checkbox: ''
      },
      checkbox: true,
      members: {
        data: []
      },
      arrayBox: [],
      data: {
        divisi_name: ''
      }
    }
  },
  mounted () {
    this.getData()
    this.getUserCorporate()
  },
  methods: {
    getData () {
      axios
        .get('/member/corporate/divisi/' + this.$route.params.id)
        .then((res) => {
          this.data = res.data.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserCorporate () {
      axios
        .get('/member/corporate/user')
        .then((res) => {
          this.user = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveData () {
      const data = {
        divisi_id: this.$route.params.id,
        members: {
          data: []
        }
      }
      this.members.data.forEach((item) => {
        const member = {
          member_id: item
        }
        data.members.data.push(member)
      })
      axios
        .put('member/corporate/add_user_divisi', data)
        .then((res) => {
          if (res.data.status === 'success') {
            this.$q.notify({
              message: 'Success Add User',
              position: 'top',
              type: 'positive'
            })
            setTimeout(
              () =>
                this.$router.push({
                  path:
                    '/dashboard/manage-corporate/divisi/edit-divisi/' +
                    this.$route.params.id
                }),
              1000
            )
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              position: 'top',
              message: 'Failed to add divisi'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
