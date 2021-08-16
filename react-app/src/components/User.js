import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux'

function User() {
  const currentUser = useSelector(state => state.session.user);
  const [user, setUser] = useState({});
  const { userId }  = useParams();

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

  const deleteUser = () => {
    console.log('delete')
  }

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
        <button  onClick={deleteUser}>
          delete
        </button>
        <button>
          edit
        </button>
      </div>
      }
    </ul>
  );
}
export default User;
