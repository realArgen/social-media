import React from 'react'
import c from './Navbar.module.css'
import { NavLink } from "react-router-dom";

const Navbar = () => {
    // { navData => navData.isActive ? s.active : s.item }
    return (
        <nav className={c.nav}>
            <div>
                <NavLink className={({ isActive }) => isActive ? c.active : c.item} to="/profile">Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={({ isActive }) => isActive ? c.active : c.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={({ isActive }) => isActive ? c.active : c.item}>Users</NavLink>
            </div>
            <div>
                <NavLink to="/news" className={({ isActive }) => isActive ? c.active : c.item}>News</NavLink>
            </div>
            <div>
                <NavLink to="/music" className={({ isActive }) => isActive ? c.active : c.item}>Music</NavLink>
            </div>
        </nav >
    )
}

export default Navbar