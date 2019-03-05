<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('no_more')"
            :loading-text="$t('loading')"
            @load="onLoad"
        >
            <van-cell v-for="(item, index) in list" :key="index" :title="`${item.room_name} （${item.status === 0 ? $t('order.status.pending') : $t('order.status.ordered')}）`" :label="$t('order.time') + timestampToDate(item.create_time)"  />
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
