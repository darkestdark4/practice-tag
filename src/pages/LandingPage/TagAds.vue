<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-monserrat">
        <q-card class="q-mx-md q-pa-sm border-radius-10px card-bg" align="center">
          <q-card-section>
            <q-img
              :src="TagLogo"
              height="40px"
              width="120px"
              :ratio="16/9"
            />
            <div class="q-mt-sm">
              <span style="font-size: 22px;" class="text-bold">Kartu Nama Digital</span> <br>
              <span style="font-size: 18px;">Murah Bergaransi  Yang Paling Dicari</span>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card class="q-px-sm" style="background: linear-gradient(278.18deg, #4AAFC5 -18.12%, #1A488D 130.93%); border-radius: 5px; color: white; font-size: 16px; font-weight: 800;">
              <q-card-section>
                Hanya IDR 15.000 / <span style="font-size: 12px; font-weight: 600;">Bulan</span> <br> + Bonus Kartu NFC*
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-section>
            <q-img
              :src="CardInfo"
            />
          </q-card-section>
        </q-card>
        <div class="q-ma-lg text-white text-center">
          <span style="font-size: 24px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);">PENAWARAN SPESIAL BULAN INI HANYA 4 HARI !!</span>
        </div>
        <q-card class="q-mx-md q-my-lg q-pa-sm border-radius-10px" align="center">
          <q-card-section>
            <div class="q-pt-md">
              <span style="font-size: 22px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);" class="text-bold">PAKET PERSONAL</span> <br>
              <span style="font-size: 14px;">1 Kartu Nama Digital + BONUS 1 Kartu NFC* <br> *Syarat & Ketentuan Berlaku</span>
            </div>
          </q-card-section>
          <q-card-section>
            <q-img
              :src="TagPreview"
              width="70%"
              height="70%"
            />
          </q-card-section>
          <q-card-section style="padding: 5px;">
            <div class="q-my-md">
              <span style="font-size: 14px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2); color: #1A488D;" class="text-bold">Harga Paket Triwulan :</span> <br>
              <div class="q-py-xs q-px-md" style="background: linear-gradient(278.18deg, #4AAFC5 -18.12%, #1A488D 130.93%); border-radius: 20px; color: white; font-size: 18px; font-weight: 800; max-width: 65%;">
                <span>
                  IDR 45.000
                </span>
              </div>
            </div>
            <div class="q-my-md">
              <span style="font-size: 14px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2); color: #1A488D;" class="text-bold">Harga Paket Tahunan :</span> <br>
              <div class="q-py-xs q-px-md q-mb-sm" style="background: linear-gradient(278.18deg, #4AAFC5 -18.12%, #1A488D 130.93%); border-radius: 20px; color: white; font-size: 18px; font-weight: 800; max-width: 75%;">
                <span class="strikethrough q-mr-sm" style="font-size: 15px;">
                  IDR 180.000
                </span>
                <span>
                  IDR 150.000
                </span>
              </div>
              <div style="max-width: 60%; line-height: 12px;">
                <span style="font-size: 10px; font-weight: 600;" class="text-center">
                  * Bonus Kartu NFC untuk 50 Pembeli Pertama khusus Paket Tahunan
                </span>
              </div>
            </div>
            <div class="row text-left">
              <div class="col-6 row">
                <div class="col-12 row q-mb-sm" v-for="data in benefitPersonal" :key="data.name">
                  <q-img
                    class="col-2"
                    :src="IconCheck"
                    width="20px"
                    height="20px"
                  />
                  <span class="col-10" style="font-size: 10px; font-weight: 700;">{{ data.name }}</span>
                </div>
              </div>
              <div class="col-6 row">
                <div class="col-12 row q-mb-sm" v-for="data in benefitPersonal2" :key="data.name">
                  <q-img
                    class="col-2"
                    :src="IconCheck"
                    width="20px"
                    height="20px"
                  />
                  <span class="col-10" style="font-size: 10px; font-weight: 700;">{{ data.name }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section align="center">
            <div class="row">
              <q-btn v-if="register === true" class="col-5 q-mx-auto text-white" @click="scrollToId('personal')" style="background: #CE1112; font-size: 12px;" label="Beli Sekarang" rounded />
              <q-btn class="col-5 q-mx-auto text-white" id="button-wa-tagads" @click="toWa()" style="background: #0E6C54;" label="Whatsapp" rounded />
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mx-md q-my-sm q-pa-sm border-radius-10px" align="center">
          <q-card-section>
            <div class="q-pt-md">
              <span style="font-size: 22px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);" class="text-bold">PAKET CORPORATE</span> <br>
              <span style="font-size: 14px;">5 Kartu Nama Digital + BONUS 5 Kartu NFC*</span>
            </div>
          </q-card-section>
          <q-card-section>
            <q-img
              :src="TagPreview2"
              width="80%"
              height="80%"
            />
          </q-card-section>
          <q-card-section style="padding: 5px;">
            <div class="q-my-md">
              <span style="font-size: 14px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2); color: #1A488D;" class="text-bold">Harga Paket Triwulan :</span> <br>
              <div class="q-py-xs" style="background: linear-gradient(278.18deg, #4AAFC5 -18.12%, #1A488D 130.93%); border-radius: 20px; color: white; font-size: 18px; font-weight: 800; max-width: 65%;">
                <span>
                  IDR 225.000
                </span>
              </div>
            </div>
            <div class="q-my-md">
              <span style="font-size: 14px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2); color: #1A488D;" class="text-bold">Harga Paket Tahunan :</span> <br>
              <div class="q-py-xs q-px-md q-mb-sm" style="background: linear-gradient(278.18deg, #4AAFC5 -18.12%, #1A488D 130.93%); border-radius: 20px; color: white; font-size: 18px; font-weight: 800; max-width: 75%;">
                <span class="strikethrough q-mr-sm" style="font-size: 15px;">
                  IDR 875.000
                </span>
                <span>
                  IDR 600.000
                </span>
              </div>
              <div style="max-width: 60%; line-height: 12px;">
                <span style="font-size: 10px; font-weight: 600;" class="text-center">
                  * Bonus Kartu NFC untuk 50 Pembeli Pertama khusus Paket Tahunan
                </span>
              </div>
            </div>
            <div class="row text-left">
              <div class="col-6 row">
                <div class="col-12 row q-mb-sm" v-for="data in benefitCorporate" :key="data.name">
                  <q-img
                    class="col-2"
                    :src="IconCheck"
                    width="20px"
                    height="20px"
                  />
                  <span class="col-10" style="font-size: 10px; font-weight: 700;">{{ data.name }}</span>
                </div>
              </div>
              <div class="col-6 row">
                <div class="col-12 row q-mb-sm" v-for="data in benefitCorporate2" :key="data.name">
                  <q-img
                    class="col-2"
                    :src="IconCheck"
                    width="20px"
                    height="20px"
                  />
                  <span class="col-10" style="font-size: 10px; font-weight: 700;">{{ data.name }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section align="center">
            <div class="row">
              <q-btn v-if="register === true" class="col-5 q-mx-auto text-white" @click="scrollToId('corporate')" style="background: #CE1112; font-size: 12px;" label="Beli Sekarang" rounded />
              <q-btn class="col-5 q-mx-auto text-white" id="button-wa-tagads" @click="toWa()" style="background: #0E6C54;" label="Whatsapp" rounded />
            </div>
          </q-card-section>
        </q-card>
        <div class="q-ma-lg text-white text-center" v-if="register === true">
          <span style="font-size: 22px; font-weight: 900; line-height: 26px; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);">PEMESANAN SILAHKAN MENGISI <br> FORMULIR DIBAWAH INI</span>
        </div>
        <div class="row" id="formRegistrasi" v-if="register === true">
          <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left"
                  style="font-style: italic; font-size: 12px; font-weight: 400">Jenis Akun TAG</span>
              <q-select v-model="data.type" placeholder="Pilih Paket"
                  :options="typeOptions" behavior="menu" bg-color="white" outlined dense
                  map-options emit-value>
              </q-select>
          </div>
          <div class="col-11 q-my-sm q-mx-md">
              <span class="text-white text-left"
                  style="font-style: italic; font-size: 12px; font-weight: 400">Pilihan Paket</span>
              <q-select v-model="data.paket" placeholder="Pilih Paket"
                  :options="data.type === 'personal' ? optionsPersonal : (data.type === 'corporate' ? optionsCorporate : options)" behavior="menu" bg-color="white" outlined dense
                  map-options emit-value>
              </q-select>
          </div>
          <div class="col-11 q-my-sm q-mx-md" v-if="data.type === 'corporate'">
            <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
              Nama Perusahaan
            </span>
            <q-input
              bg-color="white"
              v-model="data.company_name"
              placeholder="Ketik Nama Perusahaan Anda"
              outlined
              dense
            />
          </div>
          <div class="col-11 q-my-sm q-mx-md">
            <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
              Nama Lengkap
            </span>
            <q-input
              bg-color="white"
              v-model="data.name"
              :error="$v.data.name.$error"
              :error-message="validationMsg($v.data.name)"
              placeholder="Ketik Nama Lengkap Anda"
              outlined
              dense
            />
          </div>
          <div class="col-11 q-my-sm q-mx-md">
            <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400; margin-top: -10px;" >
              Nomor Whatsapp
            </span>
            <div class="row">
              <q-select style="font-size: 10px;" class="col-4" bg-color="white" v-model="data.phone_code" :options="phoneCodeList" map-options outlined dense
                emit-value />
              <q-input class="col-8" type="number" bg-color="white"
                onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
                v-model="data.phone_number" placeholder="8123456789" outlined dense/>
              <span class="text-white text-left offset-4" style="font-style: italic; font-size: 10px; font-weight: 400;" >
                * Nomor Whatsapp Wajib Aktif
              </span>
            </div>
          </div>
          <div class="col-11 q-my-sm q-mx-md">
            <span class="text-white text-left" style="font-style: italic; font-size: 12px; font-weight: 400" >
              Email
            </span>
            <q-input
              bg-color="white"
              v-model="data.email"
              :error="$v.data.email.$error"
              :error-message="validationMsg($v.data.email)"
              placeholder="Ketik Email Anda"
              outlined
              dense
            />
          </div>
          <div class="col-11 q-my-sm q-mx-md">
            <q-btn id="button-bayar-tagads" class="text-white full-width" @click="sendData()" style="background: #1A488D;" rounded>
              Bayar
            </q-btn>
          </div>
        </div>
        <q-card class="q-mx-md q-mt-xl q-pa-sm border-radius-10px" align="center">
          <q-card-section>
            <div class="q-pt-md">
              <span style="font-size: 22px; font-weight: 800; text-shadow: 0px 0px 8px rgba(45, 147, 110, 0.2);" class="text-bold">HUBUNGI KAMI</span>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row text-left">
              <q-icon
                class="q-mr-md col-2"
                name="home"
                size="sm"
              />
              <span class="col-9">
                Greenpark Pandanwangi <br>
                Jl LA Sucipto B-1, Malang, Jawa Timur <br>
                Indonesia 65124
              </span>
            </div>
          </q-card-section>
          <q-card-section>
            <q-card class="q-py-lg q-px-md cursor-pointer" id="button-wa-tagads" @click="toWa()" style="background: linear-gradient(278.18deg, #4AAFC5 -18.12%, #1A488D 130.93%); border-radius: 5px; color: white; font-size: 20px; font-weight: 800;">
              <div class="row items-center">
                <q-img
                  class="col-2 offset-1"
                  :src="WALogo"
                  width="50px"
                  height="50px"
                />
                <div class="col-9 column text-center">
                  <span style="font-size: 14px; font-weight: 600; line-height: 17px;">WHATSAPP :</span>
                  <span style="font-size: 22px; font-weight: 700; line-height: 22px; letter-spacing: 0.035em;">085100441777</span>
                  <span style="font-size: 9px; font-weight: 400; line-height: 9px; letter-spacing: 0.155em;">CHAT WHATSAPP SAJA</span>
                </div>
              </div>
              <!-- <q-card-section>
              </q-card-section> -->
            </q-card>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import BGAds1 from 'src/assets/image/bg-ads-1.png'
import TagLogo from 'src/assets/image/Tag.png'
import WALogo from 'src/assets/image/wa-logo.png'
import CardInfo from 'src/assets/image/CardInfo.png'
import TagPreview from 'src/assets/image/TagPreview.png'
import TagPreview2 from 'src/assets/image/TagPreview2.png'
import IconCheck from 'src/assets/image/IconCheck.png'

import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

export default {
  data () {
    return {
      data: {
        phone_code: 102
      },
      BGAds1,
      TagLogo,
      WALogo,
      CardInfo,
      TagPreview,
      TagPreview2,
      IconCheck,
      register: true,
      phoneCodeList: [],
      options: [],
      optionsPersonal: [
        { label: 'Paket Tahunan (IDR 150.000) + Bonus Kartu NFC', value: 12 },
        { label: 'Paket Triwulan (IDR 45.000)', value: 3 }
      ],
      optionsCorporate: [
        { label: 'Paket Tahunan (IDR 600.000) + Bonus Kartu NFC', value: 12 },
        { label: 'Paket Triwulan (IDR 225.000)', value: 3 }
      ],
      typeOptions: [
        { label: 'Personal', value: 'personal' },
        { label: 'Corporate', value: 'corporate' }
      ],
      benefitPersonal: [
        {
          name: 'Kustom Tema & Profil'
        },
        {
          name: 'Integrasi Social Media & Video'
        },
        {
          name: 'QR Scan / Share'
        },
        {
          name: 'Simpan / Share Kontak'
        },
        {
          name: 'Shortcut Link'
        }
      ],
      benefitPersonal2: [
        {
          name: 'Profil Perusahaan & Map'
        },
        {
          name: 'Jadwal & Kalender Rapat'
        },
        {
          name: 'Dokumen / Portofolio'
        },
        {
          name: 'Slide Banner'
        },
        {
          name: 'Integrasi Toko Online'
        },
        {
          name: 'Link Meeting Room'
        }
      ],
      benefitCorporate: [
        {
          name: 'Kustom Tema & Profil'
        },
        {
          name: 'Integrasi Social Media & Video'
        },
        {
          name: 'QR Scan / Share'
        },
        {
          name: 'Simpan / Share Kontak'
        },
        {
          name: 'Shortcut Link'
        },
        {
          name: 'Profil Perusahaan & Map'
        },
        {
          name: 'Jadwal & Kalender Rapat'
        },
        {
          name: 'Dokumen / Portofolio'
        }
      ],
      benefitCorporate2: [
        {
          name: 'Get Advertiser'
        },
        {
          name: 'Integrasi Toko Online'
        },
        {
          name: 'E-Katalog'
        },
        {
          name: 'Manage Tim'
        },
        {
          name: 'Link Meeting Room'
        },
        {
          name: 'Broadcast Pesan'
        },
        {
          name: 'Voting / Polling'
        },
        {
          name: 'Real Time Data Analitik'
        },
        {
          name: 'Event Pass'
        }
      ]
    }
  },
  validations: {
    data: {
      name: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  beforeCreate () {
    const host = window.location.host
    const parts = host.split('.')
    const username = parts[0]
    if (username !== 'netwerk') {
      this.$router.push({ path: '/not-found' })
    }
  },
  mounted () {
    this.getPhoneCodeCountries()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    getPhoneCodeCountries () {
      this.$axios.get('https://api.the-netwerk.com/api/all/csc/countries').then(response => {
        this.phoneCodeList = response.data.data.map(data => {
          return {
            label: `${data.name} +${data.phonecode}`,
            value: data.id
          }
        })
      })
    },
    toWa () {
      window.open('https://bit.ly/Button_WA_LP1')
    },
    scrollToId (data) {
      this.data.type = data
      document.getElementById('formRegistrasi').scrollIntoView({ behavior: 'smooth' })
    },
    sendData () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        const data = {
          type: this.data.type,
          until: this.data.paket,
          email: this.data.email,
          name: this.data.name,
          company_name: this.data.company_name,
          country: this.data.phone_code,
          phone: this.data.phone_number
        }
        this.$axios.post('landingpage-ads/register', data).then(response => {
          if (response.data.status) {
            if (response.data.midtrans_url) {
              window.setTimeout(() => {
                window.location.href = response.data.midtrans_url
              }, 1000)
            }
          } else {
            this.$q.notify({
              message: response.data.message,
              progress: true,
              position: 'top',
              type: 'negative'
            })
          }
        })
          .catch((error) => {
            this.$q.notify({
              message: error.response.data.message,
              progress: true,
              position: 'top',
              type: 'negative'
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-1 {
    background: url('../../assets/image/bg-ads-1.png'), url('../../assets/image/bg-ads-2.png');
    background-position: top, bottom;
    background-size: contain, contain;
    background-repeat: no-repeat, no-repeat;
    padding: 25px 0;
}
.card-bg {
  background: url('../../assets/image/bg-card-eclipese.png') white;
  background-position: right top;
  background-repeat: no-repeat;
}
.strikethrough{
  position: relative;
}
.strikethrough:before {
  position: absolute;
  content: "";
  left: 0;
  top: 50%;
  right: 0;
  border-top: 1px solid;
  border-color: red;

  -webkit-transform:rotate(-5deg);
  -moz-transform:rotate(-5deg);
  -ms-transform:rotate(-5deg);
  -o-transform:rotate(-5deg);
  transform:rotate(-5deg);
}
</style>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
