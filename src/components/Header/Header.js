import React, { useEffect } from 'react'
import c from './Header.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setAuthUserData } from '../../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {

    const isAuth = useSelector((state) => state.auth.isAuth);
    const login = useSelector((state) => state.auth.login);

    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
                { withCredentials: true }
            )
            .then(({ data }) => {
                if (data.resultCode === 0) {
                    let { id, login, email } = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            })


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