import axios from "axios"


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: { "API-KEY": "b9e8c267-68bc-46b5-b916-60b3481f4493" }
    }
);

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollow(id = 11) {
        return instance.delete(`follow/${id}`)
    },
    follow(id = 11) {
        return instance.post(`follow/${id}`)
    }
}

