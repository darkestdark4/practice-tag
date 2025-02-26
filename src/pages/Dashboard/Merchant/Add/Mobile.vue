<template>
  <div class="q-pa-sm q-my-xs font-monserrat">
    <div class="row">
      <div class="col-12 q-my-sm column">
        <span>Member</span>
        <q-select
          v-model="data.member_id"
          :options="options"
          outlined
          dense
          emit-value
          map-options
        />
      </div>
      <div class="col-12 q-my-sm column">
        <span>Description</span>
        <q-editor
          max-height="7rem"
          outlined
          v-model="data.description"
          ref="descriptionRef"
          placeholder="Type Description"
          :toolbar="[
            [
              'bold',
              'italic',
              'strike',
              'underline',
              'subscript',
              'superscript',
            ],
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
                  'size-7',
                ],
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
                  'verdana',
                ],
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
            verdana: 'Verdana',
          }"
        />
      </div>
      <div class="col-12 q-my-sm column">
        <span class="q-mb-sm">Image</span>
        <div class="row q-mb-md" v-for="(d, index) in data.file" :key="d.id">
          <q-input
            class="col-5"
            v-model="d.name"
            type="text"
            placeholder="Name File..."
            outline
            dense
          />
          <q-input
            class="col-4"
            v-model="d.file"
            @input="onFileSelectedFile(index)"
            type="file"
            placeholder="Upload Here"
            filled
            dense
          />
          <q-btn
            class="text-red text-capitalize offset-1 col-2"
            label="Delete"
            @click="deleteImage(index)"
            size="xs"
            outline
            rounded
          />
        </div>
        <q-btn
          class="text-secondary text-capitalize q-mt-sm"
          color="secondary"
          icon="add"
          label="Add More Image"
          @click="addImage()"
          outline
        />
      </div>
      <q-btn
        class="full-width bg-secondary text-white text-capitalize q-mt-xl"
        label="Publish"
        size="lg"
        @click="sendData()"
        rounded
      />
    </div>
    <!-- LOGO MODAL CROPPER -->
    <q-dialog v-model="logoModal" style="width: 700px" persistent>
      <q-card style="border-top: 15px solid #116c54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6"
            >Crop Logo</q-toolbar-title
          >
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="
              formatCropper('profile_image');
              data.file[indexx].file = '';
            "
            v-close-popup
            @keydown.esc="
              formatCropper('profile_image');
              logoModal = false;
              data.file[indexx].file = '';
            "
          />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper
              v-show="logoCropper.selectedFile"
              :img-style="{ maxWidth: '500px', maxHeight: '300px' }"
              ref="cropper"
              :src="logoCropper.selectedFile"
              :aspect-ratio="1 / 1"
              alt="Source Image"
            ></VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn
            label="Crop & Save"
            class="bg-primary text-white"
            @click="saveLogo()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
  data () {
    return {
      key: 'value',
      data: {
        file: [
          {
            file: '',
            name: ''
          },
          {
            file: '',
            name: ''
          },
          {
            file: '',
            name: ''
          }
        ],
        description: ''
      },
      options: [],
      indexx: 0,
      logoModal: false,
      logoCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      }
    }
  },
  mounted () {
    this.getMemberList()
  },
  methods: {
    getMemberList () {
      this.$axios.get('iluna/memberlist').then((response) => {
        if (response.data.status) {
          this.options = response.data.data.map((data) => {
            return {
              label: data.name,
              value: data.id
            }
          })
        }
      })
    },
    sendData () {
      const formData = new FormData()
      formData.append('member_id', this.data.member_id)
      formData.append('description', this.data.description)
      // formData.append('merchant_file', this.data.file
      if (this.data.file) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.data.file.length; i++) {
          formData.append('merchant_file[][file]', this.data.file[i].file)
          formData.append('merchant_file[][name]', this.data.file[i].name)
        }
      }
      this.$axios
        .post('/member/merchant', formData)
        .then((response) => {
          if (response.data.status === 'success') {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            setTimeout(
              () => this.$router.push({ path: '/dashboard/manage-merchant' }),
              500
            )
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: response.data.data
            })
          }
        })
    },
    addImage () {
      const data = {
        file: ''
      }
      this.data.file.push(data)
    },
    deleteImage (index) {
      this.data.file.splice(index, 1)
    },
    saveLogo () {
      this.logoCropper.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.logoModal = false
        this.data.file[this.indexx].file = blob
        // this.data.logoCropper = blob
      }, this.logoCropper.mime_type)
    },
    onFileSelectedFile (index) {
      const file = this.data.file[index].file[0]
      this.indexx = index
      this.logoCropper.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png'
        ) {
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
.q-field__native[type="file"],
input[type="file"],
input[type="file" i] {
  margin-top: 5px !important;
}
</style>
