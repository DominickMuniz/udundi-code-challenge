import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import HomePageKeyframes from '@/views/HomePageKeyFrames.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/keyframes',
    name: 'Keyframes',
    component: HomePageKeyframes,
  },
]

export default createRouter({
  history: createWebHistory('/udundi-code-challenge/'),
  routes,
})
