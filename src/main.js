import Vue from "vue";
import App from "./App.vue";
import { ajax } from "./index";
// import { ajax } from '../../libs/axios';
// Vue.$httpRequestList = [];
import router from './libs/router';
import { baseUrl,  baseUrl2} from './libs/baseUrl';
// import touch from 'vue-directive-touch';
import VueTouch from 'vue-touch';
import mui from './libs/js/mui.js';
import Vconsole from 'vconsole';

console.log(process.env.VUE_APP_MOCK);
let useV = process.env.VUE_APP_MOCK;

if(useV) {
  const vConsole = new Vconsole();
  Vue.use(vConsole)
}

// import './libs/css/mui.css';
Vue.prototype.mui = mui;
Vue.use(VueTouch, { name: 'v-touch' })
// Vue.use(touch);
Vue.config.productionTip = false;

let env = process.env.NODE_ENV;
Vue.prototype.$baseUrl= (env === "development" ? '' : `${baseUrl}`);
Vue.prototype.$baseUrl2= (env === "development" ? '' : `${baseUrl2}`);

// Vue.directive('focusA', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })

new Vue({
  router,
  ajax,
  render: (h) => h(App),
}).$mount("#app");
