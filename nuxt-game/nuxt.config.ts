// https://nuxt.com/docs/api/configuration/nuxt-config
import { setupWebSocket } from './server/api/wsServer'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  nitro: {
    hooks: {
      async listen(server) {
        setupWebSocket(server)
      }
    }
  }

})
