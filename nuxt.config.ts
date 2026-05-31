// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxtjs/color-mode'],

    colorMode: {
        classSuffix: '',
        preference: 'light',
        fallback: 'light',
    },
})