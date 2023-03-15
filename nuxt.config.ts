// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0',
            title: "Al-Qur'an Online",
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&family=Noto+Sans+Arabic&family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap'
                },
                {
                    rel: 'stylesheet',
                    href: '/bootstrap/css/bootstrap.min.css'
                }
            ],
            script: [
                {
                    src: '/bootstrap/js/bootstrap.bundle.min.js',
                    body: true
                }
            ]
        }
    },
    pages: true
})
