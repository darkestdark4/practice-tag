<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-proxima-nova">
        <div class="text-center">
          <q-img
            :src="TagLogo"
            height="40px"
            width="120px"
            :ratio="16/9"
          />
        </div>
        <div class="text-white q-mt-xl text-center">
          <span class="" style="font-size: 20px; line-height: 27px; font-weight: 800;">
            BOSAN DENGAN <br> KARTU NAMA LAMA??
          </span>
        </div>
        <div class="q-mx-md q-my-sm">
          <q-img
            :src="Preview1"
          />
        </div>
        <div class="row text-white q-mx-md" style="font-size: 14px; font-weight: 600; line-height: 16px;">
          <div class="col-12 text-center q-my-sm text-gradient">
            <span style="font-size: 20px; font-weight: 800; line-height: 25px; color: #A87B22;">
              TUKARKAN GRATIS!
            </span>
          </div>
          <div class="col-12 text-center q-my-sm">
            <span style="">
              Cukup UNGGAH FOTO KARTU NAMA LAMA Anda, <br> MILIKI KARTU NAMA DIGITAL SEKARANG
            </span>
          </div>
        </div>
        <div class="q-mx-md q-my-sm">
          <q-img
            :src="Preview2"
          />
        </div>
        <div class="row q-mt-md text-white text-center">
          <div class="col-8 q-mx-auto">
            <q-btn class="my-button text-center q-mx-md full-width" to="kartu-nfc-emas/register" flat>
              <span style="font-weight: 700; font-size: 14px;">YA, SAYA BERSEDIA TUKAR GRATIS</span>
              <span style="font-weight: 600; font-size: 12px;">(Klik Disini untuk “Tukar”)</span>
            </q-btn>
          </div>
        </div>
        <div class="text-white q-mt-md text-center">
          <span class="" style="font-size: 20px; line-height: 27px; font-weight: 800;">
            DAPATKAN BONUS <br> KHUSUS PENGGUNA BARU
          </span>
        </div>
        <div class="row text-white q-mb-md" style="font-size: 14px; font-weight: 600; line-height: 16px;">
          <div class="col-12 text-center q-my-sm text-gradient">
            <span style="font-size: 20px; font-weight: 800; line-height: 25px; color: #A87B22;">
              KARTU NFC* <br> Lapis EMAS 0,01 gram
            </span>
          </div>
          <div class="col-12 text-center q-my-sm text-gradient">
            <span style="font-size: 14px; font-weight: 600; line-height: 14px; color: #A87B22;">
              * KHUSUS BERLANGGANAN 1 TAHUN
            </span>
          </div>
        </div>
        <div class="q-mx-md q-my-sm">
          <q-img
            :src="Preview"
            :ratio="16/9"
          />
        </div>
        <div class="text-white q-mt-md text-center">
          <span class="" style="font-size: 20px; line-height: 27px; font-weight: 800;">
            Ini akan menjadi MILIK Anda, bila <br> Anda memutuskan “UPGRADE” Kartu <br> Nama Digital Anda Sekarang!
          </span>
        </div>
        <div class="text-white line-under-left q-mt-lg q-ml-lg">
          <span style="font-weight: 700; font-size: 15px; line-height: 17px;">Selain itu, Anda masih akan mendapatkan</span>
        </div>
        <div class="row text-white q-mx-lg q-mt-lg">
          <div class="col-9 text-left q-mb-xs" v-for="data in Benefit" :key="data.id">
            <q-img
              class="col-2 q-mx-auto q-my-auto"
              :src="Checklist"
              width="20px"
              height="20px"
            />
            <span class="col-9 q-ml-md" style="font-size: 12px; font-weight: 600;">
              {{ data.text }}
            </span>
          </div>
        </div>
        <div class="row q-mt-md text-white text-center">
          <div class="col-12" style="color: rgba(255, 255, 255, 0.64); font-size: 16px; font-weight: 600; line-height: 20px;">
            Total Investasi diatas adalah
          </div>
          <div class="col-12 row text-center q-my-sm" style="font-size: 18px;">
            <div class="col-3 q-mx-auto strikethrough">
              IDR 198.000
            </div>
          </div>
          <div class="col-12 row text-center q-my-sm" style="font-size: 16px; font-weight: 400; line-height: 20px;">
            <div class="col-10 q-mx-auto">
              Tapi tenang Anda tidak harus membayar sebesar itu, karena khusus untuk periode bulan ini ada
              <span style="font-weight: 700;">
                DISKON 50%
              </span>
              menjadi
            </div>
          </div>
          <div class="col-12 row text-center q-my-sm" style="font-size: 18px;">
            <div class="col-3 q-mx-auto strikethrough">
              IDR 99.000
            </div>
          </div>
          <div class="col-12 row text-center q-my-sm">
            <div class="col-12 q-mx-auto text-harga">
              IDR 50.000 SAJA!
            </div>
            <div class="col-6 q-mx-auto line-under text-subtitle2 q-mt-sm text-harga">
              <span style="font-size: 18px;">
                Per Kartu Nama Digital
              </span>
            </div>
          </div>
          <div class="col-8 q-mx-auto">
            <q-btn class="my-button text-center q-mx-md full-width" to="kartu-nfc-emas/register" flat>
              <span style="font-weight: 700; font-size: 14px;">YA, SAYA BERSEDIA “UPGRADE”</span> <br>
              <span style="font-weight: 600; font-size: 12px;">(Klik Disini untuk Upgrade”)</span>
            </q-btn>
          </div>
        </div>
        <div class="row text-white q-mt-lg q-mx-lg">
          <span class="col-10 q-ml-sm line-under-left" style="font-size: 14px; line-height: 16px; font-weight: 600;">MENGAPA SAYA SEBAIKNYA MENGGANTI KARTU NAMA LAMA SAYA?</span>
          <div class="col-12 row q-mt-md" v-for="data in Alasan" :key="data.id">
            <q-img
              class="col-1 q-ml-sm q-mr-sm"
              :src="Checklist"
              width="20px"
              height="20px"
            />
            <span class="col-10" style="font-size: 12px; font-weight: 500; line-height: 15px;">
              {{ data.text }}
            </span>
          </div>
        </div>
        <q-card class="my-footer q-mt-md q-px-lg" flat>
          <q-card-section>
            <div class="text-h6 text-center">Hubungi Kami</div>
            <div class="row items-center q-mt-md">
              <q-icon size="24px" class="col-2" name="location_on" />
              <div class="col-10" style="font-size: 14px;">
                Greenpark Pandanwangi <br>
                JI. LA Sucipto B-1, Malang, Jawa Timur, Indonesia 65124
              </div>
            </div>
            <div class="row q-mt-md items-center cursor-pointer">
              <div class="col-2 items-center text-center">
                <q-icon size="24px" :name="`img:${WALogo}`" @click="toWa()"/>
              </div>
              <div class="col-7" style="font-size: 14px;" @click="toWa()">
                +62 851 0044 1777
              </div>
              <div class="col-1 items-center text-center" @click="toPage('fb')">
                <q-icon size="18px" :name="`img:${FBLogo}`" />
              </div>
              <div class="col-1 items-center text-center" @click="toPage('ig')">
                <q-icon size="18px" :name="`img:${IGLogo}`" />
              </div>
              <div class="col-1 items-center text-center" @click="toPage('tw')">
                <q-icon size="18px" :name="`img:${TWLogo}`" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import TagLogo from 'src/assets/image/Tag.png'
import Preview from 'src/assets/image/LP3-Preview.png'
import Preview1 from 'src/assets/image/LandingPage2-1.png'
import Preview2 from 'src/assets/image/LandingPage2-2.png'
import Checklist from 'src/assets/image/Checklist-LP3.png'
import Checklist2 from 'src/assets/image/Checklist-LP3(2).png'
import Shopee from 'src/assets/image/Shopee.png'
import Tokopedia from 'src/assets/image/Tokopedia.png'
import WALogo from 'src/assets/image/wa-logo-putih.png'
import FBLogo from 'src/assets/image/fb.png'
import IGLogo from 'src/assets/image/ig.png'
import TWLogo from 'src/assets/image/twitter.png'
export default {
  data () {
    return {
      TagLogo,
      Preview,
      Preview1,
      Preview2,
      Checklist,
      Checklist2,
      Shopee,
      Tokopedia,
      WALogo,
      FBLogo,
      IGLogo,
      TWLogo,
      Benefit: [
        {
          id: 1,
          text: 'Gratis Berlangganan 1 tahun'
        },
        {
          id: 2,
          text: 'Garansi 30 Hari'
        },
        {
          id: 3,
          text: 'Gratis Training Online'
        },
        {
          id: 4,
          text: 'Prioritas akses untuk semua fitur bisnis'
        }
      ],
      Alasan: [
        {
          id: 1,
          text: 'Saya tidak perlu biaya cetak kartu nama lagi mulai dari sekarang, cukup menggunakan Ponsel'
        },
        {
          id: 2,
          text: 'Saya dapat mengubah profil/data diri kapanpun, dimanapun dan menambahkan informasi bisnis lebih lengkap, seperti: portofolio, video, dokumen, banner, peta, dll'
        },
        {
          id: 3,
          text: 'Saya dapat terhubung dengan semua Sosial Media saya dalam 1 Kartu Nama Digital'
        },
        {
          id: 4,
          text: 'Berbagi Kartu Nama dengan kolega sekarang lebih mudah hanya "Pindai, Bagikan, Simpan" (tidak perlu aplikasi)'
        },
        {
          id: 5,
          text: 'Saya lebih mudah mengirim/mengundang/ menyimpan jadwal rapat dari/kepada kolega saya'
        },
        {
          id: 6,
          text: 'Saya dapat terhubung dengan Toko Online/e Katalog/e-Menu saya dan bertransaksi melalui Kartu Nama Digital saya'
        },
        {
          id: 7,
          text: 'Saya menemukan banyak fitur bisnis di dalam Kartu Nama Digital saya dengan data analitik yang terukur'
        }
      ]
    }
  },
  beforeCreate () {
    const host = window.location.host
    const parts = host.split('.')
    const username = parts[0]
    if (username !== 'netwerk') {
      this.$router.push({ path: '/not-found' })
    }
  },
  methods: {
    toWa () {
      window.open('https://wa.me/6285100441777')
    },
    toPage (type) {
      if (type === 'shopee') {
        window.open('https://shopee.co.id/tagid.ai')
      } else if (type === 'tokopedia') {
        window.open('https://tokopedia.link/tagidai')
      } else if (type === 'fb') {
        window.open('https://www.facebook.com/tagiddotai')
      } else if (type === 'ig') {
        window.open('https://instagram.com/tagid.ai')
      } else if (type === 'tw') {
        window.open('https://twitter.com/tagid_ai')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-1 {
      background: url('../../../assets/image/LP-TAG.png');
      background-position: top;
      background-size: cover;
      background-repeat: no-repeat;
      padding-top: 5rem;
  }
  .my-card {
    background: url('../../../assets/image/Layer-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding: 15px 0;

    color: #5D2504;
    font-weight: 600;
    font-size: 20px;
  }
  .my-card-2 {
    background: url('../../../assets/image/Layer-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding: 2px 12px 2px 12px;

    color: #5D2504;
    font-weight: 600;
    font-size: 13px;
  }
  .my-footer {
    background: rgba(255, 255, 255, 0.08);
    color: white;

    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
  .my-button {
    background: url('../../../assets/image/Layer-1.png');
    background-size: 280px 60px;
    background-repeat: no-repeat;
    background-position: center;

    text-transform: capitalize;
    font-weight: 700;
    font-size: 15px;
    line-height: 17px;
    color: #1A0B01;
    padding: 12px 2px 12px 2px;
  }
  .card-3 {
    background: url('../../../assets/image/Layer-2.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    border-radius: 30px;

    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
  }
  .line-under::after {
    display: block;
    content: '';
    width: 50%;
    height: 2px;
    margin: 14px auto;
    background: linear-gradient(56.97deg, #CCA866 8.8%, #A77F41 14.62%, #8B5F25 20.44%,
    #774811 26.26%, #6A3A04 30.63%, #663500 34.99%, #B28A4C 55.37%, #D0AD6A 65.55%,
    #DABB7F 75.74%, #E9D19F 94.66%, #F4E0B6 113.58%, #FBEAC4 129.59%, #FDEDC9 145.6%);
  }
  .line-under-left::after {
    display: block;
    content: '';
    width: 50%;
    height: 2px;
    margin: 14px 0px;
    background: linear-gradient(56.97deg, #CCA866 8.8%, #A77F41 14.62%, #8B5F25 20.44%,
    #774811 26.26%, #6A3A04 30.63%, #663500 34.99%, #B28A4C 55.37%, #D0AD6A 65.55%,
    #DABB7F 75.74%, #E9D19F 94.66%, #F4E0B6 113.58%, #FBEAC4 129.59%, #FDEDC9 145.6%);
  }
  .strikethrough{
    position: relative;
  }
  .strikethrough:before {
    position: absolute;
    content: "";
    left: 0;
    top: 50%;
    right: 0;
    border-top: 1px solid;
    border-color: red;

    -webkit-transform:rotate(-5deg);
    -moz-transform:rotate(-5deg);
    -ms-transform:rotate(-5deg);
    -o-transform:rotate(-5deg);
    transform:rotate(-5deg);
  }
  .text-harga {
    font-weight: 700;
    font-size: 28px;
    line-height: 31px;

    background: linear-gradient(246.14deg, #5D2504 -399.84%, #994E17 -122.42%, #FCE15D 132.8%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .text-gradient {
    background: linear-gradient(246.14deg, #5D2504 -399.84%, #994E17 -122.42%, #FCE15D 132.8%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
