import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/session';
import UpdateForm from './auth/updateForm'


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

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [currentUser])

    if (!user) {
        return null;
    }

    const deleteUser = async () => {
        await fetch(`/api/auth/delete/${userId}`, {
            method: 'DELETE'
        })
        dispatch(logout())
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
                <li>
                    <strong>Vehicle</strong> {user.vehicle}
                </li>
                <li>
                    <strong>Pic</strong> {user.vehicle_pic}
                </li>
                <li>
                    <strong>Type</strong> {user.type}
                </li>
                <li>
                    <strong>Description</strong> {user.description}
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
                            <div>
                                <button onClick={() => setUpdate(false)}>
                                    don't edit
                                </button>
                                <UpdateForm user={currentUser}/>
                            </div>
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
                <li>
                    <strong>Vehicle</strong> {user.vehicle}
                </li>
                <li>
                    <strong>Pic</strong> {user.vehicle_pic}
                </li>
                <li>
                    <strong>Type</strong> {user.type}
                </li>
                <li>
                    <strong>Description</strong> {user.description}
                </li>
            </ul>
        );
    }
}
export default User;
