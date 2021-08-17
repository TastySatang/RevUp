
import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './LoginForm.css'

const NavBar = () => {

    const current_user = useSelector(state => state.session.user)

    return (
        <header>
            <NavLink to='/' exact={true} className='logo'>Logo</NavLink>
            <ul>
                <nav className='nav__links'>
                    <li>
                        <a href='/login'>
                        <NavLink to='/login' exact={true} activeClassName='active'>
                            Sign In
                        </NavLink>
                        </a>
                    </li>
                    <li>
                        <a href='/users'>
                        <NavLink to='/users' exact={true} activeClassName='active'>
                            Users
                        </NavLink>
                        </a>
                    </li>
                    <li>
                        <a href='/sign-up'>
                        <NavLink to='/sign-up' exact={true} activeClassName='active'>
                            Create Account
                        </NavLink>
                        </a>
                    </li>
                    <li>
                        {current_user && <LogoutButton />}
                    </li>
                </nav>
            </ul>
        </header>
    );
};

export default NavBar;
