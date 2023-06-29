import axios from "axios"


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: { "API-KEY": "b9e8c267-68bc-46b5-b916-60b3481f4493" }
    }
);

export const profileAPI = {

    getProfile(id) {
        return instance.get(`profile/${id}`)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`,
            { status: status }
        )
    }
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    getProfile(id) {
        console.warn("Obsolete method. Please use profileAPI");
        return profileAPI.getProfile(id)
    },
    unfollow(id = 11) {
        return instance.delete(`follow/${id}`)
    },
    follow(id = 11) {
        return instance.post(`follow/${id}`)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }

}

