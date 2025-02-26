<template>
    <q-layout view="lHr lpR lfr">
        <q-page-container>
            <q-page class="constrain-web-mini page-1 font-fira-sans">
                <div class="" ref="topFirst">
                    <div class="col-12 text-center">
                        <span class="text-white text-formulir">FORMULIR PENDAFTARAN</span>
                    </div>
                    <div class="col-12 text-center">
                        <span class="text-white text-formulir-secondary">
                            ONGISNADE - MEMBERSHIP VALUE PROGRAM
                            (MVP)
                        </span>
                    </div>
                    <q-card class="card-front">
                        <q-card-actions>
                            <div class="col-12" style="font-size: 12px;">
                                <span class="text-black">
                                    <span style="font-weight: 700;">Membership ONGISNADE</span> adalah Program
                                    Keanggotaan ONGISNADE yang bekerjasama dengan Membership Value Program (MVP),
                                    dalam bentuk MVP Virtual Card,
                                    dimana setiap anggota mempunyai Hak Istimewa Keanggotaan (Privilege), berupa
                                    Ragam Manfaat (Reward) untuk memperoleh Diskon, Program Promosi
                                    dan/atau Manfaat-manfaat lainnya dari Partner-partner Merchant yang telah
                                    bergabung.
                                </span>
                                <br>
                                <br>
                                <span class="text-black">
                                    Dapatkan EKSKLUSIF PROMO dan DISKON setiap hari di lebih dari 30 Merchant
                                    ternama dan lebih dari 70 Outlet di Kota Malang & sekitarnya dan akan terus
                                    bertambah.
                                </span>
                            </div>
                        </q-card-actions>
                    </q-card>
                    <q-card class="card-front">
                        <q-card-actions>
                            <div class="col-12 text-center">
                                <span class="text-black" style="font-weight: 700; font-size: 30px; line-height: 40px;">
                                    DAFTAR SEKARANG!
                                </span>
                                <br>
                                <span class="text-black" style="font-weight: 600; font-size: 16px; line-height: 20px;">
                                    GRATIS MVP GOLD
                                </span>
                                <br>
                                <span class="text-black" style="font-weight: 400; font-size: 10px; line-height: 20px;">
                                    (*Berlaku hingga 28 Februari 2023)
                                </span>
                            </div>
                        </q-card-actions>
                    </q-card>
                    <q-card class="card-front">
                        <q-card-actions>
                            <div class="col-12 text-center">
                                <span class="text-black"
                                    style="font-weight: 400; font-size: 14px; line-height: 25px; letter-spacing: 0.355em;">
                                    LAYANAN MEMBERSHIP
                                </span>
                                <br>
                                <q-card class="card-front" style="background: white; max-width: 65%;">
                                    <q-card-actions>
                                        <div class="col-12 text-center">
                                            <span class="text-black cursor-pointer" @click="toWhatsapp()"
                                                style="font-weight: 600; font-size: 24px; line-height: 34px;">
                                                +62 817-788-722
                                            </span>
                                        </div>
                                    </q-card-actions>
                                </q-card>
                                <span class="text-black" style="font-weight: 400; font-size: 16px; line-height: 20px;">
                                    (WhatsApp, Chat Only)
                                </span>
                            </div>
                        </q-card-actions>
                    </q-card>
                    <q-card class="card-front" style="background: white;">
                        <q-card-actions>
                            <div class="col-12 text-center">
                                <span class="text-black" style="font-weight: 400; font-size: 14px; line-height: 25px;">
                                    Daftar merchant yang telah bergabung:
                                </span>
                                <q-carousel v-model="slide" swipeable animated :navigation="navigation" height="250px"
                                    class="bg-white text-grey" control-color="grey" infinite :autoplay="autoplay">
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
                            </div>
                        </q-card-actions>
                    </q-card>
                    <div class="col-12 q-pb-md text-center" style="max-width: 85%; margin: 0 auto;">
                        <span class="text-white" style="font-weight: 500; font-size: 32px; line-height: 38px;">
                            Daftar Sekarang,<br>
                            GRATIS!
                        </span>
                        <br> <br>
                        <span class="text-white" style="font-weight: 400; font-size: 12px; line-height: 13px;">
                            Dan nikmati ragam promo dengan cara melengkapi formulir dibawah ini:
                        </span>
                        <br>
                    </div>
                    <!-- <q-radio v-model="shape" val="line" label="Line" /> -->
                    <div class="row font-fira-sans">
                        <div class="col-11 q-my-sm q-mx-md">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Email</span>
                            <q-input bg-color="white" type="email" v-model="data.email"
                                :error="$v.data.email.$error || double.email"
                                :error-message="validationMsg($v.data.email) || errorMsg('email')"
                                @focus="selectOnFocus" @blur="selectOnBlur($event, 'ongisnade@email.com');"
                                placeholder="ongisnade@email.com" rounded outlined dense />
                        </div>
                        <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px;">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Username</span>
                            <q-input bg-color="white" v-model="data.username"
                                :error="$v.data.username.$error || double.username" @focus="selectOnFocus"
                                @blur="selectOnBlur($event, 'ongisnade123'); blurUsername()"
                                :error-message="validationMsg($v.data.username) || errorMsg('username')"
                                placeholder="ongisnade123" rounded outlined dense />
                        </div>
                        <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px;">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Nama Depan</span>
                            <q-input bg-color="white" v-model="data.first_name" :error="$v.data.first_name.$error"
                                @focus="selectOnFocus" @blur="selectOnBlur($event, 'Budi');"
                                :error-message="validationMsg($v.data.first_name)" placeholder="Budi" rounded outlined
                                dense />
                        </div>
                        <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px;">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Nama Belakang</span>
                            <q-input bg-color="white" v-model="data.last_name" placeholder="Ngalam"
                                @focus="selectOnFocus" @blur="selectOnBlur($event, 'Ngalam');" rounded outlined dense />
                        </div>
                        <div class="col-11 q-mt-sm q-mx-md">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Tanggal
                                Lahir</span>
                            <q-input bg-color="white" v-model="data.date_of_birthday"
                                :error="$v.data.date_of_birthday.$error"
                                :error-message="validationMsg($v.data.date_of_birthday)" placeholder="11-08-1986"
                                @focus="selectOnFocus" @blur="selectOnBlur($event, '11-08-1986');" rounded outlined
                                dense>
                                <!-- <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="data.date_of_birthday" mask="DD-MM-YYYY" subtitle="Birthday"
                                        :title="data.first_name">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy> -->
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy" cover transition-show="scale"
                                            transition-hide="scale">
                                            <q-date v-model="data.date_of_birthday" mask="DD-MM-YYYY"
                                                subtitle="Birthday" :title="data.first_name">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-11 q-mt-sm q-mx-md" style="margin-top: -3px;">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Jenis Kelamin</span>
                        </div>
                        <div class="col-11 q-mb-sm q-mx-md text-white"
                            style="font-style: italic; font-size: 12px; font-weight: 400">
                            <q-radio keep-color checked-icon="event" color="white" v-model="data.gender" val="man"
                                label="Laki-Laki" />
                            <q-radio keep-color color="white" v-model="data.gender" val="woman" label="Perempuan" />
                        </div>
                        <div class="col-11 q-my-sm q-mx-md">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">No. WhatsApp</span>
                            <q-input bg-color="white" type="number" v-model="data.phone" placeholder="081234567890"
                                @focus="selectOnFocus" @blur="selectOnBlur($event, '081234567890');" @input="inputPhone"
                                :error="$v.data.phone.$error || double.phone"
                                :error-message="validationMsg($v.data.phone) || errorMsg('phone')" rounded outlined
                                dense />
                        </div>
                        <div class="col-11 q-my-sm q-mx-md" style="margin-top: -10px;">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Domisili</span>
                            <q-select v-model="data.address" use-input :error="$v.data.address.$error"
                                :error-message="validationMsg($v.data.address)" input-debounce="0"
                                :placeholder="data.address ? null : 'Kota Malang'" :options="options" @filter="filterFn"
                                behavior="menu" @focus="selectOnFocus" @blur="selectOnBlur($event, 'Kota Malang');"
                                bg-color="white" rounded outlined dense>
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px;">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Tipe Membership</span>
                            <q-radio class="text-white" color="white" v-model="data.divisi" val="gold" label="MVP Gold"
                                disable />
                        </div>
                        <div class="col-11 q-my-sm q-mx-md">
                            <span class="text-white text-left q-ml-md"
                                style="font-style: italic; font-size: 12px; font-weight: 400">Persetujuan Keanggotaan
                                MVP</span>
                            <div class="col-11 q-my-sm q-mx-md row">
                                <q-radio class="col-1" keep-color color="white" v-model="data.agree" val="yes" />
                                <span class="col-10 q-ml-sm text-white text-left"
                                    style="font-style: italic; font-size: 12px; font-weight: 400">Saya menyatakan
                                    bersedia dan setuju untuk tunduk & patuh pada Syarat dan Ketentuan sebagai anggota
                                    Membership Value Program (MVP)</span>
                            </div>
                        </div>
                        <div class="col-8 q-ml-auto q-mr-auto">
                            <q-btn label="Submit" class="q-py-sm q-mb-md bg-white text-black full-width"
                                @click="sendData()"
                                :loading="loadingBtn"
                                style="font-weight: 700; font-size: 12px; letter-spacing: 0.64em; line-height: 14.4px"
                                rounded outlined dense :disable="!data.agree ? true : false" />
                        </div>
                    </div>
                </div>
                <q-dialog v-model="successCard">
                    <q-card class="card-front-card font-fira-sans" style="max-width: 400px; padding: 8px;">
                        <q-card-actions>
                            <div class="col-12 text-center">
                                <span class="text-black"
                                    style="font-weight: 800; font-size: 20px; line-height: 24px; text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);">
                                    PENDAFTARAN BERHASIL
                                </span>
                                <br> <br>
                                <span class="text-black" style="font-weight: 500; font-size: 12px; line-height: 14px;">
                                    Terima kasih sudah mendaftar di
                                </span>
                                <br>
                                <span class="text-black" style="font-weight: 700; font-size: 16px; line-height: 18px;">
                                    Membership Value Program (MVP)
                                </span>
                                <br> <br>
                                <span class="text-black" style="font-weight: 500; font-size: 12px; line-height: 14px;">
                                    Tautan aktivasi Akun Ongisnade MVP VCard Anda telah <br>
                                    dikirim melalui Nomor WhatsApp yang telah <br>
                                    didaftarkan. Cek sekarang!
                                </span>
                            </div>
                            <div class="col-4 q-ml-auto q-mr-auto q-mt-md">
                                <q-btn label="CLOSE" class="q-py-sm q-mb-sm bg-white text-black full-width"
                                    v-close-popup
                                    style="font-weight: 700; font-size: 12px; line-height: 14.4px; text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);"
                                    rounded outlined dense />
                            </div>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>
import Merchant1 from 'src/assets/image/merchant-1.png'
import Merchant2 from 'src/assets/image/merchant-2.png'
import Merchant3 from 'src/assets/image/merchant-3.png'
import Merchant4 from 'src/assets/image/merchant-4.png'
import { required, email, helpers } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format',
  alphaNumAndDotValidator: () => 'Form input must alphanumeric'
}

// eslint-disable-next-line no-useless-escape
const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\A-Z\d-]*$/i)
// Vue Script Export Default Structure
export default {
  name: '',
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
      options: [],
      data: {
        email: '',
        username: '',
        divisi: 'gold'
      },
      double: {
        email: false,
        username: false,
        phone: false
      },
      loadingBtn: false,
      slide: 0,
      navigation: true,
      successCard: false,
      autoplay: true,
      stringOptions: []
    }
  },
  validations: {
    data: {
      email: {
        required,
        email
      },
      username: {
        required,
        alphaNumAndDotValidator
      },
      first_name: {
        required
      },
      phone: {
        required
      },
      date_of_birthday: {
        required
      },
      gender: {
        required
      },
      address: {
        required
      }
    }
  },
  mounted () {
    this.getCityList(1827)
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    errorMsg (type) {
      if (type === 'email') {
        return 'Email Already Exist'
      } else if (type === 'username') {
        return 'Username Already Exist'
      } else if (type === 'phone') {
        return 'Nomor Already Exist'
      }
    },
    getCityList (stateId) {
      this.$axios.get(`/csc/states/${stateId}/city`).then(response => {
        this.options = response.data.data.map(data => {
          return data.name
        })
        this.stringOptions = this.options
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    inputPhone () {
      this.$nextTick(() => {
        this.data.phone = this.data.phone.replace(/[^0-9.]/g, '')
      })
    },
    blurUsername () {
      if (this.data.username) {
        this.data.username = this.data.username.replace(/\s+/g, '-').toLowerCase()
      }
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
        this.double.email = false
        this.double.username = false
        this.double.phone = false
        this.loadingBtn = true
        const data = this.data
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'Please wait...',
          position: 'top'
        })
        this.$axios.post('member/register', data).then(response => {
          if (response.data.status) {
            notif({
              spinner: false,
              message: response.data.message,
              progress: true,
              position: 'top',
              type: 'negative'
            })
            this.successCard = true
            this.$refs.topFirst.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start'
            })
            this.loadingBtn = false
          } else {
            notif({
              spinner: false,
              message: response.data.message,
              progress: true,
              position: 'top',
              type: 'negative'
            })
            if (response.data.data === 'Email') {
              this.double.email = true
            } else if (response.data.data === 'Username') {
              this.double.username = true
            } else if (response.data.data === 'Phone') {
              this.double.phone = true
            }
            this.loadingBtn = false
          }
        })
      }
    },
    toWhatsapp () {
      window.open('https://wa.me/62817788722')
    },
    selectOnFocus (fEv) {
      fEv.target.placeholder = ''
    },
    selectOnBlur (fEv, data) {
      fEv.target.placeholder = data
    }
  }
}
</script>
<style lang="scss" scoped>
.page-1 {
    background: url('../assets/image/NetwerkMVP.png'), #05A4FF;
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
    padding-top: 375px;
}

.page-2 {
    background-color: #05a4ff !important;
    filter: blur(80px);
}

.text-formulir {
    font-style: normal;
    font-weight: 900;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.5em;
}

.text-formulir-secondary {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.05em;
}

.card-front {
    border-radius: 13px;
    background: #FFFFFFA8;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 130.5%;
    /* or 13px */

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

.card-front-card {
    border-radius: 13px;
    background: #ffffff;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 130.5%;
    /* or 13px */

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

.q-dialog__backdrop.fixed-full {
    backdrop-filter: blur(20px);
}
</style>
<style>
.q-placeholder::placeholder,
::-webkit-input-placeholder,
input::-webkit-input-placeholder,
.q-placeholder::placeholder,
::-webkit-input-placeholder,
select::-webkit-input-placeholder {
    font-size: 11px !important;
    font-weight: 300;
    font-style: italic !important;
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
