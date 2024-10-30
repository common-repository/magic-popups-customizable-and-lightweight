import { createRouter, createWebHashHistory } from 'vue-router'
import PopupEdit from '../views/PopupEdit.vue'
import Popups from './../views/Popups.vue'
import PopupCreate from './../views/PopupCreate.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      alias: '/popups',
      component: Popups,
    },
    {
      path: '/popups/:id',
      component: PopupEdit,
    },
    {
      path: '/create',
      component: PopupCreate,
    },
  ],
})

export default router
