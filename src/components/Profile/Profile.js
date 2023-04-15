import React, { useEffect } from 'react'
import c from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import axios from 'axios'
import { setIsFetchingAC, setUserProfile } from '../../redux/profileReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Profile = () => {

    let authId = useSelector((state) => state.auth.id);

    let { id } = useParams();
    if (!id) {
        id = authId;
    }

    const profile = useSelector((state) => state.profilePage.profile)

    const isFetching = useSelector((state) => state.profilePage.isFetching)

    const dispatch = useDispatch();
    // 25193
    useEffect(() => {
        dispatch(setIsFetchingAC(true));
        id && axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
            .then(({ data }) => {
                dispatch(setUserProfile(data));
                dispatch(setIsFetchingAC(false));
                console.log(data);
                console.log(id);
            })
    }, [id])

    return (
        <div>
            <ProfileInfo profile={profile} isFetching={isFetching} />
            <MyPosts />
        </div>
    )
}

export default Profile