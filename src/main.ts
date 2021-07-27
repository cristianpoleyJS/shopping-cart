import './registerServiceWorker'
import { createApp } from 'vue'
import { i18n } from './i18n'
import router from './router'
import { store } from './store'
import App from './App.vue'
import './assets/styles/main.css'

createApp(App)
    .use(store)
    .use(i18n)
    .use(router)
    .mount('#app')
