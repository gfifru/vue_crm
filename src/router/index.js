import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('@/views/Register')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Categories')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Record')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Profile')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/Planning')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/History')
  },
  {
    path: '/record/:id',
    name: 'detail-record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/DetailRecord')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
