<template>
  <div class="q-pa-sm font-monserrat">
    <div class="q-pa-sm">
      <div class="q-mb-md">
        <div class="q-my-sm text-h6 text-grey-6">Personal Detail</div>
        <div class="q-my-md">
          <q-markup-table class="full-width" flat>
            <tr>
              <th class="text-center">Profile Picture</th>
              <th class="text-center">Background</th>
            </tr>
            <tr>
              <td>
                <div class="text-center q-mb-sm">
                  <q-img
                    @error="handlingProfileError"
                    :src="
                      data.member.logo
                        ? linkStorageProfile + data.member.logo
                        : Profile
                    "
                    width="75px"
                    height="75px"
                    class="border-radius-10px"
                  >
                    <div class="absolute-full text-subtitle2 flex flex-center">
                      <q-icon
                        class="cursor-pointer"
                        name="file_upload"
                        size="xl"
                        @click="$refs.ProfilePicture.click()"
                      />
                      <input
                        ref="ProfilePicture"
                        type="file"
                        accept="image/*"
                        style="display: none"
                        @change="onFileSelectProfile"
                      />
                    </div>
                  </q-img>
                </div>
                <div
                  style="width: 125px; font-size: 9px; word-wrap: break-word"
                >
                  <small class="text-bold">For Profile Picture:</small><br />
                  <small>Upload the image in format .GIF, .jpg or .png. </small
                  ><br />
                  <small>Dimensions should be at least 300px x 300px.</small
                  ><br />
                  <small>Max. file size 5mb</small><br /><br />
                  <small class="text-bold">For Background Image:</small><br />
                  <small>Upload the image in format .GIF, .jpg or .png.</small
                  ><br />
                  <small> Dimensions should be at least 300px x 300px.</small
                  ><br />
                  <small>Max. file size 5mb</small><br />
                </div>
              </td>
              <td class="text-center">
                <video-background
                  v-if="isBackgroundVideo"
                  :src="
                    data.member.background
                      ? linkStorageBg + data.member.background
                      : VideoExample
                  "
                  style="width: 100%; height: 200px"
                >
                  <div class="absolute-full text-subtitle2 flex flex-center">
                    <q-icon
                      class="cursor-pointer"
                      name="file_upload"
                      size="xl"
                      @click="$refs.Background.click()"
                    />
                    <input
                      ref="Background"
                      type="file"
                      accept="image/*,video/*"
                      style="display: none"
                      @change="onFileSelectBackground"
                    />
                  </div>
                </video-background>
                <q-img
                  v-else-if="!isBackgroundVideo"
                  @error="handlingBackgroundError"
                  :src="
                    data.member.background
                      ? linkStorageBg + data.member.background
                      : Background
                  "
                  width="150px"
                  height="210px"
                  class="border-radius-10px"
                >
                  <div class="absolute-full text-subtitle2 flex flex-center">
                    <q-icon
                      class="cursor-pointer"
                      name="file_upload"
                      size="xl"
                      @click="$refs.Background.click()"
                    />
                    <input
                      ref="Background"
                      type="file"
                      accept="image/*,video/*"
                      style="display: none"
                      @change="onFileSelectBackground"
                    />
                  </div>
                </q-img>
              </td>
            </tr>
          </q-markup-table>
        </div>
        <!-- <div class="q-mt-lg">
          <div class="q-mb-sm text-grey-7">Username*</div>
          <q-input class="full-width" v-model="data.member.username" :error="$v.data.member.username.$error"
            :error-message="validationMsg($v.data.member.username)" placeholder="Username" outlined />
        </div> -->
        <div class="q-mt-lg">
          <div class="q-mb-sm text-grey-7">First Name*</div>
          <q-input
            class="full-width"
            v-model="data.member.member_first_name"
            :error="$v.data.member.member_first_name.$error"
            :error-message="validationMsg($v.data.member.member_first_name)"
            placeholder="Your First Name"
            outlined
          />
        </div>
        <div class="">
          <div class="q-mb-sm text-grey-7">Middle Name (optional)</div>
          <q-input
            class="full-width"
            v-model="data.member.member_middle_name"
            placeholder="Your Middle Name"
            outlined
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Last Name*</div>
          <q-input
            class="full-width"
            v-model="data.member.member_last_name"
            :error="$v.data.member.member_last_name.$error"
            :error-message="validationMsg($v.data.member.member_last_name)"
            placeholder="Your Last Name"
            outlined
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Gender</div>
          <q-select
            class="full-width"
            v-model="data.member.member_gender"
            label="Your Gender"
            :options="genderOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Birth Date</div>
          <q-input filled v-model="data.member.member_dob">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="data.member.member_dob"
                    mask="DD-MM-YYYY"
                    subtitle="Birthday"
                    :title="data.member.member_first_name"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Education</div>
          <q-select
            class="full-width"
            v-model="data.member.member_education"
            label="Education"
            :options="educationOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Title*</span>
          <q-input
            class="full-width"
            v-model="data.member.profil"
            :error="$v.data.member.profil.$error"
            :error-message="validationMsg($v.data.member.profil)"
            placeholder="Job Title in company"
            outlined
          />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Role*</span>
          <q-select
            class="full-width"
            v-model="data.member.role"
            :error="$v.data.member.role.$error"
            :error-message="validationMsg($v.data.member.role)"
            label="Role in company"
            outlined
            :options="roleOptions"
          />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Division*</span>
          <q-select
            class=""
            outlined
            v-model="data.member.divisi_id"
            :error="$v.data.member.divisi_id.$error"
            :error-message="validationMsg($v.data.member.divisi_id)"
            :options="divisionOptions"
            label="Division in company"
            transition-show="jump-up"
            transition-hide="jump-up"
            emit-value
            map-options
          />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Email*</span>
          <q-input
            class="full-width"
            type="email"
            v-model="data.member.member_email"
            :error="$v.data.member.member_email.$error"
            :error-message="validationMsg($v.data.member.member_email)"
            placeholder="i.e name@company.com"
            outlined
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Tech Savvy</div>
          <q-select
            class="full-width"
            v-model="data.member.member_text_savvy"
            label="Text Savvy?"
            :options="textSavyOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Occupation</div>
          <q-select
            class="full-width"
            v-model="data.member.member_occupation"
            label="Your Occupation"
            :options="occupationOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Mobile Phone*</span>
          <div class="col row">
            <q-select
              class="col-3"
              outlined
              v-model="data.member.phone_code"
              :options="phoneCodeList"
              map-options
              emit-value
            />
            <q-input
              class="col-9"
              type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.member.member_phone"
              :error="$v.data.member.member_phone.$error"
              :error-message="validationMsg($v.data.member.member_phone)"
              placeholder="i.e 817027777"
              outlined
            />
          </div>
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Provider</div>
          <q-select
            class="full-width"
            v-model="data.member.member_provider"
            label="Your Provider Phone Number"
            :options="providerOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Type Smartphone</div>
          <q-select
            class="full-width"
            v-model="data.member.member_phone_type"
            label="Your Phone Type"
            :options="typePhoneOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Socioeconomic</div>
          <q-select
            class="full-width"
            v-model="data.member.member_ses"
            label="Your Socioeconomic"
            :options="sesOptions"
            outlined
            map-options
            emit-value
          />
        </div>
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">ID Number</span>
        <q-input
          class="full-width"
          type="number"
          v-model="data.member.identity_number"
          placeholder="Input ID Card Number / Member ID / Employee ID / Student ID / others"
          outlined
        />
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Vaccine Info*</span>
        <q-select
          outlined
          v-model="data.member.vaccine1"
          :error="$v.data.member.vaccine1.$error"
          :error-message="validationMsg($v.data.member.vaccine1)"
          :options="vaccineOptions"
        />
      </div>
      <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Link Room</span>
        <q-input
          class="full-width"
          v-model="data.member.link_room"
          placeholder="i.e https://meet.google.com/"
          outlined
        />
      </div>
      <!-- <div class="q-my-md column">
          <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Address</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer" @click="addressModalAdd = true">+ Add Address</span>
          </div>
          <div class="col q-my-md" v-for="(alamat, idx) in addressList" :key="idx">
            <q-input class="full-width" v-model="addressList[idx].address" placeholder="i.e Jl. Soekarno Hatta No. 1, Malang" style="margin-top:-20px" readonly outlined />
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @click="editAddress(alamat)">Edit</span>
              <span class="q-ml-sm text-secondary text-bold cursor-pointer" @click="deleteAddress(alamat.id)">Delete </span>
            </div>
          </div>
        </div> -->
      <!-- <div class="q-my-md column">
        <span class="col q-mb-sm text-grey-7">Password</span>
        <q-input :type="data.isPwd ? 'password' : 'text'" v-model="data.member.password" placeholder="******" outlined>
          <template v-slot:append>
            <q-icon :name="data.isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="data.isPwd = !data.isPwd" />
          </template>
        </q-input>
      </div> -->
      <q-separator />
      <div class="flex-center">
        <q-btn
          class="full-width bg-secondary text-white text-capitalize"
          label="Publish"
          size="lg"
          @click="saveData()"
          rounded
        />
      </div>
    </div>

    <!-- PROFILE PICTURE MODAL CROPPER -->
    <q-dialog v-model="profileImageModal" style="width: 700px" persistent>
      <q-card style="border-top: 15px solid #116c54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6"
            >Crop Profile Image</q-toolbar-title
          >
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="formatCropper('profile_image')"
            v-close-popup
          />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper
              v-show="profileImageCropper.selectedFile"
              ref="cropper"
              :src="profileImageCropper.selectedFile"
              :aspect-ratio="1 / 1"
              alt="Source Image"
            ></VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn
            label="Crop & Save"
            class="bg-primary text-white"
            @click="saveProfileImage()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- BACKGROUND MODAL CROPPER -->
    <q-dialog v-model="backgroundModal" style="width: 700px" persistent>
      <q-card style="border-top: 15px solid #116c54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6"
            >Crop Background</q-toolbar-title
          >
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="formatCropper('background')"
            v-close-popup
          />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper
              v-show="backgroundCropper.selectedFile"
              ref="cropper"
              :src="backgroundCropper.selectedFile"
              :aspect-ratio="9 / 16"
              alt="Source Image"
            ></VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn
            label="Crop & Save"
            class="bg-primary text-white"
            @click="saveBackground()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="backgroundModalNonCropper"
      style="width: 700px"
      persistent
    >
      <q-card style="border-top: 15px solid #116c54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6"
            >Upload Background</q-toolbar-title
          >
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="formatNonCropper()"
            v-close-popup
          />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <div v-if="backgroundNonCropper.videoExtension">
              <video width="300" controls>
                <source :src="backgroundNonCropper.showFile" />
              </video>
            </div>
            <div v-else>
              <q-img :src="backgroundNonCropper.showFile" />
            </div>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn
            label="Save Background"
            class="bg-primary text-white"
            @click="saveBackgroundNonCropper()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import LinkAja from 'src/assets/image/LinkAja.png'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import axios from 'axios'
import { Loading } from 'quasar'
import VideoBackground from 'vue-responsive-video-background-player'
import VideoExample from 'src/assets/video-example.mp4'

import Profile from 'src/assets/image/TAGID-profile.jpg'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'

const localStorage = JSON.parse(window.localStorage.getItem('userd'))
const token = localStorage ? localStorage.api_token : null
const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

export default {
  components: { VueCropper, VideoBackground },
  data () {
    return {
      LinkAja,
      Profile,
      CompanyLogo,
      Background,
      VideoExample,
      email_old: '',
      isBackgroundVideo: false,
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageCompLogo: 'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      dropzoneOptions: {
        url: 'https://api.the-netwerk.com/api/mjVmBSJ31Hx2Ag9GCOUS/member/uploadpdf',
        thumbnailWidth: 150,
        maxFilesize: 3,
        maxFiles: 1,
        autoQueue: false,
        headers: { Authorization: `Bearer ${token}` },
        addRemoveLinks: true
      },
      data: {
        password: '',
        isPwd: true,
        member: {
          username: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          title: '',
          role: 'Anggota',
          divisi: '',
          email: '',
          phone_code: '',
          phone: '',
          identity_number: '',
          main_color: '#FF00FF',
          secondary_color: '#FF00FF',
          vaccine1: 'Prefer not to say'
        }
      },
      vaccineOptions: [
        'Fully vaccinated',
        'Vaccine booster',
        'Waiting on additional dose',
        'Planning to get vaccinated',
        'Not getting vaccinated',
        'Prefer not to say'
      ],
      divisionOptions: [],
      roleOptions: ['Admin', 'Anggota', 'Team'],
      genderOptions: [
        {
          label: 'Man',
          value: 'man'
        },
        {
          label: 'Woman',
          value: 'woman'
        }
      ],
      educationOptions: [
        {
          label: 'SD',
          value: 'sd'
        },
        {
          label: 'SMP',
          value: 'smp'
        },
        {
          label: 'SMA/SMK',
          value: 'sma/smk'
        },
        {
          label: 'Diploma',
          value: 'diploma'
        },
        {
          label: 'Sarjana',
          value: 'sarjana'
        },
        {
          label: 'Pasca Sarjana',
          value: 'pasca'
        }
      ],
      textSavyOptions: [
        {
          label: 'Yes',
          value: 1
        },
        {
          label: 'No',
          value: 0
        }
      ],
      providerOptions: [
        {
          label: 'Telkomsel',
          value: 'telkomsel'
        },
        {
          label: 'Indosat',
          value: 'indosat'
        },
        {
          label: 'XL',
          value: 'xl'
        },
        {
          label: 'By.U',
          value: 'byu'
        },
        {
          label: 'Smartfren',
          value: 'smartfren'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ],
      typePhoneOptions: [
        {
          label: 'Samsung',
          value: 'samsung'
        },
        {
          label: 'Iphone',
          value: 'iphone'
        },
        {
          label: 'Xiaomi',
          value: 'xiaomi'
        },
        {
          label: 'Oppo',
          value: 'oppo'
        },
        {
          label: 'Vivo',
          value: 'vivo'
        },
        {
          label: 'Huawei',
          value: 'huawei'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ],
      sesOptions: [
        {
          label: 'Mikro',
          value: 'mikro'
        },
        {
          label: 'Kecil',
          value: 'kecil'
        },
        {
          label: 'Menengah',
          value: 'menengah'
        },
        {
          label: 'Besar',
          value: 'besar'
        }
      ],
      occupationOptions: [
        'Chef',
        'Cashier',
        'Barber',
        'Baker',
        'Dentist',
        'Driver',
        'Teacher',
        'Tailor',
        'Mechanic',
        'Engineer',
        'Salesman',
        'Porter',
        'Doctor',
        'Employee',
        'Businessman',
        'Others'
      ],
      phone_form_add: {
        phone_code: '62',
        phone: null
      },
      phone_form_edit: {},
      phoneList: [],
      phoneCodeList: [],
      profileImageModal: false,
      backgroundModal: false,
      backgroundModalNonCropper: false,
      profileImageCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      backgroundCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      companyLogoCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      backgroundNonCropper: {
        videoExtension: false,
        selectedFile: ''
      }
    }
  },
  validations: {
    data: {
      member: {
        username: { required },
        member_first_name: { required },
        member_last_name: { required },
        profil: { required },
        role: { required },
        divisi_id: { required },
        member_email: { required, email },
        member_phone: { required },
        vaccine1: { required }
      }
    }
  },
  mounted () {
    this.getData()
    this.getPhoneCodeCountries()
    this.getDivisi()
    // this.checkExtensionBackground(this.$store.state.userdata.user.background)
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    checkExtensionBackground (filename) {
      const imageExtensionLists = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'raw']
      const videoExtensionLists = [
        'webm',
        'mkv',
        'mp4',
        'avi',
        'mov',
        'mpg',
        'mpeg',
        '3gp'
      ]
      const fileExtension = filename.split('.').pop()
      if (imageExtensionLists.includes(fileExtension)) {
        this.isBackgroundVideo = false
      } else if (videoExtensionLists.includes(fileExtension)) {
        this.isBackgroundVideo = true
      }
    },
    getPhoneCodeCountries () {
      axios
        .get('https://api.the-netwerk.com/api/all/csc/countries')
        .then((response) => {
          this.phoneCodeList = response.data.data.map((data) => {
            return {
              label: `${data.name} (+${data.phonecode})`,
              value: data.phonecode
            }
          })
        })
    },
    /* BEGIN:: HANDLING IMAGE ERROR */
    handlingBackgroundError (event) {
      event.target.src = this.Background
    },
    handlingProfileError (event) {
      event.target.src = this.Profile
    },
    handlingCompanyLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    /* END:: HANDLING IMAGE ERROR */
    /* BEGIN:: HANDLING Divisi */
    getDivisi () {
      axios.get('/member/corporate/divisi').then((response) => {
        if (response.data.success) {
          this.divisionOptions = response.data.data.map((data) => {
            return {
              label: data.divisi_name,
              value: data.id
            }
          })
        }
      })
    },
    /* END:: HANDLING Divisi */
    /* BEGIN:: HANDLING DATA */
    getData () {
      Loading.show()
      const username = this.$route.params.username
      this.$axios
        .get(`/member/${username}`)
        .then((response) => {
          if (response.data.status) {
            this.data.member = response.data.member
            this.data.password = response.data.member.password
            if (response.data.member.background) {
              this.checkExtensionBackground(response.data.member.background)
            }
            setTimeout(() => {
              Loading.hide()
            }, 500)
          }
        })
        .catch((error) => {
          setTimeout(() => {
            Loading.hide()
          }, 500)
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    saveData () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
          }
        }
        const data = {
          username: this.data.member.username,
          first_name: this.data.member.member_first_name,
          middle_name: this.data.member.member_middle_name,
          last_name: this.data.member.member_last_name,
          email: this.data.member.member_email,
          phone: this.data.member.member_phone,
          phone_code: this.data.member.phone_code,
          profil: this.data.member.profil,
          role: this.data.member.role,
          divisi_id: this.data.member.divisi_id,
          link_room: this.data.member.link_room,
          identity_number: this.data.member.identity_number,
          vaccinated: this.data.member.vaccine1,
          gender: this.data.member.member_gender
            ? this.data.member.member_gender.toLowerCase().trim()
            : null,
          date_of_birthday: this.data.member.member_dob,
          education: this.data.member.member_education,
          text_savvy: this.data.member.member_text_savvy,
          ses: this.data.member.member_ses,
          provider: this.data.member.member_provider,
          phone_type: this.data.member.member_phone_type,
          occupation: this.data.member.member_occupation
        }
        if (this.data.member.password !== this.data.password) {
          data.password = this.data.member.password
        }
        this.$axios
          .put(`/member/corporate/user/${this.data.member.id}`, data, config)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              setTimeout(
                () =>
                  this.$router.push({
                    path: '/dashboard/manage-corporate/users/'
                  }),
                1000
              )
            }
          })
          .catch((error) => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
      }
    },
    /* END:: HANDLING DATA */
    saveProfileImage () {
      this.profileImageCropper.cropedImage = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('photo_profile', blob, 'logo.jpeg')
        this.$axios
          .post(
            `/member/corporate/user/photo_profil/${this.data.member.id}`,
            formData
          )
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.profileImageModal = false
              this.getData()
            }
          })
          .catch((error) => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
      }, this.profileImageCropper.mime_type)
    },
    saveBackground () {
      this.backgroundCropper.cropedImage = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('background', blob, 'background.jpeg')
        this.$axios
          .post(
            `/member/corporate/user/background/${this.data.member.id}`,
            formData
          )
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.backgroundModal = false
              this.getData()
            }
          })
          .catch((error) => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
      }, this.backgroundCropper.mime_type)
    },
    saveBackgroundNonCropper () {
      const formData = new FormData()
      const config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      formData.append('gambar', this.backgroundNonCropper.selectedFile)
      this.$axios
        .post('/member/edit/background', formData, config)
        .then((response) => {
          if (response.data.status) {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.backgroundModalNonCropper = false
            window.setTimeout(function () {
              location.reload()
            }, 1500)
          }
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    onFileSelectProfile (e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png'
        ) {
          this.profileImageModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.profileImageCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.profileImageCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    onFileSelectBackground (e) {
      const cropFileExtension = ['jpeg', 'jpg', 'png', 'tiff', 'raw']
      const videoExtensionLists = [
        'webm',
        'mkv',
        'mp4',
        'avi',
        'mov',
        'mpg',
        'mpeg',
        '3gp'
      ]
      const file = e.target.files[0]
      const fileExtension = file.name.split('.').pop()
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (cropFileExtension.includes(fileExtension)) {
          this.backgroundModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.backgroundCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.backgroundCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        } else {
          this.backgroundModalNonCropper = true
          if (videoExtensionLists.includes(fileExtension)) {
            const reader = new FileReader()
            reader.onload = (event) => {
              this.backgroundNonCropper = {
                videoExtension: true,
                showFile: event.target.result,
                selectedFile: this.$refs.Background.files[0]
              }
            }
            reader.readAsDataURL(file)
          } else {
            const reader = new FileReader()
            reader.onload = (event) => {
              this.backgroundNonCropper = {
                videoExtension: false,
                showFile: event.target.result,
                selectedFile: this.$refs.Background.files[0]
              }
            }
            reader.readAsDataURL(file)
          }
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    formatCropper (imageType) {
      if (imageType === 'profile_image') {
        this.profileImageCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      } else if (imageType === 'background') {
        this.backgroundCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      } else if (imageType === 'company_logo') {
        this.companyLogoCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      }
    },
    formatNonCropper () {
      this.backgroundNonCropper = {
        videoExtension: false,
        selectedFile: ''
      }
    }
  }
}
</script>
<style lang='scss'>
.notes-upload {
  position: absolute;
  width: 150px;
  height: 123px;
  left: 31px;
  top: 280px;
  font-style: italic;
  font-weight: bold;
  font-size: 8px;
  line-height: 11px;
}

::placeholder {
  font-size: 12px;
}

.q-field__label {
  font-size: 12px;
}
</style>
