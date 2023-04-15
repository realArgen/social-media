import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { followAC, setCurrentPageAC, setIsFetchingAC, setTotalUsersCountAC, setUsersAC, toggleFollowingProgress, unfollowAC } from '../../redux/usersReducer';
import styles from './Users.module.css';
import userPhoto from './../../assets/images/user.jpg';
import Preloader from '../common/Preloader/Preloader';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../api/api';

const Users = () => {
    const users = useSelector((state) => state.usersPage.users);
    const pageSize = useSelector((state) => state.usersPage.pageSize);
    const totalUsersCount = useSelector((state) => state.usersPage.totalUsersCount);
    const currentPage = useSelector((state) => state.usersPage.currentPage);
    const isFetching = useSelector((state) => state.usersPage.isFetching);
    const followingInProgress = useSelector((state) => state.usersPage.followingInProgress);

    const dispatch = useDispatch();

    const [pages, setPages] = useState([]);


    useEffect(() => {
        dispatch(setIsFetchingAC(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then(({ data }) => {
                dispatch(setTotalUsersCountAC(data.totalCount));
                dispatch(setIsFetchingAC(false));
            })

        let pagesCount = Math.ceil(totalUsersCount / pageSize);
        let portion = []
        for (let i = 1; i <= pagesCount; i++) {
            portion.push(i);
        }
        setPages(portion);
    }, [totalUsersCount, pageSize]);

    useEffect(() => {
        dispatch(setIsFetchingAC(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then(({ data }) => {
                dispatch(setUsersAC(data.items));
                dispatch(setIsFetchingAC(false));
            })

    }, [currentPage]);

    let curPF = ((currentPage - 5) < 0) ? 0 : currentPage - 5;
    let curPL = currentPage + 5;
    let slicedPages = pages.slice(curPF, curPL);

    return (
        <div>
            <div className={styles.pagesContainer}>
                {"<<"}
                {slicedPages.map((p, idx) => {
                    return <span
                        onClick={() => { dispatch(setCurrentPageAC(p)) }}
                        key={idx}
                        className={styles.pages + " " + (currentPage === p ? styles.selectedPage : "")}>
                        {p}
                    </span>
                })}{">>"}
            </div>
            <Preloader isFetching={isFetching} />
            {
                users.map(u => {
                    return <div className={styles.user} key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'./../profile/' + u.id}>
                                    <img className={styles.userPhoto}
                                        src={u.photos.small || u.photos.large || userPhoto} alt="user" />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ?
                                    <button disabled={followingInProgress.some((id) => id === u.id)} onClick={() => {
                                        dispatch(toggleFollowingProgress(true, u.id))
                                        axios
                                            .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                {
                                                    withCredentials: true,
                                                    headers:
                                                    {
                                                        "API-KEY": "b9e8c267-68bc-46b5-b916-60b3481f4493"
                                                    }
                                                }
                                            )
                                            .then(({ data }) => {
                                                if (data.resultCode === 0) {
                                                    dispatch(unfollowAC(u.id))
                                                    console.log(data);
                                                }
                                                dispatch(toggleFollowingProgress(false, u.id))
                                            })

                                    }}>
                                        Unfollow
                                    </button> :
                                    <button disabled={followingInProgress.some((id) => id === u.id)} onClick={() => {
                                        dispatch(toggleFollowingProgress(true, u.id))

                                        axios
                                            .post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                                {},
                                                {
                                                    withCredentials: true,
                                                    headers:
                                                    {
                                                        "API-KEY": "b9e8c267-68bc-46b5-b916-60b3481f4493"
                                                    }
                                                },
                                            )
                                            .then(({ data }) => {
                                                if (data.resultCode === 0) {
                                                    dispatch(followAC(u.id))
                                                    console.log(data);
                                                }
                                                dispatch(toggleFollowingProgress(false, u.id))
                                            })
                                    }}>
                                        Follow
                                    </button>}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>

                        </span>
                    </div>
                })
            }
        </div>
    )
}

export default Users;

