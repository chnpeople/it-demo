<template>
  <v-touch @swiperight="onSwipeRight"
           class="v-touch">
    <div>
      <van-nav-bar title=""
                   left-arrow
                   @click-left="onClickLeft" />
      <div class="news" v-show="!showSkeleton">
        <h1 class="title">{{title}}</h1>

        <div class="author"
             v-if="isShowAuthor">
          <div>
            <van-image round
                       width="4rem"
                       height="4rem"
                       :src="authorObj.avatarurl" />
          </div>
          <div class="author-name">
            <p class="name">{{authorObj.accountname}}</p>
            <p class="time">{{time | formatTime}}</p>
          </div>
          <div class="focus">
            <van-button round
                        type="danger"
                        size="mini">+关注</van-button>
          </div>
        </div>
        
        <div class="author-s"
             v-if="isShowAuthorS">
          <span>{{time | formatTime}}</span>
          <span>&nbsp;&nbsp;{{authorName}}</span>
        </div>

        <div ref="content"
             class="content">
        </div>

        <div class="man">
          <span>责任编辑：</span>
          <span>{{man}}</span>
        </div>
      </div>
      <div v-show="showSkeleton" class="my-skeleton" ref="skeleton">
        <br>
        <br>
        <van-skeleton :row="2" />
        <br>
        <van-skeleton title avatar />
        <br>
        <br>
        <van-skeleton :row="5" />

      </div>
    </div>
  </v-touch>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.item.newsid || this.$route.query.item.link,
      title: this.$route.query.item.title,
      time: this.$route.query.item.orderdate || '',
      isShowAuthor: false,
      isShowAuthorS: false,
      authorObj: {},
      authorName: '',
      man: '',
      showSkeleton: true
    };
  },
  filters: {
    formatTime(val) {
      let year = new Date(val).getFullYear();
      let month = new Date(val).getMonth() + 1;
      let date = new Date(val).getDate();
      let hour = new Date(val).getHours();
      let min = new Date(val).getMinutes();
      if (min < 10) {
        min = '0' + min;
      }
      return `${year}-${month}-${date} ${hour}:${min}`;
    },
  },
  created() {
    this.queryDetail();
  },
  mounted() {
    this.mui.plusReady(() => {
      this.mui.back = () => {
        this.$router.go(-1);
      };
    });
    let mobileHeight=window.innerHeight;
    this.$refs.skeleton.style.height = (mobileHeight - 46) + 'px';
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    queryDetail() {
      this.$axios({
        methods: 'get',
        uri: `${this.$baseUrl}/json/newscontent/${this.id}`,
        successCallback: (res) => {
          console.log(res);
          if (res.itaccount != undefined) {
            this.isShowAuthor = true;
            this.authorObj = res.itaccount;
          } else {
            this.isShowAuthorS = true;
            this.authorName = `${res.newssource}(${res.newsauthor})`;
          }
          this.showSkeleton = false;
          this.man = res.z;
          let content = this.$refs.content;
          console.log(content);
          content.innerHTML = res.detail;
        },
      });
    },
    onSwipeRight() {
      this.$router.back(-1);
    },
  },
};
</script>

<style>
.news {
  padding: 0 2rem;
  overflow: hidden;
  background: #fff;
}
.title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.8;
  margin-top: 2.1rem;
  word-wrap: break-word;
  word-break: break-all;
  text-align: justify;
}
.author {
  display: flex;
  width: 100%;
  margin-top: 2rem;
}
.author-name {
  margin-left: 1rem;
  width: 10rem;
  height: 5rem;
}
.author-name .name {
  font-size: 1.5rem;
  font-weight: bold;
}
.author-name .time {
  font-size: 0.5rem;
}
.focus {
  position: absolute;
  right: 2rem;
}
.content {
  margin-top: 2rem;
}
.content p {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.author-s {
  margin-top: 1rem;
}
.man {
  margin-bottom: 2rem;
}

.v-touch {
  touch-action: pan-y !important;
}
.my-skeleton {
  background-color: #fff;
}
</style>
