import React from 'react'
import c from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {

    return (
        <div>
            <ProfileInfo />
            <MyPosts />
        </div>
    )
}

export default Profile