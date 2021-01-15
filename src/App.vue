<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view/>  
    </a-locale-provider>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  data() {
    return {
      locale: zhCN
    }
  },
  created() {
    // var s;
    // function resize() {
    //   s = window.screen.width / 1920;
    //   document.body.style.zoom = s;
    // }
    // window.onresize = function () {
    //   resize();
    // }
    // resize();
  }
}
</script>

<style lang="less">

</style>
