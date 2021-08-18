import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './LoginForm.css'


const NavBar = () => {
    const current_user = useSelector(state => state.session.user)
    const history = useHistory()

    const toHome = (e) => {
        history.push('/')
      };

    return (
        <header>
            {current_user &&
                <a onClick={toHome}>
                    <img className='logo' src='images/Logo3.png'></img>
                </a>
            }
            {!current_user &&
                <img className='logo' src='images/Logo3.png'></img>
            }
            <ul>
                <nav className='nav__links'>
                    {!current_user &&
                        <>
                            <li>
                                <NavLink to='/login' exact={true} activeClassName='active'>
                                    Sign In
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
