import {createRouter, createWebHistory} from 'vue-router';
import routes from '~pages';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: any, from, next) => {
  next();
});

export default router;
