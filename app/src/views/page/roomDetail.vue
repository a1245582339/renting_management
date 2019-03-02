<template>
    <div>
        <van-nav-bar
            title="房间详情"
            left-text="返回"
            right-text="预约"
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
        <van-cell title="标题" :label="room.name"/>
        <van-cell title="简介" :label="room.desp"/>
        <van-cell title="区域" :label="communityIdToArea(room.area).city.label + communityIdToArea(room.area).district.label"/>
        <van-cell title="小区" :label="room.community_name"/>
        <van-cell title="地址" :label="room.address"/>
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
                title: '确定预约此房间？',
                message: '预约后会有工作人员联系看房，请保持电话畅通'
            }).then(async () => {
                const res = await updateOrder({}, {
                    room_id: this.room.id,
                    stu_id: this.$store.state.user.id
                })
                if (res.data.code === 20000) {
                    Toast.success('预约成功！');
                    setTimeout(() => {
                        history.go(-1)
                    }, 2000)
                } else {
                    Toast.fail('已预约过此房间！');
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
