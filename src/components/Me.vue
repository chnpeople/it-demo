<template>
  <div>
    <div v-if="loginOrReg == 1">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button size="small" round block type="info" native-type="submit"
            >登录</van-button
          >
          <br />
          <br />
          <van-button
            @click="onRegister"
            size="small"
            round
            block
            type="primary"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>

    <div v-if="loginOrReg == 2">
      <van-form @submit="onSubmit2">
        <van-field
          v-model="username"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button size="small" round block type="info" native-type="submit2"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loginOrReg: 1
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    onRegister() {
        this.loginOrReg = 2;
    },
    onSubmit2(values) {
      console.log('submit', values);
      this.$axios({
        methods: 'post',
        uri: `${this.$baseUrl2}user/register`,
        data: {
          username: values.name,
          password: values.password,
        },
        successCallback: (res) => {
          console.log(res);
        },
      });
    },
  },
};
</script>

<style></style>
