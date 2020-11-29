import Vue from "vue";
import VueRouter from "vue-router";
import { clearHttpRequestingList } from "../libs/axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/Detail.vue"),
    meta: {
      keepAlive: false,
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
