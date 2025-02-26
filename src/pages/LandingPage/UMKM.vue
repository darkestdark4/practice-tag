<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-proxima-nova">
        <div class="" ref="topFirst">
          <q-card class="card-front">
            <div class="col-12 text-center">
              <img
                class="border-radius-10px"
                :src="LogoIluna"
                width="134px"
                height="127px"
              />
            </div>
            <q-card class="">
              <q-card-actions class="q-pa-lg">
                <div class="col-12 text-black text-center">
                  <span class="text-usaha">
                    ILUNA adalah anggota KPCPEN (Komite Penanggulangan Covid-19
                    dan Pemulihan Ekonomi Nasional) bersama Kemenkes dan Kemenko
                    Marves, saat ini selain ngurusi vaksinasi, kita juga diminta
                    untuk membantu percepatan pemulihan ekonomi.
                  </span>
                </div>
              </q-card-actions>
            </q-card>
            <q-card class="card-front-card q-pa-md">
              <q-card-actions class="row">
                <div
                  class="col-12 row text-center cursor-pointer"
                  @click="toWhatsapp()"
                >
                  <div class="col-4 text-right">
                    <img
                      class="border-radius-10px"
                      :src="LogoWA"
                      width="50px"
                      height="50px"
                    />
                  </div>
                  <div class="col-5 q-ml-sm text-center">
                    <span
                      class="text-white"
                      style="
                        font-weight: 400;
                        font-size: 9px;
                        line-height: 12px;
                      "
                    >
                      <span
                        class="text-white"
                        style="font-weight: 400; font-size: 14px"
                      >
                        Contact Person
                      </span>
                      <span
                        class="text-white"
                        style="
                          font-weight: 600;
                          font-size: 22px;
                          line-height: 34px;
                        "
                      >
                        085100441777
                      </span>
                      <br />
                      WhatsApp Chat Only
                    </span>
                  </div>
                </div>
              </q-card-actions>
            </q-card>
            <q-card class="">
              <q-card-actions class="row">
                <div class="col-12 text-center">
                  <span
                    class="text-black"
                    style="font-weight: 700; font-size: 14px; line-height: 12px;"
                  >
                    Partner
                    <span
                      style="color: #92512E;"
                    >
                      ILUNA
                    </span>
                  </span>
                </div>
                <div class="col-12 row text-center">
                  <div class="col-4 q-mt-auto q-mb-auto">
                    <img
                      class="border-radius-10px"
                      :src="LogoBeonco"
                      width="60px"
                      height="60px"
                    />
                  </div>
                  <div class="col-4 q-mt-auto q-mb-auto">
                    <img
                      class="border-radius-10px"
                      :src="LogoTag"
                      width="90px"
                      height="50px"
                    />
                  </div>
                  <div class="col-4 q-mt-auto q-mb-auto">
                    <img
                      class="border-radius-10px"
                      :src="LogoManna"
                      width="90px"
                      height="30px"
                    />
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </q-card>
          <q-carousel
            v-model="slide"
            swipeable
            animated
            :navigation="navigation"
            height="275px"
            control-color="white"
            infinite
            :autoplay="autoplay"
            style="background: #ac633c"
            control-type="regular"
          >
            <template v-slot:navigation-icon="{ active, onClick }">
              <q-btn
                v-if="active"
                style="margin: -1px; font-size: 7px"
                icon="radio_button_unchecked"
                flat
                round
                dense
                @click="onClick"
              />
              <q-btn
                v-else
                style="font-size: 7px; margin: -1px"
                icon="circle"
                color="white"
                flat
                round
                @click="onClick"
              />
            </template>
            <q-carousel-slide
              v-for="(d, index) in merchant"
              :key="index"
              :name="index"
              style="padding: 10px 16px"
            >
              <div class="col-3 q-gutter-y-sm">
                <q-img
                  alt="Profile Logo"
                  :src="d.source"
                  width="100%"
                  height="100%"
                />
              </div>
            </q-carousel-slide>
          </q-carousel>
          <div
            class="col-12 q-pb-md text-center"
            style="max-width: 85%; margin: 0 auto"
          >
            <span
              class="text-white"
              style="font-weight: 600; font-size: 22px; line-height: 26px"
            >
              Daftar Sekarang!
            </span>
          </div>
          <!-- <q-radio v-model="shape" val="line" label="Line" /> -->
          <div class="row font-proxima-nova">
            <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Mendapat Informasi dari Koordinator :</span
              >
              <q-select
                v-model="data.gereja"
                use-input
                input-debounce="0"
                :error="$v.data.gereja.$error"
                :error-message="validationMsg($v.data.gereja)"
                :options="gerejaList"
                @filter="filterFn3"
                behavior="menu"
                bg-color="white"
                outlined
                dense
                map-options
                emit-value
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Nama Depan :</span
              >
              <q-input
                bg-color="white"
                v-model="data.first_name"
                :error="$v.data.first_name.$error"
                @focus="selectOnFocus"
                @blur="selectOnBlur($event, 'Sesuai dengan KTP')"
                :error-message="validationMsg($v.data.first_name)"
                placeholder="Sesuai dengan KTP"
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Nama Belakang :</span
              >
              <q-input
                bg-color="white"
                v-model="data.last_name"
                placeholder="Sesuai dengan KTP"
                @focus="selectOnFocus"
                @blur="selectOnBlur($event, 'Sesuai dengan KTP')"
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >No. Hp :</span
              >
              <q-input
                bg-color="white"
                type="number"
                v-model="data.phone"
                placeholder="62XXXXXXXXXX (Nomor Whatsapp Aktif)"
                @focus="selectOnFocus"
                @blur="
                  selectOnBlur($event, '62XXXXXXXXXX (Nomor Whatsapp Aktif)')
                "
                @input="inputPhone()"
                :error="$v.data.phone.$error || double.phone"
                :error-message="
                  validationMsg($v.data.phone) || errorMsg('phone')
                "
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md" style="margin-top: -12px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Email</span
              >
              <q-input
                bg-color="white"
                type="email"
                v-model="data.email"
                :error="$v.data.email.$error || double.email"
                :error-message="
                  validationMsg($v.data.email) || errorMsg('email')
                "
                @focus="selectOnFocus"
                @blur="selectOnBlur($event, 'nama@email.com')"
                placeholder="nama@email.com"
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-sm q-mx-md" style="margin-top: -10px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Provinsi :</span
              >
              <q-select
                v-model="data.state"
                use-input
                @filter="filterFn2"
                input-debounce="0"
                :error="$v.data.state.$error"
                :error-message="validationMsg($v.data.state)"
                :options="provinsi"
                behavior="menu"
                @input="getCityList(data.state)"
                bg-color="white"
                outlined
                dense
                map-options
                emit-value
              >
              </q-select>
            </div>
            <div class="col-11 q-my-sm q-mx-md" style="margin-top: -10px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Kota :</span
              >
              <q-select
                v-model="data.city"
                use-input
                input-debounce="0"
                :error="$v.data.city.$error"
                :error-message="validationMsg($v.data.city)"
                :options="options"
                @filter="filterFn"
                behavior="menu"
                bg-color="white"
                outlined
                dense
                map-options
                emit-value
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-11 q-mb-md q-mx-md" style="margin-top: -10px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Kecamatan :</span
              >
              <q-input
                bg-color="white"
                v-model="data.kecamatan"
                placeholder=""
                :error="$v.data.kecamatan.$error"
                :error-message="validationMsg($v.data.kecamatan)"
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-md q-mx-md" style="margin-top: -5px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Kelurahan :</span
              >
              <q-input
                bg-color="white"
                v-model="data.kelurahan"
                placeholder=""
                :error="$v.data.kelurahan.$error"
                :error-message="validationMsg($v.data.kelurahan)"
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-md q-mx-md" style="margin-top: -5px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Alamat :</span
              >
              <q-input
                bg-color="white"
                v-model="data.address"
                placeholder=""
                outlined
                autogrow
                :error="$v.data.address.$error"
                :error-message="validationMsg($v.data.address)"
                input-style="height: 50px; margin-top: -15px;"
              />
            </div>
            <div class="col-11 q-my-md q-mx-md" style="margin-top: -10px">
              <span
                class="text-white text-left"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Kode Pos :</span
              >
              <q-input
                bg-color="white"
                v-model="data.postcode"
                placeholder=""
                :error="$v.data.postcode.$error"
                :error-message="validationMsg($v.data.postcode)"
                outlined
                dense
              />
            </div>
            <div class="col-11 q-my-md q-mx-md row" style="margin-top: -10px">
              <span
                class="text-white text-left col-12"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                :error="$v.data.rekening.$error"
                :error-message="validationMsg($v.data.rekening)"
                >Apakah Anda Mempunyai Nomor Rekening?</span
              >
              <q-checkbox
                v-model="data.rekening"
                true-value="1"
                false-value="0"
                label="Ya"
                color="teal"
              />
              <q-checkbox
                v-model="data.rekening"
                true-value="0"
                false-value="1"
                label="Tidak"
                color="teal"
              />
            </div>
            <div class="col-11 q-my-md q-mx-md row" style="margin-top: -10px">
              <span
                class="text-white text-left col-12"
                style="font-style: italic; font-size: 12px; font-weight: 400"
                >Jenis usaha apa yang anda kembangkan?</span
              >
              <div class="row col-12 text-white">
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="data.busines"
                      val="13"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Makanan</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>Frozen, Produk Siap Saji</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="14"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Peternakan</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>Ayam,Kambing,Sapi, dsb.</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="15"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Sayur Mayur</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="4"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Agribisnis</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>Pupuk, Tanaman, Bibit, dsb.</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="16"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Buah Buahan</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="17"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Jasa Kebersihan</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>ART, Tukang Kebun.</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="18"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Aksesoris</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>Pernak-pernik, Jahit, Masker</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="19"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Pedagang Asongan</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="20"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Pracangan</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>Toko Kelontong</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="21"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Toko Bangunan</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="5"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Bisnis Pendidikan</q-item-label>
                    <q-item-label class="text-white" style="font-size: 8px;" caption>Guru Les</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="22"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Jual Beli Binatang</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="23"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Reseller</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense tag="label" class="col-6 text-white" >
                  <q-item-section avatar>
                    <q-checkbox
                      class="col-6"
                      v-model="data.busines"
                      val="24"
                      color="teal"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white">Makelar</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <div class="col-11 q-my-md q-mx-md row" style="margin-top: -10px">
              <span
                class="text-white text-left col-12"
                style="font-size: 12px; font-weight: 400"
                >Dokumen Legalitas</span
              >
              <span
                class="text-white text-left col-12"
                style="font-size: 9px; font-weight: 400"
                >Silahkan pilih dokumen yang anda punya</span
              >
              <div class="row col-12 text-white">
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="1"
                  label="SIUP"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="2"
                  label="NIB"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="3"
                  label="NPWP"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="4"
                  label="Sertifikat Halal"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="5"
                  label="PIRT"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="6"
                  label="SNI"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="7"
                  label="BPOM"
                  color="teal"
                />
                <q-checkbox
                  class="col-4"
                  v-model="data.document"
                  val="8"
                  label="Merek"
                  color="teal"
                />
              </div>
            </div>
            <div class="col-11 q-my-sm q-mx-md">
              <div class="col-11 q-my-sm q-mx-md row">
                <q-radio
                  class="col-1"
                  keep-color
                  color="white"
                  v-model="data.agree"
                  val="yes"
                />
                <span
                  class="col-10 q-ml-sm text-white text-left"
                  style="font-style: italic; font-size: 12px; font-weight: 400"
                  >Bersedia Menerima Update dan Info terbaru ILUNA, TAG,
                  Netwerk, Mannapos dan Beonco</span
                >
              </div>
            </div>
            <div class="col-8 q-ml-auto q-mr-auto">
              <q-btn
                label="Submit"
                class="q-py-sm q-mb-md text-black full-width"
                @click="sendData()"
                :loading="loadingBtn"
                style="
                  font-weight: 700;
                  font-size: 12px;
                  letter-spacing: 0.64em;
                  line-height: 14.4px;
                  background: #ffc600;
                "
                outlined
                dense
                :disable="!data.agree ? true : false"
              />
            </div>
          </div>
        </div>
        <q-dialog v-model="successCard">
          <q-card
            class="card-front-modal font-fira-sans"
            style="max-width: 340px; padding: 8px; min-height: 250px"
          >
            <q-card-actions>
              <div class="col-12 text-center row q-mt-lg">
                <div class="col-12">
                  <img
                    class="border-radius-10px"
                    :src="SuccessCardImg"
                    width="280px"
                    height="140px"
                  />
                </div>
                <span
                  class="text-black col-12"
                  style="
                    font-weight: 800;
                    font-size: 20px;
                    line-height: 24px;
                    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
                  "
                >
                  PENDAFTARAN BERHASIL
                </span>
                <br />
                <br />
                <span
                  class="text-black col-12"
                  style="font-weight: 500; font-size: 12px; line-height: 14px"
                >
                  Terimakasih telah mendaftar, tunggu info lebih lanjut dari
                  kita melalui email atau WhatsApp ya
                </span>
              </div>
              <div class="col-6 q-ml-auto q-mr-auto q-mt-md">
                <q-btn
                  label="CLOSE"
                  class="q-py-sm q-mb-sm text-white full-width"
                  v-close-popup
                  style="
                    font-weight: 700;
                    font-size: 12px;
                    line-height: 14.4px;
                    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
                    background: #072AC8;
                  "
                  rounded
                  outlined
                  dense
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import LogoIluna from 'src/assets/image/logo-iluna.png'
import LogoWA from 'src/assets/image/wa-logo.png'
import LogoTag from 'src/assets/image/TAGID-logo.png'
import LogoManna from 'src/assets/image/Manna.png'
import LogoBeonco from 'src/assets/image/Beonco.png'
import Lp1 from 'src/assets/image/LP-Katedral1.png'
import Lp2 from 'src/assets/image/LP-Katedral2.png'
import SuccessCardImg from 'src/assets/image/success-cardiluna.png'
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  required: () => 'Form input required',
  email: () => 'Form input must be email format',
  alphaNumAndDotValidator: () => 'Form input must alphanumeric'
}

// Vue Script Export Default Structure
export default {
  name: '',
  data () {
    return {
      LogoIluna,
      LogoWA,
      LogoTag,
      LogoBeonco,
      LogoManna,
      SuccessCardImg,
      options: [],
      merchant: [
        {
          id: 1,
          source: Lp1
        },
        {
          id: 2,
          source: Lp2
        }
      ],
      data: {
        email: '',
        rekening: '0',
        busines: [],
        document: []
      },
      double: {
        email: false,
        username: false,
        phone: false
      },
      loadingBtn: false,
      slide: 0,
      navigation: true,
      successCard: false,
      autoplay: true,
      stringOptions: [],
      provinsi: [
        { label: 'Aceh', value: 1822 },
        { label: 'Sumatra Utara', value: 1792 },
        { label: 'Sumatra Barat', value: 1828 },
        { label: 'Jambi', value: 1815 },
        { label: 'Bengkulu', value: 1793 },
        { label: 'Bangka Belitung', value: 1820 },
        { label: 'Riau', value: 1809 },
        { label: 'Kepulauan Riau', value: 1807 },
        { label: 'Sumatra Selatan', value: 1816 },
        { label: 'Lampung', value: 1811 },
        { label: 'Banten', value: 1810 },
        { label: 'DKI Jakarta', value: 1805 },
        { label: 'Jawa Barat', value: 1825 },
        { label: 'Jawa Tengah', value: 1802 },
        { label: 'DI Yogyakarta', value: 1829 },
        { label: 'Jawa Timur', value: 1827 },
        { label: 'Bali', value: 1826 },
        { label: 'Kalimantan Barat', value: 4902 },
        { label: 'Kalimantan Utara', value: 1824 },
        { label: 'Kalimantan Tengah', value: 1794 },
        { label: 'Kalimantan Timur', value: 1804 },
        { label: 'Kalimantan Selatan', value: 1819 },
        { label: 'Gorontalo', value: 1812 },
        { label: 'Sulawesi Utara', value: 1808 },
        { label: 'Sulawesi Tengah', value: 1813 },
        { label: 'Sulawesi Tenggara', value: 1796 },
        { label: 'Sulawesi Barat', value: 1817 },
        { label: 'Sulawesi Selatan', value: 1795 },
        { label: 'Nusa Tenggara Barat', value: 1814 },
        { label: 'Nusa Tenggara Timur', value: 1818 },
        { label: 'Maluku', value: 1800 },
        { label: 'Maluku Utara', value: 1801 },
        { label: 'Papua', value: 1798 },
        { label: 'Papua Barat', value: 1799 }
      ],
      provinsiOptions: [
        { label: 'Aceh', value: 1822 },
        { label: 'Sumatra Utara', value: 1792 },
        { label: 'Sumatra Barat', value: 1828 },
        { label: 'Jambi', value: 1815 },
        { label: 'Bengkulu', value: 1793 },
        { label: 'Bangka Belitung', value: 1820 },
        { label: 'Riau', value: 1809 },
        { label: 'Kepulauan Riau', value: 1807 },
        { label: 'Sumatra Selatan', value: 1816 },
        { label: 'Lampung', value: 1811 },
        { label: 'Banten', value: 1810 },
        { label: 'DKI Jakarta', value: 1805 },
        { label: 'Jawa Barat', value: 1825 },
        { label: 'Jawa Tengah', value: 1802 },
        { label: 'DI Yogyakarta', value: 1829 },
        { label: 'Jawa Timur', value: 1827 },
        { label: 'Bali', value: 1826 },
        { label: 'Kalimantan Barat', value: 4902 },
        { label: 'Kalimantan Utara', value: 1824 },
        { label: 'Kalimantan Tengah', value: 1794 },
        { label: 'Kalimantan Timur', value: 1804 },
        { label: 'Kalimantan Selatan', value: 1819 },
        { label: 'Gorontalo', value: 1812 },
        { label: 'Sulawesi Utara', value: 1808 },
        { label: 'Sulawesi Tengah', value: 1813 },
        { label: 'Sulawesi Tenggara', value: 1796 },
        { label: 'Sulawesi Barat', value: 1817 },
        { label: 'Sulawesi Selatan', value: 1795 },
        { label: 'Nusa Tenggara Barat', value: 1814 },
        { label: 'Nusa Tenggara Timur', value: 1818 },
        { label: 'Maluku', value: 1800 },
        { label: 'Maluku Utara', value: 1801 },
        { label: 'Papua', value: 1798 },
        { label: 'Papua Barat', value: 1799 }
      ],
      gerejaList: [
        {
          label: 'Tidak Ada Koordinator',
          value: 0
        }
      ],
      gerejaListOptions: []
    }
  },
  validations: {
    data: {
      email: {
        required,
        email
      },
      gereja: {
        required
      },
      first_name: {
        required
      },
      phone: {
        required
      },
      state: {
        required
      },
      city: {
        required
      },
      kecamatan: {
        required
      },
      kelurahan: {
        required
      },
      address: {
        required
      },
      postcode: {
        required
      },
      rekening: {
        required
      }
    }
  },
  mounted () {
    // this.getStateList(102)
    this.getData()
  },
  methods: {
    validationMsg: validationMessage(formMessages),
    errorMsg (type) {
      if (type === 'email') {
        return 'Email Already Exist'
      } else if (type === 'username') {
        return 'Username Already Exist'
      } else if (type === 'phone') {
        return 'Nomor Already Exist'
      }
    },
    getData () {
      this.$axios.get('iluna/gerejalist').then(response => {
        // eslint-disable-next-line array-callback-return
        response.data.data.map(data => {
          const data2 = {
            label: data.name,
            value: data.id
          }
          this.gerejaList.push(data2)
        })
        this.gerejaListOptions = this.gerejaList
      })
    },
    getStateList (stateId) {
      this.$axios.get(`csc/countries/${stateId}/states`).then((response) => {
        this.provinsi = response.data.data.map((data) => {
          return {
            label: data.name,
            value: data.id
          }
        })
      })
    },
    getCityList (stateId) {
      this.$axios.get(`/csc/states/${stateId}/city`).then((response) => {
        this.options = response.data.data.map((data) => {
          return {
            label: data.name,
            value: data.id
          }
        })
        this.stringOptions = this.options
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.stringOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterFn2 (val, update) {
      if (val === '') {
        update(() => {
          this.provinsi = this.provinsiOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.provinsi = this.provinsiOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterFn3 (val, update) {
      if (val === '') {
        update(() => {
          this.gerejaList = this.gerejaListOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.gerejaList = this.gerejaListOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    inputPhone () {
      this.$nextTick(() => {
        this.data.phone = this.data.phone.replace(/\b0+/g, '62')
      })
    },
    blurUsername () {
      if (this.data.username) {
        this.data.username = this.data.username
          .replace(/\s+/g, '-')
          .toLowerCase()
      }
    },
    sendData () {
      this.$v.data.$touch()
      if (this.$v.data.$error) {
        this.$q.notify({
          message: 'Please check your form input',
          position: 'top',
          type: 'negative'
        })
        return 1
      } else {
        this.double.email = false
        this.double.username = false
        this.double.phone = false
        this.loadingBtn = true
        const data = this.data
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'Please wait...',
          position: 'top'
        })
        this.$axios.post('iluna/member/register', data).then((response) => {
          if (response.data.status) {
            notif({
              spinner: false,
              message: response.data.message,
              progress: true,
              position: 'top',
              type: 'positive'
            })
            this.successCard = true
            this.$refs.topFirst.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start'
            })
            this.data = {
              email: '',
              rekening: '0',
              busines: [],
              document: []
            }
            this.loadingBtn = false
            this.$v.$reset()
          } else {
            notif({
              spinner: false,
              message: response.data.message,
              progress: true,
              position: 'top',
              type: 'negative'
            })
            if (response.data.data === 'Email') {
              this.double.email = true
            } else if (response.data.data === 'Username') {
              this.double.username = true
            } else if (response.data.data === 'Phone') {
              this.double.phone = true
            }
            this.loadingBtn = false
          }
        })
      }
    },
    toWhatsapp () {
      window.open('https://wa.me/6285100441777')
    },
    selectOnFocus (fEv) {
      fEv.target.placeholder = ''
    },
    selectOnBlur (fEv, data) {
      fEv.target.placeholder = data
    }
  }
}
</script>
<style lang="scss" scoped>
.page-1 {
  background: linear-gradient(180deg, #ac633c 40%, #361402 100%);
  background-position: top;
  background-size: contain;
  background-repeat: no-repeat;
  padding-top: 50px;
}

.text-usaha {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #000000;
  text-shadow: 2px 2px #ffffff !important;
}

.card-front {
  border-radius: 13px;
  background: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130.5%;
  /* or 13px */
  padding-top: 10px;

  text-align: justify;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.card-front-card {
  width: 90%;
  border-radius: 13px !important;
  background: linear-gradient(180deg, #b87856 0%, #412212 100%);
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130.5%;
  /* or 13px */

  text-align: justify;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}
.card-front-modal {
  width: 80%;
  border-radius: 13px !important;
  background: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130.5%;
  /* or 13px */

  text-align: justify;
  margin-left: auto;
  margin-right: auto;
}

.q-dialog__backdrop.fixed-full {
  backdrop-filter: blur(20px);
}

.q-list--dense > .q-item, .q-item--dense {
    min-height: 8px;
    padding: 2px 0px;
}
</style>
<style>
.q-placeholder::placeholder,
::-webkit-input-placeholder,
input::-webkit-input-placeholder,
.q-placeholder::placeholder,
::-webkit-input-placeholder,
select::-webkit-input-placeholder {
  font-size: 11px !important;
  font-weight: 300;
  font-style: italic !important;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
