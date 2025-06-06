// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia
import App from './App.vue'

// Buat instance Pinia terlebih dahulu
const pinia = createPinia()
const app = createApp(App)

// Daftarkan Pinia ke Vue
app.use(pinia)

// Baru mount aplikasi
app.mount('#app')