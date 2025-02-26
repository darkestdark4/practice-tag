<template>
  <div>
    <div v-if="video">
      <video-background
        :src="`${
          data.member.background
            ? linkStorageBg + data.member.background
            : VideoExample
        }`"
        style="width: 100%; height: 100vh"
      >
        <q-layout view="lHh Lpr lff">
          <q-page-container>
            <q-btn
              flat
              round
              dense
              color="white"
              icon="arrow_back"
              class="q-my-sm q-mx-sm"
              @click="goBack()"
            />
            <div class="bawah absolute-bottom full-width">
              <q-card
                class="card-profile bg-white border-radius-10px q-mx-md"
                style="margin-bottom: 50px"
                flat
              >
                <q-card-section class="q-pa-sm">
                  <div class="row">
                    <div class="col-8">
                      <div class="column text-black q-ml-md">
                        <div
                          class="col text-bold text-white font-monserrat"
                          style="font-size: 24px;"
                        >
                          {{
                            data.member.member_first_name
                              ? data.member.member_first_name
                              : ""
                          }}
                          {{
                            data.member.member_middle_name
                              ? data.member.member_middle_name
                              : ""
                          }}
                          {{
                            data.member.member_last_name
                              ? data.member.member_last_name
                              : ""
                          }}
                        </div>
                        <div
                          class="col text-white font-proxima-nova-alt"
                          style="font-size: 20px;"
                        >
                          {{ data.member.profil ? data.member.profil : "-" }}
                        </div>
                        <div
                          class="col text-white font-proxima-nova-alt"
                          style="font-size: 16px;"
                          v-if="data.member.corporate_id"
                        >
                          {{
                            data.member.corporate.corporate_name
                              ? data.member.corporate.corporate_name
                              : ""
                          }}
                        </div>
                        <div
                          class="col text-white font-proxima-nova-alt"
                          style="font-size: 16px;"
                          v-else-if="!data.member.corporate_id"
                        >
                          {{
                            data.member.company_name
                              ? data.member.company_name
                              : ""
                          }}
                        </div>
                        <div
                          class="col text-white font-proxima-nova-alt"
                          style="font-size: 16px;"
                        >
                          {{
                            data.member.member_email
                              ? data.member.member_email
                              : "-"
                          }}
                        </div>
                        <div class="col">
                          <q-btn
                            class="q-my-sm text-capitalize font-proxima-nova-alt"
                            color="white"
                            icon="fab fa-whatsapp"
                            :label="
                              data.member.member_phone
                                ? data.member.phone_code
                                  ? '+' +
                                    data.member.phone_code +
                                    data.member.member_phone
                                  : data.member.member_phone
                                : ''
                            "
                            @click="
                              sendWhatsapp(
                                data.member.phone_code +
                                  data.member.member_phone
                              )
                            "
                            outline
                            rounded
                          />
                        </div>
                        <div class="col">
                          <q-img
                            class="q-mr-xs"
                            v-if="
                              data.member.vaccine1 === 'Fully vaccinated' ||
                              data.member.vaccine1 ===
                                'Waiting on additional dose'
                            "
                            :src="IconVaccinated"
                            width="12px"
                            height="12px"
                          />
                          <q-img
                            class="q-mr-xs"
                            v-if="
                              data.member.vaccine1 ===
                                'Planning to get vaccinated' ||
                              data.member.vaccine1 === 'Not getting vaccinated'
                            "
                            :src="IconNonVaccinated"
                            width="12px"
                            height="12px"
                          />
                          <span
                            class="text-white"
                            v-if="data.member.vaccine1 === 'Fully vaccinated'"
                            style="font-size: 12px"
                            >Fully vaccinated</span
                          >
                          <span
                            class="text-white"
                            v-if="
                              data.member.vaccine1 ===
                              'Waiting on additional dose'
                            "
                            style="font-size: 12px"
                            >Waiting on additional dose</span
                          >
                          <span
                            class="text-white"
                            v-if="
                              data.member.vaccine1 ===
                              'Planning to get vaccinated'
                            "
                            style="font-size: 12px"
                            >Planning to get vaccinated</span
                          >
                          <span
                            class="text-white"
                            v-if="
                              data.member.vaccine1 === 'Not getting vaccinated'
                            "
                            style="font-size: 12px"
                            >Not getting vaccinated</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-4 q-mt-sm column">
                      <div class="q-mb-lg" v-if="data.member.corporate_id">
                        <img
                          @error="handlingCompanyLogoError"
                          class="border-radius-10px"
                          :src="
                            data.member.corporate.logo
                              ? linkStorageCorpLogo + data.member.corporate.logo
                              : CompanyLogo
                          "
                          width="120px"
                          height="120px"
                        />
                      </div>
                      <div
                        class="q-mb-lg"
                        v-else-if="!data.member.corporate_id"
                      >
                        <img
                          @error="handlingCompanyLogoError"
                          class="border-radius-10px"
                          :src="
                            data.member.company_logo
                              ? linkStorageCompLogo + data.member.company_logo
                              : CompanyLogo
                          "
                          width="120px"
                          height="120px"
                        />
                      </div>
                      <div>
                        <img
                          @error="handlingProfileError"
                          class="border-radius-10px"
                          :src="
                            data.member.logo
                              ? linkStorageProfile + data.member.logo
                              : Logo
                          "
                          width="120px"
                          height="120px"
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <vue-bottom-sheet
              ref="myBottomSheet"
              effect="fx-fadein-scale"
              @opened="showProfileComponent()"
              :is-full-screen="true"
              max-height="95%"
              max-width="100%"
            >
              <div class="q-pb-xl q-px-sm">
                <div
                  class="card-profile"
                  v-show="componentPage.profileComponent"
                >
                  <Profile @view-pdf="showViewPdfComponent" @close="close" />
                </div>
                <div class="card-bio" v-show="componentPage.bioComponent">
                  <Bio />
                </div>
                <div
                  class="card-contact"
                  v-show="componentPage.contactComponent"
                >
                  <Contact />
                </div>
                <div
                  class="card-connect"
                  v-show="componentPage.connectComponent"
                >
                  <Connect />
                </div>
                <div class="card-share" v-show="componentPage.shareComponent">
                  <Share />
                </div>
                <div class="card-share" v-show="componentPage.shopComponent">
                  <Shop />
                </div>
                <div
                  class="card-schedule"
                  v-show="componentPage.addScheduleComponent"
                >
                  <AddSchedule @close="close" />
                </div>
                <div
                  class="card-schedule"
                  v-show="componentPage.viewPdfComponent"
                >
                  <ViewPdf />
                </div>

                <q-dialog
                  v-model="shopDialog"
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
                          data.member.secondary_color
                            ? data.member.secondary_color
                            : '#116C54'
                        }`"
                      >
                        Shop</q-toolbar-title
                      >
                    </q-toolbar>
                    <iframe
                      :src="data.member.commerce ? data.member.commerce : ''"
                      height="100%"
                      width="100%"
                    />
                  </q-card>
                </q-dialog>

                <!-- <q-dialog v-model="shopCommerceDialog" transition-show="slide-left" transition-hide="slide-right" maximized>
                  <q-card class="bg-white border-radius-10px full-width">
                    <q-toolbar>
                      <q-btn flat round dense icon="arrow_back" v-close-popup />
                      <q-toolbar-title class="text-center font-proxima-nova-alt" :style="`margin-left:-40px; color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">Shop</q-toolbar-title>
                    </q-toolbar>
                    <iframe :src="data.member.corporate.commerce_group ? data.member.corporate.commerce_group : null" height="100%" width="100%" />
                  </q-card>
                </q-dialog> -->

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
                          data.member.secondary_color
                            ? data.member.secondary_color
                            : '#116C54'
                        }`"
                      >
                        View PDF</q-toolbar-title
                      >
                    </q-toolbar>
                    <iframe
                      :src="`${linkStoragePdf + data.member.pdf_file}`"
                      height="100%"
                      width="100%"
                    />
                  </q-card>
                </q-dialog>
              </div>
              <q-page-sticky position="bottom-right" :offset="[25, 15]">
                <q-fab
                  icon="add"
                  direction="up"
                  color="white"
                  text-color="primary"
                >
                  <q-fab-action flat>
                    <q-card
                      class="border-radius-10px"
                      style="margin-right: 200px; width: 220px"
                    >
                      <q-card-section>
                        <q-list class="text-secondary">
                          <q-item
                            clickable
                            v-ripple
                            @click="showProfileComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="assignment_ind"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Card Profile</q-item-section
                            >
                          </q-item>
                          <q-item
                            clickable
                            v-ripple
                            @click="showBioComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="person_outline"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Detail Bio</q-item-section
                            >
                          </q-item>
                          <q-item
                            clickable
                            v-ripple
                            @click="showContactComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="send"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Contact
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-ripple
                            @click="showConnectComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="mdi-recycle-variant"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Connect
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-ripple
                            @click="showShareComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="share"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Share
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-ripple
                            @click="showShopComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="mdi-shopping-outline"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Shop
                            </q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-ripple
                            @click="showAddScheduleComponent()"
                          >
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="mdi-monitor-dashboard"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Add Schedule</q-item-section
                            >
                          </q-item>
                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon
                                :style="`color: ${
                                  data.member.main_color
                                    ? data.member.main_color
                                    : '#116C54'
                                }`"
                                name="mdi-door-open"
                              />
                            </q-item-section>
                            <q-item-section
                              class="text-left"
                              @click="enterRoom(data.member.link_room)"
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              >Enter Room</q-item-section
                            >
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-fab-action>
                </q-fab>
              </q-page-sticky>
            </vue-bottom-sheet>
            <q-page-sticky
              position="top-right"
              :offset="[-25, 150]"
              v-if="data.member.corporate"
            >
              <q-btn
                class="btn-shop"
                color="black"
                v-if="data.member.corporate.commerce_group"
                @click="shopCommerceDialog = true"
                outline
              >
                <span
                  class="text-capitalize font-monserrat"
                  style="font-size: 18px"
                  >Shop</span
                >
              </q-btn>
            </q-page-sticky>
            <q-page-sticky
              position="top-right"
              :offset="[-25, 250]"
              v-if="data.member.commerce"
            >
              <q-btn
                q-btn
                class="btn-shop"
                color="black"
                @click="shopDialog = true"
              >
                <span
                  class="text-capitalize font-monserrat"
                  style="font-size: 18px"
                  >Shop</span
                >
              </q-btn>
            </q-page-sticky>
            <q-page-sticky position="bottom" :offset="[15, 15]">
              <q-btn class="btn-swipeup" fab color="white" @click="open()">
                <q-icon
                  class="text-bold"
                  name="arrow_upward"
                  :style="`color: ${
                    data.member.main_color ? data.member.main_color : '#116C54'
                  }`"
                />
              </q-btn>
            </q-page-sticky>
          </q-page-container>
        </q-layout>
      </video-background>
    </div>
    <div v-else>
      <q-layout
        view="lHh Lpr lff"
        :style="`background: url(${
          data.member.background
            ? linkStorageBg + data.member.background
            : Background
        })`"
      >
        <q-page-container>
          <q-btn
            flat
            round
            dense
            color="white"
            icon="arrow_back"
            class="q-my-sm q-mx-sm"
            @click="goBack()"
          />
          <div class="bawah absolute-bottom full-width">
            <q-card
              class="card-profile bg-white border-radius-10px"
              style="margin-bottom: 50px"
              flat
            >
              <q-card-section class="q-pa-md">
                <div class="row">
                  <div class="col-8">
                    <div class="column text-black q-ml-md">
                      <div
                        class="col text-bold text-white font-monserrat"
                        style="font-size: 28px;"
                      >
                        {{
                          data.member.member_first_name
                            ? data.member.member_first_name
                            : ""
                        }}
                        {{
                          data.member.member_middle_name
                            ? data.member.member_middle_name
                            : ""
                        }}
                        {{
                          data.member.member_last_name
                            ? data.member.member_last_name
                            : ""
                        }}
                      </div>
                      <div
                        class="col text-white font-proxima-nova-alt"
                        style="font-size: 20px;"
                      >
                        {{ data.member.profil ? data.member.profil : "-" }}
                      </div>
                      <div
                        class="col text-white font-proxima-nova-alt"
                        style="font-size: 16px;"
                        v-if="data.member.corporate_id"
                      >
                        {{
                          data.member.corporate.corporate_name
                            ? data.member.corporate.corporate_name
                            : ""
                        }}
                      </div>
                      <div
                        class="col text-white font-proxima-nova-alt"
                        style="font-size: 16px;"
                        v-else-if="!data.member.corporate_id"
                      >
                        {{
                          data.member.company_name
                            ? data.member.company_name
                            : ""
                        }}
                      </div>
                      <div
                        class="col text-white font-proxima-nova-alt"
                        style="font-size: 16px;"
                      >
                        {{
                          data.member.member_email
                            ? data.member.member_email
                            : "-"
                        }}
                      </div>
                      <div class="col">
                        <q-btn
                          class="q-my-sm text-capitalize font-proxima-nova-alt"
                          color="white"
                          icon="fab fa-whatsapp"
                          :label="
                            data.member.member_phone
                              ? data.member.phone_code
                                ? '+' +
                                  data.member.phone_code +
                                  data.member.member_phone
                                : data.member.member_phone
                              : ''
                          "
                          @click="
                            sendWhatsapp(
                              data.member.phone_code + data.member.member_phone
                            )
                          "
                          outline
                          rounded
                        />
                      </div>
                      <div class="col">
                        <q-img
                          class="q-mr-xs"
                          v-if="
                            data.member.vaccine1 === 'Fully vaccinated' ||
                            data.member.vaccine1 ===
                              'Waiting on additional dose'
                          "
                          :src="IconVaccinated"
                          width="12px"
                          height="12px"
                        />
                        <q-img
                          class="q-mr-xs"
                          v-if="
                            data.member.vaccine1 ===
                              'Planning to get vaccinated' ||
                            data.member.vaccine1 === 'Not getting vaccinated'
                          "
                          :src="IconNonVaccinated"
                          width="12px"
                          height="12px"
                        />
                        <span
                          class="text-white"
                          v-if="data.member.vaccine1 === 'Fully vaccinated'"
                          style="font-size: 12px"
                          >Fully vaccinated</span
                        >
                        <span
                          class="text-white"
                          v-if="
                            data.member.vaccine1 ===
                            'Waiting on additional dose'
                          "
                          style="font-size: 12px"
                          >Waiting on additional dose</span
                        >
                        <span
                          class="text-white"
                          v-if="
                            data.member.vaccine1 ===
                            'Planning to get vaccinated'
                          "
                          style="font-size: 12px"
                          >Planning to get vaccinated</span
                        >
                        <span
                          class="text-white"
                          v-if="
                            data.member.vaccine1 === 'Not getting vaccinated'
                          "
                          style="font-size: 12px"
                          >Not getting vaccinated</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-4 q-mt-sm column">
                    <div class="q-mb-lg" v-if="data.member.corporate_id">
                      <img
                        @error="handlingCompanyLogoError"
                        class="border-radius-10px"
                        :src="
                          data.member.corporate.logo
                            ? linkStorageCorpLogo + data.member.corporate.logo
                            : CompanyLogo
                        "
                        width="120px"
                        height="120px"
                      />
                    </div>
                    <div class="q-mb-lg" v-else-if="!data.member.corporate_id">
                      <img
                        @error="handlingCompanyLogoError"
                        class="border-radius-10px"
                        :src="
                          data.member.company_logo
                            ? linkStorageCompLogo + data.member.company_logo
                            : CompanyLogo
                        "
                        width="120px"
                        height="120px"
                      />
                    </div>
                    <div>
                      <img
                        @error="handlingProfileError"
                        class="border-radius-10px"
                        :src="
                          data.member.logo
                            ? linkStorageProfile + data.member.logo
                            : Logo
                        "
                        width="120px"
                        height="120px"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <vue-bottom-sheet
            ref="myBottomSheet"
            effect="fx-fadein-scale"
            @opened="showProfileComponent()"
            :is-full-screen="true"
            max-height="95%"
            max-width="100%"
          >
            <div class="q-pb-xl q-px-sm">
              <div class="card-profile" v-show="componentPage.profileComponent">
                <Profile
                  @view-pdf="showViewPdfComponent"
                  @close="close"
                  @open="open"
                />
              </div>
              <div class="card-bio" v-show="componentPage.bioComponent">
                <Bio />
              </div>
              <div class="card-contact" v-show="componentPage.contactComponent">
                <Contact />
              </div>
              <div class="card-connect" v-show="componentPage.connectComponent">
                <Connect />
              </div>
              <div class="card-share" v-show="componentPage.shareComponent">
                <Share />
              </div>
              <div class="card-share" v-show="componentPage.shopComponent">
                <Shop />
              </div>
              <div
                class="card-schedule"
                v-show="componentPage.addScheduleComponent"
              >
                <AddSchedule @close="close" />
              </div>
              <div
                class="card-schedule"
                v-show="componentPage.viewPdfComponent"
              >
                <ViewPdf />
              </div>

              <q-dialog
                v-model="shopDialog"
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
                        data.member.secondary_color
                          ? data.member.secondary_color
                          : '#116C54'
                      }`"
                    >
                      Shop</q-toolbar-title
                    >
                  </q-toolbar>
                  <iframe
                    :src="data.member.commerce ? data.member.commerce : ''"
                    height="100%"
                    width="100%"
                  />
                </q-card>
              </q-dialog>

              <!-- <q-dialog v-model="shopCommerceDialog" transition-show="slide-left" transition-hide="slide-right" maximized>
                  <q-card class="bg-white border-radius-10px full-width">
                    <q-toolbar>
                      <q-btn flat round dense icon="arrow_back" v-close-popup />
                      <q-toolbar-title class="text-center font-proxima-nova-alt" :style="`margin-left:-40px; color: ${data.member.secondary_color ? data.member.secondary_color : '#116C54'}`">Shop</q-toolbar-title>
                    </q-toolbar>
                    <iframe :src="data.member.corporate.commerce_group ? data.member.corporate.commerce_group : ''" height="100%" width="100%" />
                  </q-card>
                </q-dialog> -->

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
                        data.member.secondary_color
                          ? data.member.secondary_color
                          : '#116C54'
                      }`"
                    >
                      View PDF</q-toolbar-title
                    >
                  </q-toolbar>
                  <iframe
                    :src="`${linkStoragePdf + data.member.pdf_file}`"
                    height="100%"
                    width="100%"
                  />
                </q-card>
              </q-dialog>
            </div>
            <q-page-sticky position="bottom-right" :offset="[25, 15]">
              <q-fab
                icon="add"
                direction="up"
                color="white"
                text-color="primary"
              >
                <q-fab-action flat>
                  <q-card
                    class="border-radius-10px"
                    style="margin-right: 200px; width: 220px"
                  >
                    <q-card-section>
                      <q-list class="text-secondary">
                        <q-item
                          clickable
                          v-ripple
                          @click="showProfileComponent()"
                        >
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="assignment_ind"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Card Profile</q-item-section
                          >
                        </q-item>
                        <q-item clickable v-ripple @click="showBioComponent()">
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="person_outline"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Detail Bio
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-ripple
                          @click="showContactComponent()"
                        >
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="send"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Contact
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-ripple
                          @click="showConnectComponent()"
                        >
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="mdi-recycle-variant"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Connect
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-ripple
                          @click="showShareComponent()"
                        >
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="share"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Share
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="showShopComponent()">
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="mdi-shopping-outline"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Shop
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-ripple
                          @click="showAddScheduleComponent()"
                        >
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="mdi-monitor-dashboard"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Add Schedule</q-item-section
                          >
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-icon
                              :style="`color: ${
                                data.member.main_color
                                  ? data.member.main_color
                                  : '#116C54'
                              }`"
                              name="mdi-door-open"
                            />
                          </q-item-section>
                          <q-item-section
                            class="text-left"
                            @click="enterRoom(data.member.link_room)"
                            :style="`color: ${
                              data.member.main_color
                                ? data.member.main_color
                                : '#116C54'
                            }`"
                            >Enter Room
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-fab-action>
              </q-fab>
            </q-page-sticky>
          </vue-bottom-sheet>
          <q-page-sticky
            position="top-right"
            :offset="[-25, 150]"
            v-if="data.member.corporate"
          >
            <q-btn
              class="btn-shop"
              color="black"
              v-if="data.member.corporate.commerce_group"
              @click="shopCommerceDialog = true"
              outline
            >
              <span
                class="text-capitalize font-monserrat"
                style="font-size: 18px"
                >Shop</span
              >
            </q-btn>
          </q-page-sticky>
          <q-page-sticky
            position="top-right"
            :offset="[-25, 250]"
            v-if="data.member.commerce"
          >
            <q-btn class="btn-shop" color="black" @click="shopDialog = true">
              <span
                class="text-capitalize font-monserrat"
                style="font-size: 18px"
                >Shop</span
              >
            </q-btn>
          </q-page-sticky>
          <q-page-sticky position="bottom" :offset="[15, 15]">
            <q-btn class="btn-swipeup" fab color="white" @click="open()">
              <q-icon
                class="text-bold"
                name="arrow_upward"
                :style="`color: ${
                  data.member.main_color ? data.member.main_color : '#116C54'
                }`"
              />
            </q-btn>
          </q-page-sticky>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>
<script>
import VueBottomSheet from '@webzlodimir/vue-bottom-sheet'
import Logo from 'src/assets/image/TAGID-profile.jpg'
import CompanyLogo from 'src/assets/image/TAGID-logo.png'
import Background from 'src/assets/image/TAGID-circle.gif'
import IconVaccinated from 'src/assets/image/icon_vaccinated.png'
import IconNonVaccinated from 'src/assets/image/icon_non_vaccinated.png'
import VideoBackground from 'vue-responsive-video-background-player'
import VideoExample from 'src/assets/video-example.mp4'

// Components
import Profile from 'src/pages/Dashboard/SavedCards/View/Profile.vue'
import Bio from 'src/pages/Dashboard/SavedCards/View/Bio.vue'
import Contact from 'src/pages/Dashboard/SavedCards/View/Contact.vue'
import Connect from 'src/pages/Dashboard/SavedCards/View/Connect.vue'
import Share from 'src/pages/Dashboard/SavedCards/View/Share.vue'
import Shop from 'src/pages/Dashboard/SavedCards/View/Shop.vue'
import AddSchedule from 'src/pages/Dashboard/SavedCards/View/AddSchedule.vue'
import ViewPdf from 'src/pages/Dashboard/SavedCards/View/ViewPDF.vue'

const localStorage = JSON.parse(window.localStorage.getItem('user'))
const username = localStorage.username

export default {
  components: {
    Profile,
    Bio,
    Contact,
    Connect,
    Share,
    Shop,
    AddSchedule,
    ViewPdf,
    VueBottomSheet,
    VideoBackground
  },
  metaInfo: {
    meta: [
      {
        name: 'ription',
        content: `Hi my name is ${username}, let's get connected!`
      }
    ]
    // Get your TAG and explore our powerful features to boost your business.
    // Hi my name is _username_, let's get connected!
  },
  data () {
    return {
      Logo,
      CompanyLogo,
      Background,
      IconVaccinated,
      IconNonVaccinated,
      VideoExample,
      linkStoragePdf: 'https://api.the-netwerk.com/storage/app/public/corporate/pdf/',
      linkStorageBg: 'https://api.the-netwerk.com/storage/app/public/member/background/',
      linkStorageCorpLogo: 'https://api.the-netwerk.com/storage/app/public/corporate/logo/',
      linkStorageCompLogo: 'https://api.the-netwerk.com/storage/app/public/member/logo/',
      linkStorageProfile: 'https://api.the-netwerk.com/storage/app/public/member/profile/',
      profileData: {},
      shopDialog: false,
      shopCommerceDialog: false,
      pdfDialog: false,
      whatsappDialog: false,
      pageBack: '',
      video: false,
      data: {
        member: {}
      },
      componentPage: {
        profileComponent: true,
        bioComponent: false,
        contactComponent: false,
        connectComponent: false,
        shareComponent: false,
        addScheduleComponent: false,
        viewPdfComponent: false
      }
    }
  },
  mounted () {
    this.getData()
    this.pageBack = window.localStorage.getItem('page')
  },
  methods: {
    goBack () {
      if (this.pageBack === 'manage-corporate') {
        this.$router.push('/dashboard/manage-corporate/users')
      } else if (this.pageBack === 'saved-cards') {
        this.$router.push('/dashboard/saved-cards')
      }
    },
    checkExtensionBackground (filename) {
      const imageExtensionLists = [
        'jpeg', 'jpg', 'png',
        'gif', 'tiff', 'raw', 'bin'
      ]
      const videoExtensionLists = [
        'webm', 'mkv', 'mp4', 'avi',
        'mov', 'mpg', 'mpeg', '3gp'
      ]
      const fileExtension = filename.split('.').pop()
      if (imageExtensionLists.includes(fileExtension)) {
        this.video = false
      } else if (videoExtensionLists.includes(fileExtension)) {
        this.video = true
      }
    },
    getData () {
      this.$axios
        .get('/member/' + this.$route.params.username)
        .then((response) => {
          this.data.member = response.data.member
          if (this.data.member.corporate) {
            this.data.member.background =
              response.data.member.corporate.background
          }
          this.checkExtensionBackground(this.data.member.background)
        })
    },
    handlingBackgroundError (event) {
      event.target.src = this.Background
    },
    handlingProfileError (event) {
      event.target.src = this.Logo
    },
    handlingCompanyLogoError (event) {
      event.target.src = this.CompanyLogo
    },
    open () {
      this.$refs.myBottomSheet.open()
    },
    close () {
      this.$refs.myBottomSheet.close()
    },
    sendWhatsapp (phone) {
      window.open('https://api.whatsapp.com/send?phone=' + phone)
    },
    enterRoom (link) {
      window.open(link)
    },
    showProfileComponent () {
      this.componentPage = {
        profileComponent: true,
        bioComponent: false,
        contactComponent: false,
        connectComponent: false,
        shareComponent: false,
        addScheduleComponent: false,
        viewPdfComponent: false
      }
    },
    showBioComponent () {
      this.componentPage = {
        profileComponent: false,
        bioComponent: true,
        contactComponent: false,
        connectComponent: false,
        shareComponent: false,
        addScheduleComponent: false,
        viewPdfComponent: false
      }
    },
    showContactComponent () {
      this.componentPage = {
        profileComponent: false,
        bioComponent: false,
        contactComponent: true,
        connectComponent: false,
        shareComponent: false,
        addScheduleComponent: false,
        viewPdfComponent: false
      }
    },
    showConnectComponent () {
      this.componentPage = {
        profileComponent: false,
        bioComponent: false,
        contactComponent: false,
        connectComponent: true,
        shareComponent: false,
        addScheduleComponent: false,
        viewPdfComponent: false
      }
    },
    showShareComponent () {
      this.componentPage = {
        profileComponent: false,
        bioComponent: false,
        contactComponent: false,
        connectComponent: false,
        shareComponent: true,
        addScheduleComponent: false,
        viewPdfComponent: false
      }
    },
    showShopComponent () {
      this.$refs.myBottomSheet.close()
      this.shopDialog = true
    },
    showAddScheduleComponent () {
      this.componentPage = {
        profileComponent: false,
        bioComponent: false,
        contactComponent: false,
        connectComponent: false,
        shareComponent: false,
        addScheduleComponent: true,
        viewPdfComponent: false
      }
    },
    showViewPdfComponent () {
      this.$refs.myBottomSheet.close()
      this.pdfDialog = true
    },
    shopClick () {
      window.open('https://www.tokopedia.com/')
    }
  }
}
</script>
<style lang="scss">
.q-layout {
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
}

.bawah {
  background: linear-gradient(to bottom, transparent 0%, black 100%);
}

.card-profile {
  background: none !important;
}

.btn-swipeup {
  animation: shimmy 1s infinite;
  animation-direction: alternate;
}

@keyframes shimmy {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translateY(15px);
  }
}

.btn-shop {
  writing-mode: vertical-rl;
  text-orientation: sideways;
  transform: rotate(270deg);
}

.bottom-sheet__card {
  background: none !important;
}

.bottom-sheet__bar {
  background: white !important;
}

.q-fab__icon {
  color: #116c54;
  font-weight: bolder;
}

.q-fab__active-icon {
  color: #116c54;
  font-weight: bolder;
}
</style>
