import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ithink',
    title: '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Informe para o mundo o que você pensa sobre filmes, séries, pessoas e programas de TV! - Consulte a nota e identifique o que todos acham sobre um tema - iThink'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/faviconapp.ico'
    }],
    script: [{
        src: "https://accounts.google.com/gsi/client",
        async: true,
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    'nuxt-compress'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-twa-module', {
      /* module options */
      defaultUrl: 'https://ithink.vercel.app/',
      hostName: 'iThink',
      applicationId: 'com.example.ithink',
      launcherName: 'iThink',
      versionCode: 1,
      versionName: '1.0',
      statusBarColor: '#808080',
      // The sha256Fingerprints by is an array with one SHA-256 key string.
      // But if you have multiple you can add them to the array. More information about the website asociation:
      // https://developer.android.com/training/app-links/verify-site-associations#web-assoc
      sha256Fingerprints: ['3E:A9:BC:59:A0:C2:9E:52:F1:19:C2:33:4B:F7:72:B9:13:45:C2:E3:20:1A:F5:5B:36:2B:7B:95:1E:85:98:4E'],
      /* optional */
      /* overwrite default location for icon */
      iconPath: '/static/iconapp.png',
      /* Overwrite folder where to put .wellknown */
      distFolder: '.nuxt/dist/client',
    }],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCZYXTXKxA6qIzwV3YTA3m3BWrWfnwJgt0',
          authDomain: 'ithink-332305.firebaseapp.com',
          projectId: 'ithink-332305',
          storageBucket: 'ithink-332305.appspot.com',
          messagingSenderId: '644103719072',
          appId: '1:644103719072:web:20528bc414ebe42efee1c5',
          measurementId: 'G-VLS6KM6VVF'
        },
        services: {
          analytics: true // Just as example. Can be any other service.
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'ithink',
      short_name: 'ithink',
      description: 'Informe para o mundo o que você pensa sobre filmes, séries, pessoas e programas de TV! - Consulte a nota e identifique o que todos acham sobre um tema - iThink',      
      lang: 'en',
      useWebmanifestExtension: false,
    },
    icon: {
      fileName: 'iconapp.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
