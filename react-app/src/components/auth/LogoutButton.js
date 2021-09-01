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

  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
  };

  return (
    <>
      <button className='logout-button' onClick={() => setClicked(!clicked)} style={{backgroundImage: `url(${current_user.vehicle_pic})`}}>
        {/* <img src={current_user.vehicle_pic} alt='profile' className='profile-btn__img'/> */}
        {/* <p>Profile</p> */}
      </button>
      {clicked &&
        <>
          <div className='profile-dropdown-div'>
            <div>
              <h4 className='profile-dropdown__greeting'>{`Hello, ${current_user.username}!`}</h4>
            </div>
            <Link to={`/users/${current_user.id}`} onClick={() => setClicked(false)}>
              profile
            </Link>
            <Link className='profile-dropdown__a' onClick={onLogout} to='/'>
              logout
            </Link>
          </div>
        </>
      }
    </>
  )
};

export default LogoutButton;
