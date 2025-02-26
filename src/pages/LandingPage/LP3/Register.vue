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
                  Daftar Sekarang!
                </p>
              </div>
              <!-- <q-radio v-model="shape" val="line" label="Line" /> -->
              <div class="row font-proxima-nova">
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Pilih Paket</span>
                  <q-select outlined v-model="data.package" :options="package_options" dense/>
                </div>
                <div class="col-11 q-my-sm q-mx-md" v-if="package_selected == 'corporate'">
                  <span class="label-form">Nama Perusahaan</span>
                  <q-input outlined v-model="data.company" dense/>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Nama Lengkap</span>
                  <q-input outlined v-model="data.name" dense/>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">Nomor Telepon</span>
                  <q-input outlined v-model="data.no_wa" type="number" dense
                    onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190">
                    <template v-slot:prepend>
                      <span style="font-size: 14px">+62</span>
                    </template>
                  </q-input>
                </div>
                <div class="col-11 q-my-sm q-mx-md">
                  <span class="label-form">E-mail</span>
                  <q-input
                    outlined
                    v-model="data.email"
                    dense
                  />
                </div>
                <div class="col-11 q-my-sm q-mx-md">
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
                </div>
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
                              {{ (package_selected == 'personal') ? '1' : '5' }}x TAGID
                              <div style="text-decoration: line-through; color: white">
                                <span style="margin-right: 1rem; color: #CE1112">
                                  {{ `Rp. ${Intl.NumberFormat("de-DE", { currency: "EUR" }).format(parseInt(data.package.price_current))}` }}
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="row justify-between">
                              {{ (package_selected == 'personal') ? '1' : '5' }}x Kartu NFC "GOLD"
                              <span style="margin-right: 1rem">
                                {{ `Rp. ${Intl.NumberFormat("de-DE", { currency: "EUR" }).format(parseInt(data.package.price_discount))}` }}
                              </span>
                            </div>
                          </li>
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
                  <q-checkbox style="margin-bottom: 1rem; font-size: 13px" class="items-start" size="xs" v-model="data.aggreement_1" val="1" label="Saya menyatakan bersedia & setuju dengan syarat dan ketentuan, ketika saya membuat akun TAGID dan penggunaan data pribadi saya dengan aman oleh TAGID untuk menyediakan pengalaman yang lebih baik & interaktif kepada saya." />
                  <q-checkbox size="xs" v-model="data.aggreement_2" val="1" style="font-size: 13px" label="Saya menyatakan bersedia menerima notifikasi pendaftaran, eksklusif konten marketing dan komunikasi komersial dari TAGID dan Partner" />
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
                      :color="(data.aggreement_1 && data.aggreement_2) ? 'amber' : 'grey'"
                      :disabled="!(data.aggreement_1 && data.aggreement_2)"
                      class="full-width text-btn-buy"
                      glossy
                      label="Beli Sekarang"
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
        aggreement_2: false
      },
      double: {
        email: false,
        phone: false
      },
      package_options: [
        {
          label: 'PERSONAL (1 TAGID + 1 Kartu NFC *Gold)',
          value: 'personal',
          price_current: 99000,
          price_discount: 50000
        },
        {
          label: 'CORPORATE (5 TAGID + 5 Kartu NFC *Gold)',
          value: 'corporate',
          price_current: 495000,
          price_discount: 250000
        },
        {
          label: 'ENTERPRISE (>5 TAGID + >5 Kartu NFC *Gold)',
          value: 'enterprise',
          price_current: 0,
          price_discount: 0
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
      no_wa: { required },
      alamat: { required }
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
          type: this.data.package.value,
          until: 12,
          email: this.data.email,
          name: this.data.name,
          company_name: this.data.company,
          country: 102,
          phone: this.data.no_wa,
          discount: true,
          ongkir: this.data.ongkir,
          address: this.data.address,
          enterprise_member_total: this.data.enterprise_member_total
        }

        this.$axios.post('landingpage-ads/register', data)
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
    font-weight: 500;
    font-size: 32px;
    line-height: 38px;
    background: linear-gradient(257.53deg, #FCE15D -43%, #5D2504 -4.66%, #A87B22 70.26%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
