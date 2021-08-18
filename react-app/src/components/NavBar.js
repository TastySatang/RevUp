import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './LoginForm.css'


const NavBar = () => {

    const current_user = useSelector(state => state.session.user)

    return (
        <header>
            {/* <NavLink to='/' exact={true} className='logo'>Home</NavLink> */}
            <a href='/'>
                <img classname='logo'src='images/Logo3.png'></img>
            </a>
            <ul>
                <nav className='nav__links'>
                    <li>
                        <NavLink to='/login' exact={true} activeClassName='active'>
                            Sign In
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/users' exact={true} activeClassName='active'>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/sign-up' exact={true} activeClassName='active'>
                            Create Account
                        </NavLink>
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
