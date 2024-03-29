import React from 'react';
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './LoginForm.css'
import logo from './images/Logo3.png'


const NavBar = () => {
    const current_user = useSelector(state => state.session.user)
    return (
        <header>
            {current_user &&
                <Link to='/events'>
                    <img className='logo' src={logo} alt='logo-main'></img>
                </Link>
            }
            {!current_user &&
                <Link to='/'>
                    <img className='logo' src={logo} alt='logo-main-alt'></img>
                </Link>
            }
            <ul>
                <nav className='nav__links'>
                    {!current_user &&
                        <>
                            <li>
                                <NavLink to='/login' exact={true} activeClassName='active'>
                                    Log In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                                    Create Account
                                </NavLink>
                            </li>
                        </>
                    }
                    {current_user &&
                        <>
                            <li>
                                <NavLink to='/events' exact={true} activeClassName='active'>
                                    Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/events/new' exact={true} activeClassName='active'>
                                    Create Event
                                </NavLink>
                            </li>
                            <li>
                                <LogoutButton />
                            </li>
                        </>
                    }
                </nav>
            </ul>
        </header>
    );
};

export default NavBar;
