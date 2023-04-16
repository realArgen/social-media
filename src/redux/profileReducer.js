import { usersAPI } from "../api/api";

const ADD__POST = "ADD__POST";
const UPDATE__NEW__POST__TEXT = "UPDATE__NEW__POST__TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_IS_FETCHING = "SET_IS_FETCHING";

let initialState = {
    profile: null,
    posts: [{ id: 1, likes: 14, message: "Hi, how are you?" },
    { id: 2, likes: 22, message: "Hi, how is your itkamasutra?" },
    { id: 3, likes: 23, message: "yes!" },
    ],
    isFetching: true,
    newPostText: "It kamasutra",
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD__POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { id: state.posts[state.posts.length - 1].id + 1, likes: 14, message: state.newPostText }
                ],
                newPostText: ""
            };
        case UPDATE__NEW__POST__TEXT:
            return {
                ...state,
                newPostText: action.newPostText
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        default:
            return state;
    }
};


export const addPostActionCreator = () => ({ type: ADD__POST })
export const updateNewPostTextActionCreator = (message) => ({ type: UPDATE__NEW__POST__TEXT, newPostText: message })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setIsFetchingAC = (isFetching) => ({ type: SET_IS_FETCHING, isFetching })

export const getProfileThunkCreator = (id) => (dispatch) => {
    dispatch(setIsFetchingAC(true));
    id && usersAPI.getProfile(id)
        .then(({ data }) => {
            dispatch(setUserProfile(data));
            dispatch(setIsFetchingAC(false));
            console.log(data);
            console.log(id);
        })
}

export default profileReducer;