module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
      { name: 'keywords', content: 'NuxtBlog-V1, Vuejs, Nodejs, 服务端渲染' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'alternate', type: 'application/rss+xml', title: 'RSS 2.0', href: '/rss.xml' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_620064_9otr4k6uaufbhuxr.css' }/* ,
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css' } */
    ]/* ,
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js' }
    ] */
  },
  css: ['~assets/css/main.css', 'highlight.js/styles/github.css'],
  loading: { color: '#42B983' },
  build: {
    vendor: ['axios'],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  manifest: {
    name: 'NuxtBlog-V1',
    description: 'A blog system',
    theme_color: '#42B983'
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
  plugins: ['~/plugins/components.js', '~/plugins/filters.js',
    { src: '~/plugins/gitalk.js', ssr: false }
  ]
}
