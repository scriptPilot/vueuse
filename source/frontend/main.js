// Vue App
import { createApp } from 'vue'
import App from './components/App.vue'

// Framework7 Vue
import Framework7 from 'framework7/lite-bundle'
import Framework7Vue from 'framework7-vue'
import '../../node_modules/framework7/framework7-bundle.min.css'
const app = createApp(App)
Framework7.use(Framework7Vue)

// Mount Vue App
app.mount('#app')
