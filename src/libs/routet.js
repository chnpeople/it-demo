import Vue from "vue";
import VueRouter from "vue-router";
import { clearHttpRequestingList } from "../libs/axios";
Vue.use(VueRouter);


const routes = [
 
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  clearHttpRequestingList();
  next();
});

export default router;
