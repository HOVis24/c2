import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    head: {
        script: [{
            src: 'https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js', defer:true
        }]
    }
})
