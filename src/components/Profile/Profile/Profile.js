import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileDataForm from './ProfileForm';
import ProfileStatus from './ProfileStatus';
import { getStatus, getUserProfile, savePhoto, saveProfile } from '../../../redux/profileReducer';
import Preloader from '../../common/Preloader/Preloader';

const ProfileInfo = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profilePage.profile);
    const userId = useSelector((state) => state.auth.userId);
    const isAuth = useSelector((state) => state.auth.isAuth);
    let { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [isMe, setIsMe] = useState(false);



    useEffect(() => {
        if (!id && userId) {
            id = userId;
            setIsMe(true);
        } else {
            setEditMode(false)
            setIsMe(false)
        }

    }, [id])

    useEffect(() => {
        dispatch(getUserProfile(id));
        dispatch(getStatus(id));
    }, [id, userId])




    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            console.log("files", e.target.files);
            dispatch(savePhoto(e.target.files[0]));
        }
    };

    const onSubmit = (data) => {
        dispatch(saveProfile(data));
        setEditMode(false);
    };

    if (!profile) {
        return <Preloader isFetching={true} />;
    }

    if (!isAuth && id == userId) {
        return <Preloader isFetching={true} />;
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || profile.photos.small || userPhoto} className={s.mainPhoto} alt="ava" />
                {isMe && <p><input type="file" onChange={(e) => onPhotoSelected(e)} /></p>}
                {editMode ? (
                    <ProfileDataForm profile={profile} onSubmit={onSubmit} />
                ) : (
                    <ProfileData profile={profile} isMe={isMe} goToEditMode={() => setEditMode(true)} />
                )}
                <ProfileStatus />
            </div>
        </div>
    );
};

const ProfileData = ({ profile, isMe, goToEditMode }) => {
    return (
        <div>
            {isMe && (
                <div>
                    <button onClick={goToEditMode}>Edit</button>
                </div>
            )}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob && (
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
        </div>
    );
};

export default ProfileInfo;
