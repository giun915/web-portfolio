import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './assets/css/reset.css'
import './assets/css/default.css'
import './assets/css/animation.css'
import './assets/css/layout.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
