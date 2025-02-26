<template>
  <q-layout view="lHr lpR lfr">
    <q-page-container>
      <q-page class="constrain-web-mini page-1 font-roboto q-pt-lg">
        <div class="text-center">
          <q-img
            :src="LogoMVP"
            height="102px"
            width="190px"
            spinner-color="primary"
            spinner-size="40px"
          />
        </div>
        <div class="text-center column q-mt-lg">
          <span style="font-weight: 900; font-size: 38px; line-height: 46px;">Privacy Policy</span>
        </div>
        <q-card class="card-front q-my-lg bg-white">
          <div class="text-justify q-pa-md text-weight-medium">
            <p>
              PT. Mutual Properity Venture built the MVP app as
              a Freemium app. This SERVICE is provided by
              PT. Mutual Properity Venture at no cost and is intended for use as
              is.
            </p> <p>
              This page is used to inform visitors regarding our
              policies with the collection, use, and disclosure of Personal
              Information if anyone decided to use our Service.
            </p> <p>
              If you choose to use our Service, then you agree to
              the collection and use of information in relation to this
              policy. The Personal Information that we collect is
              used for providing and improving the Service. We will not use or share your information with
              anyone except as described in this Privacy Policy.
            </p> <p>
              The terms used in this Privacy Policy have the same meanings
              as in our Terms and Conditions, which are accessible at
              MVP unless otherwise defined in this Privacy Policy.
            </p> <p><strong>Information Collection and Use</strong></p> <p>
              For a better experience, while using our Service, we
              may require you to provide us with certain personally
              identifiable information, including but not limited to Name, Email, Phone Number, Birthday, Gender. The information that
              we request will be retained by us and used as described in this privacy policy.
            </p> <div><p>
                The app does use third-party services that may collect
                information used to identify you.
              </p> <p>
                Link to the privacy policy of third-party service providers used
                by the app
              </p> <ul><li><a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">Google Play Services</a></li><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----></ul></div> <p><strong>Log Data</strong></p> <p>
              We want to inform you that whenever you
              use our Service, in a case of an error in the app
              we collect data and information (through third-party
              products) on your phone called Log Data. This Log Data may
              include information such as your device Internet Protocol
              (“IP”) address, device name, operating system version, the
              configuration of the app when utilizing our Service,
              the time and date of your use of the Service, and other
              statistics.
            </p> <p><strong>Cookies</strong></p> <p>
              Cookies are files with a small amount of data that are
              commonly used as anonymous unique identifiers. These are sent
              to your browser from the websites that you visit and are
              stored on your device's internal memory.
            </p> <p>
              This Service does not use these “cookies” explicitly. However,
              the app may use third-party code and libraries that use
              “cookies” to collect information and improve their services.
              You have the option to either accept or refuse these cookies
              and know when a cookie is being sent to your device. If you
              choose to refuse our cookies, you may not be able to use some
              portions of this Service.
            </p> <p><strong>Service Providers</strong></p> <p>
              We may employ third-party companies and
              individuals due to the following reasons:
            </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>
              We want to inform users of this Service
              that these third parties have access to their Personal
              Information. The reason is to perform the tasks assigned to
              them on our behalf. However, they are obligated not to
              disclose or use the information for any other purpose.
            </p> <p><strong>Security</strong></p> <p>
              We value your trust in providing us your
              Personal Information, thus we are striving to use commercially
              acceptable means of protecting it. But remember that no method
              of transmission over the internet, or method of electronic
              storage is 100% secure and reliable, and we cannot
              guarantee its absolute security.
            </p> <p><strong>Links to Other Sites</strong></p> <p>
              This Service may contain links to other sites. If you click on
              a third-party link, you will be directed to that site. Note
              that these external sites are not operated by us.
              Therefore, we strongly advise you to review the
              Privacy Policy of these websites. We have
              no control over and assume no responsibility for the content,
              privacy policies, or practices of any third-party sites or
              services.
            </p> <p><strong>Children’s Privacy</strong></p> <div><p>
                These Services do not address anyone under the age of 13.
                We do not knowingly collect personally
                identifiable information from children under 13 years of age. In the case
                we discover that a child under 13 has provided
                us with personal information, we immediately
                delete this from our servers. If you are a parent or guardian
                and you are aware that your child has provided us with
                personal information, please contact us so that
                we will be able to do the necessary actions.
              </p></div> <!----> <p><strong>Changes to This Privacy Policy</strong></p> <p>
              We may update our Privacy Policy from
              time to time. Thus, you are advised to review this page
              periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </p> <p>This policy is effective as of 2023-01-01</p> <p><strong>Contact Us</strong></p> <p>
              If you have any questions or suggestions about our
              Privacy Policy, do not hesitate to contact us at mvp.virtualcards@gmail.com.
            </p>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Merchant1 from 'src/assets/image/merchant-1.png'
import Merchant2 from 'src/assets/image/merchant-2.png'
import Merchant3 from 'src/assets/image/merchant-3.png'
import Merchant4 from 'src/assets/image/merchant-4.png'
import LogoMVP from 'src/assets/image/logo-mvp.png'
import Ongis from 'src/assets/image/OngisSmall.png'

const host = window.location.host
const parts = host.split('.')
const username = parts[0]
export default {
  data () {
    return {
      merchant: [
        {
          id: 1,
          source: Merchant1
        },
        {
          id: 2,
          source: Merchant2
        },
        {
          id: 3,
          source: Merchant3
        },
        {
          id: 4,
          source: Merchant4
        }
      ],
      slide: 0,
      navigation: true,
      LogoMVP,
      Ongis
    }
  },
  beforeCreate () {
    if (username === 'mvp') {
      return 1
    } else {
      this.$router.push({ path: '/not-found' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-1 {
    background: url('../../../assets/image/mvp-index.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    padding-top: 50px;
}
.card-front {
    border-radius: 13px;
    background: #F2C581;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);

    text-align: justify;
    margin-left: auto;
    margin-right: auto;
}
.card-front-carousel {
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.25);
}
</style>
