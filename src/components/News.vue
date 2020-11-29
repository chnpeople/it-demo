<template>
  <div>
    <van-tabs v-model="active" class="my-style">
      <van-tab title="关注"></van-tab>
      <van-tab title="最新"></van-tab>
      <van-tab title="热板"></van-tab>
      <van-tab title="小米"></van-tab>
      <van-tab title="热评"></van-tab>
      <van-tab title="精读"></van-tab>
      <van-tab title="原创"></van-tab>
      <van-tab title="测评"></van-tab>
    </van-tabs>
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(item, index) in imagesList"
                      :key="index">
        <img :src="item.image"
             alt="">
      </van-swipe-item>
    </van-swipe>
    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <van-card @click="linkDetail(item)"
                  v-for="(item, index) in list"
                  :key="index"
                  currency=""
                  :price="item.orderdate | fotmatTime"
                  :num="item.commentcount | formatCom"
                  :title="item.title"
                  :thumb="item.image" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesList: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      active: 1,
      ot: '',
    };
  },
  filters: {
    formatCom(val) {
      return `${val}评`;
    },
    fotmatTime(val) {
      let hour = new Date(val).getHours();
      let min = new Date(val).getMinutes();
      if (min < 10) {
        min = '0' + min;
      }
      return `${hour}:${min}`;
    },
  },
  created() {
    this.querySwiper();
  },
  methods: {
    querySwiper() {
      this.$axios({
        methods: 'get',
        uri: `${this.$baseUrl}/json/slide/index`,
        successCallback: (res) => {
          let newRes = res.filter((item) => {
            return item.title.indexOf('红包') == -1;
          });
          this.imagesList = newRes;
        },
      });
    },
    onLoad() {
      this.$axios({
        methods: 'get',
        uri:
          this.list.length == 0
            ? `${this.$baseUrl}/json/newslist/news`
            : 'https://m.ithome.com/api/news/newslistpageget',
        params:
          this.list.length == 0
            ? {}
            : {
                Tag: '',
                ot: this.ot,
                page: 0,
                hitCountAuthority: false,
              },
        successCallback: (res) => {
          if (this.list.length == []) {
            this.list = res.newslist;
            let  timeS = new Date(res.newslist[res.newslist.length - 1].orderdate).getTime();
            this.ot = timeS;
          } else {
            let  timeS = new Date(res.Result[res.Result.length - 1].orderdate).getTime();
            this.ot = timeS;
            res.Result.forEach((item) => {
              this.list.push(item);
            });
          }

          // let newobj = {};
          // this.list = this.list.reduce((preVal, curVal) => {
          //   newobj[curVal.newsid] ? '' : (newobj[curVal.newsid] = preVal.push(curVal));
          //   return preVal;
          // }, []);

          this.list = this.list.filter((item) => {
            return !item.aid == 1;
          });
          console.log(this.ot);
          console.log(this.list);
          this.refreshing = false;
          this.loading = false;
        },
      });
    },
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.ot = '';
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

    linkDetail(item) {
      this.$router.push({
        path: '/detail',
        name: 'detail',
        query: { item: item },
      }); // 只能用 name
    },
  },
};
</script>

<style>
.my-swipe {
  margin-top: 1rem;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 21px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-card__price {
  color: white;
}

.van-card__price-integer {
  font-size: 1rem;
  color: #969799;
}

.van-card__thumb {
  width: 10rem;
  height: 7rem;
}

.van-card__content {
  min-height: 7.5rem;
  font-size: 1.2rem;
}

.van-card__title {
  font-weight: bold;
  max-height: 100%;
  line-height: 2rem;
}

</style>
