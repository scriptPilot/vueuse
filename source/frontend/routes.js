import OverviewPage from './components/pages/Overview.vue'
import CollectionPage from './components/pages/Collection.vue'
import HelloWorldPage from './components/pages/HelloWorld.vue'
import MySQLAPIPage from './components/pages/MySQLAPI.vue'

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
  },
  {
    path: '/mysqlapi/',
    component: MySQLAPIPage
  }
]
