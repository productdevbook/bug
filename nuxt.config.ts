import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  build: {},
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxt/typescript-build',
    'nuxt-windicss',
  ],
  css: [],
  env: {},
  head: {
    title: 'nuxt-community/typescript-template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A boilerplate to start a Nuxt+TS project quickly' }
    ],
    link: []
  },
  loading: { color: '#0c64c1' },
  modules: [
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
  ],
  plugins: [
    '~/plugins/truncate'
  ]
}

export default config
