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
                    :src="Profile"
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
                <!-- <video-background
                    v-if="isBackgroundVideo"
                    :src="VideoExample"
                    style="width: 100%; height: 200px;"
                  >
                     <div class="absolute-full text-subtitle2 flex flex-center">
                        <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="$refs.Background.click()" />
                        <input ref="Background" type="file" accept="image/*,video/*" style="display: none;" @change="onFileSelectBackground" />
                      </div>
                  </video-background> -->
                <q-img
                  @error="handlingBackgroundError"
                  :src="Background"
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
        <div class="q-mt-lg">
          <div class="q-mb-sm text-grey-7">Username*</div>
          <q-input
            class="full-width"
            v-model="data.member.username"
            :error="$v.data.member.username.$error"
            :error-message="validationMsg($v.data.member.username)"
            @input="check('username', data.member.username)"
            placeholder="Username"
            outlined
          />
          <!-- <p>Username Already Exist</p> -->
        </div>
        <div class="">
          <div class="q-mb-sm text-grey-7">First Name*</div>
          <q-input
            class="full-width"
            v-model="data.member.first_name"
            :error="$v.data.member.first_name.$error"
            :error-message="validationMsg($v.data.member.first_name)"
            placeholder="Your First Name"
            outlined
          />
        </div>
        <div class="">
          <div class="q-mb-sm text-grey-7">Middle Name (optional)</div>
          <q-input
            class="full-width"
            v-model="data.member.middle_name"
            placeholder="Your Middle Name"
            outlined
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Last Name*</div>
          <q-input
            class="full-width"
            v-model="data.member.last_name"
            :error="$v.data.member.last_name.$error"
            :error-message="validationMsg($v.data.member.last_name)"
            placeholder="Your Last Name"
            outlined
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Gender</div>
          <q-select
            class="full-width"
            v-model="data.member.gender"
            label="Your Gender"
            :options="genderOptions"
            outlined
            map-options
            emit-value
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Birth Date</div>
          <q-input filled v-model="data.member.dob">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="data.member.dob"
                    mask="DD-MM-YYYY"
                    subtitle="Birthday"
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
            v-model="data.member.education"
            label="Your Education"
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
            v-model="data.member.title"
            :error="$v.data.member.title.$error"
            :error-message="validationMsg($v.data.member.title)"
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
            v-model="data.member.divisi"
            :error="$v.data.member.divisi.$error"
            :error-message="validationMsg($v.data.member.divisi)"
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
            v-model="data.member.email"
            :error="$v.data.member.email.$error"
            :error-message="validationMsg($v.data.member.email)"
            @change="check('email', data.member.email)"
            placeholder="i.e name@company.com"
            outlined
          />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Tech Savvy</div>
          <q-select
            class="full-width"
            v-model="data.member.text_savvy"
            placeholder="Text Savvy?"
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
            v-model="data.member.occupation"
            placeholder="Your Occupation"
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
              v-model="data.member.phone"
              :error="$v.data.member.phone.$error"
              @change="check('phone', data.member.phone)"
              :error-message="validationMsg($v.data.member.phone)"
              placeholder="i.e 817027777"
              outlined
            />
          </div>
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Provider</div>
          <q-select
            class="full-width"
            v-model="data.member.provider"
            placeholder="Your Provider Phone Number"
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
            v-model="data.member.phone_type"
            placeholder="Your Phone Type"
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
            v-model="data.member.ses"
            placeholder="Your Socioeconomic"
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
      <div class="q-my-md" v-if="$store.state.userdata.user.corporate_id != 48">
        <div class="q-mb-sm text-grey-7">Choose Package</div>
        <q-select
          class="full-width"
          v-model="data.member.package_month"
          placeholder="Choose Package"
          :options="valueOptions"
          outlined
          map-options
          emit-value
        />
      </div>
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
import { required, email, helpers } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import axios from 'axios'
import VideoExample from 'src/assets/video-example.mp4'

import Profile from 'src/assets/image/TAGID-profile.jpg'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'

const localStorage = JSON.parse(window.localStorage.getItem('userd'))
const token = localStorage ? localStorage.api_token : null
const alpha = helpers.regex('alpha', /^[\w-]+$/)
const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format',
  validateData: () => 'Already exist',
  alpha: () => 'Form input must be alphabet, number or dash (-)'
}
function validateData () {
  if (this.statusData === true) {
    return true
  } else {
    return false
  }
}

export default {
  components: { VueCropper },
  data () {
    return {
      LinkAja,
      Profile,
      CompanyLogo,
      Background,
      VideoExample,
      email_old: '',
      isBackgroundVideo: false,
      phoneModalEdit: false,
      phoneModalAdd: false,
      addressModalEdit: false,
      addressModalAdd: false,
      officeModalEdit: false,
      officeModalAdd: false,
      videoModalEdit: false,
      videoModalAdd: false,
      socmedModalAdd: false,
      socmedModalEdit: false,
      statusData: false,
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
          username: null,
          first_name: null,
          middle_name: null,
          last_name: null,
          title: null,
          role: 'Anggota',
          divisi: null,
          email: null,
          phone_code: '62',
          phone: null,
          identity_number: null,
          main_color: '#FF00FF',
          secondary_color: '#FF00FF',
          vaccine1: 'Prefer not to say',
          gender: null,
          education: null,
          text_savvy: null,
          provider: null,
          phone_type: null,
          ses: null,
          occupation: null,
          dob: null,
          logo: null,
          background: null,
          package_month: 1
        }
      },
      valueOptions: [
        {
          label: '1 Month',
          value: 1
        },
        {
          label: '3 Month',
          value: 3
        },
        {
          label: '6 Month',
          value: 6
        },
        {
          label: '12 Month',
          value: 12
        }
      ],
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
        username: {
          required,
          validateData,
          alpha
        },
        first_name: { required },
        last_name: { required },
        title: { required },
        role: { required },
        divisi: { required },
        email: {
          required,
          email,
          validateData
        },
        phone: {
          required,
          validateData
        },
        vaccine1: { required }
      }
    }
  },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Add User')
    // this.getData()
    this.getPhoneCodeCountries()
    this.getDivisi()
    // this.checkExtensionBackground(this.$store.state.userdata.user.background)
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    showPdfView (pdfName) {
      window.open(this.linkStoragePdf + pdfName)
    },
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
      this.$axios
        .get('/member/corporate/divisi')
        .then((response) => {
          if (response.data.success) {
            this.divisionOptions = response.data.data.map((data) => {
              return {
                label: data.divisi_name,
                value: data.id
              }
            })
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
    /* END:: HANDLING Divisi */
    /* BEGIN:: HANDLING DATA */
    getData () {
      this.$axios
        .get('/member')
        .then((response) => {
          if (response.data.status) {
            this.data.member = response.data.member
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
    check (a, b) {
      const type = a
      const input = b
      if (type === 'username') {
        const data = {
          input,
          type
        }
        this.$axios.post('/member/check', data).then((response) => {
          this.statusData = response.data.status
          this.$v.data.member.username.$touch()
        })
      } else if (type === 'email') {
        const data = {
          input,
          type
        }
        this.$axios.post('/member/check', data).then((response) => {
          this.statusData = response.data.status
          this.$v.data.member.email.$touch()
        })
      } else if (type === 'phone') {
        const data = {
          input,
          type
        }
        this.$axios.post('/member/check', data).then((response) => {
          this.statusData = response.data.status
          this.$v.data.member.phone.$touch()
        })
      }
    },
    saveData () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check form input',
          position: 'top',
          type: 'negative'
        })
      } else {
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
          }
        }
        const data = {
          username: this.data.member.username,
          first_name: this.data.member.first_name,
          middle_name: this.data.member.middle_name,
          last_name: this.data.member.last_name,
          email: this.data.member.email,
          phone: this.data.member.phone,
          phone_code: this.data.member.phone_code,
          title: this.data.member.title,
          role: this.data.member.role,
          divisi: this.data.member.divisi,
          link_room: this.data.member.link_room,
          identity_number: this.data.member.identity_number,
          vaccinated: this.data.member.vaccine1,
          password: this.data.password,
          provider: this.data.member.provider,
          phone_type: this.data.member.phone_type,
          occupation: this.data.member.occupation,
          education: this.data.member.education,
          text_savvy: this.data.member.text_savvy,
          ses: this.data.member.ses,
          date_of_birthday: this.data.member.dob,
          gender: this.data.member.gender,
          package_month: this.data.member.package_month
        }
        const formData = new FormData()
        if (this.data.member.logo) {
          formData.append(
            'photo_profile',
            this.data.member.logo ? this.data.member.logo : null,
            'logo.jpeg'
          )
        }
        if (this.data.member.background) {
          formData.append(
            'background',
            this.data.member.background ? this.data.member.background : null,
            'background.jpeg'
          )
        }
        formData.append('username', data.username)
        formData.append('first_name', data.first_name)
        formData.append('middle_name', data.middle_name ? data.middle_name : '')
        formData.append('last_name', data.last_name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('phone_code', data.phone_code)
        formData.append('title', data.title ? data.title : '')
        formData.append('role', data.role ? data.role : '')
        formData.append('divisi', data.divisi ? data.divisi : '')
        formData.append('link_room', data.link_room ? data.link_room : '')
        formData.append('identity_number', data.identity_number ? data.identity_number : '')
        formData.append('vaccinated', data.vaccinated ? data.vaccinated : '')
        formData.append('password', data.password)
        formData.append('provider', data.provider ? data.provider : '')
        formData.append('phone_type', data.phone_type ? data.phone_type : '')
        formData.append('occupation', data.occupation ? data.occupation : '')
        formData.append('education', data.education ? data.education : '')
        formData.append('text_savvy', data.text_savvy ? data.text_savvy : '')
        formData.append('ses', data.ses ? data.ses : '')
        formData.append('date_of_birthday', data.date_of_birthday ? data.date_of_birthday : '')
        formData.append('gender', data.gender ? data.gender : '')
        this.$axios
          .post('/member/corporate/adduser', formData, config)
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
        formData.append('gambar', blob, 'logo.jpeg')
        this.data.member.logo = blob
        this.profileImageModal = false
      }, this.profileImageCropper.mime_type)
    },
    saveBackground () {
      this.backgroundCropper.cropedImage = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('gambar', blob, 'background.jpeg')
        this.data.member.background = blob
        this.backgroundModal = false
      }, this.backgroundCropper.mime_type)
    },
    saveBackgroundNonCropper () {
      const formData = new FormData()
      formData.append('gambar', this.backgroundNonCropper.selectedFile)
      this.data.member.background = this.backgroundNonCropper.selecedFile
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
<style lang="scss">
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
