<template>
  <div class="q-pa-sm">
    <q-tabs
      dense
      class="text-grey border-radius-10px"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      narrow-indicator
      outside-arrows
      mobile-arrows
      style="border: 1px solid #efefef"
    >
      <q-route-tab
        class="bg-secondary text-white text-capitalize"
        label="Preview"
        to="/dashboard/profile"
        exact
      />
      <q-route-tab
        class="text-capitalize"
        label="Edit"
        to="/dashboard/profile/edit"
      />
    </q-tabs>
    <q-separator />
    <q-card
      class="border-radius-10px"
      :style="`background: ${
        $store.state.userdata.user.main_color
          ? $store.state.userdata.user.main_color
          : '#116C54'
      }`"
    >
      <div class="q-pa-lg q-my-md">
        <div class="column">
          <div class="col text-white text-h5 font-monserrat">
            {{
              $store.state.userdata.user.member_first_name
                ? $store.state.userdata.user.member_first_name
                : ""
            }}
            {{
              $store.state.userdata.user.member_middle_name
                ? $store.state.userdata.user.member_middle_name
                : ""
            }}
            {{
              $store.state.userdata.user.member_last_name
                ? $store.state.userdata.user.member_last_name
                : ""
            }}
          </div>
          <div class="col text-white text-h6 font-proxima-nova-alt">
            {{
              $store.state.userdata.user.profil
                ? $store.state.userdata.user.profil
                : "-"
            }}
          </div>
          <div class="col q-mt-md text-white font-proxima-nova-alt">Phone:</div>
          <div class="col text-white text-bold font-monserrat">
            +{{
              $store.state.userdata.user.member_phone
                ? $store.state.userdata.user.phone_code
                  ? $store.state.userdata.user.phone_code +
                    $store.state.userdata.user.member_phone
                  : $store.state.userdata.user.member_phone
                : ""
            }}
          </div>
          <div class="col q-mt-md text-white font-proxima-nova-alt">Email:</div>
          <div class="col text-white text-bold font-monserrat">
            {{
              $store.state.userdata.user.member_email
                ? $store.state.userdata.user.member_email
                : "-"
            }}
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      class="bg-white border-radius-10px"
      v-show="$store.state.userdata.user.sponsor"
      style="max-height: 200px; background-color: #eef2f5"
    >
      <q-card-section
        class="q-my-md"
        horizontal
        :style="`background: url(${BackgroundSponsor}); background-position: left bottom; background-repeat: no-repeat; background-size: 350px 150px;`"
      >
        <div class="col-7 q-mb-sm q-pa-lg column" style="color: #1c458e">
          <span class="col-6"></span>
          <span class="col text-h4 q-mb-sm text-bold"> Member Card </span>
          <span class="col text-h5 q-my-md text-bold">
            {{
              $store.state.userdata.user.sponsor
                ? $store.state.userdata.user.sponsor.sponsor_name
                : ""
            }}
          </span>
          <span
            class="col text-h6"
            style="font-size: 12px"
            v-show="$store.state.userdata.user.expired_date"
          >
            {{
              $store.state.userdata.user.expired_date
                ? moment($store.state.userdata.user.expired_date).format(
                    "DD-MM-YYYY"
                  )
                : ""
            }}
          </span>
        </div>
        <div class="col-4 text-right q-mb-sm">
          <q-img
            alt="Logo Sponsor"
            :src="Sponsor"
            style="max-width: 100px"
            fit="contain"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="bg-white border-radius-10px"
      v-if="partnering.length > 0 && partner.status === true"
    >
      <div class="q-pa-lg q-my-md row">
        <div
          class="q-mb-sm col-6 text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          {{ partner.alias }}
        </div>
        <div
          v-if="partnerList.length > 4"
          class="q-mb-sm col-6 font-monserrat text-right cursor-pointer"
          @click="partnerModal = true"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          See All
        </div>
        <div class="row flex col-12">
          <div class="col-3" v-for="(a, index) in partnering" :key="index">
            <div class="column flex flex-center cursor-pointer">
              <q-avatar size="75px" v-show="a.cabang.length > 1">
                <q-img
                  alt="Profile Logo"
                  :src="a.image ? a.image : Profile"
                  width="80%"
                  height="80%"
                  @click="showPartnerCabang(a.cabang, a)"
                />
              </q-avatar>
              <q-avatar size="75px" v-show="a.cabang.length <= 1">
                <q-img
                  alt="Profile Logo"
                  :src="a.image ? a.image : Profile"
                  width="80%"
                  height="80%"
                />
              </q-avatar>
              <span
                class="text-capitalize font-proxima-nova-alt q-px-sm"
                v-show="a.name.length < 6"
                >{{ a.name }}</span
              >
              <span
                class="text-capitalize font-proxima-nova-alt q-px-sm"
                v-show="a.name.length >= 6"
                >{{ a.name.substring(0, 6) + "..." }}</span
              >
              <q-btn
                v-show="a.cabang.length > 1"
                class="text-capitalize font-proxima-nova-alt border-radius-10px q-px-sm"
                label="Cabang Lain"
                @click="showPartnerCabang(a.cabang, a)"
                :style="`background: rgba(17, 108, 84, 0.2); color: #116C54; font-size: 13px`"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      class="bg-white border-radius-10px"
      v-if="
        facebookList.length > 0 ||
        twitterList.length > 0 ||
        linkedInList.length > 0 ||
        instagramList.length > 0
      "
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Social Links
        </div>
        <div class="row flex">
          <div v-if="facebookList.length > 0" class="col-2 q-mx-sm">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-facebook-f"
                color="primary"
                @click="showFacebookModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Facebook
                {{
                  facebookList.length > 1 ? "(" + facebookList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="twitterList.length > 0" class="col-2 q-mx-sm">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-twitter"
                color="info"
                @click="showTwitterModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Twitter
                {{
                  twitterList.length > 1 ? "(" + twitterList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="linkedInList.length > 0" class="col-2 q-mx-sm">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-linkedin-in"
                color="primary"
                @click="showLinkedInModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >LinkedIn
                {{
                  linkedInList.length > 1 ? "(" + linkedInList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="instagramList.length > 0" class="col-2 q-mx-sm">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-instagram"
                color="accent"
                @click="showInstagramModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Instagram
                {{
                  instagramList.length > 1
                    ? "(" + instagramList.length + ")"
                    : ""
                }}</small
              >
            </div>
          </div>
          <div v-if="tiktokList.length > 0" class="col-2 q-mx-sm">
            <div class="column flex flex-center">
              <q-btn
                class="col button-sosmed border-radius-10px q-mb-xs q-mx-md"
                icon="fab fa-tiktok"
                color="black"
                @click="showTiktokModal()"
              />
              <small class="col q-mb-md text-center font-proxima-nova-alt"
                >Tiktok
                {{
                  tiktokList.length > 1 ? "(" + tiktokList.length + ")" : ""
                }}</small
              >
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <div v-if="bannerList.length > 0 && banner.status === true" class="">
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        :navigation="bannerList.length > 1 ? true : false"
        height="300px"
        infinite
        :autoplay="autoplay"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide
          class="cursor-pointer"
          v-for="(a, index) in bannerList"
          :key="index"
          :name="index"
          :img-src="a.image"
          @click="showBannerModal(a)"
        />
      </q-carousel>
    </div>
    <div
      v-if="listVideo || listVidio"
      class="youtube-list scrolling-wrapper q-mt-md"
    >
      <div
        class="youtube-video"
        v-for="video in listVideo"
        :key="video.socmed_link"
      >
        <q-video :src="video.socmed_link" />
      </div>
      <div
        class="youtube-video"
        v-for="video in listVidio"
        :key="video.socmed_link"
      >
        <q-video :src="video.socmed_link" />
      </div>
    </div>
    <q-card
      class="bg-white border-radius-10px"
      v-if="this.$store.state.userdata.user.corporate_id"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          {{
            $store.state.userdata.corporate.corporate_name
              ? $store.state.userdata.corporate.corporate_name
              : "CompanyName"
          }}
        </div>
        <div class="font-proxima-nova-alt">
          <span
            v-html="
              $store.state.userdata.corporate.corporate_description
                ? $store.state.userdata.corporate.corporate_description
                : ''
            "
          ></span>
        </div>
        <div class="q-mt-md row">
          <div
            v-if="
              `${linkStoragePdf + $store.state.userdata.corporate.file_pdf}` !=
              `${linkStoragePdf + null}`
            "
            class="col-6"
          >
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="View PDF"
              @click="showPdfView()"
              :style="`background: ${
                $store.state.userdata.user.main_color
                  ? $store.state.userdata.user.main_color
                  : '#116C54'
              }`"
            />
          </div>
          <div
            v-if="$store.state.userdata.corporate.corporate_website != null"
            class="col-6"
            :class="
              `${linkStoragePdf + $store.state.userdata.corporate.file_pdf}` !=
              `${linkStoragePdf + null}`
                ? 'text-right'
                : 'text-left'
            "
          >
            <q-btn
              class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
              label="Visit Web"
              @click="
                visitWeb($store.state.userdata.corporate.corporate_website)
              "
              :style="`background: ${
                $store.state.userdata.user.secondary_color
                  ? $store.state.userdata.user.secondary_color
                  : '#116C54'
              }`"
            />
          </div>
        </div>
      </div>
    </q-card>
    <div v-else-if="!this.$store.state.userdata.user.corporate_id">
      <q-card
        class="bg-white border-radius-10px"
        v-if="this.$store.state.userdata.user.company_name"
      >
        <div class="q-pa-lg q-my-md">
          <div
            class="q-mb-sm text-h6 text-bold font-monserrat"
            :style="`color: ${
              $store.state.userdata.user.secondary_color
                ? $store.state.userdata.user.secondary_color
                : '#116C54'
            }`"
          >
            {{
              $store.state.userdata.user.company_name
                ? $store.state.userdata.user.company_name
                : "Company Name"
            }}
          </div>
          <div class="font-proxima-nova-alt">
            <p>
              {{
                $store.state.userdata.user.company_description
                  ? $store.state.userdata.user.company_description
                  : ""
              }}
            </p>
          </div>
          <div class="q-mt-md row">
            <div
              v-if="
                `${
                  linkStoragePdf + $store.state.userdata.corporate.file_pdf
                }` != `${linkStoragePdf + null}`
              "
              class="col-6"
            >
              <q-btn
                class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
                label="View PDF"
                @click="showPdfView()"
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
            <div
              v-if="$store.state.userdata.user.company_contact_website != null"
              class="col-6"
              :class="
                `${
                  linkStoragePdf + $store.state.userdata.corporate.file_pdf
                }` != `${linkStoragePdf + null}`
                  ? 'text-right'
                  : 'text-left'
              "
            >
              <q-btn
                class="text-capitalize text-white font-proxima-nova-alt border-radius-10px q-px-sm"
                label="Visit Web"
                @click="
                  visitWeb($store.state.userdata.user.corporate_contact_website)
                "
                :style="`background: ${
                  $store.state.userdata.user.secondary_color
                    ? $store.state.userdata.user.secondary_color
                    : '#116C54'
                }`"
              />
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <q-card
      v-if="listContactPhone.length > 0"
      class="bg-white border-radius-10px"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="q-mb-sm text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Contact
        </div>
        <div
          v-for="contact in listContactPhone"
          :key="contact.id"
          class="q-ml-sm q-mb-sm row"
        >
          <div class="col-1">
            <q-icon
              name="phone"
              :style="`color: ${
                $store.state.userdata.user.main_color
                  ? $store.state.userdata.user.main_color
                  : '#116C54'
              }`"
            />
          </div>
          <div class="col-11">
            <span class="font-proxima-nova-alt"
              >+{{ contact.phone_number }}</span
            >
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      v-if="
        listAddress.length > 0
          ? $store.state.userdata.corporate.corporate_address
          : ''
      "
      class="bg-white border-radius-10px"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Address Personal
        </div>
        <div class="q-mt-sm">
          <div
            v-for="address in listAddress"
            :key="address.id"
            class="row q-mb-lg"
          >
            <div class="col-1">
              <q-icon
                v-if="address.address_type === 'Home'"
                class="q-mr-sm"
                name="home"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
              <q-icon
                v-else-if="address.address_type === 'Apartment'"
                class="q-mr-sm"
                name="apartment"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
              <q-icon
                v-else
                class="q-mr-sm"
                name="business"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
            <div class="col-11 column font-proxima-nova-alt">
              <span class="col" style="font-size: 14px">{{
                address.address ? address.address : "Alamat tidak terdefinisi"
              }}</span>
              <q-btn
                class="col text-white q-py-xs text-capitalize q-mt-sm border-radius-10px"
                label="View Map"
                @click="linkToMaps(address.address)"
                style="width: 87px; font-size: 10px"
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
          </div>
        </div>
        <q-separator></q-separator>
        <div
          class="text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Address Corporate
        </div>
        <div class="q-mt-sm">
          <div
            v-for="address in $store.state.userdata.corporate.corporate_address"
            :key="address.id"
            class="row q-mb-lg"
          >
            <div class="col-1">
              <q-icon
                class="q-mr-sm"
                name="business"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
            <div class="col-11 column font-proxima-nova-alt">
              <span class="col" style="font-size: 14px">{{
                address.corporate_address
                  ? address.corporate_address
                  : "Alamat tidak terdefinisi"
              }}</span>
              <q-btn
                class="col text-white q-py-xs text-capitalize q-mt-sm border-radius-10px"
                label="View Map"
                @click="linkToMaps(address.corporate_address)"
                style="width: 87px; font-size: 10px"
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      v-else-if="listAddress.length > 0"
      class="bg-white border-radius-10px"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Address Personal
        </div>
        <div class="q-mt-sm">
          <div
            v-for="address in listAddress"
            :key="address.id"
            class="row q-mb-lg"
          >
            <div class="col-1">
              <q-icon
                v-if="address.address_type === 'Home'"
                class="q-mr-sm"
                name="home"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
              <q-icon
                v-else-if="address.address_type === 'Apartment'"
                class="q-mr-sm"
                name="apartment"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
              <q-icon
                v-else
                class="q-mr-sm"
                name="business"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
            <div class="col-11 column font-proxima-nova-alt">
              <span class="col" style="font-size: 14px">{{
                address.address ? address.address : "Alamat tidak terdefinisi"
              }}</span>
              <q-btn
                class="col text-white q-py-xs text-capitalize q-mt-sm border-radius-10px"
                label="View Map"
                @click="linkToMaps(address.address)"
                style="width: 87px; font-size: 10px"
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>
    <q-card
      v-else-if="$store.state.userdata.corporate.corporate_address"
      class="bg-white border-radius-10px"
    >
      <div class="q-pa-lg q-my-md">
        <div
          class="text-h6 text-bold font-monserrat"
          :style="`color: ${
            $store.state.userdata.user.secondary_color
              ? $store.state.userdata.user.secondary_color
              : '#116C54'
          }`"
        >
          Address Corporate
        </div>
        <div class="q-mt-sm">
          <div
            v-for="address in $store.state.userdata.corporate.corporate_address"
            :key="address.id"
            class="row q-mb-lg"
          >
            <div class="col-1">
              <q-icon
                class="q-mr-sm"
                name="business"
                size="sm"
                :style="`color: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
            <div class="col-11 column font-proxima-nova-alt">
              <span class="col" style="font-size: 14px">{{
                address.corporate_address
                  ? address.corporate_address
                  : "Alamat tidak terdefinisi"
              }}</span>
              <q-btn
                class="col text-white q-py-xs text-capitalize q-mt-sm border-radius-10px"
                label="View Map"
                @click="linkToMaps(address.corporate_address)"
                style="width: 87px; font-size: 10px"
                :style="`background: ${
                  $store.state.userdata.user.main_color
                    ? $store.state.userdata.user.main_color
                    : '#116C54'
                }`"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- FACEBOOK MODAL -->
    <q-dialog v-model="facebookModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-facebook-f" color="primary" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Facebook</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <template v-for="(fb, idx) in facebookList">
            <div v-if="fb.socmed_link != null" :key="idx">
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed {{ fb.name }}
                </div>
                <div class="q-my-sm text-bold" style="font-size: 18px">
                  {{ fb.socmed_title }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Link {{ fb.name }}
                </div>
                <div class="q-my-sm">
                  <span class="q-mr-md text-bold" style="font-size: 18px">{{
                    fb.socmed_link
                  }}</span>
                  <q-icon
                    name="fas fa-link"
                    color="primary"
                    size="xs"
                    @click="doCopyLink(fb.socmed_link)"
                  />
                </div>
              </div>
              <div class="q-my-lg flex flex-center">
                <q-btn
                  class="full-width bg-primary text-white text-capitalize"
                  label="Visit Profile"
                  @click="visitProfileSocmed(fb.socmed_link)"
                  rounded
                />
              </div>
              <div v-if="idx !== facebookList.length - 1" class="q-my-lg">
                <q-separator />
              </div>
            </div>
          </template>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- TWITTER MODAL -->
    <q-dialog v-model="twitterModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-twitter" color="info" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Twitter</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <template v-for="(twt, idx) in twitterList">
            <div v-if="twt.socmed_link != null" :key="idx">
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Title {{ twt.name }}
                </div>
                <div class="q-my-sm text-bold" style="font-size: 18px">
                  {{ twt.socmed_title }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Link {{ twt.name }}
                </div>
                <div class="q-my-sm">
                  <span class="q-mr-md text-bold" style="font-size: 18px">{{
                    twt.socmed_link
                  }}</span>
                  <q-icon
                    name="fas fa-link"
                    color="info"
                    size="xs"
                    @click="doCopyLink(twt.socmed_link)"
                  />
                </div>
              </div>
              <div class="q-my-lg flex flex-center">
                <q-btn
                  class="full-width bg-info text-white text-capitalize"
                  label="Visit Profile"
                  @click="visitProfileSocmed(twt.socmed_link)"
                  rounded
                />
              </div>
              <div v-if="idx !== twitterList.length - 1" class="q-my-lg">
                <q-separator />
              </div>
            </div>
          </template>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- LINKED IN MODAL -->
    <q-dialog v-model="linkedInModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-linkedin-in" color="primary" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Linked In</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <template v-for="(li, idx) in linkedInList">
            <div v-if="li.socmed_link != null" :key="idx">
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Title {{ li.name }}
                </div>
                <div class="q-my-sm text-bold" style="font-size: 18px">
                  {{ li.socmed_title }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Link {{ li.name }}
                </div>
                <div class="q-my-sm">
                  <span class="q-mr-md text-bold" style="font-size: 18px">{{
                    li.socmed_link
                  }}</span>
                  <q-icon
                    name="fas fa-link"
                    color="primary"
                    size="xs"
                    @click="doCopyLink(li.socmed_link)"
                  />
                </div>
              </div>
              <div class="q-my-lg flex flex-center">
                <q-btn
                  class="full-width bg-primary text-white text-capitalize"
                  label="Visit Profile"
                  @click="visitProfileSocmed(li.socmed_link)"
                  rounded
                />
              </div>
              <div v-if="idx !== linkedInList.length - 1" class="q-my-lg">
                <q-separator />
              </div>
            </div>
          </template>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- INSTAGRAM MODAL -->
    <q-dialog v-model="instagramModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-instagram" color="accent" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Instagram</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <template v-for="(ig, idx) in instagramList">
            <div v-if="ig.socmed_link != null" :key="idx">
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Title {{ ig.name }}
                </div>
                <div class="q-my-sm text-bold" style="font-size: 18px">
                  {{ ig.socmed_title }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="q-my-sm text-grey-7" style="font-size: 14px">
                  Socmed Link {{ ig.name }}
                </div>
                <div class="q-my-sm">
                  <span class="q-mr-md text-bold" style="font-size: 18px">{{
                    ig.socmed_link
                  }}</span>
                  <q-icon
                    name="fas fa-link"
                    color="accent"
                    size="xs"
                    @click="doCopyLink(ig.socmed_link)"
                  />
                </div>
              </div>
              <div class="q-my-lg flex flex-center">
                <q-btn
                  class="full-width bg-accent text-white text-capitalize"
                  label="Visit Profile"
                  @click="visitProfileSocmed(ig.socmed_link)"
                  rounded
                />
              </div>
              <div v-if="idx !== instagramList.length - 1" class="q-my-lg">
                <q-separator />
              </div>
            </div>
          </template>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PARTNER MODAL -->
    <q-dialog v-model="partnerModal" full-width>
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <!-- <q-icon name="fab fa-instagram" color="accent" size="sm" /> -->
          </div>
          <div class="col-4 text-h6 text-center">{{ partner.alias }}</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row flex col-12">
            <div
              class="col-lg-4 col-md-2 col-sm-4 q-ml-auto q-mr-auto"
              v-for="(a, index) in partnerList" :key="index"
            >
              <div class="column flex flex-center cursor-pointer">
                <q-avatar size="75px" v-show="a.cabang.length > 1">
                  <q-img
                    alt="Profile Logo"
                    :src="a.image ? a.image : Profile"
                    width="80%"
                    height="80%"
                    @click="showPartnerCabang(a.cabang, a)"
                  />
                </q-avatar>
                <q-avatar size="75px" v-show="a.cabang.length <= 1">
                  <q-img
                    alt="Profile Logo"
                    :src="a.image ? a.image : Profile"
                    width="80%"
                    height="80%"
                  />
                </q-avatar>
                <span
                  class="text-capitalize font-proxima-nova-alt q-px-sm"
                  v-show="a.name.length < 6"
                  >{{ a.name }}</span
                >
                <span
                  class="text-capitalize font-proxima-nova-alt q-px-sm"
                  v-show="a.name.length >= 6"
                  >{{ a.name.substring(0, 6) + "..." }}</span
                >
                <q-btn
                  v-show="a.cabang.length > 1"
                  class="text-capitalize font-proxima-nova-alt border-radius-10px q-px-sm"
                  label="Cabang Lain"
                  @click="showPartnerCabang(a.cabang, a)"
                  :style="`background: rgba(17, 108, 84, 0.2); color: #116C54; font-size: 13px`"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PARTNER CABANG MODAL -->
    <q-dialog v-model="partnerCabangModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-6 text-left q-mt-xs">
            <q-btn
              style="color: #116c54"
              icon="arrow_back"
              flat
              round
              dense
              v-close-popup
            >
              Back
            </q-btn>
          </div>
          <div class="col-12 text-bold text-h6 text-left">
            {{ partnerCabangDetail.name }} - Branch
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(pc, idx) in partnerCabang" :key="idx">
            <div class="row">
              <div class="col-2 q-mr-md q-my-sm">
                <q-avatar size="75px">
                  <q-img
                    alt="Profile Logo"
                    :src="pc.partner_image ? pc.partner_image : Profile"
                    width="80%"
                    height="80%"
                  />
                </q-avatar>
              </div>
              <div class="col-8 offset-1 q-mt-lg">
                <div
                  class="q-my-sm text-bold"
                  style="font-size: 18px; color: #116c54"
                >
                  {{ pc.partner_name }}
                </div>
              </div>
            </div>
            <div v-if="idx !== partnerCabang.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- BANNER MODAL -->
    <q-dialog v-model="bannerModal" full-width full-height>
      <q-card class="font-proxima-nova-alt">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <!-- <q-icon name="fab fa-instagram" color="accent" size="sm" /> -->
          </div>
          <div class="col-4 text-h6 text-center">Detail Banner</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none scroll" style="max-height: 80vh">
          <div class="row flex col-12 text-center">
            <div class="col-12 text-center">
              <q-img
                alt="Profile Logo"
                :src="bannerDetail.image ? bannerDetail.image : Profile"
                width="100%"
                :height="$store.state.style.isMobile ? '125px' : '300px'"
                contain
              />
            </div>
            <div class="col-12 text-center">
              <h5 class="text-bold">{{ bannerDetail.name }}</h5>
              <p>{{ bannerDetail.description }}</p>
            </div>
          </div>
        </q-card-section>
        <q-footer class="bg-white text-white" v-if="bannerDetail.link">
          <q-card-actions align="center">
            <q-btn
              class="full-width text-white text-capitalize"
              :style="`background-color: #116C54`"
              @click="visitWeb(bannerDetail.link)"
              label="Click Here"
              rounded
            />
          </q-card-actions>
        </q-footer>
      </q-card>
    </q-dialog>
    <!-- TIKTOK MODAL -->
    <q-dialog v-model="tiktokModal">
      <q-card class="font-proxima-nova-alt" style="min-width: 350px">
        <q-card-section class="row">
          <div class="col-4 text-left q-mt-xs">
            <q-icon name="fab fa-tiktok" color="black" size="sm" />
          </div>
          <div class="col-4 text-h6 text-center">Tiktok</div>
          <div class="col-4 text-right">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-for="(ig, idx) in tiktokList" :key="idx">
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Title {{ ig.name }}
              </div>
              <div class="q-my-sm text-bold" style="font-size: 18px">
                {{ ig.socmed_title }}
              </div>
            </div>
            <div class="q-my-sm">
              <div class="q-my-sm text-grey-7" style="font-size: 14px">
                Socmed Link {{ ig.name }}
              </div>
              <div class="q-my-sm">
                <span
                  v-if="
                    $store.state.style.isMobile && ig.socmed_link.length > 30
                  "
                  class="q-mr-md text-bold"
                  style="font-size: 18px"
                  >{{ ig.socmed_link.substring(0, 30) + "..." }}</span
                >
                <span
                  v-else
                  class="q-mr-md text-bold"
                  style="font-size: 18px"
                  >{{ ig.socmed_link }}</span
                >
                <q-icon
                  name="fas fa-link"
                  color="black"
                  size="xs"
                  @click="doCopyLink(ig.socmed_link)"
                />
              </div>
            </div>
            <div class="q-my-lg flex flex-center">
              <q-btn
                class="full-width bg-black text-white text-capitalize"
                label="Visit Profile"
                @click="visitProfileIG(ig.socmed_link)"
                rounded
              />
            </div>
            <div v-if="idx !== instagramList.length - 1" class="q-my-lg">
              <q-separator />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PDF Dialog -->
    <q-dialog
      v-model="pdfDialog"
      transition-show="slide-left"
      transition-hide="slide-right"
      maximized
    >
      <q-card class="bg-white border-radius-10px full-width">
        <q-toolbar>
          <q-btn flat round dense icon="arrow_back" v-close-popup />
          <q-toolbar-title
            class="text-center font-proxima-nova-alt"
            :style="`margin-left:-40px; color: ${
              $store.state.userdata.user.secondary_color
                ? $store.state.userdata.user.secondary_color
                : '#116C54'
            }`"
          >
            View PDF</q-toolbar-title
          >
        </q-toolbar>
        <iframe
          :src="`https://docs.google.com/viewerng/viewer?url=${
            linkStoragePdf + $store.state.userdata.corporate.file_pdf
          }&embedded=true`"
          frameborder="0"
          height="100%"
          width="100%"
        ></iframe>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { Notify } from 'quasar'
import Profile from 'src/assets/image/TAGID-profile.jpg'
import Sponsor from 'src/assets/image/sponsor.png'
import BackgroundSponsor from 'src/assets/image/background-sponsor.png'
import moment from 'moment'

const localStorage = JSON.parse(window.localStorage.getItem('user'))
const userId = localStorage.user_id
const sponsorId = localStorage.sponsor_id

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
export default {
  mounted () {
    this.getAddress()
    this.getPhone()
    this.getVideo()
    this.getFacebook()
    this.getTwitter()
    this.getLinkedIn()
    this.getInstagram()
    this.getPartner()
    this.getPartnerConfig()
    this.getBanner()
    this.getBannerConfig()
    this.getTiktok()
  },
  data () {
    return {
      Profile,
      Sponsor,
      moment,
      BackgroundSponsor,
      pdfDialog: false,
      facebookModal: false,
      twitterModal: false,
      linkedInModal: false,
      instagramModal: false,
      partnerModal: false,
      bannerModal: false,
      tiktokModal: false,
      partnerCabangModal: false,
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      listContactPhone: [],
      listAddress: [],
      listVideo: [],
      listVidio: [],
      facebookList: [],
      twitterList: [],
      linkedInList: [],
      instagramList: [],
      partnerList: [],
      partnerListLength: 0,
      partner: {},
      partnerCabang: [],
      partnerCabangDetail: [],
      bannerList: [],
      bannerDetail: {},
      banner: {},
      tiktokList: [],
      slide: 0,
      autoplay: true
    }
  },
  computed: {
    partnering () {
      return this.partnerList
        .filter((partner) => partner.is_expired === false)
        .splice(0, 4)
    }
  },
  methods: {
    embedYoutube (link) {
      if (link) {
        const linkEmbeded = link.split('/').pop()
        return `https://youtube.com/embed/${linkEmbeded}`
      }
      return 'https://youtube.com/embed/'
    },
    doCopyLink (link) {
      this.$copyText(link).then(
        function (e) {
          Notify.create({
            message: 'Copied',
            position: 'bottom',
            type: 'positive'
          })
        },
        function (e) {
          Notify.create({
            message: 'Can not copy',
            position: 'bottom',
            type: 'negative'
          })
        }
      )
    },
    visitProfileSocmed (link) {
      window.open(link)
    },
    showPdfView () {
      this.pdfDialog = true
    },
    showFacebookModal () {
      this.$emit('close')
      this.facebookModal = true
    },
    showTwitterModal () {
      this.$emit('close')
      this.twitterModal = true
    },
    showLinkedInModal () {
      this.$emit('close')
      this.linkedInModal = true
    },
    showInstagramModal () {
      this.$emit('close')
      this.instagramModal = true
    },
    showBannerModal (item) {
      this.$emit('close')
      this.bannerDetail = item
      this.bannerModal = true
    },
    showTiktokModal () {
      this.$emit('close')
      this.tiktokModal = true
    },
    showPartnerCabang (data, partner) {
      this.$emit('close')
      this.partnerCabangModal = true
      this.partnerCabang = data
      this.partnerCabangDetail = partner
    },
    getAddress () {
      this.$axios.get('/member/address/' + userId).then((response) => {
        this.listAddress = response.data.data
      })
    },
    getPhone () {
      this.$axios.get('/member/phone/' + userId).then((response) => {
        this.listContactPhone = response.data.data
      })
    },
    getVideo () {
      const params = {
        socmed_name: 'youtube'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: params })
        .then((response) => {
          this.listVideo = response.data.data.map((data) => {
            return {
              order: data.order,
              socmed_name: 'youtube',
              socmed_link: this.embedYoutube(data.socmed_link),
              status: 'active'
            }
          })
        })
      this.$axios
        .get('/member/corporate/socialmedia', { params: params })
        .then((response) => {
          this.listVidio = response.data.data.map((data) => {
            return {
              order: '1',
              socmed_name: 'youtube',
              socmed_link: this.embedYoutube(data.link),
              status: 'active'
            }
          })
        })
    },
    getFacebook () {
      const paramsFb = {
        socmed_name: 'facebook'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: paramsFb })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.facebookList.push({
              socmed_name: data.socmed_name,
              socmed_title: data.socmed_title,
              socmed_link: data.socmed_link,
              name: 'Personal'
            })
          })
        })
      this.$axios
        .get('/member/corporate/socialmedia/', { params: paramsFb })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.facebookList.push({
              socmed_name: data.name,
              socmed_title: data.title,
              socmed_link: data.link,
              name: 'Corporate'
            })
          })
        })
    },
    getTwitter () {
      const paramsTwt = {
        socmed_name: 'twitter'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: paramsTwt })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.twitterList.push({
              socmed_name: data.socmed_name,
              socmed_title: data.socmed_title,
              socmed_link: data.socmed_link,
              name: 'Personal'
            })
          })
        })
      this.$axios
        .get('/member/corporate/socialmedia/', { params: paramsTwt })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.twitterList.push({
              socmed_name: data.name,
              socmed_title: data.title,
              socmed_link: data.link,
              name: 'Corporate'
            })
          })
        })
    },
    getLinkedIn () {
      const paramsLi = {
        socmed_name: 'linkedin'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: paramsLi })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.linkedInList.push({
              socmed_name: data.socmed_name,
              socmed_title: data.socmed_title,
              socmed_link: data.socmed_link,
              name: 'Personal'
            })
          })
        })
      this.$axios
        .get('/member/corporate/socialmedia/', { params: paramsLi })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.linkedInList.push({
              socmed_name: data.name,
              socmed_title: data.title,
              socmed_link: data.link,
              name: 'Corporate'
            })
          })
        })
    },
    getInstagram () {
      const paramsIg = {
        socmed_name: 'instagram'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: paramsIg })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.instagramList.push({
              socmed_name: data.socmed_name,
              socmed_title: data.socmed_title,
              socmed_link: data.socmed_link,
              name: 'Personal'
            })
          })
        })
      this.$axios
        .get('/member/corporate/socialmedia/', { params: paramsIg })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.instagramList.push({
              socmed_name: data.name,
              socmed_title: data.title,
              socmed_link: data.link,
              name: 'Corporate'
            })
          })
        })
    },
    getTiktok () {
      const paramsTk = {
        socmed_name: 'tiktok'
      }
      this.$axios
        .get('/member/socialmedia/' + userId, { params: paramsTk })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.tiktokList.push({
              socmed_name: data.socmed_name,
              socmed_title: data.socmed_title,
              socmed_link: data.socmed_link,
              name: 'Personal'
            })
          })
        })
      this.$axios
        .get('/member/corporate/socialmedia/', { params: paramsTk })
        .then((response) => {
          response.data.data.forEach((data) => {
            this.tiktokList.push({
              socmed_name: data.name,
              socmed_title: data.title,
              socmed_link: data.link,
              name: 'Corporate'
            })
          })
        })
    },
    getPartner () {
      this.$axios
        .get('/member/corporate/sponsor/getPartnerSponsor/' + sponsorId)
        .then((response) => {
          response.data.data.forEach((data) => {
            this.partnerList.push(data.partner)
          })
          this.partnerListLength = this.partnerList.length
        })
    },
    getPartnerConfig () {
      this.$axios.get('/partner/config').then((response) => {
        this.partner = response.data.data
      })
    },
    getBanner () {
      this.$axios.get('/banner').then((response) => {
        this.bannerList = response.data.data
      })
    },
    getBannerConfig () {
      this.$axios.get('/banner/config').then((response) => {
        this.banner = response.data.data
      })
    },
    visitWeb (link) {
      window.open(link)
    },
    linkToMaps (address) {
      window.open('https://maps.google.com/?q=' + address)
    }
  }
}
</script>
<style lang="scss">
.button-sosmed {
  width: 56px !important;
  padding: 10px;
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  .youtube-video {
    display: inline-block;
    margin-right: 10px;
  }

  .youtube-video:last-of-type {
    margin-right: none;
  }
}
</style>
