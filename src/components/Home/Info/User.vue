<script>
import HomeInfoOverviewUser from 'src/components/Home/Info/OverviewUser.vue'
import HomeInfoImageUser from 'src/components/Home/Info/ImageUser.vue'

export default {
  components: {
    HomeInfoOverviewUser,
    HomeInfoImageUser
  },
  props: {
    user: { type: Object },
    corporate: { type: Object }
  },
  computed: {
    isMobile () {
      return this.$store.state.style.isMobile
    }
  }
}
</script>

<template>
  <div class="bawah absolute-bottom full-width">
    <q-card
      flat
      style="margin-bottom: 50px"
      class="card-profile bg-white border-radius-10px"
      :class="isMobile ? '' : 'q-mx-md'"
    >
      <q-card-section class="q-pa-md">
        <div class="row">
          <div class="col-8">
            <HomeInfoOverviewUser
              :firstName="user.member_first_name"
              :middleName="user.member_middle_name"
              :lastName="user.member_last_name"
              :profile="user.profil"
              :corporateName="corporate.corporate_name"
              :email="user.member_email"
              :phoneCode="user.phone_code"
              :phoneNumber="user.member_phone"
              :vaccine="user.vaccine1"
            />
          </div>
          <div class="col-4 q-mt-sm column">
            <HomeInfoImageUser
              :corporateID="user.corporate_id"
              :corporateLogo="corporate.logo"
              :companyLogo="user.company_logo"
              :logo="user.logo"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss">
  .card-profile {
    background: none !important;
  }

  .bawah {
    background: linear-gradient(to bottom, transparent 0%, black 100%);
  }
</style>
