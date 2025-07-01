import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ Add this import

createApp(App)
  .use(router) // ✅ Register the router
  .mount('#app')
