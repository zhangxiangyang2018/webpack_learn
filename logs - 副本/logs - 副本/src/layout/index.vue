<template>
  <div class="app-wrapper">
      <!-- <navbar /> -->
      <!-- <Sidebar class="sidebar"/> -->
      <div class="main-container">
        <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
        <app-main />
      </div>

      <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";

export default {
  data() {
    return {
      menuList: [
      ]
    };
  },
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* background-color: #04142a;*/
  .el-scrollbar__wrap {
    background: rgb(233, 236, 242);
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.sidebar{
  position: fixed;
  top: 60px;
  left: 0;
}
.main-container {
  position: absolute;
  left:0px;
  right: 0px;
  height: 100%;
  padding: 40px;
  width: 100%;
  background: #ecf0f5;
  box-sizing: border-box;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

</style>
