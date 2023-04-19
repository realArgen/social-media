import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followSuccess, getUsersThunkCreator, setCurrentPageAC, unfollowSuccess } from '../../redux/usersReducer';
import styles from './Users.module.css';
import userPhoto from './../../assets/images/user.jpg';
import Preloader from '../common/Preloader/Preloader';
import { NavLink, useNavigate } from 'react-router-dom';
import { createPages } from '../common/createPages/pagesCreator';

const Users = () => {

    const navigate = useNavigate();

    const isAuth = useSelector((state) => state.auth.isAuth);

    const users = useSelector((state) => state.usersPage.users);
    const pageSize = useSelector((state) => state.usersPage.pageSize);
    const totalUsersCount = useSelector((state) => state.usersPage.totalUsersCount);
    const currentPage = useSelector((state) => state.usersPage.currentPage);
    const isFetching = useSelector((state) => state.usersPage.isFetching);
    const followingInProgress = useSelector((state) => state.usersPage.followingInProgress);

    let pages = [];
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    createPages(pages, pagesCount, currentPage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize))
    }, [currentPage, totalUsersCount, pageSize]);

    if (!isAuth) {
        navigate('./../../login')
    }

    return (
        <div>
            <div className={styles.pagesContainer}>
                {"<<"}
                {pages.map((p) => {
                    return <span
                        onClick={() => { dispatch(setCurrentPageAC(p)) }}
                        key={p}
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
                                        dispatch(unfollowSuccess(u.id))
                                    }}>
                                        Unfollow
                                    </button> :
                                    <button disabled={followingInProgress.some((id) => id === u.id)} onClick={() => {
                                        dispatch(followSuccess(u.id))
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

