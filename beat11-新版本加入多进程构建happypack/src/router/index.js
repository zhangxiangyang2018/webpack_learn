import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",

      name: "HelloWorld",
      component: () => import("@/view/hi.vue")
    },
    {
      path: "/2",

      name: "HelloWorld",
      //路由按需加载
      component: () => import("@/view/2.vue")
    }
  ]
});
