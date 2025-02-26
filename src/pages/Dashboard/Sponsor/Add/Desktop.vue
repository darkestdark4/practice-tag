<template>
    <div class="q-pa-sm font-monserrat">
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Has Parent?</span>
            <q-select outlined v-model="data.has_parent" :options="options" emit-value map-options />
        </div>
        <div class="q-my-md column" v-show="data.has_parent == 'yes'">
            <span class="col q-mb-sm text-grey-7">Parent</span>
            <q-select outlined v-model="data.id_parent" :options="optionsParent" @filter="filterFn" input-debounce="0" use-input emit-value map-options />
        </div>
        <div class="q-my-md column" v-show="data.has_parent == 'no'">
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
        <div class="q-my-md column" v-show="data.has_parent == 'no'">
            <span class="col q-mb-sm text-grey-7">Title Parent</span>
            <q-input outlined v-model="data.title_parent" ref="titleRef" maxlength="50" placeholder="Type Title" :rules="[
                val => !!val || '* Required'
            ]" />
        </div>
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Title</span>
            <q-input outlined v-model="data.title" ref="titleRef" maxlength="50" placeholder="Type Title" :rules="[
                val => !!val || '* Required'
            ]" />
        </div>
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Description</span>
            <q-editor min-height="5rem" outlined v-model="data.description" ref="descriptionRef"
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
        </div>
        <!-- <div class="q-my-md column" v-show="data.has_parent == 'no'">
            <span class="col q-mb-sm text-grey-7">Category</span>
            <q-select outlined v-model="data.category" :options="optionsCategory" emit-value map-options />
        </div> -->
        <div class="q-my-md column" v-show="data.has_parent == 'no'">
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
        <div class="q-my-md column">
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
        </div>
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Info</span>
            <q-input dense outlined v-model="data.info" ref="infoRef" maxlength="50" placeholder="Type Info" :rules="[
                val => !!val || '* Required'
            ]" :disable="data.pin_code ? false : true" />
        </div>
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
      moment,
      data: {
        title: '',
        description: '',
        info: null,
        start_date: null,
        end_date: null,
        pin_code: null,
        logo: null,
        logoCropper: null,
        id_partner: null,
        title_parent: null,
        has_parent: null
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
      options: [
        {
          label: 'Yes',
          value: 'yes'
        },
        {
          label: 'No',
          value: 'no'
        }
      ],
      optionsParent: [],
      optionsParent2: [],
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
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.optionsParent = this.optionsParent2
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.optionsParent = this.optionsParent2.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    getData () {
      axios.get('/partner').then(res => {
        if (res.data.status === 'success') {
          this.optionsParent = res.data.data.parent.map(data => {
            return {
              label: data.name,
              value: data.id
            }
          })
          this.optionsParent2 = this.optionsParent
        }
      })
    },
    saveData () {
      const formData = new FormData()
      formData.append('logo', this.data.logoCropper)
      formData.append('title', this.data.title)
      formData.append('description', this.data.description)
      formData.append('info', this.data.info)
      formData.append('start_date', this.data.start_date)
      formData.append('end_date', this.data.end_date)
      formData.append('pin_code', this.data.pin_code)
      formData.append('has_parent', this.data.has_parent)
      formData.append('title_parent', this.data.title_parent)
      formData.append('id_partner', this.data.id_parent)
      axios.post('/partner', formData)
        .then(res => {
          if (res.data.status === 'success') {
            this.$q.notify({
              message: 'Success Add Partner',
              position: 'top',
              type: 'positive'
            })
            setTimeout(() => this.$router.push({ path: '/dashboard/manage-partner' }), 1000)
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: res.data.message
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
    generatePin () {
      // Pin 6 Number Random
      let pin = ''
      for (let i = 0; i < 6; i++) {
        pin += Math.floor(Math.random() * 10)
      }
      this.data.pin_code = pin
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
<style lang="scss">
::placeholder,
::label {
    font-size: 12px;
}
</style>
