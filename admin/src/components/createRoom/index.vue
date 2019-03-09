<template>
    <Modal v-model="show" width="800" title="创建房间" @on-visible-change="showChange">
        <div>
            <Form ref="form" :model="form" :rules="rule">
                <FormItem prop="name">
                    <Input type="text" v-model="form.name" placeholder="请输入房间名称">
                        <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="desp">
                    <Input type="textarea" :rows="4" v-model="form.desp" placeholder="请输入简介">
                        <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="address">
                    <Input type="text" v-model="form.address" placeholder="请输入具体地址">
                        <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="tel">
                    <Input type="text" v-model="form.tel" placeholder="请输入手机号">
                        <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="price">
                    <Input type="text" v-model="form.price" placeholder="请输入月租价格">
                        <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="community_id">
                    <span v-if="form.community_id">
                        当前社区：{{communityIdToArea(data.area).city.label + communityIdToArea(data.area).district.label + data.community_name}}
                    </span>
                    <Select
                        v-model="form.community_id"
                        filterable
                        remote
                        :remote-method="debounce(searchCommunity, 300)"
                        :loading="loading">
                        <Option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                
            </Form>
            <div style="height: 300px" ref="div">
                
            </div>
        </div>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Button type="primary" @click="submit">提交</Button>
        </div>
    </Modal>
</template>
<script>
import { updateRoom } from '@/api/room';
import { getCommunity } from '@/api/community';
import area from '@/json/area.json'
import lodash from 'lodash';
import { communityIdToArea } from '@/utils/area';
import BMap from 'BMap'
    export default {
        props: ['create_modal_show', 'data'],
        data() {
            const vm = this
            const validateCommunity = (rule, value, callback) => {
                if (value || this.form.community_id) {
                    callback();
                } else {
                    callback(new Error('请选择社区！'));
                }
            };
            return {
                loading: false,
                show: false,
                map: {},
                center: [117.286371, 39.069145],
                form: {
                    id: '',
                    name: '',
                    desp: '',
                    address: '',
                    tel: '',
                    community_id: '',
                    price: '',
                    latitude: '',
                    longitude: ''
                },
                address: '',
                area: area,
                options: [],
                rule: {
                    name: [
                        { required: true, message: '请输入房间名称！', trigger: 'blur' }
                    ],
                    desp: [
                        { required: true, message: '请输入简介！', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入具体地址！', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入联系人手机号！', trigger: 'blur' }
                    ],
                    community_id: [
                        { validator: validateCommunity, trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请选择填写月租价格！', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            showChange(val) {
                if (val) {
                    // console.log(this.data)
                    this.form = this.data
                    this.center = [this.data.longitude || -0.143934, this.data.latitude || 51.495379]
                    this.$nextTick(() => {
                        this.createMap()
                    })
                    
                } else {
                    this.$emit('noshow')
                    this.$refs.form.resetFields();
                }
            },
            createMap() {
                const vm = this
                const div = this.$refs.div
                vm.map = new BMap.Map(div)
                vm.map.centerAndZoom(new BMap.Point(vm.center[0], vm.center[1]), 6)
                var marker = new BMap.Marker(new BMap.Point(vm.center[0], vm.center[1]));
                vm.map.addOverlay(marker);            //增加点
                vm.map.enableScrollWheelZoom(true);
                vm.map.addEventListener("click",function(e){
                    console.log(e)
                    vm.map.clearOverlays();       
                    marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
                    vm.map.addOverlay(marker);
                    vm.form.longitude = e.point.lng
                    vm.form.latitude = e.point.lat
                });
            },
            async searchCommunity(query) {
                if (query) {
                    this.loading = true
                    const res = await getCommunity({
                        name: query,
                        limit: 99999
                    })
                    this.options = res.data.data.map(item => {
                        let district
                        const city = area.find(city => {
                            const dis = city.children.find(dis => {
                                return dis.value === item.area
                            })
                            if (dis) {
                                district = dis
                                return true
                            } else {
                                return false
                            }
                        })
                        return {
                            value: item.id + '',
                            label: `${city.label} ${district.label} ${item.name}`
                        }
                    })
                    setTimeout(() => {
                        this.loading = false
                    }, 200)
                } else {
                    this.options = []
                }
            },
            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const {name, desp, address, tel, community_id, price, longitude, latitude} = this.form
                        const res = await updateRoom(this.form.id, {name, desp, address, tel, community_id, price, longitude, latitude})
                        if (res.data.code === 20000) {
                            this.$Message.success('更新成功！');
                            this.show = false
                            this.$emit('refresh')
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    } else {
                        return false
                    }
                })
            },
            cancel() {
                this.$emit('noshow')
            },
            debounce(fun, time) {
                return lodash.debounce(fun, time)
            },
            communityIdToArea(id) {
                return communityIdToArea(id)
            }
        },
        watch: {
            create_modal_show: {
                handler: function (val1, val2) {
                    if (this.show !== val1) {
                        this.show = val1
                    }
                },
                immediate: true
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>