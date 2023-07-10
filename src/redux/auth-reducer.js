import { authAPI } from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};


export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth }
});




export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authAPI.login(email, password, rememberMe);
    console.log("login....");
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
        dispatch(toggleIsFetching(false));
    }
}

export const getAuthUserDataLogout = () => {
    return setAuthUserData(null, null, null, false);
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataLogout());
    }
};
export default authReducer;