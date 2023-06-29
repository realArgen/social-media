import React, { useEffect } from 'react'
import c from './ProfileInfo.module.css'
import userPhoto from './../../../assets/images/user.jpg'
import Preloader from '../../common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getProfileThunkCreator, getStatusThunkCreator } from '../../../redux/profileReducer'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = () => {

    const navigate = useNavigate();

    let isAuth = useSelector((state) => state.auth.isAuth);

    let authId = useSelector((state) => state.auth.id);

    const profile = useSelector((state) => state.profilePage.profile)

    const isFetching = useSelector((state) => state.profilePage.isFetching)

    const status = useSelector((state) => state.profilePage.status)


    let { id } = useParams();

    if (!id) {
        id = authId;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuth) {
            navigate('./../../login')
        }
    }, [isAuth])

    useEffect(() => {
        dispatch(getProfileThunkCreator(id))
    }, [id])

    useEffect(() => {
        dispatch(getStatusThunkCreator(id))
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
                {authId === id ? <ProfileStatus /> : status}
            </div>
            <div>
            </div>
        </div>
    )
}

export default ProfileInfo