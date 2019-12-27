module.exports = {
  // 配置预置环境
  presets: [
    // 使用的规则
    [
      "@babel/preset-env",
      {
        // 这儿有false, entry, usage三个可选参数，usage可以按需引入polyfill
        useBuiltIns: "usage",
        // 指定corejs版本
        corejs: 2
      }
    ]
  ],
  plugins: [
    // 添加这个 --  配置路由懒加载
    //  //  例如  {
    //   path: '/Home',
    //   component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
    //   // component: Home
    // }
    "@babel/plugin-syntax-dynamic-import"
  ]
};
