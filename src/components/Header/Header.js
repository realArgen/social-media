import React, { useEffect } from 'react'
import c from './Header.module.css'
import { Link } from 'react-router-dom'
import { getAuthUserData, setAuthUserData } from '../../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { authAPI } from '../../api/api'

const Header = () => {

    const isAuth = useSelector((state) => state.auth.isAuth);
    const login = useSelector((state) => state.auth.login);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthUserData())
    }, [])


    return (
        <header className={c.header}>
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="logo" />
            <div className={c.loginBLock}>
                {isAuth ? login :
                    <Link to={"/login"}>Login</Link>
                }
            </div>
        </header>
    )
}

export default Header 