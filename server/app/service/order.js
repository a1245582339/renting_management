'use strict';

const Service = require('egg').Service;
class Order extends Service {
    async find(page, query) {
        const data = await this.app.knex('order')
            .select('order.*', 'student.name as stu_name', 'room.id as room_id', 'room.name as room_name', 'student.tel')
            .leftJoin('student', 'student.id', 'order.stu_id')
            .leftJoin('room', 'room.id', 'order.room_id')
            .where({...query, 'order.isDel': 0})
            .limit(10)
            .offset(page * 10)
            .orderBy('create_time', 'desc')
        return data
    }
    
    async update(query, data) {
        let update
        if (data.status === 1) {
            await this.app.knex('room')
                .update({isDel: 1})
                .where('id', query.room_id)
            await this.app.knex('order')
                .update({isDel: 1})
                .where('room_id', query.room_id)
            update = await this.app.knex('order')
                .update({...data, isDel: 0})
                .where('id', query.id)

        } else {
            update = await this.app.knex('order')
                .update(data)
                .where({id: query.id})
        }
        
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