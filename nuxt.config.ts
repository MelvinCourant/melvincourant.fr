// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', 'nuxt-studio'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Melvin Courant - Développeur Front-end',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Passionné par le développement front\n' +
            'depuis quelques années, j’adore me lancer des challenges\n' +
            'en concevant des projets de A à Z. Développeur Wordpress\n' +
            'le jour et Vue.js la nuit.'
        }
      ]
    },
    rootId: 'melvincourant',
  },
  components: [
    {
      path: '~/components/pages',
      global: true,
      ignore: ['**/**/partials/**'],
    },
    {
      path: '~/components/layouts',
      global: true,
    }
  ],
  css: [
    '~/assets/css/main.scss'
  ]
})