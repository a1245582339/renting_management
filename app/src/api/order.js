import http from './index';
const domin  = '/api/order';

export const getOrder = params => {
    return http.get(`${domin}`, {params})
}

export const updateOrder = (params, data) => {
    return http.post(`${domin}?id=${params.id}&room_id=${params.room_id}`, {data})
}