import React from 'react'
import c from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

    const isAuth = useSelector((state) => state.auth.isAuth);
    const login = useSelector((state) => state.auth.login);


    return (
        <header className={c.header}>
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="logo" />
            <div className={c.loginBLock}>
                {isAuth ? login :
                    <Link className={c.logo} to={"/login"}>Login</Link>
                }
            </div>
        </header>
    )
}

export default Header 