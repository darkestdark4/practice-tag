<template>
  <q-page class="q-pa-lg flex flex-center">
    <q-card class="constrain q-pa-lg border-radius-10px" flat bordered>
      <!-- ID NUMBER -->
      <q-card-section>
        <div class="text-h6 text-secondary">ID Number</div>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-8 col-xs-8">
          <q-input label="534366252524152121" outlined readonly />
        </div>
        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-4 col-xs-4 text-right">
          <q-btn class="bg-secondary text-white" icon="share" style="height: 56px; border-radius: 10px" />
        </div>
      </q-card-section>
      <!-- BALANCE TOPUP -->
      <q-card-section>
        <q-carousel
          class="text-white"
          :height="windowWidth < 450 ? '500px' : '250px'"
          style="border-radius:30px"
          :navigation-position="navPos"
          :vertical="vertical"
          v-model="slide"
          swipeable
          animated
          navigation
          padding
        >
          <q-carousel-slide name="balance" class="row bg-primary flex flex-center">
            <div class="q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div class="column">
                <span class="col text-h5 text-white">Balance</span>
                <span class="col text-h5 text-white">$2000</span>
              </div>
            </div>
            <div :class="windowWidth < 450 ? 'q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12' : 'q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 text-right'">
              <q-btn class="bg-white text-primary" label="Topup" size="lg" style="border-radius: 10px" />
            </div>
            <div :class="windowWidth < 450 ? 'q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12' : 'q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 text-right'">
              <q-btn class="text-white" icon="list" size="lg" rounded flat />
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="linkaja" class="row bg-negative flex-center">
            <div class="q-pa-lg col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12">
              <q-img :src="LinkAja" width="55px" />
            </div>
            <div class="q-pa-lg col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
              <span class="text-h5 text-white">Link Aja!</span>
            </div>
            <div :class="windowWidth < 450 ? 'q-pa-lg col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12' : 'q-pa-lg col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12 text-right'">
              <q-btn class="bg-white text-negative" label="Connect" size="lg" style="border-radius: 10px" />
            </div>
            <div :class="windowWidth < 450 ? 'q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12' : 'q-pa-lg col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 text-right'">
              <q-btn class="text-white" icon="list" size="lg" rounded flat />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
      <!-- E-COMMERCE OVERVIEW -->
      <q-card-section class="row">
        <div class="text-h6 text-bold text-secondary">E-COMMERCE OVERVIEW</div>
      </q-card-section>
      <q-card-section class="row">
        <q-markup-table class="full-width" flat>
          <tr class="col">
              <td class="col text-h6 text-secondary">Orders</td>
              <td class="col text-h6 text-secondary">Revenue</td>
              <td class="col"></td>
          </tr>
          <tr class="col">
              <td class="col text-grey-6">This Month</td>
              <td class="col text-grey-6">This Month</td>
              <td class="col text-grey-6">Last Month</td>
          </tr>
          <tr class="col">
              <td class="col text-h5 text-bold">154</td>
              <td class="col text-h5 text-bold">$2541</td>
              <td class="col text-h5 text-bold">$2310</td>
          </tr>
        </q-markup-table>
      </q-card-section>
      <q-separator />
      <!-- RECENT ACTIVITY -->
      <q-card-section>
        <div class="col text-h6 text-bold text-secondary">Recent Activity</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-pa-md" v-for="prod in 3" :key="prod">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-1 col-xs-4">
            <q-avatar round>
              <img :src="Headphone" size="100px">
            </q-avatar>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-9 col-sm-1 col-xs-5">
            <div class="column">
              <div class="col" style="font-size:16px">Mi Headphone</div>
              <div class="col" style="font-size:16px">1 hours ago</div>
            </div>
          </div>
          <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-3 text-h6 text-right text-secondary">+ $30</div>
          <q-separator />
        </div>
      </q-card-section>
      <!-- MY NEXT MEETING -->
      <q-card-section class="row">
        <div class="col text-h6 text-bold text-secondary">MY NEXT MEETING</div>
        <div class="col q-mt-xs text-bold text-secondary text-right">
          See All
        </div>
      </q-card-section>
      <q-carousel
        v-model="meeting"
        navigation-position="bottom"
        control-color="secondary"
        transition-next="slide-left"
        transition-prev="slide-right"
        :autoplay="true"
        :infinite="true"
        swipeable
        animated
        navigation
        padding
      >
      <q-carousel-slide name="meeting-1" class="column no-wrap flex-center">
        <q-card class="my-card" style="border-right: 10px solid #116C54" flat bordered>
          <q-card-section class="row">
            <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-9 text-h5 text-bold">23 March</div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 text-h6 text-bold text-right">13.45</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-secondary">TAG ID Publish Event</div>
          </q-card-section>
          <q-card-section>
            <div class="text-grey-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure deleniti cumque voluptate dolor expedita corporis, deserunt illum harum tempore similique totam, itaque, molestias sequi maiores rem esse doloribus architecto assumenda?</div>
          </q-card-section>
          <q-card-section class="row">
            <div class="col">
              <q-btn class="q-pa-sm bg-secondary text-white" @click="detail_meeting = true">
                See Details
              </q-btn>
            </div>
            <div class="col" align="right">
              <q-avatar round>
                <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
              </q-avatar>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="meeting-2" class="column no-wrap flex-center">
        <q-card class="my-card" style="border-right: 10px solid #116C54" flat bordered>
          <q-card-section class="row">
            <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-9 text-h5 text-bold">20 March</div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 text-h6 text-bold text-right">12.00</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-secondary">TAG ID Publish Event</div>
          </q-card-section>
          <q-card-section>
            <div class="text-grey-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure deleniti cumque voluptate dolor expedita corporis, deserunt illum harum tempore similique totam, itaque, molestias sequi maiores rem esse doloribus architecto assumenda?</div>
          </q-card-section>
          <q-card-section class="row">
            <div class="col">
              <q-btn class="q-pa-sm bg-secondary text-white" @click="detail_meeting = true">
                See Details
              </q-btn>
            </div>
            <div class="col" align="right">
              <q-avatar round>
                <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
              </q-avatar>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="meeting-3" class="column no-wrap flex-center">
        <q-card class="my-card" style="border-right: 10px solid #116C54" flat bordered>
          <q-card-section class="row">
            <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-9 text-h5 text-bold">19 March</div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 text-h6 text-bold text-right">08.45</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-secondary">TAG ID Publish Event</div>
          </q-card-section>
          <q-card-section>
            <div class="text-grey-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure deleniti cumque voluptate dolor expedita corporis, deserunt illum harum tempore similique totam, itaque, molestias sequi maiores rem esse doloribus architecto assumenda?</div>
          </q-card-section>
          <q-card-section class="row">
            <div class="col">
              <q-btn class="q-pa-sm bg-secondary text-white" @click="detail_meeting = true">
                See Details
              </q-btn>
            </div>
            <div class="col" align="right">
              <q-avatar round>
                <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
              </q-avatar>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
      <q-carousel-slide name="meeting-4" class="column no-wrap flex-center">
        <q-card class="my-card" style="border-right: 10px solid #116C54" flat bordered>
          <q-card-section class="row">
            <div class="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-9 text-h5 text-bold">18 March</div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 text-h6 text-bold text-right">11.45</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-secondary">TAG ID Publish Event</div>
          </q-card-section>
          <q-card-section>
            <div class="text-grey-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure deleniti cumque voluptate dolor expedita corporis, deserunt illum harum tempore similique totam, itaque, molestias sequi maiores rem esse doloribus architecto assumenda?</div>
          </q-card-section>
          <q-card-section class="row">
            <div class="col">
              <q-btn class="q-pa-sm bg-secondary text-white" @click="detail_meeting = true">
                See Details
              </q-btn>
            </div>
            <div class="col" align="right">
              <q-avatar round>
                <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
              </q-avatar>
            </div>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
      <!-- MEETING REQUEST -->
      <q-card-section class="row">
        <div class="col-9 text-h6 text-bold text-secondary">MEETING REQUEST</div>
        <div class="col-3 q-mt-md text-bold text-secondary text-right cursor-pointer" @click="$router.replace({ path: `meetings` })">
          See All
        </div>
      </q-card-section>
      <q-card-section>
        <q-card class="row q-mb-md" v-for="meet_request in 3" :key="meet_request" flat bordered horizontal>
          <q-card-section class="q-pa-md col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 bg-secondary text-white" horizontal>
            <div class="column">
              <div class="col text-h6 text-right">Tue</div>
              <div class="col q-my-md text-h4 text-right">08</div>
              <div class="col text-right">April</div>
            </div>
          </q-card-section>
          <q-card-section class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <div class="column">
              <div class="col text-h5 text-bold">Meeting Request</div>
              <div class="col text-grey-6">Meeting description will show here</div>
            </div>
          </q-card-section>
          <q-card-actions class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12" align="right">
            <q-btn class="q-pa-sm bg-primary text-white border-radius-10px" @click="review_meeting = true" flat>
              Review
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-card-section>
      <!-- RECENT CARD -->
      <q-card-section class="row">
        <div class="col-10 text-h6 text-bold text-secondary">RECENT CARDS</div>
        <div class="col-2 text-secondary text-bold text-right cursor-pointer" @click="$router.replace({ path: `saved-cards` })">
          See All
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="q-pa-sm col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12" v-for="cards in 4" :key="cards">
              <q-card>
                  <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                      <div class="absolute-bottom  text-center">
                          <q-avatar round>
                              <img src="https://cdn.quasar.dev/img/avatar.png" size="100px">
                          </q-avatar>
                          <div class="q-mt-md text-bold" style="font-size:16px">Putri Mulia</div>
                      </div>
                  </q-img>
              </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Meeting Details -->
    <q-dialog v-model="detail_meeting">
      <q-card style="width: 700px; border-top: 15px solid #116C54">
          <q-toolbar class="text-secondary">
              <q-toolbar-title class="q-ml-xl text-center text-h6">Meeting Review</q-toolbar-title>
              <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="q-pa-sm col-6">
                <div class="column">
                  <div class="col">
                    <span class="text-h5 text-bold">March 23</span>
                  </div>
                  <div class="col">
                    <span class="text-h5 text-bold text-grey-6">10:00</span>
                    <span class="q-ml-sm text-bold text-grey-6">AM</span>
                  </div>
                  <div class="col">
                    <span class="text-secondary">Online Meeting</span>
                  </div>
                </div>
              </div>
              <div class="q-pa-sm col-6 text-right">
                <div class="column">
                  <span class="col q-ml-sm text-bold text-secondary">Created By</span>
                  <span class="col q-ml-sm text-bold">Liza M</span>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="column">
              <div class="col q-mb-md text-h5 text-bold">Meeting Request</div>
              <div class="col text-grey-6">Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.</div>
            </div>
          </q-card-section>
          <q-card-actions class="q-mb-md flex-center">
            <q-btn class="full-width" size="lg" rounded color="primary" label="Re-schedule" />
          </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Meeting Review -->
    <q-dialog v-model="review_meeting">
        <q-card style="width: 700px; border-top: 15px solid #116C54">
            <q-toolbar class="text-secondary">
                <q-toolbar-title class="q-ml-xl text-center text-h6">Meeting Review</q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section>
              <div class="row">
                <div class="q-pa-sm col-6">
                  <span class="text-h4 text-bold text-grey-6">10:00</span>
                  <span class="q-ml-sm text-bold text-grey-6">AM</span>
                </div>
                <div class="q-pa-sm col-6 text-right">
                  <div class="column">
                    <span class="col q-ml-sm text-bold text-secondary">Request By</span>
                    <span class="col q-ml-sm text-bold">Liza M</span>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="column">
                <div class="col q-mb-md text-h5 text-bold">Meeting Request</div>
                <div class="col text-grey-6">Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.</div>
              </div>
            </q-card-section>
            <q-card-actions class="row" align="right">
              <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-btn class="full-width" size="lg" rounded color="primary" label="Re-schedule" />
              </div>
              <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-btn class="full-width" size="lg" rounded outline color="negative" label="Reject" />
              </div>
              <div class="q-pa-sm col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-btn class="full-width" size="lg" rounded color="secondary" label="Approve" />
              </div>
            </q-card-actions>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Headphone from 'src/assets/image/headphone.png'
import LinkAja from 'src/assets/image/LinkAja.png'
export default {
  data () {
    return {
      Headphone,
      LinkAja,
      navPos: 'left',
      slide: 'balance',
      meeting: 'meeting-1',
      vertical: true,
      detail_meeting: false,
      review_meeting: false,
      windowWidth: window.innerWidth
    }
  },
  watch: {
    vertical (val) {
      this.navPos = val === true
        ? 'right'
        : 'bottom'
    }
  },
  mounted () {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>
