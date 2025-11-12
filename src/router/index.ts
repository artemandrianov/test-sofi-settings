import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import SearchPosition from '@/components/Position/SearchPosition.vue'
import Reactions from '@/components/Reactions/Reactions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/', 
      component: BaseLayout,
      children: [
        {
          path: 'positions',
          name: 'positions',
          component: SearchPosition
        },
        {
          path: 'reactions',
          name: 'reactions',
          component: Reactions
        },
        // {
        //   path: 'subscription',
        //   name: 'subscription',
        //   component: Subscription
        // },
        // {
        //   path: 'interview',
        //   name: 'interview',
        //   component: Interview
        // },
        // {
        //   path: 'vacancies',
        //   name: 'vacancies',
        //   component: Vacancies
        // },
        // {
        //   path: 'instruction',
        //   name: 'instruction',
        //   component: Instruction
        // },
        // {
        //   path: 'support',
        //   name: 'support',
        //   component: Support
        // },
      ]
    }
  ]
})

export default router