<template>

  <div class="sidebar-container">
  
    <el-menu
            :default-active="defActive"
            class="el-menu-vertical-demo"
            @select="handleMenuSelect"
          >
          <div class="user-panel">
                <div class="pull-left image">
                    <img src="/static/img/headicon.png" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
	                 	<p>admin</p>
                </div>
            </div>
            <sidebarItem v-for="(item, n) in menuList" :item="item" :navIndex="String(n)" :key="n"></sidebarItem>
          </el-menu>
  </div>
</template>
<script>
import $ from "jquery";
import sidebarItem from "./SidebarItem";
export default {
  data() {
    return {
      defActive:'/system/user',
      menuList: [
        {
          path: "/system/user",
          name: "用户管理",
          icon: "el-icon-user",
        },
        {
          path: "/system/role",
          name: "角色管理",
          icon: "el-icon-notebook-1",
        },
        {
          path: "/system/resource",
          name: "资源管理",
          icon: "el-icon-notebook-1",
        },
        {
          path: "/system/logs",
          name: "日志管理",
          icon: "el-icon-notebook-1",
        },
      ]
    };
  },
  components: {
    sidebarItem
  },
  computed: {
   
  },
  methods: {
       handleMenuSelect(val) {
         console.log("TCL: handleMenuSelect -> val", val)
         this.$router.push({ path: val })
      },
  }
};
</script>

<style lang="scss" scoped>
.sidebar-container{
  width: 200px;
  border-right: 1px solid #ebeef5;
  height: 100%;
  box-sizing: border-box;
  .user-panel {
    position: relative;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    .pull-left {
        float: left!important;
        .img-circle {
          width: 42px;
        }
    }
    .info {
        padding: 5px 5px 5px 15px;
        line-height: 1;
        position: absolute;
        left: 55px;
    }
    .fa {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}
    .el-menu-vertical-demo {
      border-right: none;
      .m-menu-item {
        border-top: 1px solid #eee;
        &:last-child {
          border-bottom: 1px solid #eee;
        }
      }
      /deep/.is-active {
        color: #1e9aab;
      }
      /deep/.el-menu-item {
        min-width: 100px;
      }
    }
}
</style>