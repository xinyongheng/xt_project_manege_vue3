import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../page/Homepage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    // component: HomeView,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: HomeView },
      // { path: 'createUser', name: 'createUser', component: () => import("../views/CreateUserView.vue") },
      // { path: 'changePassword', name: 'changePassword', component: () => import("../views/ChangePasswordView.vue") },
    ]
  },
  { path: '/info', name: 'projectInfo', component: () => import("../page/ProjectInfo.vue") },
  { path: '/create', name: 'createProject', component: () => import("../page/ProjectInfo.vue") },
  {
    path: '/login',
    name: 'login',
    component: () => import('../page/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  next();
});
export default router
