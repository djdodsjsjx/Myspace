import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserListView from '../views/UserListView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserListView
  },
  {
    path: '/userprofile/:userId/',  // 通过userId访问
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404/",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes 
})

export default router
