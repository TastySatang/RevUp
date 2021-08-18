import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import '.././LoginForm.css'
import { useHistory, NavLink } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(false)
  const current_user = useSelector(state => state.session.user)

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <>
      <button className='logout-button' onClick={() => setClicked(!clicked)}>
        <p>Profile</p>
      </button>
      {clicked &&
        <>
          <table className='profileTable'>
            <tr>
              <NavLink to={`/users/${current_user.id}`} exact={true} activeClassName='active' onClick={() => setClicked(false)}>
                profile
              </NavLink>
            </tr>
            <tr>
              <a className='logoutButton' onClick={onLogout}>
                logout
              </a>
            </tr>
          </table>
        </>
      }
    </>
  )
};

export default LogoutButton;
