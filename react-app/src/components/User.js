import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/session';

function User() {
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false)
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const deleteUser = async () => {
    await fetch(`/api/auth/delete/${userId}`, {
      method: 'DELETE'
    })
    dispatch(logout())
  }

  const editUser = () => {
    console.log('edit')
  }

  if (currentUser.id !== 1) {
    return (
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        {currentUser.id === user.id &&
          <div>
            <button onClick={deleteUser}>
              delete
            </button>
            {!update &&
              <button onClick={() => setUpdate(true)}>
                edit
              </button>
            }
            {update &&
              <button onClick={() => setUpdate(false)}>
                don't edit
              </button>
            }
          </div>
        }
      </ul>
    );
  } else {
    return (
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
    );
  }
}
export default User;
