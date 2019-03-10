<template>
  <div>
    <div>
      <router-view style="padding-bottom: 100px"/>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="room">{{$t("tab.room")}}</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="order">{{$t("tab.order")}}</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="me">{{$t("tab.user")}}</van-tabbar-item>
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

