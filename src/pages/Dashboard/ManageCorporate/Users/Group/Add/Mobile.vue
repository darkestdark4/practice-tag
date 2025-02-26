<template>
    <div class="q-pa-lg font-monserra">
        <div class="col row q-my-md">
            <span class="col-12 text-bold">Divisi Name</span>
            <div class="col-12 q-my-md">
                <q-input class="full-width" v-model="data.group.groupName"  :error="$v.data.group.groupName.$error" :error-message="validationMsg($v.data.group.groupName)" placeholder="Divisi Name" outlined />
            </div>
        </div>
        <!-- <q-separator />
        <div class="q-my-md">
            <span class="text-bold q-mt-md">Member Choosed ( 2 User )</span>
        </div>
        <div class="col row q-mb-md" v-for="mem in user" :key="mem">
          <div class="col-1 q-mr-lg text-right">
              <img :src="Profile" width="75px" height="75px">
          </div>
          <div class="col row q-ml-sm">
            <span class="col-9">{{mem.name}}</span>
              <span class="col-9">{{mem.subJabatan}}</span>
            <span class="col-3 text-right text-danger cursor-pointer">Delete</span>
            <span class="col-9">{{mem.jabatan}}</span>
          </div>
          <q-separator />
        </div> -->
        <div class="text-center" @click="saveData()">
          <q-btn label="Add Divisi" class="bg-secondary text-white full-width q-mt-md text-capitalize" rounded />
        </div>
    </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import axios from 'axios'
const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}
export default {
  data () {
    return {
      Profile,
      data: {
        group: {
          groupName: ''
        }
      }
    }
  },
  validations: {
    data: {
      group: {
        groupName: { required }
      }
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    saveData () {
      const data = {
        name: this.data.group.groupName,
        private: 'No'
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        axios.post('/member/corporate/divisi', data)
          .then(res => {
            if (res.data.status === 'success') {
              this.$q.notify({
                message: res.data.message,
                position: 'top',
                type: 'positive'
              })
              setTimeout(() => this.$router.push({ path: '/dashboard/manage-corporate/users' }), 1000)
            } else {
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'error',
                message: 'Failed to add group'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
