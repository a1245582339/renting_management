<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="(item, index) in list" :key="index" :title="`${item.room_name} （${item.status === 0 ? '待联系' : '已租'}）`" :label="'预约时间：' + timestampToDate(item.create_time)"  />
        </van-list>
    </div>
</template>
<script>
import { getOrder } from '@/api/order';
import { timestampToDate } from '@/utils/time';
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1
        }
    },
    methods: {
        async onLoad() {
            this.loading = true
            const res = await getOrder({ page: this.page, stu_id: this.$store.state.user.id })
            this.list.push(...res.data.data)
            if (res.data.data.length < 10) {
                this.finished = true
            }
            this.loading = false
            this.page++
        },
        timestampToDate(arg) {
            return timestampToDate(arg)
        }
    },

}
</script>
<style lang="scss" scoped>

</style>
