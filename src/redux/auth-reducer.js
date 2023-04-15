const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export default authReducer;

export const setAuthUserData = (id, email, login) => ({ type: SET_USER_DATA, data: { id, email, login } })



// {
//     "data": {
//     "id": 23434,
//     "login": "Friz",
//     "email": "argen.bin.ich@gmail.com"
//     },
//     "messages": [],
//     "fieldsErrors": [],
//     "resultCode": 0
//     }