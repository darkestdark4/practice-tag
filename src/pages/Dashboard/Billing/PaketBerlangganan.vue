<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="my-card font-proxima-nova-alt" style="border-right: 5px solid #116C54">
        <q-card-section>
          <p class="q-mb-none" style="font-size: 12px">Current subscription package</p>
          <h6 class="q-my-none text-weight-bold">{{ packageData.name }} Package</h6>
          <p v-if="packageData.status == 'unpaid'"
            class="q-mb-none text-red text-weight-medium">
              Your subscription still on process, please proceed the payment first
          </p>
          <p v-else
            class="q-mb-none text-red text-weight-medium">Active until {{ packageData.expired }}</p>
          <p
            class="q-mb-none text-secondary text-weight-bold"
            style="font-size: 12px; margin-top: 4px">
            {{ packageData.name }} Feature:
          </p>
          <ul style="font-size: 12px;" class="q-pl-lg q-mt-sm">
            <li>Free TAG Card ID</li>
            <li>Free Customize Color</li>
            <li>Free Customize ID Information</li>
            <li>Free Online Shop Template</li>
            <li>Etc.</li>
          </ul>
        </q-card-section>
      </q-card>
      <q-card
        v-if="packageData.id == 1 || packageData.id == 2"
        class="my-card font-proxima-nova-alt q-mt-md"
        style="border-right: 5px solid #116C54; background: #C7EDE3">
        <q-card-section>
          <h6 class="q-my-none text-weight-bold text-secondary">Upgrade To Corporate Package</h6>
          <p
            class="q-mb-none text-secondary text-weight-bold"
            style="font-size: 12px; margin-top: 4px">
            Personal Feature:
          </p>
          <ul style="font-size: 12px;" class="q-pl-lg q-mt-sm">
            <li>Free TAG Card ID</li>
            <li>Free Customize Color</li>
            <li>Free Customize ID Information</li>
            <li>Free Online Shop Template</li>
            <li>Free Customize Color</li>
            <li>Free Customize ID Information</li>
            <li>Free Online Shop Template</li>
            <li>Etc.</li>
          </ul>
          <q-btn
            no-caps
            class="q-py-xs text-weight-medium full-width q-mt-sm"
            size="sm"
            style="background: #116C54; font-size: 13px">
            <div class="text-white" @click="upgradeConfirm = true">Upgrade to Corporate Package for $25/mo</div>
          </q-btn>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="upgradeConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span>Are you sure to upgrade to enterprise package?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" text-color="black" v-close-popup />
          <q-btn flat label="Upgrade" color="primary" @click="upgrade()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Loading } from 'quasar'

export default {
  data () {
    return {
      packageData: {
        id: null,
        name: null,
        expired: null,
        status: null
      },
      upgradeConfirm: false
    }
  },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Detail Package')

    this.getActivePackage()
  },
  methods: {
    getActivePackage () {
      const userData = JSON.parse(localStorage.getItem('userd'))

      const config = {
        headers: {
          Authorization: `Bearer ${userData.api_token}`
        }
      }
      this.$axios.get('/member/subscription/show', config)
        .then(res => {
          const { data } = res.data

          this.packageData.id = data.package_id
          this.packageData.name = data.package
          this.packageData.expired = data.expired
          this.packageData.status = data.status
        })
    },
    upgrade () {
      const userData = JSON.parse(localStorage.getItem('userd'))

      Loading.show({
        message: '<span class="font-proxima-nova-alt">Some important process is in progress. Hang on...</span>',
        html: true
      })

      const config = {
        headers: {
          Authorization: `Bearer ${userData.api_token}`
        }
      }

      const data = {
        package: 3,
        qty: 0
      }

      this.$axios.post('/member/corporate/upgrade/package_upgrade', data, config)
        .then(res => {
          const { data } = res.data

          setTimeout(() => {
            this.$router.push({ path: `checkout/${data.bill_number}` })
            Loading.hide()
          }, 2000)
        })
    }
  }
}
</script>
