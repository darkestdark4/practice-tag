<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-roboto q-pt-lg">
        <div class="text-center">
          <q-img
            :src="LogoMVP"
            height="102px"
            width="190px"
            spinner-color="primary"
            spinner-size="40px"
          />
        </div>
        <div class="text-center column q-mt-xl">
          <span style="font-size: 12px; font-weight: 400; line-height: 9px; letter-spacing: 0.3em;">Media Partner</span>
          <div class="text-center">
            <q-img
              :src="Ongis"
              height="12px"
              width="77px"
              spinner-color="primary"
              spinner-size="40px"
            />
          </div>
        </div>
        <div class="text-center column q-mt-lg">
          <span style="font-weight: 900; font-size: 38px; line-height: 46px;">Welcome</span>
          <span style="font-weight: 400; font-size: 16px; line-height: 20px;">Join Redeem Reward</span>
        </div>
        <q-card class="card-front q-mt-lg">
          <q-carousel v-model="slide" swipeable animated :navigation="navigation" height="250px"
            class="text-grey card-front-carousel" control-color="grey" infinite :autoplay="autoplay">
            <template v-slot:navigation-icon="{ active, btnProps, onClick }">
              <q-btn v-if="active"
                style="margin: -3px; color: #2B2B2B; -webkit-text-stroke: 3px grey;"
                size="sm" icon="horizontal_rule" flat round dense @click="onClick" />
              <q-btn v-else style="font-size: 5px; margin: -3px;" :icon="btnProps.icon"
                color="grey" flat round @click="onClick" />
            </template>
            <q-carousel-slide v-for="(d, index) in merchant" :key="index" :name="index"
              style="padding: 10px 16px;">
              <div class="col-3 q-gutter-y-sm bg-white">
                <q-img alt="Profile Logo" :src="d.source" width="100%" height="100%" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card>
        <div class="row q-mt-xl">
          <div class="col-5 q-mx-auto text-center">
            <div class="q-mx-auto row" style="width: 7rem; height: 3.4rem; border-radius: 10px 10px 0 0; background: white; padding-top: 8px;">
              <q-icon class="col-5" size="36px" name="person" />
              <div class="col-7 column text-left">
                <span class="q-px-auto" style="font-size: 14px;">New</span>
                <span class="q-px-auto" style="font-size: 14px;">Member</span>
              </div>
            </div>
            <q-btn class="text-white" to="/landingpage/register" style="background: #000000; border-radius: 0 0 10px 10px; width: 7rem;" label="Register" />
          </div>
          <div class="col-5 q-mx-auto text-center">
            <div class="q-mx-auto row" style="width: 7rem; height: 3.4rem; border-radius: 10px 10px 0 0; background: white; padding-top: 8px;">
              <q-icon class="col-5" size="36px" name="logout" />
              <div class="col-7 column text-left">
                <span class="q-px-auto" style="font-size: 14px;">Member</span>
                <span class="q-px-auto" style="font-size: 14px;">MVP</span>
              </div>
            </div>
            <q-btn class="text-white" to="/landingpage/login" style="background: #D2BA5E; border-radius: 0 0 10px 10px; width: 7rem;" label="Login" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Merchant1 from 'src/assets/image/merchant-1.png'
import Merchant2 from 'src/assets/image/merchant-2.png'
import Merchant3 from 'src/assets/image/merchant-3.png'
import Merchant4 from 'src/assets/image/merchant-4.png'
import LogoMVP from 'src/assets/image/logo-mvp.png'
import Ongis from 'src/assets/image/OngisSmall.png'

const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  data () {
    return {
      merchant: [
        {
          id: 1,
          source: Merchant1
        },
        {
          id: 2,
          source: Merchant2
        },
        {
          id: 3,
          source: Merchant3
        },
        {
          id: 4,
          source: Merchant4
        }
      ],
      slide: 0,
      navigation: true,
      LogoMVP,
      Ongis
    }
  },
  beforeCreate () {
    if (username === 'mvp') {
      return 1
    } else {
      this.$router.push({ path: '/not-found' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-1 {
    background: url('../../../assets/image/mvp-index.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    padding-top: 50px;
}
.card-front {
    border-radius: 13px;
    background: #F2C581;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
}
.card-front-carousel {
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);
}
</style>
