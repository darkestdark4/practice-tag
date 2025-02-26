<template>
  <div class="q-pa-sm">
    <q-card class="constrain-mobile border-radius-10px" style="margin-bottom:10px !important" flat bordered>
      <q-card-section class="text-center">
        <span class="text-h6 text-secondary text-center">Verifikasi Data</span>
        <span class="q-mt-xs float-right">
          <q-icon class="text-grey-7 cursor-pointer" name="info" size="sm" @click="guideline = true" />
        </span>
      </q-card-section>
      <q-card-section>
        <div class="q-my-md full-width">
          <span class="text-grey-7">Full Name</span>
          <q-input v-model="data.username" placeholder="nama" outlined />
        </div>
        <div class="q-my-md full-width">
          <span class="text-grey-7">NIK</span>
          <q-input v-model="data.nik" placeholder="23425534543" outlined>
          </q-input>
        </div>
        <div class="q-my-md full-width">
          <span class="text-grey-7">Address</span>
          <q-input type="textarea" v-model="data.address" outlined>
          </q-input>
        </div>
        <div class="q-my-md full-width">
          <div class="text-grey-7 q-mb-sm">Upload Image</div>
          <div class="flex flex-center">
            <div class="q-mx-md">
              <div class="q-mb-sm text-grey-7 text-center">Upload KTP</div>
              <q-card class="q-mb-md flex flex-center" style="width: 75px; height: 75px" flat bordered>
                <q-icon class="text-grey-7 cursor-pointer" name="add" size="md" @click="$refs.ktpPicture.click()" />
                <input ref="ktpPicture" accept="image/*" type="file" style="display: none;" @change="previewKtpPicture" />
              </q-card>
              <div class="q-mb-sm text-grey-7 text-center">Preview KTP</div>
              <q-card class="bg-grey-2 q-pa-sm" style="width: 75px; height: 75px" flat bordered>
                <q-img :src="preview.ktp"/>
              </q-card>
            </div>
            <div class="q-mx-md">
              <div class="q-mb-sm text-grey-7 text-center">Upload Selfie</div>
              <q-card class="q-mb-md flex flex-center" style="width: 75px; height: 75px" flat bordered>
                <q-icon class="text-grey-7 cursor-pointer" name="add" size="md" @click="$refs.selfiePicture.click()" />
                <input ref="selfiePicture" accept="image/*" type="file" style="display: none;" @change="previewSelfiePicture" />
              </q-card>
              <div class="q-mb-sm text-grey-7 text-center">Preview Selfie</div>
              <q-card class="bg-grey-2 q-pa-sm" style="width: 75px; height: 75px" flat bordered>
                <q-img :src="preview.selfie"/>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="flex flex-center">
        <q-btn label="Next" class="q-px-md q-py-sm q-mb-md bg-secondary text-white text-capitalize full-width" @click="$router.push('/dashboard/wallet/request')" rounded />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="guideline">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6 text-center text-secondary">Data Verification Guideline</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll flex-center" style="height: 100vh">
          <div class="text-center">Pastikan Foto KTP Sesuai Guideline</div>
          <div class="ktp-success q-my-md">
            <div class="text-positive text-bold text-center" style="font-size: 16px">Benar</div>
            <q-card class="bg-grey-2 q-pa-sm" style="border: 1px solid green" flat bordered>
              <q-img :src="KTPSuccess" />
            </q-card>
          </div>
          <div class="ktp-failed q-my-md">
            <div class="text-negative text-bold text-center" style="font-size: 16px">Salah</div>
            <q-card class="bg-grey-2" style="border: 1px solid red" flat bordered>
              <q-img :src="KTPFailed" />
            </q-card>
          </div>
          <div class="ktp-success q-my-md">
            <div class="text-positive text-bold text-center" style="font-size: 16px">Benar</div>
            <q-card class="bg-grey-2 q-pa-sm flex flex-center" style="border: 1px solid green" flat bordered>
              <q-img :src="SelfieSuccess" height="175px" width="170px" />
            </q-card>
          </div>
          <div class="ktp-failed q-my-md">
            <div class="text-negative text-bold text-center" style="font-size: 16px">Salah</div>
            <q-card class="bg-grey-2" style="border: 1px solid red" flat bordered>
              <q-img :src="SelfieFailed" />
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import KTPFailed from 'src/assets/image/ktp_failed.png'
import KTPSuccess from 'src/assets/image/ktp_success.png'
import SelfieSuccess from 'src/assets/image/selfie_success.png'
import SelfieFailed from 'src/assets/image/selfie_failed.png'
export default {
  data () {
    return {
      KTPSuccess,
      KTPFailed,
      SelfieSuccess,
      SelfieFailed,
      guideline: false,
      preview: {
        imageKtp: null,
        ktp: null,
        imageSelfie: null,
        selfie: null
      },
      data: {
        fullname: null,
        nik: null,
        address: null
      }
    }
  },
  methods: {
    previewKtpPicture (event) {
      const input = event.target
      if (input.files) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview.ktp = e.target.result
        }
        this.preview.imageKtp = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
    previewSelfiePicture (event) {
      const input = event.target
      if (input.files) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview.selfie = e.target.result
        }
        this.preview.imageSelfie = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
</script>
