<template>
    <div style="width: 90%">
        <h1>
            订单管理
        </h1>
        <Table style="margin-top: 20px" :loading="loading" :columns="columns" :data="data"></Table>
        <Page style="margin-top: 20px" :total="total" @on-change="pageChange" />
    </div>
</template>
<script>
    import {
        getOrder,
        updateOrder
    } from '@/api/order';
    import area from '@/json/area.json'
    export default {
        components: {
        },
        data() {
            return {
                columns: [{
                        title: '订单编号',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '房间名称',
                        key: 'room_name',
                    },
                    {
                        title: '学生姓名',
                        key: 'stu_name',
                        width: 200
                    },
                    {
                        title: '预约人手机号',
                        key: 'tel',
                        width: 200
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: `确定出租给${(params.row.stu_name)}？`
                                    },
                                    style: {
                                        marginRight: '5px',
                                        textAlign: 'left'
                                    },
                                    on: {
                                        'on-ok': async () => {
                                            await updateOrder({id: params.row.id, room_id: params.row.room_id}, {
                                                status: 1
                                            })
                                            this.$Message.success('成功！');
                                            this.fetchData()
                                        }
                                    }
                                }, [h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.status === 1
                                    }
                                }, params.row.status === 1 ? '已出租' : '出租')]),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: "确定删除？",
                                    },
                                    style: {
                                        textAlign: 'left'
                                    },
                                    on: {
                                        'on-ok': async () => {
                                            await updateOrder({id: params.row.id}, {
                                                isDel: 1
                                            })
                                            this.$Message.success('删除成功！');
                                            this.fetchData()
                                        }
                                    }
                                }, [h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    }
                                }, '删除')])
                            ]);

                        }
                    }
                ],
                data: [],
                page: 1,
                loading: true,
                total: 0,
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            async fetchData() {
                
                this.loading = true
                const {
                    search_word,
                    page
                } = this
                const res = await getOrder({
                    page
                })
                this.data = res.data.data
                this.total = res.data.total
                setTimeout(() => {
                    this.loading = false
                }, 300)
            },
            pageChange(page) {
                this.page = page
                this.fetchData()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>