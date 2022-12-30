import IndexPage from './components/Index.vue'
import CollectionPage from './components/Collection.vue'
import GoogleAuthPage from './components/GoogleAuth.vue'
import LocalStoragePage from './components/LocalStorage.vue'
import MySQLAPIPage from './components/MySQLAPI.vue'
import MySQLCollectionPage from './components/MySQLCollection.vue'
import TypePage from './components/Type.vue'

export default [
  {
    path: '/',
    redirect: ({ resolve, to }) => {
      if (to.query.code) {
        resolve('/googleAuth/')
      } else {
        resolve('/index/')
      }
    }
  },
  {
    path: '/index/',
    component: IndexPage
  },
  {
    path: '/collection/',
    component: CollectionPage
  },
  {
    path: '/googleAuth/',
    component: GoogleAuthPage
  },
  {
    path: '/localStorage/',
    component: LocalStoragePage
  },
  {
    path: '/mysqlapi/',
    component: MySQLAPIPage
  },
  {
    path: '/mysqlCollection/',
    component: MySQLCollectionPage
  },
  {
    path: '/type/',
    component: TypePage
  }
]
