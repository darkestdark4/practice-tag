<template>
  <div class="q-pa-sm">
    <q-card class="constrain-mobile border-radius-10px" flat bordered>
      <q-card-section>
        <div v-for="bank in bankList" class="row" :key="bank.id" @click="$router.push('/dashboard/wallet/topup/waiting-payment')">
          <div class="col-12">
            <q-card class="q-mb-md cursor-pointer" flat bordered >
              <q-card-section>
                <div class="row flex">
                  <div class="col-3">
                    <img :src="bank.image" width="50px" />
                  </div>
                  <div class="col-9">
                    <span class="text-black text-bold" style="font-size: 12px">Top-up From {{ bank.name }}</span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import BankBNI from 'src/assets/image/bank/bank-bni.png'
import BankBNISyariah from 'src/assets/image/bank/bank-bni-syariah.png'
import BankBRI from 'src/assets/image/bank/bank-bri.png'
import BankBRISyariah from 'src/assets/image/bank/bank-bri-syariah.png'
import BankBTN from 'src/assets/image/bank/bank-btn.png'
import BankMandiri from 'src/assets/image/bank/bank-mandiri.png'
import BankMandiriSyariah from 'src/assets/image/bank/bank-mandiri-syariah.png'

export default {
  data () {
    return {
      tab: 'bank-options',
      bankList: [
        {
          id: 1,
          image: BankBTN,
          name: 'BTN',
          va: '8740-088854459'
        },
        {
          id: 2,
          image: BankBNI,
          name: 'BNI',
          va: '8740-088854459'
        },
        {
          id: 3,
          image: BankMandiri,
          name: 'Mandiri',
          va: '8740-088854459'
        },
        {
          id: 4,
          image: BankMandiriSyariah,
          name: 'Mandiri Syariah',
          va: '8740-088854459'
        },
        {
          id: 5,
          image: BankBRI,
          name: 'BRI',
          va: '8740-088854459'
        },
        {
          id: 6,
          image: BankBRISyariah,
          name: 'BRI Syariah',
          va: '8740-088854459'
        },
        {
          id: 8,
          image: BankBNISyariah,
          name: 'BNI Syariah',
          va: '8740-088854459'
        }
      ]
    }
  }
}

</script>
