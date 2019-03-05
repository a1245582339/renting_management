<template>
  <div class="login">
    <span class="title">{{$t("login.title")}}</span>
    <van-cell-group class="form">
      <van-field v-model="form.id" required clearable :label="$t('user.id')" :placeholder="$t('login.label.id')"
        />

      <van-field v-model="form.password" type="password" :label="$t('user.password')" :placeholder="$t('login.label.password')" required  />
    </van-cell-group>
    <div style="padding:20px 10px">
      <van-button type="info" size="large" @click="login">{{$t("login.title")}}</van-button>
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
            Toast.fail(this.$t('login.fail.error'));
          }
        } else {
          Toast.fail(this.$t('login.fail.empty'));
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
