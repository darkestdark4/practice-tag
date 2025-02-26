<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="col row q-pa-sm">
          <div class="col-12 text-center q-mb-lg">
            <q-img :src="Logo" width="175px" />
            <p class="text-bold q-mt-lg">Want to save this card?</p>
          </div>
          <div class="col-12 text-center q-mt-sm">
            <q-btn
              no-caps
              outline
              rounded
              size="15px"
              padding="xs lg"
              color="secondary"
              label="Login or Sign Up as a New User"
              class="col-12 q-px-md q-py-sm text-secondary"
              @click="$router.push({ path: `save-card/login` })"
            />
          </div>
          <span class="col-12 text-bold text-center q-my-lg"> or </span>
          <div class="col-12 text-center">
            <q-btn 
              no-caps
              rounded
              @click="downloadVCF()"
              class="q-px-xl q-py-sm q-mb-md bg-secondary text-white"
            >
              <div class="text-center q-ml-sm q-px-lg">
                Save Contact
              </div>
            </q-btn>
          </div>
          <div class="col-12 text-center">
            <q-btn
              no-caps
              rounded
              style="padding-right: 40px; padding-left: 40px"
              class="q-px-lg q-py-sm q-mb-md bg-grey text-white"
              @click="$router.push({ path: `save-card/send-email` })"
            >
              <q-img :src="Mail" width="20px" height="20px" />
              <div class="text-center q-ml-sm">
                Send VCF to your Email
              </div>
            </q-btn>
          </div>
        </div>

        <q-dialog v-model="feedbackDialog" full-height>
          <q-card class="font-proxima-nova-alt q-pa-lg dialog-feedback">
            <div class="dialog-header">
              <p class="dialog-title">
                Share your info back with
                <br>
                {{ getFullname }}
              </p>
            </div>
            <div class="dialog-form">
              <div style="width: 100%">
                <span class="text-left" style="font-size: 12px" >
                  Name
                </span>
                <q-input
                  v-model="feedbackInput.name"
                  dense
                  outlined
                  bg-color="white"
                  placeholder="Name"
                  :error="errorListener.name.status"
                  :error-message="errorListener.name.message"
                  :hide-bottom-space="true"
                />
              </div>
              <div style="width: 100%">
                <span class="text-left" style="font-size: 12px" >
                  Email
                </span>
                <q-input
                  v-model="feedbackInput.email"
                  dense
                  outlined
                  type="email"
                  bg-color="white"
                  placeholder="Email"
                  :error="errorListener.email.status"
                  :error-message="errorListener.email.message"
                  :hide-bottom-space="true"
                />
              </div>
              <div style="width: 100%">
                <span class="text-left" style="font-size: 12px" >
                  Phone Number
                </span>
                <q-input
                  v-model="feedbackInput.phoneNumber"
                  dense
                  outlined
                  type="number"
                  bg-color="white"
                  placeholder="Phone Number"
                  :error="errorListener.phone_number.status"
                  :error-message="errorListener.phone_number.message"
                  :hide-bottom-space="true"
                  onkeydown="
                    return event.keyCode !== 69 &&
                    event.keyCode != 189 &&
                    event.keyCode != 187 &&
                    event.keyCode != 190
                  "
                />
              </div>
              <div style="width: 100%">
                <span class="text-left" style="font-size: 12px" >
                  Notes
                </span>
                <q-input
                  v-model="feedbackInput.notes"
                  dense
                  outlined
                  type="textarea"
                  bg-color="white"
                  placeholder="Notes"
                  :hide-bottom-space="true"
                />
              </div>
            </div>
            <div class="dialog-footer">
              <q-btn class="dialog-button" @click="submit()">Connect</q-btn>
            </div>
          </q-card>

          <q-inner-loading :showing="isLoading" :dark="true">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Logo from 'src/assets/image/save-card.png'
import Whatsapp from 'src/assets/image/wa-logo.png'
import Mail from 'src/assets/image/mail-logo.png'
export default {
  data () {
    return {
      Logo,
      Whatsapp,
      Mail,
      feedbackDialog: true,
      feedbackInput: {
        name: null,
        email: null,
        phoneNumber: null,
        notes: null
      },
      errorListener: {
        name: { status: false, message: '' },
        email: { status: false, message: '' },
        phone_number: { status: false, message: '' }
      },
      isLoading: false
    }
  },
  computed: {
    member () {
      return this.$store.state.userdata.user
    },
    getFullname () {
      return this.$store.getters['userdata/getFullname']
    }
  },
  methods: {
    downloadVCF () {
      const host = window.location.host
      const parts = host.split('.')

      const data = {
        send: 'download',
        username: parts[0]
      }
      this.$axios.post('/send_vcf_whatsapp', data).then(response => {
        this.downloadFile(response.data, parts[0])
      })
    },
    downloadFile (response, filename) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([response], { type: 'text/vcard' })

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob)
        return
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob)
      const link = document.createElement('a')
      link.href = data
      link.download = filename + '.vcf'
      link.click()

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data)
      }, 100)
    },
    resetValidation () {
      Object.keys(this.errorListener).forEach((item) => {
        this.errorListener[item].status = false
        this.errorListener[item].message = ''
      })
    },
    submit () {
      this.isLoading = true
      this.resetValidation()

      const input = this.feedbackInput
      const payload = {
        member_id: this.member.id,
        name: input.name,
        email: input.email,
        phone_number: input.phoneNumber,
        notes: input.notes,
      }

      this.$axios.post('/send-feedback-contact', payload)
        .then(() => {
          // close dialog feedback
          this.feedbackDialog = false

          this.$store.dispatch('style/setCampaignDialog', 'open')
        })
        .error((error) => {
          const { data } = error.response.data

          if (data) {
            const keys = Object.keys(data)
            keys.forEach((item) => {
              this.errorListener[item].status = true
              this.errorListener[item].message = data[item][0]
            })
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
  .dialog-feedback {
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .dialog-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }

  .dialog-title {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }

  .dialog-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .dialog-button {
    background: black;
    color: white;
    text-align: center;
    padding: .25rem;
    border-radius: 9999px;
    width: 80%;
  }
</style>