<template>
  <div id="app">
    <transition :name="SkipSwitchName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="SkipSwitchName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
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
    return {
      SkipSwitchName: '',
    };
  },
  watch: {
    $route(to, from) {
      if(from.meta.tx == undefined) {
        return;
      }
      if (to.meta.tx > from.meta.tx) {
        this.SkipSwitchName = 'Skright';
      } else {
        this.SkipSwitchName = 'Skleft';
      }
    },
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
.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Sklef-leave-active {
  transition: all 300ms;
}

.Skright-enter {
  transform: translate3d(100%, 0, 0);
  
}
.Skright-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.Skleft-enter {
  transform: translate3d(-100%, 0, 0);
}
.Skleft-leave-to {
  transform: translate3d(100%, 0, 0);
  
}
</style>
