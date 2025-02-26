<template>
    <div class="q-pa-sm font-monserrat">
        <div class="q-my-sm column">
            <span class="col q-mb-sm">Title</span>
            <q-input outlined v-model="data.title" ref="titleRef" maxlength="50" placeholder="Type Title" :rules="[
                val => !!val || '* Required'
            ]" />
        </div>
        <div class="q-my-sm column">
            <span class="col q-mb-sm">Link</span>
            <q-input outlined v-model="data.link" ref="linkRef" placeholder="ex: https://tagid.ai/" :rules="[
                val => !!val || '* Required'
            ]"/>
        </div>
        <div class="q-my-sm row">
            <span class="col-12 q-mb-sm">Image</span>
            <q-img class="col-2 q-mr-md" alt="Profile Logo" v-if="iconFilter" :src="iconFilter.image" width="40px" height="40px" />
            <q-btn class="col-2 bg-grey text-white text-capitalize" label="Choose Icon" size="md" @click="imageModal = true" />
        </div>
        <div class="q-my-md row">
            <span class="col-8 q-mb-sm">Show or Hide</span>
            <q-toggle
                class="col-1 q-ml-auto"
                v-model="data.display"
                color="primary"
                keep-color
            />
        </div>
        <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Save" size="lg"
            @click="saveData()" rounded />

        <!-- Image Modal -->
        <q-dialog v-model="imageModal" style="width:700px" persistent>
            <q-card style="border-top: 5px solid #116C54; width: 500px;">
                <q-toolbar class="text-black">
                    <q-toolbar-title class="q-ml-xl text-center text-h6">Choose Icon</q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup @keydown.esc="imageModal = false;" />
                </q-toolbar>
                <q-card-section>
                    <!-- <div class="row">
                        <div class="col-3 q-my-sm text-center" v-for="br in Shortcut" :key="br" :name="br">
                            <q-radio class="" style="z-index: 10; margin-left: 40px; margin-top: -20px; position: absolute;"
                            v-model="data.icon_id" :val="br.id" color="teal" size="md" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" />
                            <q-img alt="Profile Logo" width="55px" height="55px" :src="br.image" />
                        </div>
                    </div> -->
                    <q-carousel v-model="slide" swipeable animated padding
                        control-color="black"
                        navigation
                        style="max-height: 315px;" class="text-black q-mt-sm">
                        <q-carousel-slide v-for="br in dataCeil" :key="br" :name="br" class="column">
                            <div class="row">
                                <div class="col-3 q-my-sm text-center column" v-for="brd in Shortcut.slice(br*12-12, br*12)" :key="brd" :name="brd">
                                    <q-radio class="" style="z-index: 10; margin-left: 62px; margin-top: -20px; position: absolute;"
                                    v-model="data.icon_id" :val="brd.id" color="teal" size="md" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" />
                                    <q-img alt="Profile Logo" width="45px" height="45px" class="self-center" :src="brd.image" />
                                    <span class="text-grey">{{ brd.name }}</span>
                                </div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </q-card-section>
                <q-card-actions class="justify-end">
                    <q-btn label="Save" class="bg-primary text-white" @click="imageModal = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  components: { },
  data () {
    return {
      Shortcut: [],
      slide: 1,
      data: {},
      imageModal: false
    }
  },
  computed: {
    iconFilter () {
      if (this.data.icon_id) {
        const d = this.Shortcut.filter(d => d.id === this.data.icon_id)
        return d[0]
      }

      return null
    },
    dataCeil () {
      const a = this.Shortcut.length / 12
      return Math.ceil(a)
    }
  },
  created () {
    const fetchData = async () => {
      await axios.get(`/shortcut/${this.$route.params.id}`).then(response => {
        this.data = response.data.data
      })
      await axios.get('/shortcut/icon').then(response => {
        this.Shortcut = response.data.data
      })
    }

    fetchData()
  },
  methods: {
    saveData () {
      this.$refs.titleRef.validate()
      this.$refs.linkRef.validate()
      if (this.$refs.titleRef.hasError || this.$refs.linkRef.hasError || !this.data.icon) {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          position: 'top',
          icon: 'error',
          message: 'Fill The Form!'
        })
      } else {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('icon', this.data.icon_id)
        formData.append('title', this.data.title)
        formData.append('display', this.data.display)
        formData.append('link', this.data.link)
        axios.post(`/shortcut/${this.$route.params.id}`, formData)
          .then(res => {
            if (res.data.status === 'success') {
              this.$q.notify({
                message: 'Success Edit Shortcut',
                position: 'top',
                type: 'positive'
              })
              setTimeout(() => this.$router.push({ path: '/dashboard/manage-shortcut' }), 1000)
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
            console.log(err)
          })
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
