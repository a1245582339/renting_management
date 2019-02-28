<template>
    <div style="width: 90%">
        <h1>
            社区管理
        </h1>
        <div style="margin-top: 20px;">
            <Input style="width: 300px; float: left" v-model="search_word" search enter-button placeholder="请输入关键字"
                @on-search="fetchData" />
            <Button style="float: right" type="primary" @click="modalNoshow">新建</Button>
            <div style="clear: both"></div>
        </div>
        <Table style="margin-top: 20px" :loading="loading" :columns="columns" :data="data"></Table>
        <Page style="margin-top: 20px" :total="total" @on-change="pageChange" />
        <create-com :data="row" :create_modal_show="create_modal_show" @noshow="modalNoshow" @refresh="fetchData" />
    </div>
</template>
<script>
    import {
        getCommunity,
        updateCommunity
    } from '@/api/community';
    import createCom from '@/components/createCom';
    import area from '@/json/area.json'
    export default {
        components: {
            createCom
        },
        data() {
            return {
                columns: [{
                        title: 'ID',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '省/市',
                        key: 'city',
                        render: (h, params) => {
                            return (
                                <span>{params.row.city.label}</span>
                            )
                        },
                        filters: area,
                        filterMethod (value, row) {
                            return row.city.value === value
                        },
                        width: 100
                    },
                    {
                        title: '区/县',
                        key: 'district',
                        render: (h, params) => {
                            return (
                                <span>{params.row.district.label}</span>
                            )
                        },
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.row = params.row
                                            this.modalNoshow()
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: "确定删除？"
                                    },
                                    style: {
                                        textAlign: 'left'
                                    },
                                    on: {
                                        'on-ok': async () => {
                                            await updateCommunity(params.row.id, {
                                                isDel: 1
                                            })
                                            this.$Message.success('删除成功！');
                                            this.fetchData()
                                        }
                                    }
                                }, [h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    }
                                }, '删除')])
                            ]);

                        }
                    }
                ],
                data: [],
                page: 1,
                loading: true,
                search_word: '',
                total: 0,
                create_modal_show: false,
                row: {
                    name: '',
                    district: {
                        value: ''
                    },
                    city: {
                        value: ''
                    }
                }
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
                const res = await getCommunity({
                    name: search_word,
                    page
                })
                this.data = res.data.data.map(item => {
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
                        ...item,
                        city,
                        district
                    }
                })
                this.total = res.data.total
                setTimeout(() => {
                    this.loading = false
                }, 300)
            },
            modalNoshow() {
                if (this.create_modal_show) {
                    this.row = {
                        name: '',
                        district: {
                            value: ''
                        },
                        city: {
                            value: ''
                        }
                    }
                }
                this.create_modal_show = !this.create_modal_show
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