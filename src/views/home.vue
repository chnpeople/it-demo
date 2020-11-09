<template>
<div style="background-color: white;">
    <div class="head">
        <a href="" class="my-logo"></a>
        <div class="my-search">
            <van-icon class="my-icon" size="2rem" name="search" />
            <input class="my-ipt" type="text" placeholder="搜索">
        </div>
        <div class="my-plush">
            <van-icon name="plus" size="2rem" />
        </div>
    </div>
    <News style="height: 100%" v-if="active == 0" />
    <van-tabbar v-model="active" active-color="#d22222" inactive-color="#000">
        <van-tabbar-item icon="home-o">资讯</van-tabbar-item>
        <van-tabbar-item icon="search">发现</van-tabbar-item>
        <van-tabbar-item icon="friends-o">圈子</van-tabbar-item>
        <van-tabbar-item icon="contact">我</van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
export default {
    components: {
        News: () => import('../components/News'),
    },
    data() {
        return {
            active: 0,
        };
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
</style>
