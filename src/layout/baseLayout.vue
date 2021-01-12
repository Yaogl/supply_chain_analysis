<template>
  <a-layout :style="{ minHeight: '100vh' }">
    <global-header />
    <!-- layout content -->
    <a-layout-content class="layout-content">
      <transition name="page-transition">
        <router-view />
      </transition>
    </a-layout-content>

    <!-- layout footer -->
    <a-layout-footer>
      <global-footer />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import GlobalHeader from "./components/globalHeader";
import GlobalFooter from "./components/globalFooter";

export default {
  name: "BasicLayout",
  components: {
    GlobalHeader,
    GlobalFooter,
  }
};
</script>

<style lang="less" scoped>
.layout-content{
  padding-top: 60px;
  min-height: calc(100vh - 120px);
  background: #ECEEF3;
}
.ant-layout-footer{
  padding: 0;
}
</style>
