<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import home from './views/home'

export default {
  name: 'App',
  // components: {
  //     home
  // },
  data() {
    return {};
  },
  created() {
    this.mui.plusReady(function () {
      // eslint-disable-next-line no-undef
    plus.navigator.setStatusBarBackground('#fff');
    // eslint-disable-next-line no-undef
    plus.navigator.setStatusBarStyle('dark');
    });
    
  },
};
</script>

<style>
</style>
