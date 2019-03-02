'use strict';

const Controller = require('egg').Controller;
class Order extends Controller {
    async getOrder() {
        const ctx = this.ctx
        const {page} = ctx.request.query
        let query = ctx.request.query
        delete query.page
        const data = await ctx.service.order.find(page - 1, query)
        ctx.body = { code: 20000, data: data, msg: '订单' }
    }

    async updateOrder() {
        const ctx = this.ctx;
        const query = ctx.request.query
        const { data } = ctx.request.body;
        if (query.id && query.id !== 'undefined') {
            const item = await ctx.service.order.update(query, data)
            ctx.body = { code: 20000, msg: '更新成功' }
        } else {
            const exsit = await ctx.service.order.find(0, {stu_id: data.stu_id, room_id: data.room_id})
            if (exsit.length) {
                ctx.body = { code: 20006, msg: '已存在' }
            } else {
                await ctx.service.order.create({...data, status: 0, create_time: Date.now()})
            ctx.body = { code: 20000, msg: '新增成功' }
            }
            
        }
      }
}
module.exports = Order