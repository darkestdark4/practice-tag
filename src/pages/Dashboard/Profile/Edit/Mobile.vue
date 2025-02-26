<template>
  <div class="q-pa-sm font-monserrat">
    <q-tabs dense class="text-grey border-radius-10px" active-color="secondary" indicator-color="secondary"
      align="justify" narrow-indicator outside-arrows mobile-arrows style="border: 1px solid #efefef">
      <q-route-tab class="text-capitalize" label="Preview" to="/dashboard/profile" exact />
      <q-route-tab class="bg-secondary text-white text-capitalize" label="Edit" to="/dashboard/profile/edit" />
    </q-tabs>
    <q-separator />
    <div class="q-pa-sm">
      <div class="q-mb-md">
        <div class="q-my-sm text-h6 text-grey-6">Personal Detail</div>
        <div class="q-my-md">
          <q-markup-table class="full-width" flat>
            <tr>
              <th class="text-center">Profile Picture</th>
              <th class="text-center" v-show="!$store.state.userdata.user.corporate_id">Background</th>
            </tr>
            <tr>
              <td>
                <div class="text-center q-mb-sm">
                  <q-img @error="handlingProfileError"
                    :src="`${$store.state.userdata.user.logo ? linkStorageProfile + $store.state.userdata.user.logo : Profile}`"
                    width="75px" height="75px" class="border-radius-10px">
                    <div class="absolute-full text-subtitle2 flex flex-center" v-if="!$store.state.userdata.user.logo">
                      <q-icon class="cursor-pointer" name="file_upload" size="xl"
                        @click="$refs.ProfilePicture.click()" />
                      <input ref="ProfilePicture" type="file" accept="image/*" style="display: none;"
                        @change="onFileSelectProfile" />
                    </div>
                    <div class="absolute-full text-subtitle2 flex flex-center"
                      v-else-if="$store.state.userdata.user.logo">
                      <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="modalPhotoProfile = true" />
                      <input ref="ProfilePicture" type="file" accept="image/*" style="display: none;"
                        @change="onFileSelectProfile" />
                    </div>
                  </q-img>
                </div>
                <div style="width:100%; font-size: 9px; word-wrap: break-word; text-align: center;">
                  <small class="text-bold">For Profile Picture:</small><br />
                  <small>Upload the image in format .GIF, .jpg or .png. </small><br />
                  <small>Dimensions should be at least 300px x 300px.</small><br />
                  <small>Max. file size 5mb</small><br /><br />
                  <small class="text-bold">For Background Image:</small><br />
                  <small>Upload the image in format .GIF, .jpg or .png.</small><br />
                  <small> Dimensions should be at least 300px x 300px.</small><br />
                  <small>Max. file size 5mb</small><br />
                </div>
              </td>
              <td class="text-center" v-show="!$store.state.userdata.user.corporate_id">
                <video-background v-if="isBackgroundVideo"
                  :src="`${data.member.background ? linkStorageBg + data.member.background : VideoExample}`"
                  style="width: 100%; height: 200px;">
                  <div class="absolute-full text-subtitle2 flex flex-center"
                    v-if="$store.state.userdata.user.background">
                    <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="modalBackgroundImage = true" />
                    <input ref="Background" type="file" accept="image/*,video/*" style="display: none;"
                      @change="onFileSelectBackground" />
                  </div>
                  <div class="absolute-full text-subtitle2 flex flex-center"
                    v-else-if="!$store.state.userdata.user.background">
                    <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="$refs.Background.click()" />
                    <input ref="Background" type="file" accept="image/*,video/*" style="display: none;"
                      @change="onFileSelectBackground" />
                  </div>
                </video-background>
                <q-img v-if="!isBackgroundVideo" @error="handlingBackgroundError"
                  :src="`${data.member.background ? linkStorageBg + data.member.background : Background}`" width="150px"
                  height="210px" class="border-radius-10px">
                  <div class="absolute-full text-subtitle2 flex flex-center"
                    v-if="$store.state.userdata.user.background">
                    <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="modalBackgroundImage = true" />
                    <input ref="Background" type="file" accept="image/*,video/*" style="display: none;"
                      @change="onFileSelectBackground" />
                  </div>
                  <div class="absolute-full text-subtitle2 flex flex-center"
                    v-else-if="!$store.state.userdata.user.background">
                    <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="$refs.Background.click()" />
                    <input ref="Background" type="file" accept="image/*,video/*" style="display: none;"
                      @change="onFileSelectBackground" />
                  </div>
                </q-img>
              </td>
            </tr>
          </q-markup-table>
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">First Name*</div>
          <q-input class="full-width" @change="updateStore()" v-model="data.member.member_first_name"
            :error="$v.data.member.member_first_name.$error"
            :error-message="validationMsg($v.data.member.member_first_name)" placeholder="Your First Name" outlined />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Middle Name (optional)</div>
          <q-input class="full-width qq-placeholder" @change="updateStore()" v-model="data.member.member_middle_name"
            placeholder="Your Middle Name" outlined />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Last Name*</div>
          <q-input class="full-width" @change="updateStore()" v-model="data.member.member_last_name"
            :error="$v.data.member.member_last_name.$error"
            :error-message="validationMsg($v.data.member.member_last_name)" placeholder="Your Last Name" outlined />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Gender*</div>
          <q-select class="full-width" v-model="data.member.member_gender" :error="$v.data.member.member_gender.$error"
            :error-message="validationMsg($v.data.member.member_gender)" placeholder="Your Gender"
            :options="genderOptions" outlined map-options emit-value />
        </div>
        <div class="q-my-md">
          <div class="q-mb-sm text-grey-7">Birth Date*</div>
          <q-input filled v-model="data.member.member_dob" :error="$v.data.member.member_dob.$error"
            :error-message="validationMsg($v.data.member.member_dob)">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.member.member_dob" mask="DD-MM-YYYY" subtitle="Birthday"
                    :title="data.member.member_first_name">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="q-my-md" v-show="$store.state.userdata.user.corporate_id === 3">
          <div class="q-mb-sm text-grey-7">Education</div>
          <q-select class="full-width" v-model="data.member.member_education" placeholder="Education"
            :options="educationOptions" outlined map-options emit-value />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Title*</span>
          <q-input class="full-width" v-model="data.member.profil" :error="$v.data.member.profil.$error"
            :error-message="validationMsg($v.data.member.profil)" placeholder="Role in your company / Job Title"
            outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Email*</span>
          <q-input class="full-width" @change="updateStore()" type="email" v-model="data.member.member_email"
            :error="$v.data.member.member_email.$error" :error-message="validationMsg($v.data.member.member_email)"
            placeholder="i.e yourname@yourcompany.com" outlined />
        </div>
        <div class="q-my-md" v-show="$store.state.userdata.user.corporate_id === 3">
          <div class="q-mb-sm text-grey-7">Tech Savvy</div>
          <q-select class="full-width" v-model="data.member.member_text_savvy" placeholder="Text Savvy?"
            :options="textSavyOptions" outlined map-options emit-value />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Biography</span>
          <!-- <q-input class="full-width" v-model="data.member.biography" type="textarea"
            placeholder="How would you describe yourself?" outlined /> -->
          <q-editor min-height="5rem" outlined v-model="data.member.biography" ref="biographyRef"
            placeholder="How Would you describe yourself?" :toolbar="[
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
            ]" :fonts="{
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
        <div class="q-my-md" v-show="$store.state.userdata.user.corporate_id === 3">
          <div class="q-mb-sm text-grey-7">Occupation</div>
          <q-select class="full-width" v-model="data.member.member_occupation" placeholder="Your Occupation"
            :options="occupationOptions" outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Mobile Phone*</span>
          <div class="col row">
            <q-select class="col-3" outlined v-model="data.member.phone_code" :options="phoneCodeList" map-options
              emit-value />
            <q-input class="col-9" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.member.member_phone" :error="$v.data.member.member_phone.$error"
              :error-message="validationMsg($v.data.member.member_phone)" placeholder="i.e 817027777" outlined />
          </div>
        </div>
        <div class="q-my-md" v-show="$store.state.userdata.user.corporate_id === 3">
          <div class="q-mb-sm text-grey-7">Provider</div>
          <q-select class="full-width" v-model="data.member.member_provider" placeholder="Your Provider Phone Number"
            :options="providerOptions" outlined map-options emit-value />
        </div>
        <div class="q-my-md" v-show="$store.state.userdata.user.corporate_id === 3">
          <div class="q-mb-sm text-grey-7">Type Smartphone</div>
          <q-select class="full-width" v-model="data.member.member_phone_type" placeholder="Your Phone Type"
            :options="typePhoneOptions" outlined map-options emit-value />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Commerce</span>
          <q-input class="full-width" v-model="data.member.commerce"
            placeholder="Your store URL, i.e https://storename.beonco.com" outlined />
        </div>
        <div class="q-my-md" v-show="$store.state.userdata.user.corporate_id === 3">
          <div class="q-mb-sm text-grey-7">Socioeconomic</div>
          <q-select class="full-width" v-model="data.member.member_ses" placeholder="Your Socioeconomic"
            :options="sesOptions" outlined map-options emit-value />
        </div>
        <div class="q-my-md column" v-show="$store.state.userdata.user.corporate_id != 48">
          <div class="col row q-mb-sm">
            <span class="col-6 text-left text-grey-7">Social Media</span>
            <span class="col-6 text-right text-secondary text-bold cursor-pointer" @click="socmedModalAdd = true">+ Add
              Social Media</span>
          </div>
          <div class="col q-mb-lg" v-for="(socmed, idx) in socmedList" :key="idx">
            <q-input class="full-width" @change="updateStore()" v-model="socmedList[idx].socmed_link"
              placeholder="Input your social media URL, i.e https://facebook.com/tagiddotai" style="margin-top:-20px"
              readonly outlined>
              <template v-slot:prepend>
                <span class="text-body2">
                  {{ socmed.socmed_title }}
                </span>
              </template>
            </q-input>
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @click="editSocmed(socmed)">Edit</span>
              <span class="q-ml-md text-secondary text-bold cursor-pointer" @click="deleteSocmed(socmed.id)">Delete
              </span>
            </div>
          </div>
        </div>
        <div class="q-my-md column">
          <div class="col row q-mb-sm">
            <span class="col-6 text-left text-grey-7">Contact Phone</span>
            <span class="col-6 text-right text-secondary text-bold cursor-pointer" @click="phoneModalAdd = true">+ Add
              Contact Phone</span>
          </div>
          <div class="col q-mb-lg" v-for="(phone, idx) in phoneList" :key="idx">
            <q-input class="full-width" v-model="phoneList[idx].phone_number" placeholder="i.e 817027777"
              style="margin-top:-20px" readonly outlined />
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @click="editPhone(phone)">Edit</span>
              <span class="q-ml-md text-secondary text-bold cursor-pointer" @click="deletePhone(phone.id)">Delete
              </span>
            </div>
          </div>
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">ID Number</span>
          <q-input v-if="data.member.role == 'Admin'" class="full-width" type="number"
            onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
            v-model="data.member.identity_number"
            placeholder="Input your ID Card Number / Member ID / Employee ID / Student ID / others" outlined />
          <q-input v-else class="full-width" type="number"
            onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
            v-model="data.member.identity_number"
            placeholder="Input your ID Card Number / Member ID / Employee ID / Student ID / others" readonly outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Link Room</span>
          <q-input class="full-width" v-model="data.member.link_room" placeholder="i.e https://meet.google.com/"
            outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Vaccine Info*</span>
          <q-select outlined v-model="data.member.vaccine1" :error="$v.data.member.vaccine1.$error"
            :error-message="validationMsg($v.data.member.vaccine1)" :options="vaccineOptions" />
        </div>
        <div class="q-my-md column">
          <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Address</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer"
              @click="addressModalAdd = true">+ Add Address</span>
          </div>
          <div class="col q-my-md" v-for="(alamat, idx) in addressList" :key="idx">
            <q-input class="full-width" style="margin-top:-20px" readonly outlined>
              <template v-slot:prepend>
                <span class="text-body2 text-black">
                  <q-icon v-if="alamat.address_type === 'home'" class="q-mr-sm" name="home" size="sm" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" />
                  <q-icon v-else-if="alamat.address_type === 'office'" class="q-mr-sm" name="meeting_room" size="sm" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" />
                  <q-icon v-else-if="alamat.address_type === 'apartment'" class="q-mr-sm" name="apartment" size="sm" :style="`color: ${$store.state.userdata.user.main_color ? $store.state.userdata.user.main_color : '#116C54'}`" />
                </span>
                <span class="text-body2 text-black">
                  {{ alamat.address }}, {{ alamat.city.name }}, {{ alamat.state.name }}, {{ alamat.country.name }} - {{ alamat.address_postal_code }}
                </span>
              </template>
            </q-input>
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @click="editAddress(alamat)">Edit</span>
              <span class="q-ml-sm text-secondary text-bold cursor-pointer" @click="deleteAddress(alamat.id)">Delete
              </span>
            </div>
          </div>
        </div>
        <div class="q-my-md column">
          <div class="col q-mb-lg" v-for="(survey, idx) in surveyData" :key="idx">
            <span class="col-6 text-left text-bold text-grey-7 q-mb-md">{{survey.title}}</span>
            <div class="column" v-for="(surveyDetail, idx) in survey.survey_detail" :key="idx">
              <span class="col q-mb-sm text-grey-7">{{surveyDetail.description}}</span>
              <q-input class="full-width" v-model="surveyDetail.value" placeholder=""
                outlined />
            </div>
          </div>
        </div>
      </div>
      <q-separator />
      <div class="q-my-md">
        <div class="q-my-sm text-h6 text-grey-6">Payment</div>
        <div class="row q-my-xl">
          <div class="col-3 q-mb-md">
            <q-img :src="LinkAja" width="75px" />
          </div>
          <div class="col-9">
            <div class="column">
              <div class="col text-bold">
                LinkAja
              </div>
              <div class="col">Pembayaran, Pinjaman, & Investasi Online dalam satu genggaman.</div>
            </div>
          </div>
        </div>
        <q-btn class="full-width bg-grey-5 text-white" label="Connect" size="lg" rounded />
      </div>
      <q-separator />
      <div class="q-my-md" v-if="data.member.corporate_id">
        <div class="q-my-sm text-h6 text-grey-6">Company Organization Detail</div>
        <div class="column q-my-md flex flex-center">
          <span class="col q-mb-md text-bold">Company Logo</span>
          <q-img @error="handlingCorporateLogoError"
            :src="`${$store.state.userdata.corporate.logo ? linkStorageCorpLogo + $store.state.userdata.corporate.logo : CompanyLogo}`"
            width="75px" height="75px" class="border-radius-10px">
            <!-- <div class="absolute-full text-subtitle2 flex flex-center">
              <q-icon class="cursor-pointer" name="file_upload" size="md" @click="$refs.CompanyLogo.click()"
                v-if="data.member.role == 'Admin'" />
              <input ref="CompanyLogo" type="file" style="display: none;" @change="onFileSelectCompanyLogo" />
            </div> -->
            <div class="absolute-full text-subtitle2 flex flex-center" v-if="!$store.state.userdata.corporate.logo">
              <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="$refs.CompanyLogo.click()"
                v-show="data.member.role == 'Admin'" />
              <input ref="CompanyLogo" type="file" accept="image/*" style="display: none;"
                @change="onFileSelectCompanyLogo" />
            </div>
            <div class="absolute-full text-subtitle2 flex flex-center" v-else-if="$store.state.userdata.corporate.logo">
              <q-icon class="cursor-pointer" name="file_upload" size="xl" @click="modalCorporatePhoto = true"
                v-show="data.member.role == 'Admin'" />
              <input ref="CompanyLogo" type="file" accept="image/*" style="display: none;"
                @change="onFileSelectCompanyLogo" />
            </div>
          </q-img>
          <div class="col q-pa-sm flex flex-center">
            <small>
              Upload the logo image in format .jpg or .png. Dimensions should be at least 300px x 300px.
              Max. file size 5mb
            </small>
          </div>
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Name</span>
          <q-input class="col full-width" @change="updateStore()" v-if="data.member.role == 'Admin'"
            v-model="data.corporate.corporate_name" placeholder="Your Company Name" outlined />
          <q-input class="col full-width" v-if="data.member.role == 'Anggota'" v-model="data.corporate.corporate_name"
            placeholder="Your Company Name" outlined disable />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Description</span>
          <!-- <q-input class="full-width" @change="updateStore()" v-if="data.member.role == 'Admin'"
            v-model="data.corporate.corporate_description" type="textarea" placeholder="Input description here ....."
            outlined /> -->
          <q-editor min-height="5rem" outlined v-model="data.corporate.corporate_description" ref="biographyRef"
            v-if="data.member.role == 'Admin'" placeholder="Input Description Here ....." :toolbar="[
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
            ]" :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }" />
          <q-input class="full-width" v-if="data.member.role == 'Anggota'"
            v-model="data.corporate.corporate_description" type="textarea" placeholder="Input description here ....."
            outlined disable />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Website</span>
          <q-input class="full-width" @change="updateStore()" v-if="data.member.role == 'Admin'"
            v-model="data.corporate.corporate_website" placeholder="i.e https:://tagid.ai" outlined />
          <q-input class="full-width" v-if="data.member.role == 'Anggota'" v-model="data.corporate.corporate_website"
            placeholder="i.e https:://tagid.ai" outlined disable />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Commerce</span>
          <q-input class="full-width" @change="updateStore()" v-if="data.member.role == 'Admin'"
            v-model="data.corporate.commerce_group" placeholder="i.e https:://storename.beonco.com" outlined />
          <q-input class="full-width" v-if="data.member.role == 'Anggota'" v-model="data.corporate.commerce_group"
            placeholder="i.e https:://storename.beonco.com" outlined disable />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Phone Number</span>
          <div class="col row">
            <q-select class="col-3" @change="updateStore()" v-if="data.member.role == 'Admin'" outlined
              v-model="data.corporate.corporate_phonecode" :options="phoneCodeList" map-options emit-value />
            <q-input class="col-9" v-if="data.member.role == 'Admin'" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.corporate.corporate_phone" placeholder="Your Company Phone Number" outlined />
            <q-select class="col-3" @change="updateStore()" v-if="data.member.role == 'Anggota'" outlined
              v-model="data.corporate.corporate_phonecode" :options="phoneCodeList" map-options emit-value disable />
            <q-input class="col-9" v-if="data.member.role == 'Anggota'" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.corporate.corporate_phone" placeholder="Your Company Phone Number" outlined disable />
          </div>
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Telephone Number</span>
          <div class="col row">
            <q-select class="col-3" @change="updateStore()" v-if="data.member.role == 'Admin'" outlined
              v-model="data.corporate.corporate_telephonecode" :options="phoneCodeList" map-options emit-value />
            <q-input class="col-9" v-if="data.member.role == 'Admin'" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.corporate.corporate_telephone" placeholder="Your Company Telephone Number" outlined />
            <q-select class="col-3" @change="updateStore()" v-if="data.member.role == 'Anggota'" outlined
              v-model="data.corporate.corporate_telephonecode" :options="phoneCodeList" map-options emit-value
              disable />
            <q-input class="col-9" v-if="data.member.role == 'Anggota'" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.corporate.corporate_telephone" placeholder="Your Company Telephone Number" outlined
              disable />
          </div>
        </div>
        <div class="q-my-md column">
          <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Office Address</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer" @change="updateStore()"
              v-if="data.member.role == 'Admin'" @click="officeModalAdd = true">+ Add Office</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-not-allowed"
              v-if="data.member.role == 'Anggota'">+ Add Office</span>
          </div>
          <div class="col q-mb-lg" v-for="(office, idx) in officeList" :key="idx">
            <q-input class="full-width" @change="updateStore()" style="margin-top:-20px" readonly
              outlined :disabled="data.member.role == 'Anggota'">
                <template v-slot:prepend>
                  <span class="text-body2 text-black">
                    {{ office.corporate_address }},
                    {{ office.city ? office.city.name : '' }},
                    {{ office.state ? office.state.name : '' }},
                    {{ office.country ? office.country.name : '' }} - {{ office.corporate_postal_code }}
                  </span>
                </template>
            </q-input>
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @change="updateStore()"
                v-if="data.member.role == 'Admin'" @click="editOffice(office)">Edit</span>
              <span class="q-ml-md text-secondary text-bold cursor-pointer" v-if="data.member.role == 'Admin'"
                @click="deleteOffice(office.id)">Delete </span>
              <span class="text-grey text-bold cursor-not-allowed" v-if="data.member.role == 'Anggota'">Edit</span>
              <span class="q-ml-md text-grey text-bold cursor-not-allowed" v-if="data.member.role == 'Anggota'">Delete
              </span>
            </div>
          </div>
        </div>
        <div class="q-my-md column" v-if="socialMediaCorporateList">
          <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Social Media</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer"
              v-if="data.member.role == 'Admin'" @click="socmedCorporateModalAdd = true">+ Add Social Media</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-not-allowed"
              v-else-if="data.member.role == 'Anggota'">+ Add Video</span>
          </div>
          <div class="col q-mb-lg" v-for="(list, idx) in socialMediaCorporateList" :key="idx">
            <q-input class="full-width" v-model="socialMediaCorporateList[idx].link" placeholder="https://youtu.be/G2fyCbtEi7g"
            style="margin-top:-20px" readonly outlined :disabled="data.member.role === 'Anggota'">
              <template v-slot:prepend>
                <span class="text-body2">
                  {{ list.name }}
                </span>
              </template>
            </q-input>
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" v-if="data.member.role == 'Admin'"
                @click="editSocialMediaCorporate(list)">Edit</span>
              <span class="text-grey text-bold cursor-not-allowed" v-else-if="data.member.role == 'Anggota'">Edit</span>
              <span class="q-ml-md text-secondary text-bold cursor-pointer" v-if="data.member.role == 'Admin'"
                @click="deleteSocialMediaCorporate(list.id)">Delete </span>
              <span class="q-ml-md text-grey text-bold cursor-not-allowed"
                v-else-if="data.member.role == 'Anggota'">Delete </span>
            </div>
            <!-- <div class="col q-mb-lg" v-for="(socmed, idx) in socmedList" :key="idx">
              <q-input class="full-width" @change="updateStore()" v-model="socmedList[idx].socmed_link"
                placeholder="Input your social media URL, i.e https://facebook.com/tagiddotai" style="margin-top:-20px"
                readonly outlined />
              <div class="row">
                <span class="text-secondary text-bold cursor-pointer" @click="editSocmed(socmed)">Edit</span>
                <span class="q-ml-md text-secondary text-bold cursor-pointer" @click="deleteSocmed(socmed.id)">Delete
                </span>
              </div>
            </div> -->
          </div>
        </div>
        <div class="q-my-md column" v-if="data.member.role == 'Admin'">
          <!-- Add Document Multiple -->
          <!-- <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Document</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer"
              v-if="data.member.role == 'Admin'" @click="documentCorporateModalAdd = true">+ Add Document</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-not-allowed"
              v-else-if="data.member.role == 'Anggota'">+ Add Document</span>
          </div>
          <div class="col q-mb-lg" v-for="(list, idx) in pdfList" :key="idx">
            <q-input class="full-width" v-model="pdfList[idx].title" v-if="data.member.role == 'Admin'"
              placeholder="Nama Title" style="margin-top:-20px" readonly outlined />
            <q-input class="full-width" v-model="pdfList[idx].name"
              v-else-if="data.member.role == 'Anggota'" placeholder="Nama Title"
              style="margin-top:-20px" readonly outlined disable />
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" v-if="data.member.role == 'Admin'"
                @click="editDocumentCorporate(list)">Edit</span>
              <span class="text-grey text-bold cursor-not-allowed" v-else-if="data.member.role == 'Anggota'">Edit</span>
              <span class="q-ml-md text-secondary text-bold cursor-pointer" v-if="data.member.role == 'Admin'"
                @click="deleteDocumentCorporate(list.id)">Delete </span>
              <span class="q-ml-md text-grey text-bold cursor-not-allowed"
                v-else-if="data.member.role == 'Anggota'">Delete </span>
            </div>
          </div> -->
          <span class="col q-mb-sm text-grey-7">
            Upload Document
            <span class="q-ml-sm text-small">
              <q-icon name="help_outline" />
              <q-tooltip anchor="top right" self="center middle" transition-show="flip-right"
                transition-hide="flip-left">
                <span>
                  Format File Accepted: PDF.
                </span>
                <br />
                <span>
                  Max File Size: 3mb
                </span>
              </q-tooltip>
            </span>
          </span>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
          </vue-dropzone>
          <div class="row">
            <q-btn v-if="$store.state.userdata.corporate.file_pdf"
              class="q-mt-md col-7 bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              style="height: 50px; font-size: 12px;" :label="$store.state.userdata.corporate.file_pdf"
              @click="showPdfView($store.state.userdata.corporate.file_pdf)" />
            <q-btn v-if="$store.state.userdata.corporate.file_pdf"
              class="q-mt-md col-3 offset-1 bg-red text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              style="height: 50px; font-size: 12px;" label="Delete" @click="deletePdfCorporate()" />
          </div>
          <span class="col q-mt-md q-mb-sm text-grey-7">
            Upload Background
            <span class="q-ml-sm text-small">
              <q-icon name="help_outline" />
              <q-tooltip anchor="top right" self="center middle" transition-show="flip-right"
                transition-hide="flip-left">
                <span>
                  Format Image: jpeg,jpg,png,gif,tiff,raw
                </span>
                <br />
                <span>
                  Format Video: webm,mkv,mp4,avi,mov,mpg,mpeg,3gp
                </span>
                <br />
                <span>
                  Max File Size: 3mb
                </span>
              </q-tooltip>
            </span>
          </span>
          <vue-dropzone ref="myVueDropzone" v-on:vdropzone-sending="sendingEvent" id="dropzone"
            :options="dropzoneBGOptions">
          </vue-dropzone>
          <!-- <q-btn v-if="data.member.corporate.background !== null"
            class="q-mt-sm bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
            :label="data.member.corporate.background" @click="showBGView(data.member.corporate.background)" /> -->
          <div class="row">
            <q-btn v-if="data.member.corporate.background !== null"
              class="q-mt-md col-7 bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              style="height: 50px; font-size: 12px;" :label="data.member.corporate.background"
              @click="showBGView(data.member.corporate.background)" />
            <q-btn v-if="data.member.corporate.background !== null"
              class="q-mt-md col-3 offset-1 bg-red text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              style="height: 50px; font-size: 12px;" label="Delete" @click="deleteBGCorporate()" />
          </div>
        </div>
        <!-- <div class="q-my-md column" v-if="data.member.role == 'Anggota'">
          <div v-if="$store.state.userdata.user.pdf_file">
            <span class="col q-mb-sm text-grey-7">Document</span>
            <q-btn v-if="$store.state.userdata.user.pdf_file !== null" class="q-mt-md bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm" :label="$store.state.userdata.user.pdf_file" @click="showPdfView($store.state.userdata.user.pdf_file)"/>
          </div>
        </div> -->
      </div>
      <div class="q-my-md" v-if="!data.member.corporate_id">
        <div class="q-my-sm text-h6 text-grey-6">Company Organization Detail</div>
        <div class="column q-my-md flex flex-center">
          <span class="col q-mb-md text-bold">Company Logo</span>
          <q-img @error="handlingCompanyLogoError"
            :src="`${$store.state.userdata.user.company_logo ? linkStorageCompLogo + $store.state.userdata.user.company_logo : CompanyLogo}`"
            width="75px" height="75px" class="border-radius-10px">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <q-icon class="cursor-pointer" name="file_upload" size="md" @click="$refs.CompanyLogo.click()" />
              <input ref="CompanyLogo" type="file" style="display: none;" @change="onFileSelectCompanyLogo" />
            </div>
          </q-img>
          <div class="col q-pa-sm flex flex-center">
            <small>
              Upload the logo image in format .jpg or .png. Dimensions should be at least 300px x 300px.
              Max. file size 5mb
            </small>
          </div>
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Name</span>
          <q-input class="col full-width" v-model="data.member.company_name" @change="updateStore()"
            placeholder="Your Company Name" outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Description</span>
          <q-input class="full-width" v-model="data.member.company_description" @change="updateStore()" type="textarea"
            placeholder="Input description here ....." outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Website</span>
          <q-input class="full-width" v-model="data.member.company_contact_website" @change="updateStore()"
            placeholder="i.e https:://tagid.ai" outlined />
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Mobile Phone Number</span>
          <div class="col row">
            <q-select class="col-3" outlined v-model="data.phone_code_mobile" :options="phoneCodeList" map-options
              emit-value />
            <q-input class="col-9" type="number" @change="updateStore()"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.member.company_contact_mobile" placeholder="Your Company Mobile Phone Number" outlined />
          </div>
        </div>
        <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Telephone Number</span>
          <div class="col row">
            <q-select class="col-3" outlined v-model="data.phone_code_phone" :options="phoneCodeList" map-options
              emit-value />
            <q-input class="col-9" type="number" @change="updateStore()"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="data.member.company_contact_phone" placeholder="Your Company Telephone Number" outlined />
          </div>
        </div>
        <!-- <div class="col q-my-md column" v-for="(alamat, idx) in addressList" :key="idx">
          <q-input class="full-width" v-model="addressList[idx].address" placeholder="i.e Jl. Soekarno Hatta No. 1, Malang" style="margin-top:-20px" readonly outlined />
          <div class="row">
            <span class="text-secondary text-bold cursor-pointer" @click="editAddress(alamat)">Edit</span>
            <span class="q-ml-sm text-secondary text-bold cursor-pointer" @click="deleteAddress(alamat.id)">Delete </span>
          </div>
        </div> -->
        <div class="q-my-md column">
          <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Office</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer"
              @click="addressModalAdd = true">+ Add Office</span>
          </div>
          <div class="col q-mb-lg" v-for="(address, idx) in addressList" :key="idx">
            <q-input class="full-width" v-model="addressList[idx].address"
              placeholder="i.e Jl. Soekarno Hatta No. 1, Malang" style="margin-top:-20px" readonly outlined />
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @click="editAddress(alamat)">Edit</span>
              <span class="q-ml-sm text-secondary text-bold cursor-pointer" @click="deleteAddress(alamat.id)">Delete
              </span>
            </div>
          </div>
        </div>
        <!-- <div class="q-my-md column">
          <div class="col row">
            <span class="col-6 text-left q-mb-sm text-grey-7">Video</span>
            <span class="col-6 text-right q-mb-sm text-secondary text-bold cursor-pointer" @click="socmedCorporateModalAdd = true">+ Add Video</span>
          </div>
          <div class="col q-mb-lg" v-for="(list, idx) in socialMediaCorporateList" :key="idx">
            <q-input class="full-width" v-model="socialMediaCorporateList[idx].video" placeholder="https://youtu.be/G2fyCbtEi7g" style="margin-top:-20px" readonly outlined/>
            <div class="row">
              <span class="text-secondary text-bold cursor-pointer" @click="editSocialMediaCorporate(list)">Edit</span>
            </div>
          </div>
        </div> -->
        <!-- <div class="q-my-md column">
          <span class="col q-mb-sm text-grey-7">Upload Document</span>
          <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions">
          </vue-dropzone>
          <q-btn v-if="$store.state.userdata.user.pdf_file !== null" class="q-mt-md bg-secondary text-white font-proxima-nova-alt border-radius-10px q-px-sm" :label="$store.state.userdata.user.pdf_file" @click="showPdfView($store.state.userdata.user.pdf_file)"/>
        </div> -->
      </div>
      <q-separator />
      <div class="q-my-md flex flex-center" v-if="data.member.role == 'Admin'">
        <div class="q-my-sm text-h6 text-grey-6">Change Color</div>
        <div class="row q-my-md">
          <div class="column q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 flex flex-center">
            <div class="q-mb-sm">
              <span class="text-bold q-mr-sm">Main Color</span>
              <span class="text-grey-7">(bg, button, title)</span>
            </div>
            <q-color v-model="data.corporate.corporate_main_color" dark default-view="palette" class="my-picker full-width" />
          </div>
          <div class="column q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 flex flex-center">
            <div class="q-mb-sm">
              <span class="text-bold q-mr-sm">Secondary Color</span>
              <span class="text-grey-7">(description)</span>
            </div>
            <q-color v-model="data.corporate.corporate_secondary_color" dark default-view="palette" class="my-picker full-width" />
          </div>
        </div>
      </div>
      <div class="q-my-md flex flex-center" v-if="!data.member.corporate_id">
        <div class="q-my-sm text-h6 text-grey-6">Change Color</div>
        <div class="row q-my-md">
          <div class="q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="q-mb-sm">
              <span class="text-bold q-mr-sm">Main Color</span>
              <span class="text-grey-7">(bg, button, title)</span>
            </div>
            <q-color v-model="data.member.main_color" dark default-view="palette" class="my-picker" />
          </div>
          <div class="q-pa-sm col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="q-mb-sm">
              <span class="text-bold q-mr-sm">Secondary Color</span>
              <span class="text-grey-7">(description)</span>
            </div>
            <q-color v-model="data.member.secondary_color" dark default-view="palette" class="my-picker" />
          </div>
        </div>
      </div>
      <div class="flex-center">
        <q-btn class="full-width bg-secondary text-white text-capitalize q-mt-xl" label="Publish" size="lg"
          @click="saveData()" rounded />
      </div>
    </div>

    <!-- PROFILE PICTURE MODAL CROPPER -->
    <q-dialog v-model="profileImageModal" style="width:700px" persistent>
      <q-card style="border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Crop Profile Image</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="formatCropper('profile_image')" v-close-popup
            @keydown.esc="formatCropper('profile_image'); profileImageModal = false" />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper v-show="profileImageCropper.selectedFile" :img-style="{ 'width': '300px', 'height': '300px' }"
              ref="cropper" :src="profileImageCropper.selectedFile" :aspect-ratio="1 / 1" alt="Source Image">
            </VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn label="Crop & Save" class="bg-primary text-white" @click="saveProfileImage()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- BACKGROUND MODAL CROPPER -->
    <q-dialog v-model="backgroundModal" style="width:700px" persistent>
      <q-card style="border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Crop Background</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="formatCropper('background')" v-close-popup
            @keydown.esc="formatCropper('background'); backgroundModal = false" />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper v-show="backgroundCropper.selectedFile" :img-style="{ 'width': '300px', 'height': '300px' }"
              ref="cropper" :src="backgroundCropper.selectedFile" :aspect-ratio="9 / 16" alt="Source Image">
            </VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn label="Crop & Save" class="bg-primary text-white" @click="saveBackground()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="backgroundModalNonCropper" style="width:700px" persistent>
      <q-card style="border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Upload Background</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="formatNonCropper()" v-close-popup
            @keydown.esc="formatNonCropper(); backgroundModalNonCropper = false" />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <div v-if="backgroundNonCropper.videoExtension">
              <video width="300" controls>
                <source :src="backgroundNonCropper.showFile">
              </video>
            </div>
            <div v-else>
              <q-img :src="backgroundNonCropper.showFile" />
            </div>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn label="Save Background" class="bg-primary text-white" @click="saveBackgroundNonCropper()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- COMPANY LOGO MODAL CROPPER -->
    <q-dialog v-model="companyLogoModal" style="width:700px" persistent>
      <q-card style="border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Crop Logo</q-toolbar-title>
          <q-btn flat round dense icon="close" @click="formatCropper('company_logo')" v-close-popup
            @keydown.esc="formatCropper('company_logo'); companyLogoModal = false" />
        </q-toolbar>
        <q-card-section>
          <q-card>
            <VueCropper v-show="companyLogoCropper.selectedFile" :img-style="{ 'width': '300px', 'height': '300px' }"
              ref="cropper" :src="companyLogoCropper.selectedFile" :aspect-ratio="1 / 1" alt="Source Image">
            </VueCropper>
          </q-card>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn label="Crop & Save" class="bg-primary text-white" @click="saveCompanyLogo()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ADD VIDEO MODAL -->
    <q-dialog v-model="socmedCorporateModalAdd" persistent @keydown.esc="socmedCorporateModalAdd = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Social Media</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Name</div>
            <q-select outlined v-model="socmed_corporate_form_add.name"
              :options="['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok']" />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Title</div>
            <q-input class="full-width" v-model="socmed_corporate_form_add.title" placeholder="Input Socmed Title"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Link</div>
            <q-input :rules="[val => !!val || 'Field is required']" class="full-width"
              v-model="socmed_corporate_form_add.link" placeholder="i.e https://facebook.com/tagiddotai" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Social Media" class="text-weight-light"
            v-if="!socmed_corporate_form_add.link || !socmed_corporate_form_add.name || !socmed_corporate_form_add.title"
            disable />
          <q-btn flat label="Add Social Media" class="text-bold" v-else @click="saveSocmedCorporate('add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT VIDEO MODAL -->
    <q-dialog v-model="socialMediaCorporateModalEdit" persistent @keydown.esc="socialMediaCorporateModalEdit = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Social Media</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Name</div>
            <q-select outlined v-model="social_media_corporate_form_edit.name"
              :options="['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok']" />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Title</div>
            <q-input class="full-width" v-model="social_media_corporate_form_edit.title"
              placeholder="Input Socmed Title" outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Link</div>
            <q-input :rules="[val => !!val || 'Field is required']" class="full-width"
              v-model="social_media_corporate_form_edit.link" placeholder="i.e https://facebook.com/tagiddotai"
              outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit Video" class="text-weight-light"
            v-if="!social_media_corporate_form_edit.link || !social_media_corporate_form_edit.name || !social_media_corporate_form_edit.title"
            disable />
          <q-btn flat label="Edit Video" class="text-bold" v-else @click="saveSocmedCorporate('edit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ADD PHONE NUMBER MODAL -->
    <q-dialog v-model="phoneModalAdd" persistent @keydown.esc="phoneModalAdd = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Phone Number</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <q-select class="col-3" outlined v-model="phone_form_add.phone_code" :options="phoneCodeList" map-options
              emit-value />
            <q-input class="col-8" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="phone_form_add.phone" placeholder="Input Contact Number" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="closeModalPhoneFormAdd()" />
          <q-btn flat label="Add Phone Number" class="text-weight-light"
            v-if="!phone_form_add.phone || !phone_form_add.phone_code" disable />
          <q-btn flat label="Add Phone Number" class="text-bold" v-else @click="savePhone('add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT PHONE NUMBER MODAL -->
    <q-dialog v-model="phoneModalEdit" persistent @keydown.esc="phoneModalEdit = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Phone Number</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <q-select class="col-3" outlined v-model="phone_form_edit.phone_code" :options="phoneCodeList" map-options
              emit-value />
            <q-input class="col-8" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="phone_form_edit.phone_number" placeholder="Input Contact Number" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit Phone Number" class="text-weight-light"
            v-if="!phone_form_edit.phone_code || !phone_form_edit.phone_number" disable />
          <q-btn flat label="Edit Phone Number" class="text-bold" v-else @click="savePhone('edit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ADD ADDRESS MODAL -->
    <q-dialog v-model="addressModalAdd" persistent @keydown.esc="addressModalAdd = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Address</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Type</div>
            <q-radio v-model="address_form_add.type" val="home" label="Home" />
            <q-radio v-model="address_form_add.type" val="office" label="Office" />
            <q-radio v-model="address_form_add.type" val="apartment" label="Apartment" />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Country</div>
            <q-select class="full-width" outlined v-model="address_form_add.country" :options="countryList"
              @input="getStateList(address_form_add.country)" map-options emit-value />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Province</div>
            <q-select class="full-width" outlined v-model="address_form_add.state" :options="stateList"
              @input="getCityList(address_form_add.state)" map-options emit-value />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">City</div>
            <q-select class="full-width" outlined v-model="address_form_add.city" :options="cityList" map-options
              emit-value />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Address</div>
            <q-input class="full-width" v-model="address_form_add.address" placeholder="Input Address" outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Post Code</div>
            <q-input class="full-width" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="address_form_add.address_postal_code" placeholder="Input Post Code" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="closeModalAddressFormAdd()" />
          <q-btn flat label="Add Address" class="text-weight-light"
            v-if="!address_form_add.address || !address_form_add.city || !address_form_add.address_postal_code || !address_form_add.country || !address_form_add.state"
            disable />
          <q-btn flat label="Add Address" class="text-bold" v-else @click="saveAddress('add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT ADDRESS MODAL -->
    <q-dialog v-model="addressModalEdit" persistent @keydown.esc="addressModalEdit = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Address</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Type</div>
            <q-radio v-model="address_form_edit.type" val="home" label="Home" />
            <q-radio v-model="address_form_edit.type" val="office" label="Office" />
            <q-radio v-model="address_form_edit.type" val="apartment" label="Apartment" />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Country</div>
            <q-select class="full-width" outlined v-model="address_form_edit.address_country" :options="countryList"
              @input="getStateList(address_form_edit.address_country.value)" map-options />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Province</div>
            <q-select class="full-width" outlined v-model="address_form_edit.address_state" :options="stateList"
              @input="getCityList(address_form_edit.address_state.value)" map-options />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">City</div>
            <q-select class="full-width" outlined v-model="address_form_edit.city" :options="cityList" map-options />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Address</div>
            <q-input class="full-width" v-model="address_form_edit.address" placeholder="Input Address" outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Post Code</div>
            <q-input class="full-width" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="address_form_edit.address_postal_code" placeholder="Input Post Code" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit Address" class="text-weight-light"
            v-if="!address_form_edit.address || !address_form_edit.city || !address_form_edit.address_postal_code || !address_form_edit.address_country || !address_form_edit.address_state"
            disable />
          <q-btn flat label="Edit Address" class="text-bold" v-else @click="saveAddress('edit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ADD OFFICE MODAL -->
    <q-dialog v-model="officeModalAdd" persistent @keydown.esc="officeModalAdd = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Office</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Country</div>
            <q-select class="full-width" v-model="office_form_add.country" placeholder="Input Country"
              :options="countryList" @input="getStateList(office_form_add.country)" map-options emit-value outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Province</div>
            <q-select class="full-width" v-model="office_form_add.state" placeholder="Input State" :options="stateList"
              @input="getCityList(office_form_add.state)" map-options emit-value outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">City</div>
            <q-select class="full-width" v-model="office_form_add.city" placeholder="Input City" :options="cityList"
              map-options emit-value outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Address</div>
            <q-input class="full-width" v-model="office_form_add.address" placeholder="Input Address" outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Post Code</div>
            <q-input class="full-width" type="number"
              onkeydown="return event.keyCode !== 69 && event.keyCode != 189 && event.keyCode != 187 && event.keyCode != 190"
              v-model="office_form_add.postcode" placeholder="Input Post Code" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="closeModalOfficeFormAdd()" />
          <q-btn flat label="Add Office" class="text-weight-light"
            v-if="!office_form_add.address || !office_form_add.country || !office_form_add.state || !office_form_add.city || !office_form_add.postcode"
            disable />
          <q-btn flat label="Add Office" class="text-bold" v-else @click="saveOffice('add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT OFFICE MODAL -->
    <q-dialog v-model="officeModalEdit" persistent @keydown.esc="officeModalEdit = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Office</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Country</div>
            <q-select class="full-width" v-model="office_form_edit.corporate_country" :options="countryList"
              @input="getStateList(office_form_edit.corporate_country)" map-options emit-value
              placeholder="Input Country" outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">State</div>
            <q-select class="full-width" v-model="office_form_edit.corporate_state" :options="stateList"
              @input="getCityList(office_form_edit.corporate_state)" map-options emit-value placeholder="Input State"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">City</div>
            <q-select class="full-width" v-model="office_form_edit.corporate_city" placeholder="Input City" outlined
              :options="cityList" map-options />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Address</div>
            <q-input class="full-width" v-model="office_form_edit.corporate_address" placeholder="Input Address"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Post Code</div>
            <q-input class="full-width" v-model="office_form_edit.corporate_postal_code" placeholder="Input Post Code"
              outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit Office" class="text-weight-light"
            v-if="!office_form_edit.corporate_address || !office_form_edit.corporate_country || !office_form_edit.corporate_state || !office_form_edit.corporate_city || !office_form_edit.corporate_postal_code"
            disable />
          <q-btn flat label="Edit Office" class="text-bold" v-else @click="saveOffice('edit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ADD SOCIAL MEDIA MODAL -->
    <q-dialog v-model="socmedModalAdd" persistent @keydown.esc="socmedModalAdd = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Social Media</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Name</div>
            <q-select outlined v-model="socmed_form_add.socmed_name"
              :options="['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok']" />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Title</div>
            <q-input class="full-width" v-model="socmed_form_add.socmed_title" placeholder="Input Socmed Title"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Link</div>
            <q-input :rules="[val => !!val || 'Field is required']" class="full-width"
              v-model="socmed_form_add.socmed_link" placeholder="i.e https://facebook.com/tagiddotai" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Social Media" class="text-weight-light"
            v-if="!socmed_form_add.socmed_link || !socmed_form_add.socmed_name || !socmed_form_add.socmed_title"
            disable />
          <q-btn flat label="Add Social Media" class="text-bold" v-else @click="saveSocmed('add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- EDIT SOCIAL MEDIA MODAL -->
    <q-dialog v-model="socmedModalEdit" persistent @keydown.esc="socmedModalEdit = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit Social Media</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Name</div>
            <q-select outlined v-model="socmed_form_edit.socmed_name"
              :options="['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok']" />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Title</div>
            <q-input class="full-width" v-model="socmed_form_edit.socmed_title" placeholder="Input Socmed Title"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Socmed Link</div>
            <q-input class="full-width" v-model="socmed_form_edit.socmed_link"
              placeholder="i.e https://facebook.com/tagiddotai" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit Social Media" class="text-weight-light"
            v-if="!socmed_form_edit.socmed_link || !socmed_form_edit.socmed_name || !socmed_form_edit.socmed_title"
            disable />
          <q-btn flat label="Edit Social Media" class="text-bold" v-else @click="saveSocmed('edit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal Background Image -->
    <q-dialog v-model="modalBackgroundImage">
      <q-card style="width: 400px; border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Background Image</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-actions class="row flex-center">
          <div class="col q-pa-sm">
            <q-btn class="text-capitalize full-width" rounded color="secondary" label="Choose image"
              @click="$refs.Background.click(); modalBackgroundImage = false" />
            <q-btn class="text-capitalize full-width q-mt-md" rounded color="secondary" label="Set to default"
              @click="saveBackgroundNull(); modalBackgroundImage = false" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal Photo Profile -->
    <q-dialog v-model="modalPhotoProfile">
      <q-card style="width: 400px; border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Photo Profile</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-actions class="row flex-center">
          <div class="col q-pa-sm">
            <q-btn class="text-capitalize full-width" rounded color="secondary" label="Choose image"
              @click="$refs.ProfilePicture.click(); modalPhotoProfile = false" />
            <q-btn class="text-capitalize full-width q-mt-md" rounded color="secondary" label="Set to default"
              @click="saveProfileNull(); modalPhotoProfile = false" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal Corporate Photo -->
    <q-dialog v-model="modalCorporatePhoto">
      <q-card style="width: 400px; border-top: 15px solid #116C54">
        <q-toolbar class="text-secondary">
          <q-toolbar-title class="q-ml-xl text-center text-h6">Company Logo</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-actions class="row flex-center">
          <div class="col q-pa-sm">
            <q-btn class="text-capitalize full-width" rounded color="secondary" label="Choose image"
              @click="$refs.CompanyLogo.click(); modalCorporatePhoto = false" />
            <q-btn class="text-capitalize full-width q-mt-md" rounded color="secondary" label="Set to default"
              @click="saveCorporateLogoNull(); modalCorporatePhoto = false" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ADD DOCUMENT CORPORATE -->
    <q-dialog v-model="documentCorporateModalAdd" persistent @keydown.esc="documentCorporateModalAdd = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Document</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Document Title</div>
            <q-input class="full-width" v-model="document_form_add.title" placeholder="Input Document Title"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Upload Document</div>
            <q-file :rules="[val => !!val || 'Field is required']" class="full-width"
              v-model="document_form_add.document" placeholder="i.e https://facebook.com/tagiddotai" accept=".pdf" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Document" class="text-weight-light"
            v-if="!document_form_add.document || !document_form_add.title"
            disable />
          <q-btn flat label="Add Document" class="text-bold" v-else @click="saveDocument('add')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit DOCUMENT CORPORATE -->
    <q-dialog v-model="documentCorporateModalEdit" persistent @keydown.esc="documentCorporateModalEdit = false">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add Document</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-my-sm">
            <div class="text-grey-7">Document Title</div>
            <q-input class="full-width" v-model="document_form_edit.title" placeholder="Input Document Title"
              outlined />
          </div>
          <div class="q-my-sm">
            <div class="text-grey-7">Upload Document</div>
            <q-file :rules="[val => !!val || 'Field is required']" class="full-width"
              v-model="document_form_edit.document" accept=".pdf" outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Edit Document" class="text-weight-light"
            v-if="!document_form_edit.title"
            disable />
          <q-btn flat label="Edit Document" class="text-bold" v-else @click="saveDocument('edit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import LinkAja from 'src/assets/image/LinkAja.png'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import axios from 'axios'
import VideoBackground from 'vue-responsive-video-background-player'
import VideoExample from 'src/assets/video-example.mp4'

import Profile from 'src/assets/image/TAGID-profile.jpg'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'

const localStoragee = JSON.parse(window.localStorage.getItem('user'))
const userId = localStoragee.user_id
const localStorage = JSON.parse(window.localStorage.getItem('userd'))
const token = localStorage ? localStorage.api_token : null
const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format'
}

export default {
  components: { VueCropper, vueDropzone: vue2Dropzone, VideoBackground },
  data () {
    return {
      LinkAja,
      Profile,
      CompanyLogo,
      Background,
      VideoExample,
      email_old: '',
      color: '#59c7f9',
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,
      isBackgroundVideo: false,
      phoneModalEdit: false,
      phoneModalAdd: false,
      addressModalEdit: false,
      addressModalAdd: false,
      officeModalEdit: false,
      officeModalAdd: false,
      socialMediaCorporateModalEdit: false,
      socmedCorporateModalAdd: false,
      modalBackgroundImage: false,
      modalPhotoProfile: false,
      modalCorporatePhoto: false,
      socmedModalAdd: false,
      socmedModalEdit: false,
      documentCorporateModalAdd: false,
      documentCorporateModalEdit: false,
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageBGCorporate: 'https://api.the-netwerk.com/storage/app/public/corporate/background/',
      linkStorageCompLogo: 'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageCorpLogo: 'https://api.the-netwerk.com/storage/app/public/corporate/logo/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      dropzoneOptions: {
        url: 'https://api.the-netwerk.com/api/mjVmBSJ31Hx2Ag9GCOUS/member/corporate/uploadpdf',
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFilesize: 3,
        maxFiles: 1,
        autoQueue: true,
        paramName: 'file_pdf',
        acceptedFiles: 'application/pdf',
        headers: { Authorization: `Bearer ${token}` },
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> Upload Document Here"
      },
      dropzoneBGOptions: {
        url: 'https://api.the-netwerk.com/api/mjVmBSJ31Hx2Ag9GCOUS/member/corporate/edit/background',
        thumbnailWidth: 100,
        thumbnailHeight: 56,
        // resizeWidth: 360,
        // resizeHeight: 203,
        maxFilesize: 3,
        acceptedFiles: 'image/*, .webm, .mkv, .mp4, .avi, .mov, .mpg, .mpeg, .3gp',
        maxFiles: 1,
        autoQueue: true,
        headers: { Authorization: `Bearer ${token}` },
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i> Upload Image / Video Background Corporate Here"
      },
      data: {
        password: '',
        isPwd: true,
        phone_code_mobile: '62',
        phone_code_phone: '62',
        member: {
          main_color: '#FF00FF',
          secondary_color: '#FF00FF',
          vaccine1: 'Prefer not to say',
          member_text_savvy: 'Yes'
        },
        corporate: {
          corporate_main_color: '#FF00FF',
          corporate_secondary_color: '#FF00FF',
          corporate_name: '',
          corporate_description: '',
          corporate_website: '',
          commerce_group: '',
          corporate_phonecode: '',
          corporate_phone: '',
          corporate_telephonecode: '',
          corporate_telephone: ''
        }
      },
      vaccineOptions: [
        'Fully vaccinated', 'Vaccine booster', 'Waiting on additional dose', 'Planning to get vaccinated', 'Not getting vaccinated', 'Prefer not to say'
      ],
      genderOptions: [
        {
          label: 'Man',
          value: 'man'
        },
        {
          label: 'Woman',
          value: 'woman'
        }
      ],
      educationOptions: [
        {
          label: 'SD',
          value: 'sd'
        },
        {
          label: 'SMP',
          value: 'smp'
        },
        {
          label: 'SMA/SMK',
          value: 'sma/smk'
        },
        {
          label: 'Diploma',
          value: 'diploma'
        },
        {
          label: 'Sarjana',
          value: 'sarjana'
        },
        {
          label: 'Pasca Sarjana',
          value: 'pasca'
        }
      ],
      textSavyOptions: [
        {
          label: 'Yes',
          value: 1
        },
        {
          label: 'No',
          value: 0
        }
      ],
      providerOptions: [
        {
          label: 'Telkomsel',
          value: 'telkomsel'
        },
        {
          label: 'Indosat',
          value: 'indosat'
        },
        {
          label: 'XL',
          value: 'xl'
        },
        {
          label: 'By.U',
          value: 'byu'
        },
        {
          label: 'Smartfren',
          value: 'smartfren'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ],
      typePhoneOptions: [
        {
          label: 'Samsung',
          value: 'samsung'
        },
        {
          label: 'Iphone',
          value: 'iphone'
        },
        {
          label: 'Xiaomi',
          value: 'xiaomi'
        },
        {
          label: 'Oppo',
          value: 'oppo'
        },
        {
          label: 'Vivo',
          value: 'vivo'
        },
        {
          label: 'Huawei',
          value: 'huawei'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ],
      sesOptions: [
        {
          label: 'Mikro',
          value: 'mikro'
        },
        {
          label: 'Kecil',
          value: 'kecil'
        },
        {
          label: 'Menengah',
          value: 'menengah'
        },
        {
          label: 'Besar',
          value: 'besar'
        }
      ],
      occupationOptions: [
        'Chef',
        'Cashier',
        'Barber',
        'Baker',
        'Dentist',
        'Driver',
        'Teacher',
        'Tailor',
        'Mechanic',
        'Engineer',
        'Salesman',
        'Porter',
        'Doctor',
        'Employee',
        'Businessman',
        'Others'
      ],
      phone_form_add: {
        phone_code: '62',
        phone: null
      },
      surveyData: [],
      phone_form_edit: {
        phone_code: '62',
        phone: null
      },
      address_form_add: {
        type: 'home',
        country: {
          value: '102',
          label: 'Indonesia'
        },
        state: {
          value: null,
          label: null,
          id: null
        },
        address: null,
        city: null,
        postcode: null
      },
      address_form_edit: {
        address_country: {
          value: null,
          label: null
        },
        address_state: {
          value: null,
          label: null
        },
        city: {
          value: null,
          label: null
        }
      },
      office_form_add: {
        address: null,
        country: null,
        state: null,
        city: null,
        postcode: null
      },
      office_form_edit: {
        corporate_country: {
          value: null,
          label: null
        },
        corporate_state: {
          value: null,
          label: null
        },
        corporate_city: {
          value: null,
          label: null
        }
      },
      socmed_corporate_form_add: {
        title: null,
        name: null,
        link: null
      },
      social_media_corporate_form_edit: {},
      socmed_form_add: {
        socmed_name: null,
        socmed_title: null,
        socmed_link: null
      },
      document_form_add: {
        document: null,
        title: null
      },
      document_form_edit: {},
      socmed_form_edit: {},
      phoneList: [],
      addressList: [],
      officeList: [],
      socialMediaCorporateList: [],
      socmedList: [],
      phoneCodeList: [],
      countryList: [],
      pdfList: [],
      cityList: [],
      stateList: [],
      profileImageModal: false,
      backgroundModal: false,
      backgroundModalNonCropper: false,
      companyLogoModal: false,
      profileImageCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      backgroundCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      companyLogoCropper: {
        mime_type: '',
        cropedImage: '',
        autoCrop: false,
        selectedFile: '',
        image: '',
        files: ''
      },
      backgroundNonCropper: {
        videoExtension: false,
        selectedFile: ''
      }
    }
  },
  validations: {
    data: {
      member: {
        member_first_name: { required },
        member_last_name: { required },
        profil: { required },
        member_email: { required, email },
        member_phone: { required },
        vaccine1: { required },
        member_gender: { required },
        member_dob: { required }
      }
    }
  },
  mounted () {
    this.$store.dispatch('style/submitTitlePage', 'Edit Profile')
    this.getData()
    this.getAddress()
    this.getOffice()
    this.getPhone()
    this.getSocialMedia()
    this.getPhoneCodeCountries()
    this.getCountryList()
    this.getPDFCorporate()
    this.getStateList(102)
    this.getCityList(1827)
    this.getSurveyData()
    if (this.data.member.background != null) {
      this.checkExtensionBackground(this.data.member.background)
    }
    if (this.data.member.corporate_id != null) {
      this.getSocialMediaCorporate()
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    showPdfView (pdfName) {
      window.open(this.linkStoragePdf + pdfName)
    },
    showBGView (bgName) {
      window.open(this.linkStorageBGCorporate + bgName)
    },
    checkExtensionBackground (filename) {
      const imageExtensionLists = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'raw']
      const videoExtensionLists = ['webm', 'mkv', 'mp4', 'avi', 'mov', 'mpg', 'mpeg', '3gp']
      const fileExtension = filename.split('.').pop()
      if (imageExtensionLists.includes(fileExtension)) {
        this.isBackgroundVideo = false
      } else if (videoExtensionLists.includes(fileExtension)) {
        this.isBackgroundVideo = true
      }
    },
    closeModalAddressFormAdd () {
      this.address_form_add = {
        type: 'home',
        country: {
          value: null,
          label: null
        },
        state: {
          value: null,
          label: null,
          id: null
        },
        address: null,
        city: null,
        postcode: null
      }
    },
    closeModalPhoneFormAdd () {
      this.phone_form_add = {
        phone_code: '62',
        phone: null
      }
    },
    closeModalOfficeFormAdd () {
      this.office_form_add = {
        address: null,
        country: null,
        state: null,
        city: null,
        postcode: null
      }
    },
    changeColor (color) {
      const hex = color.hex
      this.data.corporate.corporate_main_color = hex
    },
    changeColorr (color) {
      const hex = color.hex
      this.data.corporate.corporate_secondary_color = hex
    },
    getPhoneCodeCountries () {
      axios.get('https://api.the-netwerk.com/api/all/csc/countries').then(response => {
        this.phoneCodeList = response.data.data.map(data => {
          return {
            label: `${data.name} (+${data.phonecode})`,
            value: data.phonecode
          }
        })
      })
    },
    getCountryList () {
      axios.get('https://api.the-netwerk.com/api/all/csc/countries').then(response => {
        this.countryList = response.data.data.map(data => {
          return {
            id: data.id,
            label: data.name,
            value: data.id
          }
        })
      })
    },
    getStateList (countryId) {
      axios.get(`/csc/countries/${countryId}/states`).then(response => {
        this.stateList = response.data.data.map(data => {
          return {
            id: data.id,
            label: data.name,
            value: data.id
          }
        })
      })
    },
    getCityList (stateId) {
      axios.get(`/csc/states/${stateId}/city`).then(response => {
        this.cityList = response.data.data.map(data => {
          return {
            label: data.name,
            value: data.id
          }
        })
      })
    },
    /* BEGIN:: HANDLING IMAGE ERROR */
    handlingBackgroundError (event) {
      event.target.src = this.Background
    },
    handlingProfileError (event) {
      event.target.src = this.Profile
    },
    handlingCompanyLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    handlingCorporateLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    /* END:: HANDLING IMAGE ERROR */
    /* BEGIN:: HANDLING PHONE */
    getPhone () {
      this.$axios.get('/member/phone/' + userId).then(response => {
        this.phoneList = response.data.data
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    editPhone (data) {
      if (this.phone_form_edit.phone_code && this.phone_form_edit.phone_number != null) {
        this.phoneModalEdit = true
      } else {
        this.phoneModalEdit = true
        this.phone_form_edit = data
        this.phone_form_edit.phone_code = data.phone_number.substring(0, 2)
        this.phone_form_edit.phone_number = data.phone_number.substring(2)
      }
      // data.phone_number = this.phone_form_edit.phone_code + this.phone_form_edit.phone_number
    },
    deletePhone (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this phone number?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`/member/phone/${id}`).then(response => {
          this.$q.notify({
            message: 'Success Delete Phone Number',
            position: 'top',
            type: 'positive'
          })
          this.getPhone()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    async savePhone (status) {
      if (status === 'add') {
        const data = {
          phone: this.phone_form_add.phone_code + this.phone_form_add.phone,
          priority: 'high',
          status: 'active',
          order: 1
        }
        await this.$axios.post('/member/phone/add', data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Add Phone Number',
              position: 'top',
              type: 'positive'
            })
          }
        })
        this.phoneModalAdd = false
        this.getPhone()
      } else {
        const data = {
          phone: this.phone_form_edit.phone_code + this.phone_form_edit.phone_number
        }
        await this.$axios.put(`/member/phone/${this.phone_form_edit.id}`, data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Edit Phone Number',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.phoneModalEdit = false
        this.getPhone()
      }
    },
    /* END:: HANDLING PHONE */
    /* BEGIN:: HANDLING ADDRESS */
    getAddress () {
      this.$axios.get('/member/address/' + userId).then(response => {
        this.addressList = response.data.data
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    editAddress (data) {
      this.addressModalEdit = true
      this.address_form_edit.address = data.address
      this.address_form_edit.address_postal_code = data.address_postal_code
      this.address_form_edit.city.label = data.city.name
      this.address_form_edit.city.value = data.city.id
      this.address_form_edit.type = data.address_type
      this.address_form_edit.id = data.id
      // this.address_form_edit = data
      axios.get(`/csc/countries/${data.address_country}`).then(response => {
        this.address_form_edit.address_country.label = response.data.data.name
        this.address_form_edit.address_country.value = response.data.data.id
      })
      axios.get(`/csc/states/${data.address_state}`).then(response => {
        this.address_form_edit.address_state.label = response.data.data.name
        this.address_form_edit.address_state.value = response.data.data.id
      })
    },
    deleteAddress (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this address?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`/member/address/${id}`).then(response => {
          this.$q.notify({
            message: 'Success Delete Address',
            position: 'top',
            type: 'positive'
          })
          this.getAddress()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    async saveAddress (status) {
      if (status === 'add') {
        const data = {
          order: '1',
          address: this.address_form_add.address,
          postcode: this.address_form_add.address_postal_code,
          city: this.address_form_add.city,
          country: this.address_form_add.country.value,
          state: this.address_form_add.state,
          type: this.address_form_add.type
        }
        await this.$axios.post('/member/address/add', data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Add Address',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.addressModalAdd = false
        this.getAddress()
      } else {
        const data = {
          type: this.address_form_edit.type,
          address: this.address_form_edit.address,
          city: this.address_form_edit.city.value,
          country: this.address_form_edit.address_country.value,
          state: this.address_form_edit.address_state.value,
          postcode: this.address_form_edit.address_postal_code
        }
        await this.$axios.put(`/member/address/${this.address_form_edit.id}`, data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Edit Address',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.addressModalEdit = false
        this.getAddress()
      }
    },
    /* END:: HANDLING ADDRESS */
    /* BEGIN:: HANDLING OFFICE */
    getOffice () {
      this.$axios.get('/member/corporate/address').then(response => {
        if (response.data.data != null) {
          this.officeList = response.data.data
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    editOffice (data) {
      this.officeModalEdit = true
      this.office_form_edit.corporate_address = data.corporate_address
      this.office_form_edit.corporate_postal_code = data.corporate_postal_code
      this.office_form_edit.corporate_city.label = data.city.name
      this.office_form_edit.corporate_city.value = data.city.id
      this.office_form_edit.id = data.id
      axios.get(`/csc/countries/${data.corporate_country}`).then(response => {
        this.office_form_edit.corporate_country.label = response.data.data.name
        this.office_form_edit.corporate_country.value = response.data.data.id
      })
      axios.get(`/csc/states/${data.corporate_state}`).then(response => {
        this.office_form_edit.corporate_state.label = response.data.data.name
        this.office_form_edit.corporate_state.value = response.data.data.id
      })
    },
    deleteOffice (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this office?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`/member/corporate/address/${id}`).then(response => {
          this.$q.notify({
            message: 'Success Delete Office',
            position: 'top',
            type: 'positive'
          })
          this.getOffice()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    async saveOffice (status) {
      if (status === 'add') {
        const data = {
          order: 1,
          corporate_address: this.office_form_add.address,
          corporate_country: this.office_form_add.country,
          corporate_state: this.office_form_add.state,
          corporate_city: this.office_form_add.city,
          corporate_postal_code: this.office_form_add.postcode
        }
        await this.$axios.post('/member/corporate/address', data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Add Company',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.officeModalAdd = false
        this.getOffice()
      } else {
        const data = {
          order: 1,
          corporate_address: this.office_form_edit.corporate_address,
          corporate_country: this.office_form_edit.corporate_country,
          corporate_state: this.office_form_edit.corporate_state,
          corporate_city: this.office_form_edit.corporate_city,
          corporate_postal_code: this.office_form_edit.corporate_postal_code
        }
        await this.$axios.put(`/member/corporate/address/${this.office_form_edit.id}`, data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Edit Company',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.office_form_edit = {}
        this.officeModalEdit = false
        this.getOffice()
      }
    },
    /* END:: HANDLING OFFICE */
    /* BEGIN:: HANDLING CORPORATE DOCUMENT */
    getPDFCorporate () {
      this.$axios.get('/member/corporate/pdfweb').then(response => {
        if (response.data.data) {
          this.pdfList = response.data.data
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    editDocumentCorporate (data) {
      this.documentCorporateModalEdit = true
      this.document_form_edit = data
    },
    deleteDocumentCorporate (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this document?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`/member/corporate/uploadpdf/${id}`).then(response => {
          this.$q.notify({
            message: 'Success Delete Document',
            position: 'top',
            type: 'positive'
          })
          this.getSocialMediaCorporate()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    async saveDocument (status) {
      if (status === 'add') {
        const formData = new FormData()
        formData.append('name', 'Document')
        formData.append('title', this.document_form_add.title)
        formData.append('file_pdf', this.document_form_add.document)
        await this.$axios.post('/member/corporate/uploadpdf', formData).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Add Document',
              position: 'top',
              type: 'positive'
            })
            this.document_form_add = {
              title: null,
              name: null,
              document: null
            }
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.documentCorporateModalAdd = false
        this.getPDFCorporate()
      } else {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('name', 'Document')
        formData.append('title', this.document_form_edit.title)
        formData.append('file_pdf', this.document_form_edit.document)
        await this.$axios.post(`/member/corporate/uploadpdf/${this.document_form_edit.id}`, formData).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Edit Document',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.documentCorporateModalEdit = false
        this.getPDFCorporate()
      }
    },
    /* END:: HANDLING CORPORATE DOCUMENT */
    /* BEGIN:: SURVEY FORM */
    getSurveyData () {
      this.surveyData = []
      this.$axios.get('/survey').then(response => {
        response.data.data.forEach((data) => {
          this.surveyData.push(data)
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    insertSurveyData () {
      const data = []
      this.surveyData.forEach(element => {
        element.survey_detail.forEach(dataDetail => {
          const datasDetail = {
            survey_detail_id: dataDetail.id,
            value: dataDetail.value
          }
          data.push(datasDetail)
        })
      })
      this.$axios.post('/survey/answer', { survey_data: data }).then(response => {
        if (response.data.status) {
          this.getSurveyData()
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    /* END:: SURVEY FORM */
    /* BEGIN:: HANDLING SOCIAL MEDIA CORPORATE */
    editSocialMediaCorporate (data) {
      this.socialMediaCorporateModalEdit = true
      this.social_media_corporate_form_edit = data
    },
    deleteSocialMediaCorporate (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this social media?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`/member/corporate/socialmedia/${id}`).then(response => {
          this.$q.notify({
            message: 'Success Delete Social Media',
            position: 'top',
            type: 'positive'
          })
          this.getSocialMediaCorporate()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    getSocialMediaCorporate () {
      // const params = {
      //   socmed_name: 'youtube'
      // }
      this.$axios.get('/member/corporate/socialmedia').then(response => {
        if (response.data.data != null) {
          this.socialMediaCorporateList = response.data.data
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    async saveSocmedCorporate (status) {
      if (status === 'add') {
        const data = {
          name: this.socmed_corporate_form_add.name,
          title: this.socmed_corporate_form_add.title,
          link: this.socmed_corporate_form_add.link
        }
        await this.$axios.post('/member/corporate/socialmedia', data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Add Social Media',
              position: 'top',
              type: 'positive'
            })
            this.socmed_corporate_form_add = {
              title: null,
              name: null,
              link: null
            }
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.socmedCorporateModalAdd = false
        this.getSocialMediaCorporate()
      } else {
        const data = this.social_media_corporate_form_edit
        await this.$axios.put(`/member/corporate/socialmedia/${this.social_media_corporate_form_edit.id}`, data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Edit Social Media',
              position: 'top',
              type: 'positive'
            })
            this.socmed_corporate_form_add.video = ''
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.socialMediaCorporateModalEdit = false
        this.getSocialMediaCorporate()
      }
    },
    /* END:: HANDLING VIDEO */
    /* BEGIN:: HANDLING SOCMED */
    editSocmed (data) {
      this.socmedModalEdit = true
      this.socmed_form_edit = data
    },
    deleteSocmed (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this social media?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`/member/socialmedia/${id}`).then(response => {
          this.$q.notify({
            message: 'Success Delete Social Media',
            position: 'top',
            type: 'positive'
          })
          this.getSocialMedia()
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    async getSocialMedia () {
      const paramsFb = {
        socmed_name: 'facebook'
      }
      await this.$axios.get('/member/socialmedia/' + userId, { params: paramsFb }).then(response => {
        this.socmedList = response.data.data
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
      const paramsTwt = {
        socmed_name: 'twitter'
      }
      this.$axios.get('/member/socialmedia/' + userId, { params: paramsTwt }).then(response => {
        response.data.data.forEach(data => {
          this.socmedList.push(data)
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
      const paramsLi = {
        socmed_name: 'linkedin'
      }
      this.$axios.get('/member/socialmedia/' + userId, { params: paramsLi }).then(response => {
        response.data.data.forEach(data => {
          this.socmedList.push(data)
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
      const paramsIg = {
        socmed_name: 'instagram'
      }
      this.$axios.get('/member/socialmedia/' + userId, { params: paramsIg }).then(response => {
        response.data.data.forEach(data => {
          this.socmedList.push(data)
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
      const paramsYt = {
        socmed_name: 'youtube'
      }
      this.$axios.get('/member/socialmedia/' + userId, { params: paramsYt }).then(response => {
        response.data.data.forEach(data => {
          this.socmedList.push(data)
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
      const paramsTk = {
        socmed_name: 'tiktok'
      }
      this.$axios.get('/member/socialmedia/' + userId, { params: paramsTk }).then(response => {
        response.data.data.forEach(data => {
          this.socmedList.push(data)
        })
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    async saveSocmed (status) {
      if (status === 'add') {
        const data = {
          order: 1,
          socmed_name: this.socmed_form_add.socmed_name,
          socmed_title: this.socmed_form_add.socmed_title,
          socmed_link: this.socmed_form_add.socmed_link,
          status: 'active'
        }
        await this.$axios.post('/member/socialmedia/add', data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Add Social Media',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.socmed_form_add.socmed_name = null
        this.socmed_form_add.socmed_title = null
        this.socmed_form_add.socmed_link = null
        this.socmedModalAdd = false
        this.getSocialMedia()
      } else {
        const data = this.socmed_form_edit
        await this.$axios.put(`/member/socialmedia/${this.socmed_form_edit.id}`, data).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: 'Success Edit Social Media',
              position: 'top',
              type: 'positive'
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
        this.socmedModalEdit = false
        this.getSocialMedia()
      }
    },
    /* END:: HANDLING SOCMED */
    /* BEGIN:: SAVE DATA STORE */
    updateStore () {
      this.$store.state.userdata.user.member_first_name = this.data.member.member_first_name
      this.$store.state.userdata.user.member_last_name = this.data.member.member_last_name
      this.$store.state.userdata.user.member_email = this.data.member.member_email
      this.$store.state.userdata.user.member_phone = this.data.member.member_phone
      this.$store.state.userdata.user.profil = this.data.member.profil
      this.$store.state.userdata.corporate.corporate_description = this.data.corporate.corporate_description
      this.$store.state.userdata.corporate.corporate_name = this.data.corporate.corporate_name
      this.$store.state.userdata.corporate.corporate_address = this.data.corporate.corporate_address
      this.$store.state.userdata.corporate.corporate_phone = this.data.corporate.corporate_phone
      this.$store.state.userdata.corporate.corporate_email = this.data.corporate.corporate_email
      this.$store.state.userdata.corporate.corporate_website = this.data.corporate.corporate_website
    },
    /* END:: SAVE DATA STORE */
    /* BEGIN:: HANDLING DATA */
    getData () {
      this.$q.loading.show({
        message: 'Getting Data'
      })
      this.$axios.get('/member').then(response => {
        if (response.data.status) {
          const member = response.data.member
          this.data.member = response.data.member
          this.data.corporate = response.data.member.corporate
          this.email_old = response.data.member.member_email
          this.$store.dispatch('userdata/submitUser', response.data.member)
          if (this.data.corporate) {
            this.$store.dispatch('userdata/submitCorporate', member.corporate)
            this.$store.dispatch('userdata/submitMainColor', member.corporate.corporate_main_color)
            this.$store.dispatch('userdata/submitSecondaryColor', member.corporate.corporate_secondary_color)
            if (this.data.corporate.background) {
              this.$store.dispatch('userdata/submitBackground', member.corporate.background)
            }
            this.$store.dispatch('userdata/submitMainColor', member.corporate.corporate_main_color)
            this.$store.dispatch('userdata/submitSecondaryColor', member.corporate.corporate_secondary_color)
            this.getSocialMediaCorporate()
          }
          // Set Timeout Loading Hide
          setTimeout(() => {
            this.$q.loading.hide()
          }, 1000)
          // this.$store.dispatch('userdata/submitCompany', response.data.member.corporate)
          // this.data.password = response.data.member.user.password
        }
      }).catch(error => {
        // Set Timeout Loading Hide
        setTimeout(() => {
          this.$q.loading.hide()
        }, 1000)
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    saveData () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
          }
        }
        const data = {
          first_name: this.data.member.member_first_name,
          middle_name: this.data.member.member_middle_name,
          last_name: this.data.member.member_last_name,
          email: this.data.member.member_email,
          member_phone: this.data.member.member_phone,
          phone_code: this.data.member.phone_code,
          profil: this.data.member.profil,
          biography: this.data.member.biography,
          commerce: this.data.member.commerce,
          link_room: this.data.member.link_room,
          identity_number: this.data.member.identity_number,
          vaccine1: this.data.member.vaccine1,
          main_color: this.data.member.main_color,
          secondary_color: this.data.member.secondary_color,
          gender: this.data.member.member_gender.toLowerCase().trim(),
          date_of_birthday: this.data.member.member_dob,
          education: this.data.member.member_education,
          text_savvy: this.data.member.member_text_savvy,
          ses: this.data.member.member_ses,
          provider: this.data.member.member_provider,
          phone_type: this.data.member.member_phone_type,
          occupation: this.data.member.member_occupation
        }
        if (data.email !== this.email_old) {
          this.$q.dialog({
            message: 'Make sure its right! Your email relate to your username. Your username will be permanently updated to "' + data.email + '"',
            cancel: true,
            persistent: true
          }).onOk(() => {
            if (!this.data.member.corporate_id) {
              const dataCompany = {
                first_name: this.data.member.member_first_name,
                middle_name: this.data.member.member_middle_name,
                last_name: this.data.member.member_last_name,
                email: this.data.member.member_email,
                member_phone: this.data.member.member_phone,
                phone_code: this.data.member.phone_code,
                profil: this.data.member.profil,
                biography: this.data.member.biography,
                commerce: this.data.member.commerce,
                link_room: this.data.member.link_room,
                identity_number: this.data.member.identity_number,
                vaccine1: this.data.member.vaccine1,
                main_color: this.data.member.main_color,
                secondary_color: this.data.member.secondary_color,
                gender: this.data.member.member_gender.toLowerCase().trim(),
                date_of_birthday: this.data.member.member_dob,
                education: this.data.member.member_education,
                text_savvy: this.data.member.member_text_savvy,
                ses: this.data.member.member_ses,
                provider: this.data.member.member_provider,
                phone_type: this.data.member.member_phone_type,
                occupation: this.data.member.member_occupation,
                company_name: this.data.member.company_name,
                company_description: this.data.member.company_description,
                company_contact_website: this.data.member.company_contact_website,
                company_contact_mobile: this.data.member.company_contact_mobile,
                company_contact_phone: this.data.member.company_contact_phone
              }
              this.$axios.post('/member/edit?_method=PUT', dataCompany, config).then(response => {
                if (response.data.status) {
                  this.$q.notify({
                    message: response.data.message,
                    position: 'top',
                    type: 'positive'
                  })
                  const host = window.location.host
                  const parts = host.split('.')
                  const username = parts[0]
                  this.$axios.get(`member/${username}`).then(response => {
                    this.$store.dispatch('userdata/submitUser', response.data.member)
                    this.$store.dispatch('userdata/submitCompany', response.data.member.company)
                    if (response.data.member.corporate) {
                      this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
                      this.$store.dispatch('userdata/submitMainColor', response.data.member.corporate.corporate_main_color)
                      this.$store.dispatch('userdata/submitSecondaryColor', response.data.member.corporate.corporate_secondary_color)
                    }
                    window.localStorage.setItem('user', JSON.stringify(response.data.member))
                  })
                  setTimeout(() => this.$router.push({ path: '/dashboard/profile' }), 1000)
                }
              }).catch(error => {
                this.$q.notify({
                  message: error.message,
                  position: 'top',
                  type: 'negative'
                })
              })
            } else {
              this.$axios.post('/member/edit?_method=PUT', data, config).then(response => {
                if (response.data.status) {
                  this.$q.notify({
                    message: response.data.message,
                    position: 'top',
                    type: 'positive'
                  })
                  const host = window.location.host
                  const parts = host.split('.')
                  const username = parts[0]
                  this.$axios.get(`member/${username}`).then(response => {
                    this.$store.dispatch('userdata/submitUser', response.data.member)
                    this.$store.dispatch('userdata/submitCompany', response.data.member.company)
                    if (response.data.member.corporate) {
                      this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
                      this.$store.dispatch('userdata/submitMainColor', response.data.member.corporate.corporate_main_color)
                      this.$store.dispatch('userdata/submitSecondaryColor', response.data.member.corporate.corporate_secondary_color)
                    }
                    window.localStorage.setItem('user', JSON.stringify(response.data.member))
                  })
                  if (this.$store.state.userdata.user.corporate.id === 48 && this.$store.state.userdata.user.role !== 'Admin') {
                    setTimeout(() => this.$router.push({ path: '/' }), 1000)
                  } else {
                    setTimeout(() => this.$router.push({ path: '/dashboard/profile' }), 1000)
                  }
                }
              }).catch(error => {
                this.$q.notify({
                  message: error.message,
                  position: 'top',
                  type: 'negative'
                })
              })
            }
          }).onCancel(() => {
            data.email = this.email_old
          })
        } else {
          if (!this.data.member.corporate_id) {
            const dataCompany = {
              first_name: this.data.member.member_first_name,
              middle_name: this.data.member.member_middle_name,
              last_name: this.data.member.member_last_name,
              email: this.data.member.member_email,
              member_phone: this.data.member.member_phone,
              phone_code: this.data.member.phone_code,
              profil: this.data.member.profil,
              biography: this.data.member.biography,
              commerce: this.data.member.commerce,
              link_room: this.data.member.link_room,
              identity_number: this.data.member.identity_number,
              vaccine1: this.data.member.vaccine1,
              main_color: this.data.member.main_color,
              secondary_color: this.data.member.secondary_color,
              gender: this.data.member.member_gender.toLowerCase().trim(),
              date_of_birthday: this.data.member.member_dob,
              education: this.data.member.member_education,
              text_savvy: this.data.member.member_text_savvy,
              ses: this.data.member.member_ses,
              provider: this.data.member.member_provider,
              phone_type: this.data.member.member_phone_type,
              occupation: this.data.member.member_occupation,
              company_name: this.data.member.company_name,
              company_description: this.data.member.company_description,
              company_contact_website: this.data.member.company_contact_website,
              company_contact_mobile: this.data.member.company_contact_mobile,
              company_contact_phone: this.data.member.company_contact_phone
            }
            this.$axios.post('/member/edit?_method=PUT', dataCompany, config).then(response => {
              if (response.data.status) {
                this.$q.notify({
                  message: response.data.message,
                  position: 'top',
                  type: 'positive'
                })
                const host = window.location.host
                const parts = host.split('.')
                const username = parts[0]
                this.$axios.get(`member/${username}`).then(response => {
                  this.$store.dispatch('userdata/submitUser', response.data.member)
                  this.$store.dispatch('userdata/submitCompany', response.data.member.company)
                  if (response.data.member.corporate) {
                    this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
                    this.$store.dispatch('userdata/submitMainColor', response.data.member.corporate.corporate_main_color)
                    this.$store.dispatch('userdata/submitSecondaryColor', response.data.member.corporate.corporate_secondary_color)
                  }
                  window.localStorage.setItem('user', JSON.stringify(response.data.member))
                })
                setTimeout(() => this.$router.push({ path: '/dashboard/profile' }), 1000)
              }
            }).catch(error => {
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
          } else {
            this.$axios.post('/member/edit?_method=PUT', data, config).then(response => {
              if (response.data.status) {
                this.$q.notify({
                  message: response.data.message,
                  position: 'top',
                  type: 'positive'
                })

                // this.$axios.get(`member/${username}`).then(response => {
                //   this.$store.dispatch('userdata/submitUser', response.data.member)
                //   this.$store.dispatch('userdata/submitCompany', response.data.member.company)
                //   if (response.data.member.corporate) {
                //     this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
                //     this.$store.dispatch('userdata/submitMainColor', response.data.member.corporate.corporate_main_color)
                //     this.$store.dispatch('userdata/submitSecondaryColor', response.data.member.corporate.corporate_secondary_color)
                //   }
                //   window.localStorage.setItem('user', JSON.stringify(response.data.member))
                // })
                this.getData()
                if (this.$store.state.userdata.user.corporate_id === 48 && this.$store.state.userdata.user.role !== 'Admin') {
                  setTimeout(() => this.$router.push({ path: '/' }), 1500)
                } else {
                  setTimeout(() => this.$router.push({ path: '/dashboard/profile' }), 1000)
                }
              }
            }).catch(error => {
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
          }
        }
        if (this.data.member.role === 'Admin') {
          const data = {
            name: this.data.corporate.corporate_name,
            description: this.data.corporate.corporate_description,
            website: this.data.corporate.corporate_website,
            commerce_group: this.data.corporate.commerce_group,
            phonecode: this.data.corporate.corporate_phonecode,
            phone: this.data.corporate.corporate_phone,
            telephonecode: this.data.corporate.corporate_telephonecode,
            telephone: this.data.corporate.corporate_telephone,
            main_color: this.data.corporate.corporate_main_color,
            secondary_color: this.data.corporate.corporate_secondary_color
          }
          this.$axios.put('/member/corporate', data).then(response => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              // window.setTimeout(function () {
              //   location.reload()
              // }, 1500)
              // this.$router.replace({ path: `dashboard/profile` })
            }
          }).catch(error => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
        }
        if (this.surveyData.length !== 0) {
          this.insertSurveyData()
        }
      }
    },
    deletePdfCorporate () {
      this.$q.dialog({
        title: 'Delete PDF',
        message: 'Are you sure you want to delete this PDF?',
        cancel: 'Cancel'
      }).onOk(() => {
        this.$axios.delete('/member/corporate/deletepdf').then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.$q.loading.show({
              message: 'Getting Data'
            })
            this.$axios.get('/member').then(response => {
              if (response.data.status) {
                this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
                // Set Timeout Loading Hide
                setTimeout(() => {
                  this.$q.loading.hide()
                }, 1000)
              }
            }).catch(error => {
              // Set Timeout Loading Hide
              setTimeout(() => {
                this.$q.loading.hide()
              }, 1000)
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    deleteBGCorporate () {
      this.$q.dialog({
        title: 'Delete Background',
        message: 'Are you sure you want to delete this Background?',
        cancel: 'Cancel'
      }).onOk(() => {
        this.$axios.delete('/member/corporate/delete/background').then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.$q.loading.show({
              message: 'Getting Data'
            })
            this.$axios.get('/member').then(response => {
              if (response.data.status) {
                this.data.member.corporate.background = response.data.member.corporate.background
                this.$store.dispatch('userdata/submitBackground', response.data.member.corporate.background)
                // Set Timeout Loading Hide
                setTimeout(() => {
                  this.$q.loading.hide()
                }, 1000)
              }
            }).catch(error => {
              // Set Timeout Loading Hide
              setTimeout(() => {
                this.$q.loading.hide()
              }, 1000)
              this.$q.notify({
                message: error.message,
                position: 'top',
                type: 'negative'
              })
            })
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      })
    },
    /* BEGIN:: HANDLING DATA */
    saveProfileImage () {
      this.profileImageCropper.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('gambar', blob, 'logo.jpeg')
        this.$axios.post('/member/edit/photo_profil', formData).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.profileImageModal = false
            this.$q.loading.show({
              message: 'Getting Data'
            })
            this.getData()
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      }, this.profileImageCropper.mime_type)
    },
    saveProfileNull () {
      this.$axios.post('/member/edit/photo_profil').then(response => {
        if (response.data.status) {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          this.profileImageModal = false
          this.$q.loading.show({
            message: 'Getting Data'
          })
          this.getData()
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    saveBackgroundNull () {
      this.$axios.post('/member/edit/background').then(response => {
        if (response.data.status) {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          this.backgroundModal = false
          this.$q.loading.show({
            message: 'Getting Data'
          })
          this.getData()
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    saveBackground () {
      this.backgroundCropper.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('gambar', blob, 'background.jpeg')
        this.$axios.post('/member/edit/background', formData).then(response => {
          if (response.data.status) {
            this.$q.notify({
              message: response.data.message,
              position: 'top',
              type: 'positive'
            })
            this.backgroundModal = false
            this.$q.loading.show({
              message: 'Getting Data'
            })
            this.getData()
          }
        }).catch(error => {
          this.$q.notify({
            message: error.message,
            position: 'top',
            type: 'negative'
          })
        })
      }, this.backgroundCropper.mime_type)
    },
    saveCompanyLogo () {
      this.companyLogoCropper.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      if (this.data.member.corporate_id) {
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          const formData = new FormData()
          formData.append('logo', blob, 'company_logo.jpeg')
          this.$axios.post('/member/corporate/edit/logo', formData).then(response => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.companyLogoModal = false
              this.$q.loading.show({
                message: 'Getting Data'
              })
              this.$axios.get('/member').then(response => {
                if (response.data.status) {
                  this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
                  // Set Timeout Loading Hide
                  setTimeout(() => {
                    this.$q.loading.hide()
                  }, 1000)
                }
              }).catch(error => {
                // Set Timeout Loading Hide
                setTimeout(() => {
                  this.$q.loading.hide()
                }, 1000)
                this.$q.notify({
                  message: error.message,
                  position: 'top',
                  type: 'negative'
                })
              })
            }
          }).catch(error => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
        }, this.companyLogoCropper.mime_type)
      } else if (!this.data.member.corporate_id) {
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          const formData = new FormData()
          formData.append('gambar', blob, 'company_logo.jpeg')
          this.$axios.post('/member/edit/logo', formData).then(response => {
            if (response.data.status) {
              this.$q.notify({
                message: response.data.message,
                position: 'top',
                type: 'positive'
              })
              this.companyLogoModal = false
              this.getData()
            }
          }).catch(error => {
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
        }, this.companyLogoCropper.mime_type)
      }
    },
    saveCorporateLogoNull () {
      this.$axios.post('/member/corporate/edit/logo').then(response => {
        if (response.data.status) {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          this.profileImageModal = false
          this.$q.loading.show({
            message: 'Getting Data'
          })
          this.$axios.get('/member').then(response => {
            if (response.data.status) {
              this.$store.dispatch('userdata/submitCorporate', response.data.member.corporate)
              // Set Timeout Loading Hide
              setTimeout(() => {
                this.$q.loading.hide()
              }, 1000)
            }
          }).catch(error => {
            // Set Timeout Loading Hide
            setTimeout(() => {
              this.$q.loading.hide()
            }, 1000)
            this.$q.notify({
              message: error.message,
              position: 'top',
              type: 'negative'
            })
          })
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    saveBackgroundNonCropper () {
      const formData = new FormData()
      const config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      formData.append('gambar', this.backgroundNonCropper.selectedFile)
      this.$axios.post('/member/edit/background', formData, config).then(response => {
        if (response.data.status) {
          this.$q.notify({
            message: response.data.message,
            position: 'top',
            type: 'positive'
          })
          this.backgroundModalNonCropper = false
          this.getData()
        }
      }).catch(error => {
        this.$q.notify({
          message: error.message,
          position: 'top',
          type: 'negative'
        })
      })
    },
    onFileSelectProfile (e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          this.profileImageModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.profileImageCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.profileImageCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    onFileSelectBackground (e) {
      const cropFileExtension = ['jpeg', 'jpg', 'png', 'tiff', 'raw']
      const videoExtensionLists = ['webm', 'mkv', 'mp4', 'avi', 'mov', 'mpg', 'mpeg', '3gp']
      const file = e.target.files[0]
      const fileExtension = file.name.split('.').pop()
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (cropFileExtension.includes(fileExtension)) {
          this.backgroundModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.backgroundCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.backgroundCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        } else {
          this.backgroundModalNonCropper = true
          if (videoExtensionLists.includes(fileExtension)) {
            const reader = new FileReader()
            reader.onload = (event) => {
              this.backgroundNonCropper = {
                videoExtension: true,
                showFile: event.target.result,
                selectedFile: this.$refs.Background.files[0]
              }
            }
            reader.readAsDataURL(file)
          } else {
            const reader = new FileReader()
            reader.onload = (event) => {
              this.backgroundNonCropper = {
                videoExtension: false,
                showFile: event.target.result,
                selectedFile: this.$refs.Background.files[0]
              }
            }
            reader.readAsDataURL(file)
          }
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    onFileSelectCompanyLogo (e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          this.companyLogoModal = true
          const reader = new FileReader()
          reader.onload = (event) => {
            this.companyLogoCropper.selectedFile = event.target.result
            this.$refs.cropper.replace(this.companyLogoCropper.selectedFile)
          }
          reader.readAsDataURL(file)
        }
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    formatCropper (imageType) {
      if (imageType === 'profile_image') {
        this.profileImageCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      } else if (imageType === 'background') {
        this.backgroundCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      } else if (imageType === 'company_logo') {
        this.companyLogoCropper = {
          mime_type: '',
          cropedImage: '',
          autoCrop: false,
          selectedFile: '',
          image: '',
          files: ''
        }
      }
    },
    formatNonCropper () {
      this.backgroundNonCropper = {
        videoExtension: false,
        selectedFile: ''
      }
    },
    sendingEvent (file, xhr, formData) {
      formData.append('background', file)
    }
  }
}
</script>
<style lang="scss">
// @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

.notes-upload {
  position: absolute;
  width: 150px;
  height: 123px;
  left: 31px;
  top: 280px;
  font-style: italic;
  font-weight: bold;
  font-size: 8px;
  line-height: 11px;
}

::placeholder {
  font-size: 12px;
}
</style>
