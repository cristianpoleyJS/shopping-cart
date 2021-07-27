import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: ':code',
        name: 'Product Details',
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "product-details" */ '@/components/products/ProductDetails.vue')
      }]
  },
  // Regexp for URL 404: https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
  {
    path: '/:pathMatch(.*)*',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
