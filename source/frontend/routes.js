import OverviewPage from './components/pages/Overview.vue'
import LocalStoragePage from './components/pages/LocalStorage.vue'
import CollectionPage from './components/pages/Collection.vue'
import HelloWorldPage from './components/pages/HelloWorld.vue'
import MySQLAPIPage from './components/pages/MySQLAPI.vue'
import MySQLCollectionPage from './components/pages/MySQLCollection.vue'

export default [
  {
    path: '/',
    component: OverviewPage
  },
  {
    path: '/localStorage/',
    component: LocalStoragePage
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
  },
  {
    path: '/mysqlCollection/',
    component: MySQLCollectionPage
  }
]
