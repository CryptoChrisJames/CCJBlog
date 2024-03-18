// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
    buildModules: [
        '@nuxtjs/google-fonts'
    ],
    modules: [
        '@nuxt/content'
    ],
    target: 'static',
    router: {
        base: '/cryptochrisjames.github.io/',
        options: { 
            strict: true, 
        }
    },
    css: [
        "@/assets/styles/_variables.scss", 
        "@/assets/styles/_colors.scss",
    ],
    googleFonts: {
        families: {
            Nunito: true,
        }
    },
    plugins: [
        { src: '~/plugins/vercel-analytics.js', mode: 'client' }
    ]
}
