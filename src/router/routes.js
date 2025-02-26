const routes = [
  {
    path: '/',
    component: () => import('layouts/Front/MainLayout.vue')
  },
  {
    path: '/dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import('layouts/Dashboard/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dashboard/Index.vue') },
      {
        path: 'meetings',
        component: () => import('pages/Dashboard/Meeting/Index.vue')
      },
      {
        path: 'all-meeting-requests',
        component: () =>
          import('pages/Dashboard/Meeting/MeetingRequest/Index.vue')
      },
      {
        path: 'profile',
        component: () => import('pages/Dashboard/Profile/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/Profile/Index.vue')
          },
          {
            path: 'edit',
            component: () => import('pages/Dashboard/Profile/Edit/Index.vue')
          }
        ]
      },
      {
        path: 'manage-corporate',
        component: () => import('pages/Dashboard/ManageCorporate/Index.vue'),
        children: [
          {
            path: 'users',
            component: () =>
              import('pages/Dashboard/ManageCorporate/Users/Page.vue'),
            children: [
              {
                path: '',
                component: () =>
                  import('pages/Dashboard/ManageCorporate/Users/Index.vue')
              },
              {
                path: 'add',
                component: () =>
                  import('pages/Dashboard/ManageCorporate/Users/Add/Index.vue')
              },
              {
                path: 'edit/:username',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Users/Edit/Index.vue'
                  )
              },
              {
                path: 'renewal/:username',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Users/Renewal/Index.vue'
                  )
              }
            ]
          },
          {
            path: 'broadcast',
            component: () =>
              import('pages/Dashboard/ManageCorporate/Broadcast/Page.vue'),
            children: [
              {
                path: '',
                component: () =>
                  import('pages/Dashboard/ManageCorporate/Broadcast/Index.vue')
              },
              {
                path: 'add',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Broadcast/Add/Index.vue'
                  )
              },
              {
                path: 'edit/:id',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Broadcast/Edit/Index.vue'
                  )
              }
            ]
          },
          {
            path: 'log',
            component: () =>
              import('pages/Dashboard/ManageCorporate/Log/Index.vue')
          },
          {
            path: 'sponsor',
            component: () =>
              import('pages/Dashboard/ManageCorporate/Sponsor/Page.vue'),
            children: [
              {
                path: '',
                component: () =>
                  import('pages/Dashboard/ManageCorporate/Sponsor/Index.vue')
              },
              {
                path: 'add',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Sponsor/Add/Index.vue'
                  )
              },
              {
                path: 'edit/:id',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Sponsor/Edit/Index.vue'
                  )
              }
            ]
          },
          {
            path: 'polling',
            component: () =>
              import('pages/Dashboard/ManageCorporate/Polling/Page.vue'),
            children: [
              {
                path: '',
                component: () =>
                  import('pages/Dashboard/ManageCorporate/Polling/Index.vue')
              },
              {
                path: 'add',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Polling/Add/Index.vue'
                  )
              },
              {
                path: 'edit/:id',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Polling/Edit/Index.vue'
                  )
              },
              {
                path: 'detail/:id',
                component: () =>
                  import(
                    'pages/Dashboard/ManageCorporate/Polling/Detail/Index.vue'
                  )
              }
            ]
          }
        ]
      },
      {
        path: 'manage-partner',
        component: () => import('pages/Dashboard/Sponsor/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/Sponsor/Manage/Index.vue')
          },
          {
            path: 'add',
            component: () => import('pages/Dashboard/Sponsor/Add/Index.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Dashboard/Sponsor/Edit/Index.vue')
          },
          {
            path: 'edit/cabang/:id',
            component: () =>
              import('pages/Dashboard/Sponsor/Edit/Cabang/Index.vue')
          },
          {
            path: 'set-alias',
            name: 'set-alias',
            component: () => import('pages/Dashboard/Sponsor/Alias/Index.vue')
          }
        ]
      },
      {
        path: 'manage-banner',
        component: () => import('pages/Dashboard/Banner/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/Banner/Index.vue')
          },
          {
            path: 'add',
            component: () => import('src/pages/Dashboard/Banner/Add.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('src/pages/Dashboard/Banner/Edit.vue')
          }
        ]
      },
      {
        path: 'manage-shortcut',
        component: () => import('pages/Dashboard/Shortcut/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/Shortcut/Index.vue')
          },
          {
            path: 'add',
            component: () => import('pages/Dashboard/Shortcut/Add/Index.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Dashboard/Shortcut/Edit/Index.vue')
          }
        ]
      },
      {
        path: 'manage-merchant',
        component: () => import('pages/Dashboard/Shortcut/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/Merchant/Index.vue')
          },
          {
            path: 'add',
            component: () => import('pages/Dashboard/Merchant/Add/Index.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/Dashboard/Merchant/Edit/Index.vue')
          }
        ]
      },
      {
        path: 'manage-billing',
        component: () => import('pages/Dashboard/Billing/Index.vue')
      },
      {
        path: 'manage-billing/paket',
        component: () =>
          import('pages/Dashboard/Billing/PaketBerlangganan.vue')
      },
      {
        path: 'manage-billing/upgrade-downgrade',
        component: () => import('pages/Dashboard/Billing/UpDownGrade.vue')
      },
      {
        path: 'manage-billing/invoice-history',
        component: () => import('pages/Dashboard/Billing/InvoiceHistory.vue')
      },
      {
        path: 'manage-billing/renewal',
        component: () => import('pages/Dashboard/Billing/Renewal.vue')
      },
      {
        path: 'manage-billing/checkout/:id',
        component: () => import('pages/Dashboard/Billing/Checkout.vue')
      },
      {
        path: 'saved-cards',
        component: () => import('pages/Dashboard/SavedCards/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/SavedCards/Index.vue')
          },
          {
            path: 'add',
            component: () => import('pages/Dashboard/SavedCards/Add/Index.vue')
          }
        ]
      },
      {
        path: 'wallet',
        component: () => import('pages/Dashboard/Wallet/Page.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Dashboard/Wallet/Index/Index.vue')
          },
          {
            path: 'transaction',
            component: () =>
              import('pages/Dashboard/Wallet/Transaction/Index.vue')
          },
          {
            path: 'data-verification',
            component: () =>
              import('pages/Dashboard/Wallet/DataVerification/Index.vue')
          },
          {
            path: 'request',
            component: () => import('pages/Dashboard/Wallet/Request/Index.vue')
          },
          {
            path: 'request-to',
            component: () =>
              import('pages/Dashboard/Wallet/RequestTo/Index.vue')
          },
          {
            path: 'topup',
            component: () => import('pages/Dashboard/Wallet/Topup/Page.vue'),
            children: [
              {
                path: '',
                component: () =>
                  import('pages/Dashboard/Wallet/Topup/Index.vue')
              },
              {
                path: 'linkaja',
                component: () =>
                  import('pages/Dashboard/Wallet/Topup/LinkAja/Index.vue')
              },
              {
                path: 'bank-transfer',
                component: () =>
                  import('pages/Dashboard/Wallet/Topup/BankTransfer/Index.vue')
              },
              {
                path: 'waiting-payment',
                component: () =>
                  import(
                    'pages/Dashboard/Wallet/Topup/WaitingPayment/Index.vue'
                  )
              }
            ]
          }
        ]
      },
      {
        path: 'log-redeem',
        component: () => import('pages/Dashboard/LogRedeem/Index.vue')
      }
    ]
  },
  {
    path: '/invoice/:id',
    meta: {
      requiresAuth: true
    },
    component: () => import('pages/Dashboard/Billing/InvoiceTemplate.vue')
  },
  {
    path: '/view/:username',
    meta: {
      requiresAuth: true
    },
    component: () => import('pages/Dashboard/SavedCards/View/View.vue')
  },
  {
    path: '/dashboard/manage-corporate',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import('pages/Dashboard/ManageCorporate/Users/Group/AddUser/Page.vue'),
    children: [
      {
        path: 'divisi/manage-divisi',
        component: () =>
          import(
            'pages/Dashboard/ManageCorporate/Users/Group/ManageGroup/index.vue'
          )
      },
      {
        path: 'divisi/add-divisi',
        component: () =>
          import('pages/Dashboard/ManageCorporate/Users/Group/Add/index.vue')
      },
      {
        path: 'divisi/edit-divisi/:id',
        component: () =>
          import('pages/Dashboard/ManageCorporate/Users/Group/Edit/index.vue')
      },
      {
        path: 'divisi/add-user-divisi/:id',
        component: () =>
          import(
            'pages/Dashboard/ManageCorporate/Users/Group/AddUser/index.vue'
          )
      },
      {
        path: 'sponsor/manage',
        component: () =>
          import(
            'pages/Dashboard/ManageCorporate/Sponsor/Manage/Index/Index.vue'
          )
      },
      {
        path: 'sponsor/manage/:id',
        component: () =>
          import(
            'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/Index.vue'
          )
      },
      {
        path: 'sponsor/add-user/:id',
        component: () =>
          import(
            'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/AddUser/Index.vue'
          )
      },
      {
        path: 'sponsor/manage-sponsor/:id',
        component: () =>
          import(
            'src/pages/Dashboard/ManageCorporate/Sponsor/Manage/EditSponsor/Index.vue'
          )
      }
    ]
  },
  {
    path: '/save-card',
    component: () => import('src/components/Front/Page.vue'),
    children: [
      {
        path: '',
        component: () => import('src/components/Front/SaveCard.vue')
      },
      {
        path: 'send-wa',
        component: () => import('src/components/Front/SendWhatsapp.vue')
      },
      {
        path: 'send-email',
        component: () => import('src/components/Front/SendEmail.vue')
      },
      {
        path: 'success-send-email',
        component: () => import('src/components/Front/SuccessSendEmail.vue')
      },
      {
        path: 'success-send-wa',
        component: () => import('src/components/Front/SuccessSendWA.vue')
      },
      {
        path: 'login',
        component: () => import('src/components/Front/Login.vue')
      },
      {
        path: 'success-login',
        component: () =>
          import('pages/Dashboard/SavedCards/Success/SuccessLogin.vue')
      }
    ]
  },
  {
    name: 'landing-page',
    path: '/landingpage',
    component: () => import('pages/LandingPage/Index.vue')
  },
  {
    name: 'landingpage-login',
    path: '/landingpage/login',
    component: () => import('pages/LandingPage/MVP/Login.vue')
  },
  {
    name: 'landingpage-register',
    path: '/landingpage/register',
    component: () => import('pages/LandingPage/MVP/Register.vue')
  },
  {
    name: 'landingpage-reset-password',
    path: '/landingpage/reset-password',
    component: () => import('pages/LandingPage/MVP/ResetPassword.vue')
  },
  {
    name: 'merchant-list',
    path: '/landingpage/merchant-list',
    component: () => import('pages/LandingPage/MVP/MerchantList.vue')
  },
  {
    name: 'privacy-policy',
    path: '/landingpage/privacy-policy',
    component: () => import('pages/LandingPage/MVP/PrivacyPolicy.vue')
  },
  {
    name: 'terms-conditions',
    path: '/landingpage/term-condition',
    component: () => import('pages/LandingPage/MVP/Terms&Conditions.vue')
  },
  {
    name: 'merchant',
    path: '/merchant-list',
    component: () => import('pages/MerchantList/index.vue')
  },
  {
    name: 'merchant-list',
    path: '/landingpage/cabang-list/:id',
    component: () => import('pages/LandingPage/MVP/MerchantListCabang.vue')
  },
  {
    name: 'merchant-detail',
    path: '/landingpage/merchant-detail/:id',
    component: () => import('pages/LandingPage/MVP/MerchantDetail.vue')
  },
  {
    name: 'about-mvp',
    path: '/landingpage/about',
    component: () => import('pages/LandingPage/MVP/About.vue')
  },
  {
    name: 'campaign-free-account',
    path: '/campaign-free-account',
    component: () => import('pages/LandingPage/CampaignFreeAccount.vue')
  },
  {
    name: 'campaign-thank-you',
    path: '/campaign-thank-you',
    component: () => import('pages/LandingPage/CampaignThankYou.vue')
  },
  {
    name: 'landing-page',
    path: '/lp1',
    component: () => import('pages/LandingPage/TagAds.vue')
  },
  {
    name: 'landing-page-3',
    path: '/lp3',
    // redirect: to => {
    //   // the function receives the target route as the argument
    //   // we return a redirect path/location here.
    //   return { path: '/kartu-nfc-emas' }
    // },
    component: () => import('pages/LandingPage/LP3/Index.vue')
  },
  {
    name: 'landing-page-3-register',
    path: '/lp3/register',
    // redirect: to => {
    //   // the function receives the target route as the argument
    //   // we return a redirect path/location here.
    //   return { path: '/kartu-nfc-emas/register' }
    // },
    component: () => import('pages/LandingPage/LP3/Register.vue')
  },
  {
    name: 'landing-page-2',
    path: '/kartu-nfc-emas',
    component: () => import('pages/LandingPage/LP2/Index.vue')
  },
  {
    name: 'landing-page-2-register',
    path: '/kartu-nfc-emas/register',
    component: () => import('pages/LandingPage/LP2/Register.vue')
  },
  {
    name: 'landing-page-4',
    path: '/lp4',
    component: () => import('pages/LandingPage/LP4/Index.vue')
  },
  {
    name: 'landing-page-4-register',
    path: '/lp4/register',
    component: () => import('pages/LandingPage/LP3/Register.vue')
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/forgot-password',
    component: () => import('pages/ForgotPassword.vue')
  },
  {
    path: '/new_password/:otp',
    component: () => import('pages/ChangePassword.vue')
  },
  {
    path: '/logout',
    beforeEnter (to, from, next) {
      window.localStorage.clear()
      // next({ path: '/login', replace: true })
      const host = window.location.host
      const split = host.split('.')[1]
      window.location.href = 'http://' + split + '/login'
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/expired-member',
    name: 'expired-member',
    component: () => import('pages/ErrorExpired.vue')
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
