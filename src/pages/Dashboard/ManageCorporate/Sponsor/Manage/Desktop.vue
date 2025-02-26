<template>
  <div class="q-pa-lg font-monserra">
    <div class="row">
      <div class="col-6 text-left">
        <span class="text-bold">{{ sponsorFilter[0].name }}</span>
      </div>
      <div class="col-6 text-right">
        <span
          class="text-bold text-secondary cursor-pointer"
          @click="
            $router.replace({
              path: `/dashboard/manage-corporate/sponsor/manage-sponsor/${$route.params.id}`,
            })
          "
          >Edit Sponsor</span
        >
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm sponsor-list">
      <q-avatar
        size="50px"
        v-for="(p, index) in partnerFilter"
        :key="index"
        class="q-mr-lg q-ml-md"
      >
        <img :src="p.image" />
      </q-avatar>
    </div>
    <div class="row">
      <div class="col-6 text-left q-mb-md q-mt-sm">
        <span class="">Member Choosed ( {{ userFilter.length }} User )</span>
      </div>
    </div>
    <q-separator />
    <div class="col row q-mb-md q-my-md" v-for="(mem, index) in userFilter" :key="index">
      <div class="col-1 q-mr-lg">
        <q-avatar size="75px">
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
      <div class="col-3 row text-right q-ml-md" v-if="sponsorData.length > 1">
        <span
          class="col-12 text-bold text-secondary cursor-pointer"
          @click="moveMemberModal(mem)"
          >Move To</span
        >
      </div>
    </div>
    <div class="col-6 text-left">
      <span
        class="text-secondary cursor-pointer"
        @click="
          $router.replace({
            path: `/dashboard/manage-corporate/sponsor/add-user/${$route.params.id}`,
          })
        "
        >+ Add More User</span
      >
    </div>
    <div class="text-center">
      <q-btn
        label="Save"
        class="bg-secondary text-white full-width q-mt-md text-capitalize"
        @click="saveData()"
        rounded
      />
    </div>
    <q-dialog v-model="moveToModal">
      <q-card class="my-card text-center" style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Move To</div>
        </q-card-section>

        <q-separator dark />

        <q-card-actions vertical>
          <q-btn
            v-for="s in sponsorData"
            :key="s.id"
            :disable="true ? s.id == $route.params.id : false"
            @click="moveSponsorMember(s.id)"
            flat
            >{{ s.name }}</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      data: {
        divisi_name: ''
      },
      partnerData: [],
      sponsorData: [],
      moveMember: {},
      moveToModal: false
    }
  },
  computed: {
    userFilter () {
      return this.user.filter((item) => {
        return item.sponsor_id === this.$route.params.id
      })
    },
    partnerFilter () {
      return this.partnerData.filter((item) => {
        return item.is_expired === false
      })
    },
    sponsorFilter () {
      return this.sponsorData.filter((item) => {
        return item.id === this.$route.params.id
      })
    }
  },
  mounted () {
    this.getUserCorporate()
    this.getPartnerData()
    this.getSponsorData()
  },
  methods: {
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
    getPartnerData () {
      axios
        .get('/partner')
        .then((res) => {
          this.partnerData = res.data.data.parent
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getSponsorData () {
      axios
        .get('/member/corporate/sponsor/')
        .then((res) => {
          this.sponsorData = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveData () {
      setTimeout(
        () =>
          this.$router.push({
            path: '/dashboard/manage-corporate/sponsor/manage'
          }),
        1000
      )
    },
    moveSponsorMember (sponsorId) {
      const data = {
        sponsor_id: sponsorId,
        member_id: this.moveMember.id
      }
      axios
        .post('/member/corporate/sponsor/moveMember', data)
        .then((res) => {
          if (res.data.status === 'success') {
            this.getUserCorporate()
            this.moveToModal = false
            this.$q.notify({
              color: 'positive',
              message: 'Success Move Member',
              position: 'top'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    moveMemberModal (data) {
      this.moveToModal = true
      this.moveMember = data
    }
  }
}
</script>
<style lang="scss">
.sponsor-list {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
