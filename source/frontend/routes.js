import OverviewPage from './components/pages/Overview.vue'
import CollectionPage from './components/pages/Collection.vue'
import HelloWorldPage from './components/pages/HelloWorld.vue'

export default [
  {
    path: '/',
    component: OverviewPage
  },
  {
    path: '/collection/',
    component: CollectionPage
  },
  {
    path: '/helloWorld/',
    component: HelloWorldPage
  }
]
