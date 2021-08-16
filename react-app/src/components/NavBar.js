
import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './LoginForm.css'

const NavBar = () => {

    const current_user = useSelector(state => state.session.user)

    return (
        <nav className='nav-bar'>
            <div className='navLinks'>
                <NavLink to='/' exact={true} className='logo'>Logo</NavLink>

                <NavLink to='/login' exact={true} className='login-link' activeClassName='active'>
                    Login
                </NavLink>

                <NavLink to='/sign-up' exact={true} className='createAccount' activeClassName='active'>
                    Create Account
                </NavLink>

                <NavLink to='/users' exact={true} className='users-link' activeClassName='active'>
                    Users
                </NavLink>

                {current_user && <LogoutButton />}
            </div>
        </nav>
    );
}

export default NavBar;
