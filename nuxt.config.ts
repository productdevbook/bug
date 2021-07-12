import { CreateImageOptions } from '@nuxt/image'
import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: true,
  telemetry: false,
  components: true,
  css: [],
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1 , height=device-height',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'It',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
    ],
  },
  router: {
    middleware: ['loadOnServerLoad', 'heightView'],
  },
  loading: {
    color: '#00A4DC',
    failedColor: '#FF5252',
    height: '8px',
  },
  buildModules: [
    // '@nuxtjs/pwa',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: {
          typescript: {
            memoryLimit: 4096,
            workers: 4,
          },
        },
        ignoreNotFoundWarnings: false,
      },
    ],
    '@nuxtjs/composition-api/module',
    // '@nuxtjs/tailwindcss',
    'nuxt-windicss',
    // https://motion.vueuse.org/introduction.html
    'nuxt-use-motion',
    'nuxt-timings',
    // '@nuxtjs/firebase',
    '@nuxtjs/date-fns',
    ['pinia/nuxt', { disableVuex: false }],
    // '@nuxtjs/html-validator'
  ],
  modules: [
    '@nuxtjs/auth-next',
    [
      'nuxt-tailvue',
      {
        toast: {
          defaults: {
            containerClasses: [
              'z-[500]',
              'fixed',
              'inset-0',
              'flex',
              'top-0',
              'px-4',
              'py-6',
              'pointer-events-none',
              'sm:p-6',
              'sm:items-end',
              'sm:justify-end',
            ],
          },
        },
      },
    ],
    '@nuxtjs/axios',
    ['nuxt-i18n', { vueI18nLoader: true }],
    '@nuxtjs/sentry',
    'nuxt-viewport',
    '@nuxt/image',
  ],
  timings: {
    // default value
    enabled: false,
  },
  i18n: {
    lazy: true,
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.json',
      },
    ],
    langDir: 'locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      home: '/logged',
    },
    strategies: {
      cookie: {
        options: {
          secure: true,
        },
      },
      local: {
        scheme: '~/schemes/customRefresh.js',
        token: {
          property: 'accessToken',
          data: 'accessToken',
          maxAge: 60 * 60,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 7,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: '/auth/signin',
            method: 'post',
          },
          logout: {
            url: '/auth/logout',
            method: 'post',
          },
          user: {
            url: '/user/me',
            method: 'get',
          },
          refresh: { url: '/auth/refresh', method: 'get' },
        },
      },
    },
  },
  server: {
    host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : '0.0.0.0',
    port: process.env.NODE_ENV === 'production' ? '3000' : '4010',
  },
  axios: {
    baseURL: process.env.AXIOS_BASE_URL || 'https://aa.com',
    browserBaseURL: process.env.AXIOS_BROWSER_BASE_URL || 'https://aa.com',
    proxyHeaders: false,
  },
  storybook: {
    addons: [
      '@storybook/addon-notes',
      'storybook-dark-mode',
      '@storybook/addon-measure',
      'storybook-addon-outline',
    ],
  },
  build: {
    transpile: ['vee-validate/dist/rules', 'vue', 'pinia', 'vue-final-modal'],
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
  },
}

export default config