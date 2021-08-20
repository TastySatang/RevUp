import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import '.././LoginForm.css'
import { useHistory, Link } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(false)
  const current_user = useSelector(state => state.session.user)
  console.log(current_user)

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
          <div className='profile-dropdown-div'>
            <div>
              <h4 className='profile-dropdown__greeting'>{`Hello, ${current_user.username}!`}</h4>
            </div>
            <Link to={`/users/${current_user.id}`} exact={true} onClick={() => setClicked(false)}>
              profile
            </Link>
            <a className='profile-dropdown__a' onClick={onLogout}>
              logout
            </a>
          </div>
          {/* <table className='profileTable'>
            <thead>
                <tr>
                    <th>{`Hello, ${current_user.username}`}</th>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table> */}
        </>
      }
    </>
  )
};

export default LogoutButton;
