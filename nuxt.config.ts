import { LOCALES } from './app/constants/locales'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

    colorMode: {
        classSuffix: '',
        preference: 'light',
        fallback: 'light',
    },

    i18n: {
        locales: LOCALES,
        defaultLocale: 'en',
        strategy: 'prefix_and_default',
        vueI18n: './i18n.config.ts'
    },
})