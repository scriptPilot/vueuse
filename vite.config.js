import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { camelCase } from 'camel-case'

function Framework7Resolver(componentName) {
  if (componentName.match(/^(f7-|F7)/)) {
    componentName = camelCase(componentName)
    return { name: componentName, from: 'framework7-vue' }
  }
}


export default {
  root: './source/frontend',
  server: {
    open: true
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'framework7-vue': [
            'f7',
            'f7Ready',
            'f7route',
            'f7router'
          ]
        }
      ]
    }),
    Components({
      resolvers: [Framework7Resolver],
    })
  ]
}

