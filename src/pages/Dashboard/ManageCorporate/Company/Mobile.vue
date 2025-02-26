<template>
  <div class="q-pa-sm font-monserrat">
    <div v-if="role === 'Admin'">
      <q-tabs
        dense
        class="text-grey border-radius-10px"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
        outside-arrows
        mobile-arrows
        style="border: 1px solid #efefef"
      >
        <q-route-tab
          class="bg-secondary text-white text-capitalize"
          label="Company"
          to="/dashboard/manage-corporate/company"
        />
        <q-route-tab
          class="text-capitalize"
          label="Users"
          to="/dashboard/manage-corporate/users"
          exact
        />
        <!-- <q-route-tab class="text-capitalize" label="Broadcast" to="/dashboard/manage-corporate/broadcast" exact /> -->
        <q-route-tab
          class="text-capitalize"
          label="Log"
          to="/dashboard/manage-corporate/log"
          exact
        />
      </q-tabs>
      <q-separator />
      <div class="q-pa-sm">
        <div class="q-pt-md">
          <div class="column q-my-md flex flex-center">
            <q-img
              :src="`${$store.state.userdata.user.company_logo ? linkStorageCompLogo + $store.state.userdata.user.company_logo : CompanyLogo}`"
              width="75px"
              height="75px"
              class="border-radius-10px"
            >
              <div class="absolute-full text-subtitle2 flex flex-center">
                <q-icon
                  class="cursor-pointer"
                  name="file_upload"
                  size="md"
                  @click="$refs.CompanyLogo.click()"
                />
                <input
                  ref="CompanyLogo"
                  type="file"
                  style="display: none"
                  @change="onFileSelectCompanyLogo"
                />
              </div>
            </q-img>
            <div class="col q-pa-sm flex flex-center">
              <small>
                Upload the logo image in format .jpg or .png. Dimensions should
                be at least 300px x 300px. Max. file size 5mb
              </small>
            </div>
          </div>
          <div class="flex-center">
            <q-btn
              icon="warning"
              class="full-width bg-secondary text-black text-capitalize"
              color="amber"
              size="md"
              rounded
            >
              Card Expired Date
              {{
                $store.state.userdata.user.expired_date
                  ? $store.state.userdata.user.expired_date
                  : "-"
              }}
            </q-btn>
          </div>
          <div class="flex flex-center q-mt-md">
            <!-- <span class="text-secondary text-bold cursor-pointer" @click="editOffice(office)">Extend Card</span> -->
            <span class="text-secondary text-bold cursor-pointer"
              >Extend Card</span
            >
          </div>
          <div class="q-my-md column">
            <span class="q-mb-md text-bold">Company / Organitazion Info</span>
            <span class="col q-mb-sm text-grey-7">Name*</span>
            <q-input
              class="col full-width"
              v-model="data.corporate.corporate_name"
              :error="$v.data.corporate.corporate_name.$error"
              :error-message="validationMsg($v.data.corporate.corporate_name)"
              placeholder="Your Company Name"
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Description*</span>
            <q-input
              class="full-width"
              v-model="data.corporate.corporate_description"
              :error="$v.data.corporate.corporate_description.$error"
              :error-message="
                validationMsg($v.data.corporate.corporate_description)
              "
              type="textarea"
              placeholder="Input description here ....."
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Website*</span>
            <q-input
              class="full-width"
              v-model="data.corporate.corporate_website"
              :error="$v.data.corporate.corporate_website.$error"
              :error-message="
                validationMsg($v.data.corporate.corporate_website)
              "
              placeholder="https://tagid.ai/"
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Commerce*</span>
            <q-input
              class="full-width"
              v-model="data.corporate.commerce_group"
              :error="$v.data.corporate.commerce_group.$error"
              :error-message="validationMsg($v.data.corporate.commerce_group)"
              placeholder="https://tagid.ai/"
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Phone Number*</span>
            <div class="col row">
              <q-select
                class="col-3"
                outlined
                v-model="data.corporate.corporate_phonecode"
                :options="phoneCodeList"
                map-options
                emit-value
              />
              <q-input
                class="col-9"
                type="number"
                onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
                v-model="data.corporate.corporate_phone"
                :error="$v.data.corporate.corporate_phone.$error"
                :error-message="
                  validationMsg($v.data.corporate.corporate_phone)
                "
                placeholder="Your Company Phone Number"
                outlined
              />
            </div>
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Telephone Number*</span>
            <div class="col row">
              <q-select
                class="col-3"
                outlined
                v-model="data.corporate.corporate_telephonecode"
                :options="phoneCodeList"
                map-options
                emit-value
              />
              <q-input
                class="col-9"
                type="number"
                onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
                v-model="data.corporate.corporate_telephone"
                :error="$v.data.corporate.corporate_telephone.$error"
                :error-message="
                  validationMsg($v.data.corporate.corporate_telephone)
                "
                placeholder="Your Company Telephone Number"
                outlined
              />
            </div>
          </div>
          <div class="q-my-md column">
            <div class="col row">
              <span class="col-6 text-left q-mb-sm text-grey-7">Office</span>
              <span
                class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer"
                @click="officeModalAdd = true"
                >+ Add Office</span
              >
            </div>
            <div
              class="col q-my-md"
              v-for="(office, idx) in officeList"
              :key="idx"
            >
              <q-input
                class="full-width"
                v-model="officeList[idx].corporate_address"
                placeholder="Your Office Address"
                style="margin-top: -20px"
                readonly
                outlined
              />
              <div class="row">
                <span
                  class="text-secondary text-bold cursor-pointer"
                  @click="editOffice(office)"
                  >Edit</span
                >
                <span
                  class="q-ml-sm text-secondary text-bold cursor-pointer"
                  @click="deleteOffice(office.id)"
                  >Delete
                </span>
              </div>
            </div>
          </div>
          <div class="q-my-md column">
            <div class="col row">
              <span class="col-6 text-left q-mb-sm text-grey-7">Video</span>
              <span
                class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer"
                @click="videoModalAdd = true"
                >+ Add Video</span
              >
            </div>
            <div
              class="col q-my-md"
              v-for="(list, idx) in videoList"
              :key="idx"
            >
              <q-input
                class="full-width"
                v-model="videoList[idx].socmed_link"
                placeholder="https://youtu.be/G2fyCbtEi7g"
                style="margin-top: -20px"
                readonly
                outlined
              />
              <div class="row">
                <span
                  class="text-secondary text-bold cursor-pointer"
                  @click="editVideo(list)"
                  >Edit</span
                >
                <span
                  class="q-ml-sm text-secondary text-bold cursor-pointer"
                  @click="deleteVideo(list.id)"
                  >Delete
                </span>
              </div>
            </div>
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Upload Document</span>
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
            ></vue-dropzone>
            <q-btn
              v-if="$store.state.userdata.user.pdf_file !== null"
              class="q-mt-md bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              :label="$store.state.userdata.user.pdf_file"
              @click="showPdfView($store.state.userdata.user.pdf_file)"
            />
          </div>
          <div class="q-my-md q-pt-lg column">
            <span class="col q-mb-sm text-grey-7">Upload Background Image</span>
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptionss"
            ></vue-dropzone>
            <q-btn
              v-if="$store.state.userdata.user.background !== null"
              class="q-mt-md bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              :label="$store.state.userdata.user.background"
              @click="showBGView($store.state.userdata.user.background)"
            />
          </div>
        </div>
        <div class="q-my-md">
          <div class="q-my-sm text-h6 text-grey-6">Change Color</div>
          <div class="row q-my-md">
            <div class="q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div class="q-mb-sm">
                <span class="text-bold q-mr-sm">Main Color</span>
                <span class="text-grey-7">(bg, button, title)</span>
              </div>
              <q-color v-model="data.corporate.main_color" no-footer />
            </div>
            <div class="q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div class="q-mb-sm">
                <span class="text-bold q-mr-sm">Secondary Color</span>
                <span class="text-grey-7">(description)</span>
              </div>
              <q-color v-model="data.corporate.secondary_color" no-footer />
            </div>
          </div>
        </div>
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
      <!-- ADD VIDEO MODAL -->
      <q-dialog v-model="videoModalAdd" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Add Video</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              class="full-width"
              v-model="video_form_add.socmed_link"
              placeholder="i.e https://youtube.com/embed/video"
              outlined
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Video" @click="saveVideo('add')" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- ADD OFFICE MODAL -->
      <q-dialog v-model="officeModalAdd" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Add Office</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="q-my-sm">
              <div class="text-grey-7">Company Name</div>
              <q-input
                class="full-width"
                v-model="office_form_add.name"
                placeholder="Input Company Name"
                outlined
              />
            </div>
            <div class="q-my-sm">
              <div class="text-grey-7">Department</div>
              <q-input
                class="full-width"
                v-model="office_form_add.department"
                placeholder="Input Department"
                outlined
              />
            </div>
            <div class="q-my-sm">
              <div class="text-grey-7">Division</div>
              <q-input
                class="full-width"
                v-model="office_form_add.division"
                placeholder="Input Division"
                outlined
              />
            </div>
            <div class="q-my-sm">
              <div class="text-grey-7">Address</div>
              <q-input
                class="full-width"
                v-model="office_form_add.address"
                placeholder="Input Address"
                outlined
              />
            </div>
            <div class="q-my-sm">
              <div class="text-grey-7">City</div>
              <q-input
                class="full-width"
                v-model="address_form_add.city"
                placeholder="Input City"
                outlined
              />
            </div>
            <div class="q-my-sm">
              <div class="text-grey-7">Post Code</div>
              <q-input
                class="full-width"
                type="number"
                onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
                v-model="address_form_add.postcode"
                placeholder="Input Post Code"
                outlined
              />
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Office" @click="saveOffice('add')" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div v-else-if="role == 'Anggota'">
      <q-tabs
        dense
        class="text-grey border-radius-10px"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
        outside-arrows
        mobile-arrows
        style="border: 1px solid #efefef"
      >
        <q-route-tab
          class="bg-secondary text-white text-capitalize"
          label="Company"
          to="/dashboard/manage-corporate/company"
        />
        <q-route-tab
          class="text-capitalize"
          label="Users"
          to="/dashboard/manage-corporate/users"
          exact
        />
        <!-- <q-route-tab class="text-capitalize" label="Broadcast" to="/dashboard/manage-corporate/broadcast" exact /> -->
        <q-route-tab
          class="text-capitalize"
          label="Log"
          to="/dashboard/manage-corporate/log"
          exact
        />
      </q-tabs>
      <q-separator />
      <div class="q-pa-sm">
        <div class="q-pt-md">
          <div class="column q-my-md flex flex-center">
            <q-img
              :src="`${$store.state.userdata.user.company_logo ? linkStorageCompLogo + $store.state.userdata.user.company_logo : CompanyLogo}`"
              width="75px"
              height="75px"
              class="border-radius-10px"
            >
              <div class="absolute-full text-subtitle2 flex flex-center"></div>
            </q-img>
            <div class="col q-pa-sm flex flex-center">
              <small>
                Upload the logo image in format .jpg or .png. Dimensions should
                be at least 300px x 300px. Max. file size 5mb
              </small>
            </div>
          </div>
          <div class="flex-center">
            <q-btn
              icon="warning"
              class="full-width bg-secondary text-black text-capitalize"
              color="amber"
              size="md"
              rounded
            >
              Card Expired Date
              {{
                $store.state.userdata.user.expired_date
                  ? $store.state.userdata.user.expired_date
                  : "-"
              }}
            </q-btn>
          </div>
          <div class="flex flex-center q-mt-md">
            <!-- <span class="text-secondary text-bold cursor-pointer" @click="editOffice(office)">Extend Card</span> -->
            <span class="text-secondary text-bold cursor-pointer"
              >Extend Card</span
            >
          </div>
          <div class="q-my-md column">
            <span class="q-mb-md text-bold">Company / Organitazion Info</span>
            <span class="col q-mb-sm text-grey-7">Name*</span>
            <q-input
              :disable="true"
              class="col full-width"
              v-model="data.corporate.corporate_name"
              :error="$v.data.corporate.corporate_name.$error"
              :error-message="validationMsg($v.data.corporate.corporate_name)"
              placeholder="Your Company Name"
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Description*</span>
            <q-input
              :disable="true"
              class="full-width"
              v-model="data.corporate.corporate_description"
              :error="$v.data.corporate.corporate_description.$error"
              :error-message="
                validationMsg($v.data.corporate.corporate_description)
              "
              type="textarea"
              placeholder="Input description here ....."
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Website*</span>
            <q-input
              :disable="true"
              class="full-width"
              v-model="data.corporate.corporate_website"
              :error="$v.data.corporate.corporate_website.$error"
              :error-message="
                validationMsg($v.data.corporate.corporate_website)
              "
              placeholder="https://tagid.ai/"
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Commerce*</span>
            <q-input
              :disable="true"
              class="full-width"
              v-model="data.corporate.commerce_group"
              :error="$v.data.corporate.commerce_group.$error"
              :error-message="validationMsg($v.data.corporate.commerce_group)"
              placeholder="https://tagid.ai/"
              outlined
            />
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Phone Number*</span>
            <div class="col row">
              <q-select
                :disable="true"
                class="col-3"
                outlined
                v-model="data.corporate.corporate_phonecode"
                :options="phoneCodeList"
                map-options
                emit-value
              />
              <q-input
                :disable="true"
                class="col-9"
                type="number"
                onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
                v-model="data.corporate.corporate_phone"
                :error="$v.data.corporate.corporate_phone.$error"
                :error-message="
                  validationMsg($v.data.corporate.corporate_phone)
                "
                placeholder="Your Company Phone Number"
                outlined
              />
            </div>
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Telephone Number*</span>
            <div class="col row">
              <q-select
                :disable="true"
                class="col-3"
                outlined
                v-model="data.corporate.corporate_telephonecode"
                :options="phoneCodeList"
                map-options
                emit-value
              />
              <q-input
                :disable="true"
                class="col-9"
                type="number"
                onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
                v-model="data.corporate.corporate_telephone"
                :error="$v.data.corporate.corporate_telephone.$error"
                :error-message="
                  validationMsg($v.data.corporate.corporate_telephone)
                "
                placeholder="Your Company Telephone Number"
                outlined
              />
            </div>
          </div>
          <div class="q-my-md column">
            <div class="col row">
              <span class="col-6 text-left q-mb-sm text-grey-7">Office</span>
            </div>
            <div
              class="col q-my-md"
              v-for="(office, idx) in officeList"
              :key="idx"
            >
              <q-input
                class="full-width"
                v-model="officeList[idx].corporate_address"
                placeholder="Your Office Address"
                style="margin-top: -20px"
                readonly
                outlined
              />
            </div>
          </div>
          <div class="q-my-md column">
            <div class="col row">
              <span class="col-6 text-left q-mb-sm text-grey-7">Video</span>
            </div>
            <div
              class="col q-my-md"
              v-for="(list, idx) in videoList"
              :key="idx"
            >
              <q-input
                class="full-width"
                v-model="videoList[idx].video"
                placeholder="https://youtu.be/G2fyCbtEi7g"
                style="margin-top: -20px"
                readonly
                outlined
              />
            </div>
          </div>
          <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Document</span>
            <!-- <vue-dropzone :disable="true" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone> -->
            <q-btn
              v-if="$store.state.userdata.user.pdf_file !== null"
              class="q-mt-md bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              :label="$store.state.userdata.user.pdf_file"
              @click="showPdfView($store.state.userdata.user.pdf_file)"
            />
          </div>
          <div class="q-my-md q-pt-lg column">
            <span class="col q-mb-sm text-grey-7">Background Image</span>
            <!-- <vue-dropzone :disable="true" ref="myVueDropzone" id="dropzone" :options="dropzoneOptionss"></vue-dropzone> -->
            <q-btn
              v-if="$store.state.userdata.user.background !== null"
              class="q-mt-md bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              :label="$store.state.userdata.user.background"
              @click="showBGView($store.state.userdata.user.background)"
            />
          </div>
        </div>
        <!-- <div class="q-my-md">
            <div class="q-my-sm text-h6 text-grey-6">Change Color</div>
            <div class="row q-my-md">
            <div class="q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="q-mb-sm">
                <span class="text-bold q-mr-sm">Main Color</span>
                <span class="text-grey-7">(bg, button, title)</span>
                </div>
                <q-color v-model="data.corporate.main_color" no-footer />
            </div>
            <div class="q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div class="q-mb-sm">
                <span class="text-bold q-mr-sm">Secondary Color</span>
                <span class="text-grey-7">(description)</span>
                </div>
                <q-color v-model="data.corporate.secondary_color" no-footer />
            </div>
            </div>
        </div> -->
        <div class="flex-center">
          <q-btn
            class="full-width bg-secondary text-white text-capitalize"
            label="Publish"
            size="lg"
            @click="saveData()"
            rounded
            disable
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import axios from 'axios'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'

const localStorage = JSON.parse(window.localStorage.getItem('userd'))
const token = localStorage ? localStorage.api_token : null
const formMessages = {
  required: () => 'Form input required'
}

export default {
  components: { vueDropzone: vue2Dropzone },
  data () {
    return {
      CompanyLogo,
      role: '',
      videoModalAdd: false,
      officeModalAdd: false,
      isBackgroundVideo: false,
      linkStoragePdf:
        'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      linkStorageBg:
        'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageCompLogo:
        'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageProfile:
        'https://api.the-netwerk.com/storage/app/public/member/profile/',
      dropzoneOptions: {
        url: 'https://api.the-netwerk.com/api/mjVmBSJ31Hx2Ag9GCOUS/member/uploadpdf',
        thumbnailWidth: 150,
        maxFilesize: 3,
        maxFiles: 1,
        headers: { Authorization: `Bearer ${token}` },
        addRemoveLinks: true
      },
      dropzoneOptionss: {
        url: 'https://api.the-netwerk.com/api/mjVmBSJ31Hx2Ag9GCOUS/member/edit/background',
        thumbnailWidth: 150,
        maxFilesize: 10,
        maxFiles: 1,
        headers: { Authorization: `Bearer ${token}` },
        addRemoveLinks: true
      },
      data: {
        password: '',
        isPwd: true,
        corporate: {
          main_color: '#FF00FF',
          secondary_color: '#FF00FF',
          vaccine1: 'Prefer not to say'
        }
      },
      vaccineOptions: [
        'Fully vaccinated',
        'Waiting on additional dose',
        'Planning to get vaccinated',
        'Not getting vaccinated',
        'Prefer not to say'
      ],
      phoneList: [],
      addressList: [],
      officeList: [],
      videoList: [],
      phoneCodeList: [],
      video_form_add: {
        socmed_link: null
      },
      office_form_add: {
        name: null,
        department: null,
        division: null,
        address: null,
        city: null,
        postcode: null
      },
      address_form_add: {
        type: 'home',
        address: null,
        city: null,
        postcode: null
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
      corporate: {
        corporate_name: { required },
        corporate_address: { required },
        corporate_phone: { required },
        corporate_phonecode: { required },
        corporate_telephone: { required },
        corporate_telephonecode: { required },
        corporate_description: { required },
        corporate_website: { required },
        commerce_group: { required }
      }
    }
  },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Manage Corporate')
    this.getData()
    this.getVideo()
    this.getOffice()
    this.getPhoneCodeCountries()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    /* BEGIN:: HANDLING DATA */
    getData () {
      this.$axios
        .get('/member')
        .then((response) => {
          if (response.data.status) {
            this.data.corporate = response.data.member.corporate
            this.role = response.data.member.role
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
    saveData () {
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
          name: this.data.corporate.corporate_name,
          description: this.data.corporate.corporate_description,
          website: this.data.corporate.corporate_website,
          commerce_group: this.data.corporate.commerce_group,
          phonecode: this.data.corporate.coporate_phonecode,
          phone: this.data.corporate.corporate_phone,
          telephonecode: this.data.corporate.corporate_telephonecode,
          telephone: this.data.corporate.corporate_telephone
        }
        this.$axios
          .put('/member/corporate', data)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
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
      }
    },
    /* BEGIN:: HANDLING DATA */
    showPdfView (pdfName) {
      window.open(this.linkStoragePdf + pdfName)
    },
    showBGView (bgName) {
      window.open(this.linkStorageBg + bgName)
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
    /* BEGIN:: HANDLING OFFICE */
    getOffice () {
      this.$axios
        .get('/member')
        .then((response) => {
          if (response.data.member.corporate.corporate_address) {
            this.officeList = response.data.member.corporate.corporate_address
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
    editOffice (data) {
      this.officeModalEdit = true
      this.office_form_edit = data
    },
    deleteOffice (id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete this office?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete(`/member/company/${id}`)
            .then((response) => {
              this.$q.notify({
                message: 'Success Delete Office',
                position: 'top',
                type: 'positive'
              })
              window.setTimeout(function () {
                location.reload()
              }, 1500)
            })
            .catch((error) => {
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
        })
    },
    async saveOffice (status) {
      if (status === 'add') {
        const data = this.office_form_add
        await this.$axios
          .post('/member/company/add', data)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: 'Success Add Company',
                position: 'top',
                type: 'positive'
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
        this.officeModalAdd = false
        this.getAddress()
      } else {
        const data = {
          name: this.office_form_edit.company_name,
          department: this.office_form_edit.company_department,
          division: this.office_form_edit.company_division,
          address: this.office_form_edit.company_address,
          city: this.office_form_edit.company_city,
          postcode: this.office_form_edit.company_postal_code
        }
        await this.$axios
          .put(`/member/company/${this.office_form_edit.id}`, data)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: 'Success Edit Company',
                position: 'top',
                type: 'positive'
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
        this.officeModalEdit = false
        this.getAddress()
      }
    },
    /* END:: HANDLING OFFICE */
    /* BEGIN:: HANDLING VIDEO */
    editVideo (data) {
      this.videoModalEdit = true
      this.video_form_edit = data
    },
    deleteVideo (id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete this video?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete(`/member/socialmedia/${id}`)
            .then((response) => {
              this.$q.notify({
                message: 'Success Delete Video',
                position: 'top',
                type: 'positive'
              })
              window.setTimeout(function () {
                location.reload()
              }, 1500)
            })
            .catch((error) => {
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
        })
    },
    getVideo () {
      this.$axios
        .get('/member')
        .then((response) => {
          if (response.data.member.corporate.corporate_video != null) {
            this.videoList = response.data.member.corporate.corporate_video
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
    async saveVideo (status) {
      if (status === 'add') {
        const data = {
          order: 1,
          socmed_name: 'youtube',
          socmed_link: this.video_form_add.socmed_link,
          status: 'active'
        }
        await this.$axios
          .post('/member/socialmedia/add', data)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: 'Success Add Video',
                position: 'top',
                type: 'positive'
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
        this.videoModalAdd = false
        this.getVideo()
      } else {
        const data = this.video_form_edit
        await this.$axios
          .put(`/member/socialmedia/${this.video_form_edit.id}`, data)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: 'Success Edit Video',
                position: 'top',
                type: 'positive'
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
        this.videoModalEdit = false
        this.getVideo()
      }
    },
    /* END:: HANDLING VIDEO */
    saveBackground () {
      this.backgroundCropper.cropedImage = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('gambar', blob, 'background.jpeg')
        this.$axios
          .post('/member/edit/background', formData)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.backgroundModal = false
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
      }, this.backgroundCropper.mime_type)
    },
    saveCompanyLogo () {
      this.companyLogoCropper.cropedImage = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('gambar', blob, 'company_logo.jpeg')
        this.$axios
          .post('/member/edit/logo', formData)
          .then((response) => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.companyLogoModal = false
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
      }, this.companyLogoCropper.mime_type)
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
    onFileSelectCompanyLogo (e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        this.companyLogoModal = true
        const reader = new FileReader()
        reader.onload = (event) => {
          this.companyLogoCropper.selectedFile = event.target.result
          this.$refs.cropper.replace(this.companyLogoCropper.selectedFile)
        }
        reader.readAsDataURL(file)
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
