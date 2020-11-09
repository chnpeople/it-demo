<template>
<div>
    <van-tabs v-model="active">
        <van-tab title="关注"></van-tab>
        <van-tab title="最新"></van-tab>
        <van-tab title="热板"></van-tab>
        <van-tab title="小米"></van-tab>
        <van-tab title="热评"></van-tab>
        <van-tab title="精读"></van-tab>
        <van-tab title="原创"></van-tab>
        <van-tab title="测评"></van-tab>
    </van-tabs>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in imagesList" :key="index">
            <img :src="item.image" alt="">
        </van-swipe-item>
    </van-swipe>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-card v-for="(item, index) in list" :key="index" currency="" :price="item.orderdate | fotmatTime" :num="item.commentcount" :desc="item.description" :title="item.title" :thumb="item.image" />
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
        };
    },
    filters: {
        fotmatTime(val) {
            let hour = new Date(val).getHours();
            let min = new Date(val).getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            return `${hour}:${min}`
        }
    },
    created() {
        this.queryNews();
        this.querySwiper();
    },
    methods: {
        queryNews() {

        },
        querySwiper() {
            this.$axios({
                methods: 'get',
                uri: '/json/slide/index',
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
                uri: 'json/newslist/news',
                // uri: '/news/newslistpageget',
                // params: {
                //     Tag: '',
                //     ot: new Date().getTime(),
                //     page: 0,
                //     hitCountAuthority: false
                // },
                successCallback: (res) => {
                    console.log(res);
                    this.list = res.newslist;
                    this.refreshing = false;

                },
            });
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
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
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

.van-card__price {
    color: white;
}

.van-card__price-integer {
    font-size: 12px;
    color: #969799;
}
</style>
