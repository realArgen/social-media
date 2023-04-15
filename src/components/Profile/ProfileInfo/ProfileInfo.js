import React, { useEffect } from 'react'
import c from './ProfileInfo.module.css'
import userPhoto from './../../../assets/images/user.jpg'
import Preloader from '../../common/Preloader/Preloader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setIsFetchingAC } from '../../../redux/usersReducer'
import { setUserProfile } from '../../../redux/profileReducer'

const ProfileInfo = () => {

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
        isFetching ? <Preloader isFetching={true} /> : <div>
            <div>
                <img className={c.img} src="https://www.advantour.com/img/kyrgyzstan/legends/kyrgyzstan-legends-issyk-kul-legend.jpg" alt="lake" />
            </div>
            <div className={c.descBlock}>
                <img src={profile.photos.large || profile.photos.small || userPhoto} alt="profile" />
                <p>{profile.fullName}</p>
                <p>{profile.aboutMe}</p>
            </div>
        </div>
    )
}

export default ProfileInfo