<script>
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
        logo: null,
        link: null,
        logoCropper: null
      },
      bannerModal: false,
      bannerImageCropper: {
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
    this.$store.dispatch('style/submitTitlePage', 'Add Banner')
  },
  methods: {
    saveData () {
      const formData = new FormData()
      formData.append('image', this.data.logoCropper)
      formData.append('title', this.data.title)
      formData.append('description', this.data.description)
      formData.append('link', this.data.link)
      axios
        .post('/banner', formData)
        .then((res) => {
          if (res.data.status === 'success') {
            this.$q.notify({
              message: 'Success Add Banner',
              position: 'top',
              type: 'positive'
            })
            setTimeout(
              () => this.$router.push({ path: '/dashboard/manage-banner' }),
              1000
            )
          } else {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Create Data failed'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveBannerImage () {
      this.bannerImageCropper.cropedImage = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.bannerModal = false
        this.data.logoCropper = blob
      }, this.bannerImageCropper.mime_type)
    },
    onFileSelectedFile () {
      const file = this.data.logo
      this.bannerImageCropper.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png'
        ) {
          this.bannerModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.bannerImageCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.bannerImageCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    setCropbox () {
      this.$refs.cropper.setCropBoxData({
        width: 350,
        height: 200
      })
    },
    formatCropper (imageType) {
      if (imageType === 'profile_image') {
        this.bannerImageCropper = {
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

<template>
  <div class="q-pa-sm font-monserrat">
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Logo :</span>
      <q-file
        filled
        bottom-slots
        v-model="data.logo"
        accept="image/*"
        label="Upload Here"
        @input="onFileSelectedFile()"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop="data.logo = null"
            class="cursor-pointer"
          />
        </template>
      </q-file>
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Title</span>
      <q-input
        outlined
        v-model="data.title"
        ref="titleRef"
        maxlength="50"
        placeholder="Type Title"
        :rules="[(val) => !!val || '* Required']"
      />
    </div>
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Description</span>
      <q-editor
        min-height="5rem"
        outlined
        v-model="data.description"
        ref="descriptionRef"
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
    <div class="q-my-md column">
      <span class="col q-mb-sm text-grey-7">Link (Optional)</span>
      <q-input
        outlined
        v-model="data.link"
        ref="linkRef"
        placeholder="ex: https://tagid.ai/"
      />
    </div>
    <q-btn
      class="full-width bg-secondary text-white text-capitalize q-mt-xl"
      label="Save"
      size="lg"
      @click="saveData()"
      rounded
    />

    <!-- Banner Image MODAL CROPPER -->
    <q-dialog v-model="bannerModal" style="width: 700px" persistent>
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
              data.logo = '';
            "
            v-close-popup
            @keydown.esc="
              formatCropper('profile_image');
              bannerModal = false;
              data.logo = '';
            "
          />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper
              v-show="bannerImageCropper.selectedFile"
              ref="cropper"
              :img-style="{ 'max-width': '600px', 'max-height': '600px' }"
              :src="bannerImageCropper.selectedFile"
              @ready="setCropbox"
              alt="Source Image"
            >
            </VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn
            label="Crop & Save"
            class="bg-primary text-white"
            @click="saveBannerImage()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
::placeholder {
  color: #9e9e9e;
  font-size: 12px;
}
</style>
