<template>
  <div class="login">
    <span class="title">登录</span>
    <van-cell-group class="form">
      <van-field v-model="form.id" required clearable label="学号" placeholder="请输入学号"
        />

      <van-field v-model="form.password" type="password" label="密码" placeholder="请输入密码" required  right-icon="question-o" @click-right-icon="$toast('默认为111111')"  />
    </van-cell-group>
    <div style="padding:20px 10px">
      <van-button type="info" size="large" @click="login">登录</van-button>
    </div>
    
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import { login } from '@/api/user'
  import { setToken } from '@/utils/auth'

  export default {
    name: 'home',
    data() {
      return {
        form: {
          id: '',
          password: ''
        }
      }
    },
    methods: {
      async login() {
        if (this.form.id && this.form.password) {
          const res = await login(this.form)
          if (res.data.code === 20000) {
            setToken(res.data.token)
            this.$router.push('/main')
          } else {
            Toast.fail('用户名或密码错误！');
          }
        } else {
          Toast.fail('请输入用户名密码！');
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
.login {
  .title {
    display: block;
    font-weight: 400;
    font-size: 14px;
    color: rgba(69,90,100,.6);
    padding: 20px 15px 10px;
  }
}
</style>
