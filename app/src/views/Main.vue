<template>
  <div>
    <div>
      <router-view />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="room">房屋信息</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="order">我的预约</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="me">个人信息</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user';
export default {
  data() {
    return {
      active: 0,
    }
  },
  async created() {
    const res = await getUserInfo()
    this.$store.commit('setUser', res.data.res[0])
  }
}
</script>
<style lang="scss" scoped>

</style>

