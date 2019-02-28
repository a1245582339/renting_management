'use strict';

const Service = require('egg').Service;
class Order extends Service {
    async find(query) {
        const data = await this.app.knex('order')
            .select('order.*', 'student.name')
            .leftJoin('student', 'student.id', 'order.stu_id')
            .where({stu_id: query.stu_id})
            .orderBy('create_time', 'desc')
        return data
    }
    
    async update(id, data) {
        const update = await this.app.knex('order')
            .update(data)
            .where('id', id)
      return update === 1
    }
    async create(data) {
        const create = await this.app.knex
          .insert(data)
          .into('order')
        return create === 1
    }
}

module.exports = Order;