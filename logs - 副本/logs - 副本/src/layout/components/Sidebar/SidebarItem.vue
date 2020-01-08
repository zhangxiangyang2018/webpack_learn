<template>
  <el-submenu class="m-menu-item" v-if="item.menuList && item.menuList.length" :index="navIndex">
    <!-- <i class="el-icon-location"></i> -->
    <template slot="title">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.name }}</span>
    </template>

    <nav-item
      v-for="(subItem,i) in item.menuList"
      :key="navIndex+'-'+i"
      :navIndex="navIndex+'-'+i"
      :item="subItem"
    ></nav-item>
  </el-submenu>

  <el-menu-item class="m-menu-item" v-else :index="item.path">
    <!-- <i :class="item.icon"></i> -->
    <template slot="title">
      <i :class="item.icon"></i>
      <span slot="title">{{ item.name }}</span>
    </template>
  </el-menu-item>
</template>
<script>
export default {
  // 递归组件必须有name
  name: 'navItem',
  props: ['item', 'navIndex'],
}
</script>
<style lang="scss" *>
</style>