// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  app: {
    head: {
      charset: 'utf8',
      htmlAttrs: { lang: 'es' },
      title: 'CIP | Centro de Investigación para la Prensa'
    }
  },
  modules: [
    "@ant-design-vue/nuxt",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@sidebase/nuxt-auth",
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  i18n: {
    strategy: 'prefix_and_default',
    lazy: true,
    locales: [
      { code: 'es', file: 'es.json' },
      { code: 'en', file: 'en.json' }
    ],
    langDir: 'locales',
    defaultLocale: 'es'

  },
  auth: {
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'login', method: 'post' },
        signUp: { path: 'register', method: 'post' },
        getSession: { path: 'verify', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: '/token'
      }
    }
  },
  tailwindcss: {
    viewer: false
  }
})