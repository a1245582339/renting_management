<template>
    <div>
        <van-nav-bar
            :title="$t('detail.title')"
            :left-text="$t('detail.return')"
            :right-text="$t('detail.order')"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />
        <div class="amap-page-container">
            <el-amap
                style="height: 200px"
                vid="amapDemo"  
                :center="center"
                :zoom="16"  
                class="amap-demo"
            >
                <el-amap-marker vid="component-marker" :position="[lng, lat]" ></el-amap-marker>
            </el-amap>
        </div>
        <van-cell :title="$t('detail.name')" :label="room.name"/>
        <van-cell :title="$t('detail.desp')" :label="room.desp"/>
        <van-cell :title="$t('detail.area')" :label="communityIdToArea(room.area).city.label + communityIdToArea(room.area).district.label"/>
        <van-cell :title="$t('detail.community')" :label="room.community_name"/>
        <van-cell :title="$t('detail.address')" :label="room.address"/>
    </div>
    
</template>
<script>
import { communityIdToArea } from '@/utils/area';
import { Dialog, Toast } from 'vant';
import { updateOrder } from '@/api/order'

export default {
    data() {
        return {
            center: [this.$route.query.longitude, this.$route.query.latitude],
            lng: this.$route.query.longitude, 
            lat: this.$route.query.latitude,
            room: this.$route.query
        }
    },
    methods: {
        onClickLeft() {
            history.go(-1)
        },
        onClickRight() {
            Dialog.confirm({
                title: this.$t('detail.confirm.title'),
                message: this.$t('detail.confirm.msg'),
                "confirm-button-text": this.$t('confirm'),
                "cancel-button-text": this.$t('cancel')
            }).then(async () => {
                const res = await updateOrder({}, {
                    room_id: this.room.id,
                    stu_id: this.$store.state.user.id
                })
                if (res.data.code === 20000) {
                    Toast.success(this.$t('detail.confirm.success'));
                    setTimeout(() => {
                        history.go(-1)
                    }, 2000)
                } else {
                    Toast.fail(this.$t('detail.confirm.fail'));
                }
                
            }).catch(() => {
            // on cancel
            });
        },
        communityIdToArea(arg) {
            return communityIdToArea(arg)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
