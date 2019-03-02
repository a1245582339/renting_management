import http from './index';
const domain  = '/api/room';

export const getRoom = params => {
    return http.get(`${domain}`, {params})
}

export const updateRoom = (room_id, data) => {
    return http.post(`${domain}?id=${room_id}`, {data})
}