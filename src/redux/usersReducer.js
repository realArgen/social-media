const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET__USERS = "SET__USERS";
const SET__CURRENT__PAGE = "SET__CURRENT__PAGE";
const SET__TOTAL__USERS__COUNT = "SET__TOTAL__USERS__COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true };
                    }
                    return u;
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
        case SET__CURRENT__PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET__TOTAL__USERS__COUNT:
            return {
                ...state,
                totalUsersCount: action.total
            }
        case SET__USERS:
            return {
                ...state,
                users: action.users
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.id] :
                    state.followingInProgress.filter((id) => id !== action.id)
            }
        default:
            return state;
    };
};


export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET__USERS, users })
export const setCurrentPageAC = (page) => ({ type: SET__CURRENT__PAGE, page })
export const setTotalUsersCountAC = (total) => ({ type: SET__TOTAL__USERS__COUNT, total })
export const setIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, id) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, id })


export default usersReducer;



// "https://cdn-icons-png.flaticon.com/512/149/149071.png"

// { id: 1, photoUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", followed: true, fullName: "John Doe", status: "I am a boss", location: { city: "Minsk", country: "Belarus" } },
// { id: 2, photoUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", followed: false, fullName: "John Doe", status: "Hi, I am a boss too", location: { city: "Bishkek", country: "KG" } },
// { id: 3, photoUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", followed: false, fullName: "John Doe", status: "Hi, how are you?", location: { city: "Moscow", country: "RF" } },
// { id: 4, photoUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", followed: true, fullName: "John Wick", status: "Hi, you?", location: { city: "Kiev", country: "UK" } },