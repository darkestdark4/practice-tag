<template>
    <div class="q-pa-sm font-monserrat">
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Title</span>
            <q-input outlined v-model="data.partner_name" ref="titleRef" maxlength="50" placeholder="Type Title" :rules="[
                val => !!val || '* Required'
            ]" />
        </div>
        <div class="q-my-md column">
            <span class="col q-mb-sm text-grey-7">Description</span>
            <q-editor min-height="5rem" outlined v-model="data.partner_description" ref="descriptionRef" placeholder="Type Description"
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
            <q-input dense outlined v-model="data.partner_info" ref="infoRef" maxlength="50" placeholder="Type Info" :rules="[
                val => !!val || '* Required'
            ]" :disable="data.pin_code ? false : true" />
        </div>
        <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Save" size="lg"
            @click="saveData()" rounded />
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      data: {
        title: '',
        description: '',
        pin_code: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('/partner/cabang/' + this.$route.params.id).then(response => {
        this.data = response.data.data
      })
    },
    saveData () {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('title', this.data.partner_name)
      formData.append('description', this.data.partner_description)
      formData.append('info', this.data.partner_info)
      formData.append('pin_code', this.data.pin_code)
      axios.post('/partner/cabang/' + this.$route.params.id, formData)
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
          console.log(err)
        })
    },
    generatePin () {
      // Pin 6 Number Random
      let pin = ''
      for (let i = 0; i < 6; i++) {
        pin += Math.floor(Math.random() * 10)
      }
      this.data.pin_code = pin
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
