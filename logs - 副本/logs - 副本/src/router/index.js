import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
import Layout from '@/layout'
export default new Router({
  routes: [
    {
      path: "/",

      name: "HelloWorld",
      redirect:"/system/logs",
      component: () => import('@/view/systemManage/logs/logs.vue') 
    },
    // {
    //   path: "/2",

    //   name: "HelloWorld",
    //   //路由按需加载
    //   component: () => import("@/view/2.vue")
    // },
    {
      path: '/system',
      component: Layout,
      children: [
        //  {
        //     path: 'user',
        //     component: () => import('@/view/systemManage/user/user.vue') 
        //   },
        //   {
        //     path: 'role',
        //     component: () => import('@/view/hi.vue') 
        //   },
        //   {
        //     path: 'resource',
        //     component: () => import('@/view/hi.vue') 
        //   },
          {
            path: 'logs',
            component: () => import('@/view/systemManage/logs/logs.vue') 
          },
        ]
    }
  ]
});
