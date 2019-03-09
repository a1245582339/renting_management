<template>
    <div>
        <van-search :placeholder="$t('search_label')" v-model="search_word" />
        <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="$t('no_more')"
            :loading-text="$t('loading')"
            @load="onLoad"
        >
            <van-cell v-for="(item, index) in list" :key="index" :to="{name: 'detail', query: item}" :title="item.name" is-link :label="communityIdToArea(item.area).city.label + communityIdToArea(item.area).district.label + item.community_name" />
        </van-list>
    </div>
</template>
<script>
import { getRoom } from '@/api/room';
import { communityIdToArea } from '@/utils/area';
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            search_word: '',
            page: 1
        }
    },
    methods: {
        async onLoad() {
            this.loading = true
            const res = await getRoom({ page: this.page, name: this.search_word })
            this.list.push(...res.data.data)
            if (res.data.data.length < 10) {
                this.finished = true
            }
            this.loading = false
            this.page++
        },
        communityIdToArea(arg) {
            return communityIdToArea(arg)
        }
    },

}
</script>
<style lang="scss" scoped>

</style>
