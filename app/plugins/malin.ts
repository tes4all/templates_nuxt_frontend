import { MalinPlugin } from '@fzo/malin'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MalinPlugin, {
    apiKey: import.meta.env.VITE_APP_AUTH_MALIN_API_KEY,
    stage: import.meta.env.VITE_APP_URL_MALIN_API_STAGE,
    awsRegion: import.meta.env.VITE_APP_AUTH_AWS_REGION,
    awsPoolId: import.meta.env.VITE_APP_AUTH_AWS_POOL_ID,
    awsWebClientId: import.meta.env.VITE_APP_AUTH_AWS_WEB_CLIENT_ID,
    currencyCode: 'EUR',
    locale: 'de-de',
    skipPageLoading: true,
  })
})
