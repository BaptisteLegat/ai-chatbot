// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/base.css'],

    runtimeConfig: {
        huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY,
        nvidiaNimApiKey: process.env.NVIDIA_NIM_API_KEY,
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    compatibilityDate: '2025-03-25',
});
