import { createApp } from 'vue'
import App from './components/App.vue'
import Framework7 from 'framework7/lite'
import Framework7Vue from 'framework7-vue'
import '../../node_modules/framework7/framework7-bundle.min.css'

const app = createApp(App)
Framework7.use(Framework7Vue)

app.mount('#app')
