<script>
const localStorage = JSON.parse(window.localStorage.getItem('user'))
const username = localStorage.username

export default {
  props: {
    corporateID: { type: Number },
    secondaryColor: { type: String },
    partner: { type: Object },
    partnerData: { type: Array },
    partnerList: { type: Array },
    redeemPartnerCount: { type: [Number, String] }
  },
  data () {
    return {
      isPwd: true,
      input_code: '',
      input_password: '',

      partnerInput: false,
      partnerModal: false,
      partnerDetailModal: false,
      partnerCabangModal: false,
      passwordInputModal: false,
      partnerSuccessModal: false,

      search: '',
      typePartner: 'sheet',
      partnerDetail: [],
      partnerCabang: [],
      partnerCabangDetail: [],
      Profile: 'https://api.the-netwerk.com/storage/app/public/member/profile/TAGID-profile.jpg'
    }
  },
  computed: {
    partnerFilter () {
      if (this.search !== '') {
        return this.partnerList.filter(
          (d) =>
            d.is_expired === false &&
            d.name.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return this.partnerList.filter(
          (partner) => partner.is_expired === false
        )
      }
    },
    isMobile () {
      return this.$store.state.style.isMobile
    }
  },
  methods: {
    sendPassword () {
      const notif = this.$q.notify({
        group: false,
        spinner: true,
        message: 'Please wait...',
        position: 'top'
      })
      const data = {
        email: this.$store.state.userdata.user.member_email,
        password: this.input_password
      }
      this.$axios.post('/member/login', data).then((response) => {
        const data = response.data
        if (data.status) {
          notif({
            spinner: false,
            message: 'Success',
            progress: true,
            position: 'top',
            type: 'positive'
          })
          window.setTimeout(() => {
            this.partnerInput = true
            this.passwordInputModal = false
            window.setTimeout(() => {
              this.input_password = ''
            }, 200)
          }, 1000)
        } else {
          notif({
            spinner: false,
            message: data.message,
            progress: true,
            position: 'top',
            type: 'negative'
          })
        }
      })
    },
    handleOnComplete (value) {
      this.input_code = value
    },
    showPartnerModal () {
      this.$emit('close')
      this.partnerModal = true
    },
    showPartnerDetailModal (partner, value) {
      this.$emit('close')
      this.typePartner = value
      this.partnerDetailModal = true
      if (partner.partner_id) {
        this.partnerDetail = {
          id: partner.id,
          name: partner.partner_name,
          description: partner.partner_description,
          info: partner.partner_info,
          pin_code: partner.pin_code,
          image: partner.partner_image
        }
      } else {
        this.partnerDetail = partner
      }
    },

    showPartnerCabang (data, partner, value) {
      this.$emit('close')
      this.typePartner = value
      this.partnerCabang = data
      this.partnerCabangModal = true
      this.partnerCabangDetail = partner
    },

    redeemPartner () {
      const notif = this.$q.notify({
        group: false,
        spinner: true,
        message: 'Please wait...',
        position: 'top'
      })
      this.$axios
        .post(`/partner/redeem/username/${this.partnerDetail.id}`, {
          pin_code: this.input_code,
          username: username
        })
        .then(({ data }) => {
          if (data.status === 'success') {
            notif({
              spinner: false,
              message: data.message,
              position: 'top',
              type: 'positive'
            })
            this.input_code = ''
            this.partnerInput = false
            window.setTimeout(() => {
              this.partnerDetailModal = false
              this.partnerSuccessModal = true
              window.setTimeout(() => {
                this.partnerSuccessModal = false
              }, 15000)
            }, 1000)
          } else {
            notif({
              spinner: false,
              message: data.data,
              position: 'top',
              type: 'negative'
            })
          }
        })
        .catch((error) => {
          notif.create({
            message: error.response.data.data,
            position: 'bottom',
            type: 'negative'
          })
        })
    },

    closePartnerModal () {
      this.$emit('open')
    },
    closePartnerCabangModal () {
      this.partnerCabangModal = false
      const tipe = this.typePartner ? this.typePartner : 'sheet'
      if (tipe === 'sheet') {
        this.$emit('open')
      } else if (tipe === 'cabang') {
        this.partnerCabangModal = true
      } else if (tipe === 'partner') {
        this.partnerModal = true
      }
    },
    closePartnerDetailModal () {
      const tipe = this.typePartner ? this.typePartner : 'sheet'
      if (tipe === 'sheet') {
        this.$emit('open')
      } else if (tipe === 'cabang') {
        this.partnerCabangModal = true
      } else if (tipe === 'partner') {
        this.partnerModal = true
      }
    }
  }
}
</script>

<template>
  <div>
    <q-card
      class="bg-white border-radius-10px"
      v-if="partnerData.length > 0 && partner.status"
    >
      <div class="q-pa-lg q-my-md row">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :class="partnerList.length > 10 ? 'col-8' : 'col-12'"
          :style="`color: ${secondaryColor}`"
        >
          {{ partner.alias }}
        </div>
        <div
          v-if="partnerList.length > 10"
          class="q-mb-sm col-4 font-monserrat text-right cursor-pointer"
          @click="showPartnerModal()"
          :style="`color: ${secondaryColor}`"
        >
          See All
        </div>
        <div class="row col-12">
          <div class="col-3 q-gutter-y-sm" v-for="(item, index) in partnerData" :key="index">
            <div class="column flex flex-center cursor-pointer q-mb-md text-center">
              <q-avatar
                v-show="item.cabang.length > 1"
                :size="isMobile ? '50px' : '75px'"
              >
                <q-img
                  width="100%"
                  height="100%"
                  alt="Profile Logo"
                  :src="item.image ? item.image : Profile"
                  @click="showPartnerCabang(item.cabang, item, 'sheet')"
                />
                <q-badge
                  rounded floating
                  :style="`background: #CFE2DE; color: #106C53;`"
                >
                  <q-icon name="store" size="16px" />
                </q-badge>
              </q-avatar>
              <q-avatar
                :size="isMobile ? '50px' : '75px'"
                v-show="item.cabang.length <= 1"
              >
                <q-img
                  alt="Profile Logo"
                  :src="item.image ? item.image : Profile"
                  width="100%"
                  height="100%"
                  @click="showPartnerDetailModal(item.cabang[0], 'sheet')"
                />
              </q-avatar>

              <span
                :style="isMobile ? 'font-size: 10px;' : ''"
                class="text-capitalize font-proxima-nova-alt q-px-sm"
                v-show="item.name.length < 15"
              >
                {{ item.name }}
              </span>
              <span
                :style="isMobile ? 'font-size: 10px;' : ''"
                class="text-capitalize font-proxima-nova-alt q-px-sm"
                v-show="item.name.length >= 15"
              >
                {{ item.name.substring(0, item.name.lastIndexOf("", 15)) + "..." }}
              </span>

              <!-- <q-btn v-show="a.cabang.length > 1"
                class="text-capitalize font-proxima-nova-alt border-radius-10px q-px-sm" label="Branch"
                @click="showPartnerCabang(a.cabang, a, 'sheet')"
                :style="`background: rgba(17, 108, 84, 0.2); color: #116C54; font-size: 10px`" size="8px" /> -->
            </div>
          </div>
        </div>
        <div
          v-if="corporateID === 48"
          class="q-mb-sm text-bold font-monserrat col-12 text-center"
          :style="`color: ${secondaryColor}`"
        >
          Total Redeem : {{ redeemPartnerCount }}
        </div>
      </div>
    </q-card>

    <!-- PARTNER MODAL -->
    <q-dialog v-model="partnerModal" full-width>
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-2 text-left q-mt-xs"></div>
          <div class="col-8 text-h6 text-center">{{ partner.alias }}</div>
          <div class="col-2 text-right">
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              @click="closePartnerModal()"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="column col-12">
            <span class="col-12 text-left text-bold q-mt-sm">
              <q-input
                class="full-width"
                :dense="true"
                placeholder="Search ..."
                v-model="search"
                outlined
              />
            </span>
            <div
              class="q-mb-md row q-mt-md"
              v-for="a in partnerFilter"
              :key="a.id"
            >
              <div class="col-3 cursor-pointer text-center">
                <q-avatar
                  :size="isMobile ? '75px' : '75px'"
                  v-show="a.cabang.length > 1"
                >
                  <q-img
                    alt="Profile Logo"
                    :src="a.image ? a.image : Profile"
                    width="100%"
                    height="100%"
                    @click="
                      showPartnerCabang(a.cabang, a, 'partner');
                      partnerModal = false;
                    "
                  />
                </q-avatar>
                <q-avatar
                  :size="isMobile ? '75px' : '75px'"
                  v-show="a.cabang.length <= 1"
                >
                  <q-img
                    alt="Profile Logo"
                    :src="a.image ? a.image : Profile"
                    width="100%"
                    height="100%"
                    @click="
                      showPartnerDetailModal(a.cabang[0], 'partner');
                      partnerModal = false;
                    "
                  />
                </q-avatar>
              </div>
              <div class="col-8 column offset-1">
                <span class="font-proxima-nova-alt q-px-sm q-mt-md text-bold"
                  >{{ a.name.substring(0, a.name.lastIndexOf("", 30)) }}
                  <span v-show="a.name.length > 30">...</span>
                </span>
                <q-btn
                  v-show="a.cabang.length > 1"
                  class="text-capitalize font-proxima-nova-alt border-radius-10px q-px-sm q-mt-sm"
                  label="Branch"
                  @click="
                    showPartnerCabang(a.cabang, a, 'partner');
                    partnerModal = false;
                  "
                  :style="`background: rgba(17, 108, 84, 0.2); color: #116C54; width: 50%;`"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PARTNER DETAIL MODAL -->
    <q-dialog v-model="partnerDetailModal" full-width full-height>
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-2 text-left q-mt-xs">
            <q-btn
              style="color: #116c54"
              icon="arrow_back"
              flat
              round
              dense
              v-close-popup
              @click="closePartnerDetailModal()"
            >
              Back
            </q-btn>
          </div>
          <div class="col-8 text-h6 text-center">{{ partner.alias }}</div>
          <div class="col-2 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section
          class="q-pt-none scroll"
          :style="isMobile ? 'max-height: 70vh' : 'max-height: 80vh'"
        >
          <div class="row flex col-12">
            <div class="col-12 text-center">
              <q-avatar size="100px">
                <q-img
                  alt="Profile Logo"
                  :src="partnerDetail.image ? partnerDetail.image : Profile"
                  width="100%"
                  height="100%"
                />
              </q-avatar>
            </div>
            <div class="col-12">
              <h5 class="text-bold text-center">{{ partnerDetail.name }}</h5>
              <p v-html="partnerDetail.description"></p>
            </div>
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white" v-if="partnerDetail.pin_code">
          <q-card-actions align="center">
            <q-btn
              class="full-width text-white text-capitalize"
              :style="`background-color: #116C54`"
              @click="passwordInputModal = true"
              label="REDEEM"
              rounded
            />
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>

    <!-- PARTNER CABANG MODAL -->
    <q-dialog v-model="partnerCabangModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-6 text-left q-mt-xs">
            <q-btn
              style="color: #116c54"
              icon="arrow_back"
              flat
              round
              dense
              v-close-popup
              @click="closePartnerCabangModal()"
            >
              Back
            </q-btn>
          </div>
          <div class="col-12 text-bold text-h6 text-left">
            {{ partnerCabangDetail.name }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(pc, idx) in partnerCabang" :key="idx" class="row">
            <div class="col-2 q-mr-md q-my-sm">
              <q-avatar size="75px">
                <q-img
                  alt="Profile Logo"
                  :src="pc.partner_image ? pc.partner_image : Profile"
                  width="80%"
                  height="80%"
                />
              </q-avatar>
            </div>
            <div class="col-8 q-mt-lg">
              <div
                class="q-my-sm text-bold"
                style="font-size: 18px; color: #116c54"
              >
                {{ pc.partner_name }}
              </div>
            </div>
            <div class="col-12 q-my-sm flex flex-center">
              <q-btn
                class="text-capitalize full-width"
                label="Redeem"
                @click="showPartnerDetailModal(pc, 'cabang')"
                :style="`background: rgba(17, 108, 84, 0.2); color: #116C54;`"
                rounded
              />
            </div>
            <div v-if="idx !== partnerCabang.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Input Password Modal -->
    <q-dialog v-model="passwordInputModal">
      <q-card
        class="font-proxima-nova-alt"
        style="min-width: 350px; min-height: 150px"
      >
        <q-card-section align="center" class="row q-mb-lg q-pb-lg">
          <div class="col-8 q-ml-auto q-mr-auto">
            <q-input
              class="full-width"
              v-model="input_password"
              :type="isPwd ? 'password' : 'text'"
              label="Input Password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white">
          <q-card-actions align="center" class="row">
            <div class="col-5 q-mr-auto">
              <q-btn
                class="full-width text-white text-capitalize"
                v-close-popup
                :style="`background-color: #CF2E2E`"
                label="Cancel"
                rounded
              />
            </div>
            <div class="col-5 q-ml-auto">
              <q-btn
                class="full-width text-white text-capitalize"
                :style="`background-color: #116C54`"
                @click="sendPassword()"
                label="Send"
                rounded
              />
            </div>
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>

    <!-- Input Code Modal -->
    <q-dialog v-model="partnerInput">
      <q-card
        class="font-proxima-nova-alt"
        style="min-width: 350px; min-height: 150px"
      >
        <q-card-section align="center" class="row q-mb-lg q-pb-lg">
          <div class="q-ml-auto q-mr-auto row">
            <!-- <q-input class="full-width" v-model="input_code" label="Input PIN Code" mask="# # # # # #" fill-mask /> -->
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              v-model="input_code"
              separator=""
              :num-inputs="6"
              :should-auto-focus="true"
              :is-input-num="true"
              @on-complete="handleOnComplete"
            />
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white text-center">
          <span class="text-bold text-black text-h6" style="font-size: 12px"
            >Serahkan Kepada Kasir</span
          >
          <q-card-actions align="center" class="row">
            <div class="col-5 q-mr-auto">
              <q-btn
                class="full-width text-white text-capitalize"
                v-close-popup
                :style="`background-color: #CF2E2E`"
                label="CANCEL"
                rounded
              />
            </div>
            <div class="col-5 q-ml-auto">
              <q-btn
                class="full-width text-white text-capitalize"
                :style="`background-color: #116C54`"
                @click="redeemPartner()"
                label="REDEEM"
                rounded
              />
            </div>
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>

    <!-- Partner Success MODAL -->
    <q-dialog v-model="partnerSuccessModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <!-- <q-icon name="far fa-check-circle" color="secondary" size="sm" /> -->
          </div>
          <div class="col-4 text-h6 text-bold text-center text-secondary">
            Information
          </div>
          <div class="col-4 text-right text-danger">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm text-center">
            <q-icon name="far fa-check-circle" color="secondary" size="xl" />
            <div class="q-my-sm text-secondary" style="font-size: 18px">
              Success Redeem
            </div>
            <div class="q-my-sm text-secondary" style="font-size: 18px">
              Selamat Anda Telah Mendapatkan {{ partnerDetail.info }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
