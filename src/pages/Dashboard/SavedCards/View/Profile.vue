<template>
  <div>
    <q-card
      class="border-radius-10px"
      :style="`background: ${
        data.member.main_color ? data.member.main_color : '#116C54'
      }`"
    >
      <div class="q-pa-lg q-my-md">
        <div class="column">
          <div class="col text-white text-h5 font-monserrat">
            {{
              data.member.member_first_name ? data.member.member_first_name : ""
            }}
            {{
              data.member.member_middle_name
                ? data.member.member_middle_name
                : ""
            }}
            {{
              data.member.member_last_name ? data.member.member_last_name : ""
            }}
          </div>
          <div class="col text-white text-h6 font-proxima-nova-alt">
            {{ data.member.profil ? data.member.profil : "-" }}
          </div>
          <div class="col q-mt-md text-white font-proxima-nova-alt">Phone:</div>
          <div class="col text-white text-bold font-monserrat">
            {{
              data.member.member_phone
                ? data.member.phone_code
                  ? "+" + data.member.phone_code + data.member.member_phone
                  : data.member.member_phone
                : ""
            }}
          </div>
          <div class="col q-mt-md text-white font-proxima-nova-alt">Email:</div>
          <div class="col text-white text-bold font-monserrat">
            {{ data.member.member_email ? data.member.member_email : "-" }}
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      class="bg-white border-radius-10px"
      v-if="
        facebookList.length +
          twitterList.length +
          linkedInList.length +
          instagramList.length >
        0
      "
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            data.member.secondary_color
              ? data.member.secondary_color
              : '#116C54'
          }`"
        >
          Social Links
        </div>
        <div class="row flex">
          <div v-if="facebookList.length > 0" class="col-3">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-facebook-f"
                color="primary"
                @click="showFacebookModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Facebook
                {{
                  facebookList.length > 1 ? "(" + facebookList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="twitterList.length > 0" class="col-3">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-twitter"
                color="info"
                @click="showTwitterModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Twitter
                {{
                  twitterList.length > 1 ? "(" + twitterList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="linkedInList.length > 0" class="col-3">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-linkedin-in"
                color="primary"
                @click="showLinkedInModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >LinkedIn
                {{
                  linkedInList.length > 1 ? "(" + linkedInList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="instagramList.length > 0" class="col-3">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-instagram"
                color="accent"
                @click="showInstagramModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Instagram
                {{
                  instagramList.length > 1
                    ? "(" + instagramList.length + ")"
                    : ""
                }}</small
              >
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <div v-if="listVideo" class="youtube-list scrolling-wrapper">
      <div class="youtube-video" v-for="(video, idx) in listVideo" :key="idx">
        <q-video :src="video.socmed_link" />
      </div>
    </div>
    <q-card
      class="bg-white border-radius-10px"
      v-if="this.data.member.corporate_id"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            data.member.secondary_color
              ? data.member.secondary_color
              : '#116C54'
          }`"
        >
          {{
            data.member.corporate.corporate_name
              ? data.member.corporate.corporate_name
              : "Company Name"
          }}
        </div>
        <div class="font-proxima-nova-alt">
          <p>
            {{
              data.member.corporate.corporate_description
                ? data.member.corporate.corporate_description
                : ""
            }}
          </p>
        </div>
        <div class="q-mt-md row text-center">
          <div
            v-if="
              `${linkStoragePdf + data.member.pdf_file}` !=
              `${linkStoragePdf + null}`
            "
            class="col-6"
          >
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="View PDF"
              @click="showPdfView()"
              :style="`background: ${
                data.member.main_color ? data.member.main_color : '#116C54'
              }`"
            />
          </div>
          <div
            v-if="data.member.corporate.corporate_website != null"
            class="col-6"
          >
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="Visit Web"
              @click="visitWeb(data.member.corporate.corporate_website)"
              :style="`background: ${
                data.member.secondary_color
                  ? data.member.secondary_color
                  : '#116C54'
              }`"
            />
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      class="bg-white border-radius-10px"
      v-else-if="
        !this.data.member.corporate_id || this.data.member.company_name
      "
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            data.member.secondary_color
              ? data.member.secondary_color
              : '#116C54'
          }`"
        >
          {{
            data.member.company_name ? data.member.company_name : "Company Name"
          }}
        </div>
        <div class="font-proxima-nova-alt">
          <p>
            {{
              data.member.company_description
                ? data.member.company_description
                : "Company Description"
            }}
          </p>
        </div>
        <div class="q-mt-md row text-center">
          <div
            v-if="
              `${linkStoragePdf + data.member.pdf_file}` !=
              `${linkStoragePdf + null}`
            "
            class="col-6"
          >
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="View PDF"
              @click="showPdfView()"
              :style="`background: ${
                data.member.main_color ? data.member.main_color : '#116C54'
              }`"
            />
          </div>
          <div v-if="data.member.company_contact_website != null" class="col-6">
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="Visit Web"
              @click="
                visitWeb($store.state.userdata.corporate.corporate_website)
              "
              :style="`background: ${
                data.member.secondary_color
                  ? data.member.secondary_color
                  : '#116C54'
              }`"
            />
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      v-if="listContactPhone.length > 0"
      class="bg-white border-radius-10px"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            data.member.secondary_color
              ? data.member.secondary_color
              : '#116C54'
          }`"
        >
          Contact
        </div>
        <div
          v-for="contact in listContactPhone"
          :key="contact.id"
          class="q-ml-sm q-mb-sm row"
        >
          <div class="col-1">
            <q-icon
              name="phone"
              :style="`color: ${
                data.member.main_color ? data.member.main_color : '#116C54'
              }`"
            />
          </div>
          <div class="col-11">
            <span class="font-proxima-nova-alt">{{
              contact.phone_number
            }}</span>
          </div>
        </div>
      </div>
    </q-card>
    <!-- <q-card v-if="$store.state.userdata.corporate.corporate_address" class="bg-white border-radius-10px">
      <div class="q-pa-lg q-my-md">
        <div class="text-h6 text-bold font-monserrat" :style="`color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">Address</div>
        <div class="q-mt-sm">
          <div v-for="address in $store.state.userdata.corporate.corporate_address" :key="$store.state.userdata.corporate.corporate_address.id" class="row q-mb-lg">
            <div class="col-1">
              <q-icon class="q-mr-sm" name="business" size="sm" :style="`color: ${data.member.main_color ? data.member.main_color : '#116C54'}`" />
            </div>
            <div class="col-9 column font-proxima-nova-alt">
              <span class="col" style="font-size:12px">{{ address.corporate_address ? address.corporate_address : 'Alamat tidak terdefinisi' }}</span>
              <q-btn class="text-white q-py-xs text-capitalize" label="View Map" @click="linkToMaps(address.corporate_address)" style="width: 80px; font-size:10px" :style="`background: ${data.member.main_color ? data.member.main_color : '#116C54'}`" />
            </div>
          </div>
        </div>
      </div>
    </q-card> -->
    <q-card v-if="listAddress.length > 0" class="bg-white border-radius-10px">
      <div class="q-pa-lg q-my-md">
        <div
          class="text-h6 text-bold font-monserrat"
          :style="`color: ${
            data.member.secondary_color
              ? data.member.secondary_color
              : '#116C54'
          }`"
        >
          Address
        </div>
        <div class="q-mt-sm">
          <div
            v-for="address in listAddress"
            :key="address.id"
            class="row q-mb-lg"
          >
            <div class="col-1">
              <q-icon
                v-if="address.address_type === 'Home'"
                class="q-mr-sm"
                name="home"
                size="sm"
                :style="`color: ${
                  data.member.main_color ? data.member.main_color : '#116C54'
                }`"
              />
              <q-icon
                v-else-if="address.address_type === 'Apartment'"
                class="q-mr-sm"
                name="apartment"
                size="sm"
                :style="`color: ${
                  data.member.main_color ? data.member.main_color : '#116C54'
                }`"
              />
              <q-icon
                v-else
                class="q-mr-sm"
                name="business"
                size="sm"
                :style="`color: ${
                  data.member.main_color ? data.member.main_color : '#116C54'
                }`"
              />
            </div>
            <div class="col-11 column font-proxima-nova-alt">
              <span class="col" style="font-size: 14px">{{
                address.address ? address.address : "Alamat tidak terdefinisi"
              }}</span>
              <q-btn
                class="col text-white q-py-xs text-capitalize"
                label="View Map"
                @click="linkToMaps(address.address)"
                style="width: 87px; font-size: 10px"
                :style="`background: ${
                  data.member.main_color ? data.member.main_color : '#116C54'
                }`"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- FACEBOOK MODAL -->
    <q-dialog v-model="facebookModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-facebook-f" color="primary" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Facebook</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(fb, idx) in facebookList" :key="idx">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ fb.socmed_title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link
              </div>
              <div class="q-my-sm">
                <span class="q-mr-md text-bold" style="font-size: 18px">{{
                  fb.socmed_link
                }}</span>
                <q-icon
                  name="fas fa-link"
                  color="primary"
                  size="xs"
                  @click="doCopyLink(fb.socmed_link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                class="full-width bg-primary text-white text-capitalize"
                label="Visit Profile"
                @click="visitProfileFB(fb.socmed_link)"
                rounded
              />
            </div>
            <div v-if="idx !== facebookList.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- TWITTER MODAL -->
    <q-dialog v-model="twitterModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-twitter" color="info" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Twitter</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(twt, idx) in twitterList" :key="idx">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ twt.socmed_title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link
              </div>
              <div class="q-my-sm">
                <span class="q-mr-md text-bold" style="font-size: 18px">{{
                  twt.socmed_link
                }}</span>
                <q-icon
                  name="fas fa-link"
                  color="info"
                  size="xs"
                  @click="doCopyLink(twt.socmed_link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                class="full-width bg-info text-white text-capitalize"
                label="Visit Profile"
                @click="visitProfileTwitter(twt.socmed_link)"
                rounded
              />
            </div>
            <div v-if="idx !== twitterList.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- LINKED IN MODAL -->
    <q-dialog v-model="linkedInModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-linkedin-in" color="primary" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Linked In</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(li, idx) in linkedInList" :key="idx">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ li.socmed_title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link
              </div>
              <div class="q-my-sm">
                <span class="q-mr-md text-bold" style="font-size: 18px">{{
                  li.socmed_link
                }}</span>
                <q-icon
                  name="fas fa-link"
                  color="primary"
                  size="xs"
                  @click="doCopyLink(li.socmed_link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                class="full-width bg-primary text-white text-capitalize"
                label="Visit Profile"
                @click="visitProfileSocmed(li.socmed_link)"
                rounded
              />
            </div>
            <div v-if="idx !== linkedInList.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- INSTAGRAM MODAL -->
    <q-dialog v-model="instagramModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-instagram" color="accent" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Instagram</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(ig, idx) in instagramList" :key="idx">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ ig.socmed_title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link
              </div>
              <div class="q-my-sm">
                <span
                  v-if="
                    $store.state.style.isMobile && ig.socmed_link.length > 30
                  "
                  class="q-mr-md text-bold"
                  style="font-size: 18px"
                  >{{ ig.socmed_link.substring(0, 30) + "..." }}</span
                >
                <span
                  v-else
                  class="q-mr-md text-bold"
                  style="font-size: 18px"
                  >{{ ig.socmed_link }}</span
                >
                <q-icon
                  name="fas fa-link"
                  color="accent"
                  size="xs"
                  @click="doCopyLink(ig.socmed_link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                class="full-width bg-accent text-white text-capitalize"
                label="Visit Profile"
                @click="visitProfileIG(ig.socmed_link)"
                rounded
              />
            </div>
            <div v-if="idx !== instagramList.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { Notify } from 'quasar'

// const localStorage = JSON.parse(window.localStorage.getItem('user'))
// const userId = localStorage.user_id

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  mounted () {
    this.getData()
  },
  data () {
    return {
      pdfDialog: false,
      facebookModal: false,
      twitterModal: false,
      linkedInModal: false,
      instagramModal: false,
      socialLink: false,
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      listContactPhone: [],
      listAddress: [],
      listVideo: [],
      listCorporateVideo: [],
      facebookList: [],
      twitterList: [],
      linkedInList: [],
      instagramList: [],
      data: {
        member: {}
      }
    }
  },
  methods: {
    embedYoutube (link) {
      if (link) {
        const linkEmbeded = link.split('/').pop()
        return `https://youtube.com/embed/${linkEmbeded}`
      }
      return 'https://youtube.com/embed/'
    },
    getData () {
      this.$axios
        .get('/member/' + this.$route.params.username)
        .then((response) => {
          this.data.member = response.data.member
          this.getAddress()
          this.getVideo()
          this.getFacebook()
          this.getTwitter()
          this.getLinkedIn()
          this.getInstagram()
          this.getVideoCorporate()
        })
    },
    doCopyLink (link) {
      this.$copyText(link).then(
        function (e) {
          Notify.create({
            message: 'Copied',
            position: 'bottom',
            type: 'positive'
          })
        },
        function (e) {
          Notify.create({
            message: 'Can not copy',
            position: 'bottom',
            type: 'negative'
          })
        }
      )
    },
    visitProfileSocmed (link) {
      window.open(link)
    },
    visitProfileTwitter (link) {
      window.open(link)
    },
    visitProfileFB (link) {
      window.open(link)
    },
    visitProfileIG (link) {
      window.open(link)
    },
    showPdfView () {
      this.$emit('view-pdf')
    },
    showFacebookModal () {
      this.$emit('close')
      this.facebookModal = true
    },
    showTwitterModal () {
      this.$emit('close')
      this.twitterModal = true
    },
    showLinkedInModal () {
      this.$emit('close')
      this.linkedInModal = true
    },
    showInstagramModal () {
      this.$emit('close')
      this.instagramModal = true
    },
    getAddress () {
      this.$axios
        .get('/member/address/user/' + this.data.member.user_id)
        .then((response) => {
          if (response.data.data.length > 0) {
            this.listAddress = response.data.data
          }
        })
    },
    getPhone () {
      this.$axios.get('/member/phone/show').then((response) => {
        this.listContactPhone = response.data.data
      })
    },
    getVideo () {
      const params = {
        socmed_name: 'youtube'
      }
      this.$axios
        .get('/member/socialmedia/' + this.data.member.user_id, {
          params: params
        })
        .then((response) => {
          const listCorporateVideo = response.data.data.map((data) => {
            return {
              order: data.order,
              socmed_name: 'youtube',
              socmed_link: this.embedYoutube(data.socmed_link),
              status: 'active'
            }
          })
          this.listVideo = this.listVideo.concat(listCorporateVideo)
        })
    },
    getVideoCorporate () {
      if (this.data.member.corporate_id) {
        this.$axios
          .get('/member/corporate/video/' + this.data.member.corporate_id)
          .then((response) => {
            const listCorporateVideo = response.data.data.map((data) => {
              return {
                order: '1',
                socmed_name: 'youtube',
                socmed_link: this.embedYoutube(data.video),
                status: 'active'
              }
            })
            this.listVideo = this.listVideo.concat(listCorporateVideo)
          })
      }
    },
    getFacebook () {
      const paramsFb = {
        socmed_name: 'facebook'
      }
      this.$axios
        .get('/member/socialmedia/' + this.data.member.user_id, {
          params: paramsFb
        })
        .then((response) => {
          this.facebookList = response.data.data
        })
    },
    getTwitter () {
      const paramsTwt = {
        socmed_name: 'twitter'
      }
      this.$axios
        .get('/member/socialmedia/' + this.data.member.user_id, {
          params: paramsTwt
        })
        .then((response) => {
          this.twitterList = response.data.data
        })
    },
    getLinkedIn () {
      const paramsLi = {
        socmed_name: 'linkedin'
      }
      this.$axios
        .get('/member/socialmedia/' + this.data.member.user_id, {
          params: paramsLi
        })
        .then((response) => {
          this.linkedInList = response.data.data
        })
    },
    getInstagram () {
      const paramsIg = {
        socmed_name: 'instagram'
      }
      this.$axios
        .get('/member/socialmedia/' + this.data.member.user_id, {
          params: paramsIg
        })
        .then((response) => {
          this.instagramList = response.data.data
        })
    },
    visitWeb (link) {
      window.open(link)
    },
    linkToMaps (address) {
      window.open('https://maps.google.com/?q=' + address)
    }
  }
}
</script>
<style lang="scss">
.button-sosmed {
  width: 56px !important;
  padding: 10px;
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  .youtube-video {
    display: inline-block;
    margin-right: 10px;
  }

  .youtube-video:last-of-type {
    margin-right: none;
  }
}
</style>
