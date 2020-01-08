<template>
  <div>
    <el-button type="primary" @click="test">测试11aa</el-button>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  mounted() {},
  data() {
    return {};
  },
  methods: {
    //执行佛如寻循环里面对应掉接口
    test() {
      new Promise((resolve, reject) => {
        resolve(this.request());
      });
    },

    request() {
      setTimeout(() => {
        console.log(3);
        // return 3;
      }, 3000);
    }
  }
};
</script>
