import { createApp } from 'vue'
import App from './components/App.vue'

const app = createApp(App)

import Framework7 from 'framework7/lite'
import Framework7Vue from 'framework7-vue'
Framework7.use(Framework7Vue)
import '../../node_modules/framework7/framework7-bundle.min.css'

app.mount('#app')

