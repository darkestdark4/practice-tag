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
    <div class="col row q-mb-md q-my-md">
      <div class="col-12 row">
        <span class="col-6 text-left text-bold text-h5 q-mb-md">{{
          sponsor.name
        }}</span>
        <div class="col-6 text-right q-mb-md">
          <q-checkbox
            v-model="selectAll"
            @input="selectAllSponsor(selectAll)"
            label="Select All"
          />
        </div>
      </div>
      <div class="col-3 text-center q-mb-md" v-for="(partner, index) in dataFilter" :key="index">
        <q-checkbox
          class=""
          style="
            z-index: 10;
            margin-left: 60px;
            margin-top: -20px;
            position: absolute;
          "
          v-model="partners.data"
          :val="partner.id"
          color="teal"
          size="lg"
        />
        <q-avatar size="75px">
          <q-img
            alt="Profile Logo"
            :src="partner.image ? partner.image : Profile"
            width="100%"
            height="100%"
          />
        </q-avatar>
      </div>
    </div>
    <div class="text-center">
      <q-btn
        label="Save"
        class="bg-secondary text-white full-width q-mt-md text-capitalize"
        rounded
        @click="saveData()"
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
      partners: {
        data: []
      },
      arrayBox: [],
      search: '',
      sponsor: {},
      data: [],
      selectAll: false
    }
  },
  computed: {
    dataFilter () {
      if (this.search !== '') {
        return this.data.filter(
          (d) =>
            d.name.toLowerCase().includes(this.search.toLowerCase()) &&
            d.is_expired === false
        )
      } else {
        return this.data.filter((d) => d.is_expired === false)
      }
    }
  },
  watch: {
    'partners.data': function (newVal, oldVal) {
      if (newVal.length > this.sponsor.limit) {
        // Remove last item
        this.partners.data.pop()
      } else if (newVal.length !== this.sponsor.limit) {
        this.selectAll = false
      } else if (newVal.length === this.sponsor.limit) {
        this.selectAll = true
      }
    }
  },
  mounted () {
    this.getPartner()
    this.getSponsor()
    this.getPartnerSponsor()
  },
  methods: {
    selectAllSponsor (value) {
      if (value === true) {
        this.partners.data = this.data.map((d) => d.id)
      } else {
        this.partners.data = []
      }
    },
    async getPartner () {
      axios
        .get('/partner')
        .then((res) => {
          this.data = res.data.data.parent
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getSponsor () {
      axios
        .get('/member/corporate/sponsor/' + this.$route.params.id)
        .then((res) => {
          this.sponsor = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getPartnerSponsor () {
      await axios
        .get(
          '/member/corporate/sponsor/getPartnerSponsor/' + this.$route.params.id
        )
        .then((res) => {
          res.data.data.forEach((d) => {
            this.partners.data.push(d.partner_id)
          })
        })
        .catch((err) => {
          console.log(err)
        })
      if (this.partners.data.length >= this.data.length) {
        this.selectAll = true
      }
    },
    saveData () {
      const data = {
        sponsor_id: this.$route.params.id,
        partners: {
          data: []
        }
      }
      this.partners.data.forEach((item) => {
        const partner = {
          partner_id: item
        }
        data.partners.data.push(partner)
      })
      if (data.partners.data.length < 1) {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          position: 'top',
          message: 'Choose 1 Sponsor at least'
        })
      } else {
        axios
          .post('member/corporate/sponsor/addPartnerSponsor', data)
          .then((res) => {
            if (res.data.status === 'success') {
              this.$q.notify({
                message: 'Success Add Partner to Sponsor',
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
                message: 'Failed to Add Partner to Sponsor'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style lang="scss">
.q-checkbox__bg {
  border-radius: 10px;
}
</style>
