import http from './index';
const domain  = '/api/community';

export const getCommunity = params => {
    return http.get(`${domain}`, {params})
}

export const updateCommunity = (id, data) => {
    return http.post(`${domain}?id=${id}`, {data})
}

