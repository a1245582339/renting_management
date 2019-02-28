'use strict';

const Service = require('egg').Service;
class Room extends Service {
    async find(query, page, limit) {
        const data = await this.app.knex('room')
            .select('*')
            .where('name', 'like', `%${query}%`)
            .where({ isDel: 0 })
            .leftJoin('community', 'room.community_id', 'community.id')
            .offset(page * limit)
            .limit(limit || 10)
        const total = (await this.app.knex('room')
                            .count('*')
                            .where('name', 'like', `%${query}%`)
                            .where({ isDel: 0 }))[0]["count(*)"]
        return { data, total }
    }

    async update(id, data) {
        const updateCal = await this.app.knex('room')
          .update(data)
          .where('id', id)
        return updateCal === 1
    }

    async create(data) {
        const updateCal = await this.app.knex.insert(data).into('room')
        return updateCal === 1
    }
}

module.exports = Room;