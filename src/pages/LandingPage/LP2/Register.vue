<template>
    <q-layout view="lHr lpR lfr">
        <q-page-container>
          <q-page class="constrain-web-mini page-1 font-proxima-nova">
            <div class="" ref="topFirst">
              <div class="text-center q-pb-xl">
                <q-img
                  :src="TagLogo"
                  height="40px"
                  width="120px"
                  :ratio="16/9"
                />
              </div>
              <div class="col-12 text-center">
                <p class="title-lp" style="">
                  TUKAR GRATIS SEKARANG!
                </p>
              </div>
              <div class="col-12 text-center">
                <p class="subtitle-lp" style="">
                  MOHON LENGKAPI FORMULIR DIBAWAH INI :
                </p>
              </div>
              <!-- <div class="absolute-full text-subtitle2 flex flex-center" v-if="!$store.state.userdata.user.logo">
                <q-icon class="cursor-pointer" name="file_upload" size="xl"
                  @click="$refs.ProfilePicture.click()" />
                <input ref="ProfilePicture" type="file" accept="image/*" style="display: none;"
                  @change="onFileSelectProfile" />
              </div> -->
              <!-- <q-radio v-model="shape" val="line" label="Line" /> -->
              <div class="row font-proxima-nova">
                <div class="col-12 text-left q-ml-md">
                  <span class="title-form" style="">
                    Unggah Foto Kartu Nama Lama :
                  </span>
                </div>
                <div class="col-11">
                  <q-btn class="my-button text-center q-mx-md" @click="onClickSelectImage" :disable="data.photoCard.length === 5" flat>
                    <q-icon class="cursor-pointer" name="file_upload" size="sm" />
                      Unggah
                  </q-btn>
                  <input ref="ProfilePicture" type="file" accept="image/*" style="display: none;"
                    @change="onFileSelectProfile" />
                </div>
                <div class="col-12 text-left q-ml-md q-mb-sm">
                  <p class="subtitle-form" style="">
                    ** Pastikan pengambilan foto setiap kartu nama lama Anda tidak blur <br> atau terpotong
                  </p>
                </div>
                <div class="col-12 text-left q-ml-md">
                  <span class="title-form" style="">
                    Unggahan Foto :
                  </span>
                </div>
                <div class="col-11 row">
                  <q-btn class="text-center q-mx-sm text-black q-my-sm" style="background: #FCE15D;" glossy v-for="(btnCard, index) in data.photoCard" :key="index">
                    <span style="font-size: 12px; text-transform: lowercase;">{{ btnCard.name }}</span>
                    <q-icon class="cursor-pointer" name="close" @click="deletePhotoCard(index)" size="xs" />
                  </q-btn>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Pilih Paket</span>
                  <q-select outlined v-model="data.package" :options="package_options" dense/>
                  <span class="subtitle-form">* Paket Gratis Kartu Nama Digital selama 6 bulan</span>
                </div>
                <div class="col-12 text-left q-ml-md">
                  <span class="title-form" style="">
                    Data Penerima:
                  </span>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Nama Lengkap</span>
                  <q-input outlined v-model="data.name" dense/>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Nomor Whatsapp</span>
                  <q-input outlined v-model="data.no_wa" type="number" dense
                    onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190">
                    <template v-slot:prepend>
                      <span style="font-size: 14px">+62</span>
                    </template>
                  </q-input>
                  <span class="subtitle-form">*** Wajib aktif untuk keperluan konfirmasi pendaftaran dan <br> pengiriman e-sertifikat</span>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">E-mail</span>
                  <q-input
                    outlined
                    v-model="data.email"
                    dense
                  />
                </div>
                <div class="col-11 q-my-sm q-mx-md" v-if="package_selected == 'corporate'">
                  <span class="label-form">Nama Perusahaan (bila ada)</span>
                  <q-input outlined v-model="data.company" dense/>
                </div>
                <!-- <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Provinsi</span>
                  <q-select
                    outlined dense
                    v-model="data.province"
                    :options="province_options"/>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Kota</span>
                  <q-select outlined v-model="data.city" :options="city_options" dense/>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Alamat</span>
                  <q-input outlined v-model="data.alamat" dense/>
                </div> -->
              </div>
              <div class="row font-proxima-nova" v-if="data.package">
                <div class="col-11 q-my-sm q-mx-md">
                  <q-card flat class="card-pemesanan">
                    <h6 style="color: white; margin-bottom: .5rem; margin-top: 0" class="text-center">Rincian Pesanan</h6>
                    <div class="product-list" v-if="package_selected == 'enterprise'">
                      <p style="color: white; margin-bottom: .25rem">Paket Enterprise</p>
                      <div class="row">
                        <div class="col-6" style="margin-top: .5rem">
                          <span class="label-form">Jumlah Pemesanan (> 5)</span>
                        </div>
                        <div class="col-6">
                          <q-input outlined v-model="data.enterprise_member_total" dense/>
                        </div>
                      </div>
                    </div>
                    <div class="product-list" v-else>
                      <div class="product-item">
                        <p style="color: white; margin-bottom: .25rem">Paket {{ package_selected }}</p>
                        <ul style="color: white">
                          <li>
                            <div class="row justify-between">
                              {{ (package_selected == 'personal') ? '1' : '5' }}x TAGID (Berlangganan 6 Bulan)
                              <span style="font-weight: 400;">(Tidak Termasuk Kartu NFC "Gold")</span>
                              <div style="color: white">
                                <span style="margin-right: 1rem;">
                                  {{ `Rp. ${Intl.NumberFormat("de-DE", { currency: "EUR" }).format(parseInt(data.package.price_discount))}` }}
                                </span>
                              </div>
                            </div>
                          </li>
                          <!-- <li>
                            <div class="row justify-between">
                              {{ (package_selected == 'personal') ? '1' : '5' }}x Kartu NFC "GOLD"
                              <span style="margin-right: 1rem">
                                {{ `Rp. ${Intl.NumberFormat("de-DE", { currency: "EUR" }).format(parseInt(data.package.price_discount))}` }}
                              </span>
                            </div>
                          </li> -->
                        </ul>
                      </div>
                      <hr/>
                      <div class="ongkir">
                        <div class="row justify-between" style="color: white">
                          <p>Ongkos Kirim</p>
                          <span style="margin-right: 1rem">
                            {{ `Rp. ${Intl.NumberFormat("de-DE", { currency: "EUR" }).format(parseInt(data.ongkir))}` }}
                          </span>
                        </div>
                      </div>
                      <hr>
                      <div class="total-price">
                        <div class="row justify-between" style="color: white">
                          <p>Total Harga</p>
                          <span style="margin-right: 1rem">
                            {{ `Rp. ${Intl.NumberFormat("de-DE", { currency: "EUR" }).format(parseInt(data.total))}` }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </q-card>
                </div>
              </div>
              <div class="row font-proxima-nova">
                <div class="col-11 q-my-sm q-mx-md" style="color: white">
                  <p style="color: white; margin-bottom: 1rem; margin-top: 1rem; margin-left: 1.8rem; font-size: 16px">Persetujuan Privasi dan Data:</p>
                  <!-- <q-checkbox style="margin-bottom: 1rem; font-size: 13px" class="items-start" size="xs" v-model="data.aggreement_1" val="1" label="Saya menyatakan bersedia & setuju dengan syarat dan ketentuan, ketika saya membuat akun TAGID dan penggunaan data pribadi saya dengan aman oleh TAGID untuk menyediakan pengalaman yang lebih baik & interaktif kepada saya." />
                  <q-checkbox size="xs" v-model="data.aggreement_2" val="1" style="font-size: 13px" label="Saya menyatakan bersedia menerima notifikasi pendaftaran, eksklusif konten marketing dan komunikasi komersial dari TAGID dan Partner" /> -->
                  <div class="col-12 row q-mt-md">
                    <q-img
                      class="col-1 q-ml-sm q-mr-sm"
                      :src="Checklist"
                      width="15px"
                      height="15px"
                    />
                    <span class="col-10" style="font-size: 12px; font-weight: 500; line-height: 15px;">
                      Saya menyatakan bersedia & setuju dengan syarat dan ketentuan, ketika saya membuat akun TAGID dan penggunaan data pribadi saya dengan aman oleh TAGID untuk menyediakan pengalaman yang lebih baik & interaktif kepada saya.
                    </span>
                  </div>
                  <div class="col-12 row q-mt-md">
                    <q-img
                      class="col-1 q-ml-sm q-mr-sm"
                      :src="Checklist"
                      width="15px"
                      height="15px"
                    />
                    <span class="col-10" style="font-size: 12px; font-weight: 500; line-height: 15px;">
                      Saya menyatakan bersedia menerima notifikasi pendaftaran, eksklusif konten marketing dan komunikasi komersial dari TAGID dan Partner
                    </span>
                  </div>
                </div>
              </div>
              <div class="row font-proxima-nova">
                <div class="button-submit" style="width: 100%">
                  <div class="col-11 q-my-sm q-mx-md" v-if="package_selected == 'enterprise'">
                    <q-btn
                      :color="(data.aggreement_1 && data.aggreement_2) ? 'light-green-14' : 'grey'"
                      :disabled="!(data.aggreement_1 && data.aggreement_2)"
                      class="full-width text-btn-message"
                      glossy
                      icon="whatsapp"
                      label="Kirim Pesan"
                      @click="sendData()"/>
                  </div>
                  <div class="col-11 q-my-sm q-mx-md" v-else-if="package_selected != 'enterprise' && package_selected !== null">
                    <q-btn
                      :color="'amber'"
                      class="full-width text-btn-buy"
                      glossy
                      label="Daftar Sekarang"
                      @click="sendData()"
                    />
                  </div>
                </div>
                <div class="button-text" style="color: white; width: 100%; margin-top: 1rem">
                  <p class="text-center" style="font-weight: bold" v-if="package_selected != 'enterprise' && package_selected !== null">
                    <q-icon name="shield" color="green" size="20px" style="margin-right: .25rem"/>
                    Payment are secure and encrypted
                  </p>
                  <div class="row justify-around">
                    <p style="font-size: 13px"><q-icon name="lock" size="20px" style="margin-right: .25rem"/> Transaksi Aman</p>
                    <p style="font-size: 13px"><q-icon name="thumb_up" size="20px" style="margin-right: .25rem"/> Jaminan Kepuasan</p>
                  </div>
                </div>
              </div>
            </div>
            <q-card class="my-footer q-mt-md q-px-lg" flat>
              <q-card-section>
                <div class="text-h6">Hubungi Kami</div>
                <div class="row items-center q-mt-md">
                  <q-icon size="24px" class="col-2" name="location_on" />
                  <div class="col-10" style="font-size: 14px;">
                    Greenpark Pandanwangi <br>
                    JI. LA Sucipto B-1, Malang, Jawa Timur, Indonesia 65124
                  </div>
                </div>
                <div class="row q-mt-md items-center cursor-pointer">
                  <div class="col-2 items-center text-center">
                    <q-icon size="24px" :name="`img:${WALogo}`" @click="toWa()"/>
                  </div>
                  <div class="col-7" style="font-size: 14px;" @click="toWa()">
                    +62 851 0044 1777
                  </div>
                  <div class="col-1 items-center text-center" @click="toPage('fb')">
                    <q-icon size="18px" :name="`img:${FBLogo}`" />
                  </div>
                  <div class="col-1 items-center text-center" @click="toPage('ig')">
                    <q-icon size="18px" :name="`img:${IGLogo}`" />
                  </div>
                  <div class="col-1 items-center text-center" @click="toPage('tw')">
                    <q-icon size="18px" :name="`img:${TWLogo}`" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>
import TagLogo from 'src/assets/image/Tag.png'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import WALogo from 'src/assets/image/wa-logo-putih.png'
import FBLogo from 'src/assets/image/fb.png'
import IGLogo from 'src/assets/image/ig.png'
import TWLogo from 'src/assets/image/twitter.png'
import Checklist from 'src/assets/image/Checklist-LP3.png'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

// Vue Script Export Default Structure
export default {
  name: '',
  data () {
    return {
      TagLogo,
      WALogo,
      FBLogo,
      IGLogo,
      TWLogo,
      Checklist,
      options: [],
      data: {
        email: null,
        alamat: null,
        name: null,
        no_wa: null,
        package: null,
        company: null,
        city: null,
        province: null,
        ongkir: 0,
        total: 0,
        enterprise_member_total: 0,
        aggreement_1: false,
        aggreement_2: false,
        photoCard: []
      },
      double: {
        email: false,
        phone: false
      },
      package_options: [
        {
          label: 'PERSONAL (1 TAGID)',
          value: 'personal',
          price_current: 99000,
          price_discount: 50000
        },
        {
          label: 'CORPORATE (5 TAGID)',
          value: 'corporate',
          price_current: 495000,
          price_discount: 250000
        }
      ],
      package_selected: null,
      province_options: [],
      city_options: [],
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
      email: { required, email },
      name: { required },
      no_wa: { required }
      // alamat: { required }
    }
  },
  watch: {
    'data.province': function (newValue, oldValue) {
      this.getCity(newValue)
    },
    'data.package': function (newValue, oldValue) {
      this.package_selected = newValue.value

      // set total
      this.data.total = this.data.ongkir + this.data.package.price_discount
    },
    'data.city': function (newValue, oldValue) {
      this.getOngkir(newValue)
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
    this.getProvinceList()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    errorMsg (type) {
      if (type === 'email') {
        return 'Email Already Exist'
      } else if (type === 'phone') {
        return 'Nomor Already Exist'
      }
    },

    getProvinceList () {
      this.$axios.get('/rajaongkir/province')
        .then(res => {
          const { data } = res.data

          this.province_options = data.map(item => {
            return {
              label: item.province,
              value: item.province_id
            }
          })
        })
    },
    getCity (province) {
      this.data.city = null
      const provinceID = province.value

      this.$axios.get(`/rajaongkir/city/${provinceID}`)
        .then(res => {
          const { data } = res.data

          this.city_options = data.map(item => {
            return {
              label: `${item.type} ${item.city_name}`,
              value: item.city_id
            }
          })
        })
    },
    getOngkir (destination) {
      const input = new FormData()
      input.append('origin', 153)
      input.append('destination', destination.value)
      input.append('weight', 1000)

      this.$axios.post('/rajaongkir/cost', input)
        .then(res => {
          const { data } = res.data

          // set ongkir to reguler JNE
          const ongkirData = data[0]
          const regService = ongkirData.costs.filter(item => {
            return item.service === 'REG' || item.service === 'CTC'
          })

          if (regService) {
            this.data.ongkir = regService[0].cost[0].value

            // set total
            this.data.total = this.data.ongkir + this.data.package.price_discount
          }
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
    onClickSelectImage () {
      if (this.data.photoCard.length === 5) {
        this.$q.notify({
          message: 'Maksimal Unggah Foto adalah 5.',
          position: 'top',
          type: 'negative'
        })
      } else {
        this.$refs.ProfilePicture.click()
      }
    },
    onFileSelectProfile (e) {
      const file = e.target.files[0]
      if (typeof FileReader === 'function') {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          const image = {
            image: file,
            name: file.name
          }
          this.data.photoCard.push(image)
          // const reader = new FileReader()
          // reader.onload = (event) => {
          //   const image = {
          //     image: file,
          //     name: file.name
          //   }
          //   this.data.photoCard.push(image)
          // }
          // reader.readAsDataURL(file)
        }
      } else {
        alert('Sorry, FileReader API not supported')
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
      } else if (this.data.photoCard.length < 1) {
        this.$q.notify({
          message: 'Unggah Foto Kartu Nama Minimal 1!',
          position: 'top',
          type: 'negative'
        })
      } else {
        // const data = {
        //   type: this.data.package.value,
        //   until: 12,
        //   email: this.data.email,
        //   name: this.data.name,
        //   company_name: this.data.company,
        //   // country: 102,
        //   phone: this.data.no_wa,
        //   discount: true,
        //   // ongkir: this.data.ongkir,
        //   // address: this.data.address,
        //   enterprise_member_total: this.data.enterprise_member_total,
        //   photo_card: this.data.photoCard
        // }
        const formData = new FormData()
        formData.append('type', this.data.package.value)
        formData.append('until', 12)
        formData.append('email', this.data.email)
        formData.append('name', this.data.name)
        formData.append('company_name', this.data.company)
        formData.append('phone', this.data.no_wa)
        formData.append('discount', true)
        formData.append('country', 102)
        formData.append('enterprise_member_total', this.data.enterprise_member_total)
        // formData.append('photo_card', this.data.photoCard)
        if (this.data.photoCard[0]) {
          if (this.data.photoCard[0].image) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.data.photoCard.length; i++) {
              formData.append('photo_card[][image]', this.data.photoCard[i].image)
            }
          }
        }

        this.$axios.post('landingpage-ads/register', formData)
          .then(response => {
            if (this.data.package.value === 'enterprise') {
              this.toWhatsapp()
            } else {
              if (response.data.status) {
                const webhookData = {
                  order_id: response.data.bill_number,
                  transaction_status: 'settlement'
                }

                this.$axios.post('handling-midtrans', webhookData)
                  .then(res => {})
                  .catch(error => console.log(error))

                window.setTimeout(() => {
                  window.location.href = 'https://tagid.ai/thankyou'
                }, 1000)
              } else {
                this.$q.notify({
                  message: response.data.message,
                  progress: true,
                  position: 'top',
                  type: 'negative'
                })
              }
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
    },
    toWhatsapp () {
      window.location.href = 'https://api.whatsapp.com/send/?phone=6285100441777&text=Saya mau bertanya perihal kartu nama NFC berlapis emas untuk pilihan paket Enterprise..'
    },
    toPage (type) {
      if (type === 'shopee') {
        window.open('https://shopee.co.id/tagid.ai')
      } else if (type === 'tokopedia') {
        window.open('https://tokopedia.link/tagidai')
      } else if (type === 'fb') {
        window.open('https://www.facebook.com/tagiddotai')
      } else if (type === 'ig') {
        window.open('https://instagram.com/tagid.ai')
      } else if (type === 'tw') {
        window.open('https://twitter.com/tagid_ai')
      }
    },
    selectOnFocus (fEv) {
      fEv.target.placeholder = ''
    },
    selectOnBlur (fEv, data) {
      fEv.target.placeholder = data
    },
    deletePhotoCard (index) {
      this.data.photoCard.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-1 {
      background: url('../../../assets/image/LP-TAG.png');
      background-position: top;
      background-size: cover;
      background-repeat: no-repeat;
      padding-top: 5rem;
  }

  .my-button {
    background: url('../../../assets/image/Layer-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    text-transform: capitalize;
    font-weight: 700;
    font-size: 15px;
    line-height: 17px;
    color: #1A0B01;
    padding: 2px 2px 2px 2px;
  }
  .page-2 {
      background-color: #000000 !important;
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

  .q-select, .q-input {
    background: white;
  }

  .label-form {
    color: white;
    margin-bottom: 1rem;
    font-size: 15px;
    font-weight: 400;
  }

  .title-lp {
    font-weight: 800;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    background: linear-gradient(246.14deg, #5D2504 -399.84%, #994E17 -122.42%, #FCE15D 132.8%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle-lp {
    font-weight: 600;
    font-size: 14px;
    line-height: 128%;

    color: white;
  }

  .title-form {
    font-weight: 600;
    font-size: 14px;
    line-height: 128%;

    color: white;
  }

  .subtitle-form {
    font-weight: 500;
    font-size: 11px;
    line-height: 121%;

    color: white;
  }

  .q-checkbox { align-items: flex-start !important; }
  .q-checkbox__bg {
    background: white;
    top: 15%;
    left: 15%;
  }

  .text-btn-buy {
    color: black !important;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 18px;
  }

  .text-btn-message {
    font-weight: bold;
    text-transform: capitalize;
    font-size: 18px;
  }

  .my-footer {
    background: rgba(255, 255, 255, 0.08);
    color: white;

    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }

  .card-pemesanan {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    padding: 1rem;
  }
</style>
