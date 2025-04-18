import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import ShowDetailPage from '@/pages/ShowDetailsPage.vue'
import SearchPage from '@/pages/SearchPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/show/:id',
      name: 'show-detail',
      component: ShowDetailPage,
      props: true,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
    },

    // This route will cache all routes that are not defined in the routes
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
})

export default router
