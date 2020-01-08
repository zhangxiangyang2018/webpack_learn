import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/styles/index.scss'
import service from '@/utils/request'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = service
require('./mock.js')
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
