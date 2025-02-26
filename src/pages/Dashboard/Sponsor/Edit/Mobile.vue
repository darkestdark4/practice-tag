<template>
  <div class="q-pa-sm font-monserrat">
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Logo :</span>
      <q-file filled bottom-slots v-model="data.logo" ref="LogoPartner" accept="image/*" label="Upload Here"
        @input="onFileSelectedFile()">
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click.stop="data.logo = null" class="cursor-pointer" />
        </template>
      </q-file>
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Title</span>
      <q-input outlined v-model="data.partner_name" ref="titleRef" maxlength="50" placeholder="Type Title" :rules="[
        val => !!val || '* Required'
      ]" />
    </div>
    <!-- <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Description</span>
      <q-editor min-height="5rem" outlined v-model="data.partner_description" ref="descriptionRef"
        placeholder="Type Description"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          [
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
              ]
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
              ]
            },
          ],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }" />
    </div> -->
    <div class="q-my-md column">
      <div class="col row">
        <div class="col-5 q-mr-auto" style="max-width: 350px">
          <span class="col q-mb-sm text-grey-7">Start Date :</span>
          <q-input filled v-model="data.start_date" ref="startRef" :rules="[
            val => !!val || '* Required'
          ]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.start_date" mask="DD-MM-YYYY" :options="optionsFn">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-5" style="max-width: 350px">
          <span class="col q-mb-sm text-grey-7">End Date :</span>
          <q-input filled v-model="data.end_date" ref="endRef" :rules="[
            val => !!val || '* Required'
          ]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.end_date" mask="DD-MM-YYYY" :options="optionsFn2">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <!-- <div class="q-my-md column">
      <div class="row">
        <span class="col-12 q-mb-sm text-grey-7">PIN Code (Optional)</span>
        <div class="col-7 q-mt-sm">
          <q-input outlined v-model="data.pin_code" ref="pinRef" :dense="true" placeholder="PIN" type="number"
            :rules="[
              val => !!val || '* Required',
              val => val.length < 7 || 'Please use maximum 6 character',
            ]" disable />
        </div>
        <div class="col-4 q-ml-auto">
          <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-sm" label="Generate PIN"
            size="md" @click="generatePin()" rounded />
        </div>
      </div>
    </div> -->
    <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Save" size="lg"
      @click="saveData()" rounded />

    <!-- PROFILE PICTURE MODAL CROPPER -->
    <q-dialog v-model="logoModal" style="width:700px" persistent>
      <q-card style="border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Crop Logo</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="formatCropper('profile_image'); data.logo = ''"
            v-close-popup
            @keydown.esc="formatCropper('profile_image'); logoModal = false; data.logo = ''" />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper v-show="logoCropper.selectedFile"
              :img-style="{ 'width': '300px', 'height': '300px' }" ref="cropper"
              :src="logoCropper.selectedFile" :aspect-ratio="1 / 1" alt="Source Image"></VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn label="Crop & Save" class="bg-primary text-white" @click="saveLogo()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
  data () {
    return {
      data: {
        title: '',
        description: '',
        start_date: null,
        end_date: null,
        pin_code: '',
        logo: null,
        logoCropper: null
      },
      logoModal: false,
      logoCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      optionsFn (date) {
        return date >= moment(new Date().toISOString().substring(0, 10)).format('YYYY/MM/DD')
      },
      optionsFn2 (date) {
        return date >= moment(new Date().toISOString().substring(0, 10)).format('YYYY/MM/DD')
      },
      optionFnn (hr, min, sec) {
        return hr >= moment().format('HH')
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/partner/' + this.$route.params.id).then(response => {
        this.data = response.data.data
      })
    },
    saveData () {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('logo', this.data.logoCropper)
      formData.append('title', this.data.partner_name)
      formData.append('description', this.data.partner_description)
      formData.append('start_date', this.data.start_date)
      formData.append('end_date', this.data.end_date)
      formData.append('pin_code', this.data.pin_code)
      axios.post('/partner/' + this.$route.params.id, formData)
        .then(res => {
          if (res.data.status === 'success') {
            this.$q.notify({
              message: 'Success Edit Partner',
              position: 'top',
              type: 'positive'
            })
            setTimeout(() => this.$router.push({ path: '/dashboard/manage-partner' }), 1000)
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Create Data failed'
            })
          }
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            position: 'top',
            icon: 'error',
            message: err.response.data.data
          })
        })
    },
    saveLogo () {
      this.logoCropper.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.logoModal = false
        this.data.logoCropper = blob
      }, this.logoCropper.mime_type)
    },
    onFileSelectedFile () {
      const file = this.data.logo
      this.logoCropper.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          this.logoModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.logoCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.logoCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    formatCropper (imageType) {
      if (imageType === 'profile_image') {
        this.logoCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      }
    }
  }
}
</script>
<style>
::placeholder {
  color: #9e9e9e;
  font-size: 12px;
}
</style>
