'use strict';

const Service = require('egg').Service;
class Community extends Service {
    async find(query, page, limit) {
        const data = await this.app.knex('community')
            .select('id', 'name', 'area')
            .where('name', 'like', `%${query}%`)
            .where({ isDel: 0 })
            .offset(page * limit)
            .limit(limit || 10)
        const total = (await this.app.knex('community')
                            .count('*')
                            .where('name', 'like', `%${query}%`)
                            .where({ isDel: 0 }))[0]["count(*)"]
        return { data, total }
    }

    async update(id, data) {
        const updateCal = await this.app.knex('community')
          .update(data)
          .where('id', id)
        if (data.isDel) {
            await this.app.knex('room')
                .update(data)
                .where('community_id', id)
        }
        return updateCal === 1
    }

    async create(data) {
        const updateCal = await this.app.knex.insert(data).into('community')
        return updateCal === 1
    }
}

module.exports = Community;