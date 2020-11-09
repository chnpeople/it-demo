import Vue from 'vue';
import { ajax } from './libs/axios';
Vue.$httpRequestList = [];
import Vant from 'vant';
import 'vant/lib/index.css';
require('./assets/css/default.css')
Vue.use(Vant);
export { ajax }