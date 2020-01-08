<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view key="1" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {},
  components: {},
  methods: {}
};
</script>

<style scoped lang="scss" >

</style>
