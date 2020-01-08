<template>
  <div class="navbar">
    <el-row type="flex" justify="space-between" style="height:60px;background:green">
      <el-col :span="9" class="logoclass" :offset="1">
        <!-- <img :src="bglogo" alt class="bglogo" /> -->
        <span>业务调度系统管理</span>
      </el-col>
      <el-col :span="1" class="logoclass" >
        <span style="display: inline-block;font-size:14px">注销</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // bgsrc: require("@/assets/img/topbg.png"),
      // bglogo: require("@/assets/img/logo.png")
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.navbar {
  background-size: cover;
  background-repeat: no-repeat;
  height: 60px;
  .logoclass {
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    span{
      font-size: 18px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
  .row-bg {
    padding: 0 14px 0 18px;
  }
  .item {
    display: inline-block;
    line-height: 50px;
    margin: 0 10px;
    color: #fff;
    font-size: 13px;
  }
  .el-button {
  
    color: #fff;
  }
  .Picloading {
    color: #fff;
    height: 100%;
    line-height: 50px;
  }
}
</style>
