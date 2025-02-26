<template>
    <q-layout class="constrain-web">
      <div class="col row q-pa-sm">
          <div class="col-12 q-my-md text-center">
              <span class="text-grey-7">Username Friend</span>
              <div class="text-center q-mt-sm">
                  <!-- <q-input class="col-2 q-mr-md q-ml-md text-center" v-model="CodeNomor" outlined /> -->
                  <q-input class="text-center" v-model="url_tag" outlined />
              </div>
          </div>
          <div class="col-12 d-flex flex-column text-center q-mt-md">
              <q-btn v-if="url_tag" @click="showConfirmModal()"
              class="col-6 q-px-lg q-py-sm bg-secondary text-white"
              size="15px"
              padding="xs lg"
              no-caps
              rounded>
                <div>
                    Add Card
                </div>
              </q-btn>
              <q-btn v-if="!url_tag"
              class="col-6 q-px-lg q-py-sm bg-secondary text-white"
              size="15px" padding="xs lg"
              no-caps
              rounded
              disable>
                <div>
                    Add Card
                </div>
              </q-btn>
          </div>
      </div>
      <q-dialog v-model="confirmModal" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Are you sure to Add {{ url_tag }}?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="danger" v-close-popup />
            <q-btn flat @click="addFriend()" label="Yes" color="secondary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-layout>
</template>
<script>
import Logo from 'src/assets/image/logo.png'
import Whatsapp from 'src/assets/image/wa-logo.png'

const host = window.location.host
const parts = host.split('.')

export default {
  data () {
    return {
      Logo,
      Whatsapp,
      url_tag: '',
      confirmModal: false
    }
  },
  methods: {
    addFriend () {
      const data = {
        username: parts[0],
        url_friend: 'https://' + this.url_tag + '.tagid.ai'
      }
      this.$axios.post('/member/phonebook', data).then(response => {
        if (response.data.status === 'success') {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          const userd = window.localStorage.getItem('userd')
          window.localStorage.setItem('userd', userd)
          window.localStorage.removeItem('username')
          setTimeout(() => this.$router.push({ path: '/dashboard/saved-cards' }), 750)
        } else {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'negative'
          })
        }
      }).catch(error => {
        const { data } = error.response
        this.$q.notify({
          message: data.data,
          position: 'top',
          type: 'negative'
        })
      })
    },
    showConfirmModal () {
      this.confirmModal = true
    }
  }
}
</script>
