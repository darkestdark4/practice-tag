<template>
  <div class="q-pa-md font-monserra">
    <div class="col row q-my-md">
      <span class="col-12 text-bold">Division Name</span>
      <div class="col-12 q-my-md">
        <q-input
          class="full-width"
          v-model="data.divisi_name"
          :error="$v.data.divisi_name.$error"
          :error-message="validationMsg($v.data.divisi_name)"
          placeholder="Divisi Name"
          outlined
        />
      </div>
    </div>
    <q-separator />
    <div class="q-my-md">
      <span class="text-bold q-mt-md">Member Choosed ( {{ count }} User )</span>
    </div>
    <div class="col row q-mb-md" v-for="(mem, index) in user" :key="index">
      <div class="col-2 items-center">
        <q-avatar size="75px">
          <q-img
            alt="Profile Logo"
            :src="mem.logo ? linkStorageProfile + mem.logo : Profile"
            width="100%"
            height="100%"
          />
        </q-avatar>
      </div>
      <div class="col-9 row q-ml-md">
        <span class="col-9 text-bold"
          >{{ mem.member_first_name }} {{ mem.member_middle_name }}
          {{ mem.member_last_name }}</span
        >
        <span
          class="col-3 text-right text-red-10 cursor-pointer"
          @click="deleteMember(mem.id)"
          >Delete</span
        >
        <span class="col-8">{{ mem.profil }}</span>
        <span class="col-12">{{ mem.role }}</span>
      </div>
    </div>
    <q-separator />
    <div class="q-my-md">
      <span
        class="q-mt-md text-green-7 cursor-pointer"
        @click="
          $router.replace({
            path:
              `/dashboard/manage-corporate/divisi/add-user-divisi/` + divisi_id,
          })
        "
        >+ Add User</span
      >
    </div>
    <div class="text-center" @click="saveData()">
      <q-btn
        label="Edit Division"
        class="bg-secondary text-white full-width q-mt-md text-capitalize"
        rounded
      />
    </div>
    <div class="text-center" @click="deleteData()">
      <q-btn
        label="Delete Division"
        class="bg-red-9 text-white full-width q-mt-md text-capitalize"
        rounded
      />
    </div>
  </div>
</template>
<script>
import Profile from 'src/assets/image/TAGID-profile.jpg'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import axios from 'axios'
const formMessages = {
  required: () => 'Form input required'
}
export default {
  data () {
    return {
      Profile,
      linkStorageProfile:
        'https://api.the-netwerk.com/storage/app/public/member/profile/',
      user: {
        name: ''
      },
      divisi_id: this.$route.params.id,
      count: 0,
      data: {
        divisi_name: ''
      }
    }
  },
  validations: {
    data: {
      divisi_name: { required }
    }
  },
  mounted () {
    this.getData()
    this.getDataMember()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    getData () {
      axios
        .get('/member/corporate/divisi/' + this.$route.params.id)
        .then((res) => {
          this.data = res.data.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDataMember () {
      axios
        .get('/member/corporate/divisi_member/' + this.$route.params.id)
        .then((res) => {
          this.user = res.data.data
          this.count = this.user.length
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveData () {
      const data = {
        name: this.data.divisi_name,
        private: this.data.private
      }
      this.$v.$touch()
      if (!this.$v.$invalid) {
        axios
          .put('/member/corporate/divisi/' + this.$route.params.id, data)
          .then((res) => {
            if (res.data.status === 'success') {
              this.$q.notify({
                message: res.data.message,
                position: 'top',
                type: 'positive'
              })
              setTimeout(
                () =>
                  this.$router.push({
                    path: '/dashboard/manage-corporate/divisi/manage-divisi'
                  }),
                1000
              )
            } else {
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'error',
                position: 'top',
                message: 'Failed to add divisi'
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    deleteMember ($id) {
      const members = {
        members: {
          data: [
            {
              member_id: $id
            }
          ]
        }
      }
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete this member?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          axios
            .put('/member/corporate/delete_user_divisi', members)
            .then((res) => {
              if (res.data.status === 'success') {
                this.$q.notify({
                  message: res.data.message,
                  position: 'top',
                  type: 'positive'
                })
                this.getDataMember()
                // window.setTimeout(function () {
                //   location.reload()
                // }, 1500)
              } else {
                this.$q.notify({
                  color: 'negative',
                  textColor: 'white',
                  icon: 'error',
                  position: 'top',
                  message: 'Failed to add divisi'
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
    },
    deleteData () {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete this divisi?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          axios
            .delete('/member/corporate/divisi/' + this.$route.params.id)
            .then((res) => {
              if (res.data.status === 'success') {
                this.$q.notify({
                  message: res.data.message,
                  position: 'top',
                  type: 'positive'
                })
                setTimeout(
                  () =>
                    this.$router.push({
                      path: '/dashboard/manage-corporate/divisi/manage-divisi'
                    }),
                  1000
                )
              } else {
                this.$q.notify({
                  color: 'negative',
                  textColor: 'white',
                  icon: 'error',
                  position: 'top',
                  message: 'Failed to delete divisi'
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
    }
  }
}
</script>
