let axios = require('axios')

let baseUrl = 'http://192.168.43.247'

export function login(params) {
     return axios.post(`${baseUrl}/login`, params, {headers: {'Content-Type': 'application/json'}})
}

export function register(params) {
    return axios.post(`${baseUrl}/register`,params, {headers: {'Content-Type': 'application/json'}})
}

export function postcomment(params) {
     return axios.post(`${baseUrl}/comment`, params, {headers: {'Content-Type': 'application/json'}})
}

export function getAriticle(id, type) {
    return axios.get(`${baseUrl}/ariticle?id=${id}&type=${type}`)
}

export function getLost(id, type) {
    return axios.get(`${baseUrl}/ariticle?id=${id}&type=${type}`)
}

export function getFound(id, type) {
    return axios.get(`${baseUrl}/ariticle?id=${id}&type=${type}`)
}

export function getChat(id, type) {
    return axios.get(`${baseUrl}/ariticle?id=${id}&type=${type}`)
}

export function getComment(id) {
    return axios.get(`${baseUrl}/comment/${id}`)
}

export function likeAriticle(params) {
    return axios.put(`${baseUrl}/ariticle/like/${id}`,params, {headers: {'Content-Type': 'application/json'}})
}

// 文章关注
export function ariticleFocus(params) {
     return axios.post(`${baseUrl}/ariticleFocus`, params, {headers: {'Content-Type': 'application/json'}})
}

// 作者关注
export function userFocus(params) {
     return axios.post(`${baseUrl}/userFocus`, params, {headers: {'Content-Type': 'application/json'}})
}

// 获取作者
export function getAuthor(id) {
    return axios.get(`${baseUrl}/user/${id}`)
}

// 获取关注文章
export function getAriticleFocus(username) {
    return axios.get(`${baseUrl}/ariticleFocus/${username}`)
}

// 删除关注文章
export function deleteAriticleFocus(username,ariticle_id) {
    return axios.delete(`${baseUrl}/ariticleFocus/${username}/${ariticle_id}`)
}

// 获取关注作者
export function getuserFocus(username) {
    return axios.get(`${baseUrl}/userFocus/${username}`)
}

// 删除关注作者
export function deleteuserFocus(username,focus_username) {
    return axios.delete(`${baseUrl}/userFocus/${username}/${focus_username}`)
}

export function publish(params) {
    return axios.post(`${baseUrl}/ariticle`, params,{headers:{'Content-Type':'multipart/form-data'}})
}

export function getmyfound(username, type) {
    return axios.get(`${baseUrl}/ariticle/${username}?type=${type}`)
}

export function deletemypublish(username,ariticle_id) {
    return axios.delete(`${baseUrl}/ariticle/${username}/${ariticle_id}`)
}