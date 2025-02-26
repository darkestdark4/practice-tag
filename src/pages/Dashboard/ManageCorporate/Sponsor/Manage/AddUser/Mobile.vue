<template>
  <div class="q-pa-lg font-monserra">
    <div class="col row q-mb-md q-my-md">
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
    <div class="col row q-mb-md q-my-md" v-for="(mem, index) in userFilter" :key="index">
      <!-- <div class="col-1" v-if="mem.sponsor_id == $route.params.id">
        <q-checkbox v-model="checkbox" />
      </div> -->
      <div class="col-1">
        <q-checkbox v-model="members.data" :val="mem.id" />
      </div>
      <div class="col-1 q-ml-md q-mr-md">
        <q-avatar size="50px">
          <q-img
            alt="Profile Logo"
            :src="mem.logo ? linkStorageProfile + mem.logo : Profile"
            width="100%"
            height="100%"
          />
        </q-avatar>
      </div>
      <div class="col-7 row text-left q-ml-md">
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
        label="Add Member"
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
      user: [],
      checkbox: true,
      members: {
        data: []
      },
      arrayBox: [],
      search: '',
      data: {
        divisi_name: ''
      }
    }
  },
  computed: {
    userFilter () {
      if (this.search !== '') {
        return this.user.filter((d) =>
          d.member_first_name.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return this.user
      }
    }
  },
  mounted () {
    this.getUserCorporate()
  },
  methods: {
    async getUserCorporate () {
      await axios
        .get('/member/corporate/user')
        .then((res) => {
          this.user = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      // Foreach User Data
      this.user.forEach((d) => {
        if (d.sponsor_id === this.$route.params.id) {
          this.members.data.push(d.id)
        }
      })
    },
    saveData () {
      const data = {
        sponsor_id: this.$route.params.id,
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
        .post('member/corporate/sponsor/addMember', data)
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
                  path: `/dashboard/manage-corporate/sponsor/manage/${this.$route.params.id}`
                }),
              1000
            )
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              position: 'top',
              message: 'Failed to Add User'
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
