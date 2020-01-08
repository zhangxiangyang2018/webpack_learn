<template>
  <div class="topfunction">
    <!-- <img :src="src" alt /> -->
  </div>
</template>

<script>
export default {
  name: "topfunction",
  data() {
    return {
      // src: require("@/assets/img/top.png")
    };
  }
};
</script>

<style lang='scss' scoped>
.topfunction {
  width: calc(100vw - 30px);

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>