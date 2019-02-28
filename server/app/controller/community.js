'use strict';

const Controller = require('egg').Controller;

class Community extends Controller {
    async getCommunity() {
        const ctx = this.ctx;
        const {name} = ctx.request.query
        const page = ctx.request.query.page - 1 || 0
        const limit = ctx.request.query.limit || 10
        const data = await ctx.service.community.find(name, page, limit)
        this.ctx.body = { code: 20000, msg: '社区列表', ...data }
    }

    async updateCommunity() {
        const ctx = this.ctx;
        const id = ctx.request.query.id
        const data = ctx.request.body.data
        if (id !== '' && id !== 'undefined') {
            await ctx.service.community.update(id, data)
        } else {
            await ctx.service.community.create(data)
        }
        this.ctx.body = { code: 20000, msg: '更新成功' }
    }

}

module.exports = Community