<template>
  <div style="background-color: white;">
    <div class="head">
      <a href=""
         class="my-logo"></a>
      <div class="my-search">
        <van-icon class="my-icon"
                  size="2rem"
                  name="search" />
        <input class="my-ipt"
               type="text"
               placeholder="搜索">
      </div>
      <div class="my-plush">
        <van-icon name="plus"
                  size="2rem" />
      </div>
    </div>
    <News style="height: 100%; margin-bottom: 4rem"
          v-if="active == 0" />
    <van-tabbar v-model="active"
                active-color="#d22222"
                inactive-color="#000">
      <van-tabbar-item icon="home-o">资讯</van-tabbar-item>
      <van-tabbar-item icon="search">发现</van-tabbar-item>
      <van-tabbar-item icon="friends-o">圈子</van-tabbar-item>
      <van-tabbar-item icon="contact">我</van-tabbar-item>
    </van-tabbar>

    <van-overlay :show="show" />

    <van-overlay :show="downloadShow"
                 @click="show = false">
      <div class="wrapper"
           @click.stop>
        <van-circle v-model="currentRate"
                    :rate="rate"
                    color="#ee0a24"
                    layer-color="#fff"
                    :text="text" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import config from '../../package.json';
export default {
  components: {
    News: () => import('../components/News'),
  },
  created() {
    this.checkVersion();
  },
  data() {
    return {
      rate: '',
      currentRate: 0,
      downloadShow: false,
      active: 0,
      version: config.version,
      show: false,
      clickNum: 0,
    };
  },
  mounted() {},
  activated() {
    console.log('activated页面打开时触发');
    this.mui.plusReady(() => {
      var backcount = 0;
      this.mui.back = () => {
        if (this.mui.os.ios) return;
        if (backcount > 0) {
          // eslint-disable-next-line no-undef
          if (window.plus) plus.runtime.quit();
          return;
        }
        this.mui.toast('再点击一次退出应用!');
        backcount++;
        setTimeout(() => {
          backcount = 0;
        }, 2000);
      };
    });
  },
  computed: {
    text() {
      return this.currentRate + '%';
    },
  },
  methods: {
    checkVersion() {
      this.$axios({
        methods: 'get',
        uri: `${this.$baseUrl2}/version`,
        successCallback: (res) => {
          console.log(res.version);
          if (res.version != this.version) {
            this.show = true;
            this.$dialog
              .confirm({
                title: '版本更新',
                message: '是否下载最新版本',
              })
              .then(() => {
                this.download();
                this.show = false;
                this.downloadShow = true;
              })
              .catch(() => {
                this.show = false;
              });
          }
        },
      });
    },

    download() {
      // eslint-disable-next-line no-undef
      // var pushLoading = plus.nativeUI.showWaiting('下载更新中，请勿关闭');

      // eslint-disable-next-line no-undef
      var dtask = plus.downloader.createDownload(
        `http://www.tim007.xyz:8383/download`,
        {},
        (d, status) => {
          // 下载完成
          if (status == 200) {
            this.downloadShow = false;
            this.currentRate =  0;
            // pushLoading.close();
            // eslint-disable-next-line no-undef
            plus.runtime.openFile(d.filename); //直接打开APK文件 安装
          } else {
            this.downloadShow = false;
            this.currentRate =  0;
            // pushLoading.close();
            // eslint-disable-next-line no-undef
            plus.nativeUI.toast('更新失败');
          }
        }
      );
      dtask.start();

      dtask.addEventListener('statechanged',  task => {
        // 给下载任务设置一个监听 并根据状态  做操作
        let per = Number(task.downloadedSize / task.totalSize * 100).toFixed(0);
        this.currentRate = isNaN(per) ? 0 : per; 
      });
    },
  },
};
</script>

<style>
.head {
  position: relative;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
}

.my-logo {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0.5rem;
  width: 8.8rem;
  height: 4.4rem;
  background: url('../assets/logo.svg') center center no-repeat;
  background-size: 5.8rem 2.9rem;
}

.my-search {
  position: absolute;
  top: 1rem;
  left: 10.5rem;
  width: 21rem;
  height: 2.4rem;
  background-color: #f3f4f5;
  border-radius: 2.2rem;
  overflow: hidden;
}

.my-ipt {
  position: absolute;
  text-indent: 4rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f3f4f5;
  font-size: 1rem;
}

.my-icon {
  top: -0.1rem;
  left: -8rem;
  z-index: 2;
}

.my-plush {
  position: absolute;
  right: 1.8rem;
  top: 0.9rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.van-circle__text {
  color: #fff;
}
</style>
