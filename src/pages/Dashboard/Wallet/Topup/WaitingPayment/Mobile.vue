<template>
    <div class="q-pa-sm">
        <div class="q-mb-sm text-h6 text-bold text-center">Menunggu Pembayaran</div>
        <q-card class="constrain-mobile border-radius-10px" flat bordered>
            <q-card-section>
                <span>Silahkan melakukan transfer ke daftar rekening dibawah ini senilai</span>
                <div class="q-mt-md">
                    <span class="text-h5 text-bold text-secondary">Rp 900.099</span>
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
                <div>
                    <q-img :src="BankBNI" width="84px" />
                </div>
                <div class="q-mt-sm row">
                    <div class="col-6">
                        <span class="text-bold" style="font-size: 18px">8740-088854459</span>
                    </div>
                    <div class="col-6 text-right">
                        <q-btn size="sm" color="secondary" @click="doCopy()" rounded>Salin</q-btn>
                    </div>
                </div>
                <div>
                    <span class="text-grey-7">a/n PT. ABCDEFHIJKLMN</span>
                </div>
                <div class="q-mt-md">
                    <span>Catatan: </span>
                    <ol>
                        <li>Kode unik adalah nominal yang sudah ditambahkan ke 3 digit terakhir pada “jumlah bayar” yang tertera di transaksi anda hingga 3 digit terakhir</li>
                        <li>Kode unik sebagai tanda pengenal pembayaran anda, yang menjadi pembeda dengan pembayaran lainnya sehingga memudahkan dan mempercepat proses verifikasi pembayaran.</li>
                        <li>Kode unik akan masuk seluruhnya kedalam total saldo anda</li>
                        <li>Jumlah yang harus dibayar sudah termasuk biaya layanan bank Rp. 1.000</li>
                    </ol>
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-section class="text-center">
                <span>Panduan Cara Pembayaran</span>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div>
                    <ul>
                        <li class="q-py-xs">Masukan kartu ATM dan PIN BNI anda</li>
                        <li class="q-py-xs">Pilih menu lainnya</li>
                        <li class="q-py-xs">Pilih menu Transfer</li>
                        <li class="q-py-xs">Pilih menu Virtual Account Billing</li>
                        <li class="q-py-xs">Masukan 8740+12 Digit nomor ponsel Anda</li>
                        <li class="q-py-xs">Masukan nominal Top-up</li>
                        <li class="q-py-xs">Ikuti intruksi untuk menyelesaikan transaksi</li>
                    </ul>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { Notify } from 'quasar'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

import BankBNI from 'src/assets/image/bank/bank-bni.png'
export default {
  data () {
    return {
      BankBNI
    }
  },
  methods: {
    doCopy () {
      this.$copyText('8740-088854459').then(function (e) {
        Notify.create({
          message: 'Copied',
          position: 'bottom',
          type: 'positive'
        })
      }, function (e) {
        Notify.create({
          message: 'Can not copy',
          position: 'bottom',
          type: 'negative'
        })
      })
    }
  }
}
</script>
