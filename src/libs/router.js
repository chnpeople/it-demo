import Vue from "vue";
import VueRouter from "vue-router";
import { clearHttpRequestingList } from "./axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
    meta: {
      keepAlive: true,
      tx: 1
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/Detail.vue"),
    meta: {
      keepAlive: false,
      tx: 2
    },
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  clearHttpRequestingList();
  next();
});

export default router;
