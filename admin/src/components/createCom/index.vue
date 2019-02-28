<template>
    <Modal v-model="show" width="360" title="创建社区" @on-visible-change="showChange">
        <div>
            <Form ref="form" :model="form" :rules="rule">
                <FormItem prop="name">
                    <Input type="text" v-model="form.name" placeholder="请输入社区名称">
                        <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="area">
                    <Cascader :data="area" v-model="form.area"></Cascader>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Button type="primary" @click="submit">提交</Button>
        </div>
    </Modal>
</template>
<script>
import { updateCommunity } from '@/api/community';
import area from '@/json/area.json'
    export default {
        props: ['create_modal_show', 'data'],
        data() {
            const validateArea = (rule, value, callback) => {
                if (value.length === 2) {
                    callback();
                } else {
                    callback(new Error('请选择地区！'));
                }
            };
            return {
                show: false,
                form: {
                    id: '',
                    name: '',
                    area: []
                },
                area: area,
                rule: {
                    name: [
                        { required: true, message: '请输入大学名称！', trigger: 'blur' }
                    ],
                    area: [
                        { validator: validateArea, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            showChange(val) {
                if (val) {
                    this.form.name = this.data.name
                    this.form.id = this.data.id
                    this.form.area = [this.data.city.value, this.data.district.value]
                } else {
                    this.$emit('noshow')
                    this.$refs.form.resetFields();
                }
            },
            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const res = await updateCommunity(this.form.id, {name: this.form.name, area: this.form.area[1]})
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