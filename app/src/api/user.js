import http from './index';
const domain  = '/api/student';

export const login = user => {
    return http.post(`${domain}/login`, user)
}

export const getUserInfo = token => {
    return http.get(`${domain}/info`)
}

export const updateUserInfo = (id, data) => {
    return http.post(`${domain}?id=${id}`, {data})
}


export const checkPassword = params => {
    return http.get(`${domain}/password`, {params})
}