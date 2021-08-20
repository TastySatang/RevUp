import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/session';
import UpdateForm from './auth/updateForm'
import './User.css'


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
        setUpdate(false)
    }, [currentUser])



    const deleteUser = async () => {
        await fetch(`/api/auth/delete/${userId}`, {
            method: 'DELETE'
        })
        dispatch(logout())
    }

    return (
        <>
            <div className='userHeader'>
                <h1>{`${user.username}'s Profile Page`}</h1>
                <div className='email_vehicle'>
                    <strong>Email:</strong> {user.email}
                    <strong>Vehicle:</strong> {user.vehicle}
                </div>
                {currentUser.id !== 1 &&
                    <>
                        {currentUser.id === user.id &&
                            <>
                                <div className='profile_buttons'>
                                    <button className='delete_user_button' onClick={deleteUser}>
                                        Delete
                                    </button>
                                    {!update &&
                                        <button className='update_user_button' onClick={() => setUpdate(true)}>
                                            Edit
                                        </button>
                                    }
                                    {update &&
                                        <button className='update_user_button' onClick={() => setUpdate(false)}>
                                            Done Editing
                                        </button>
                                    }
                                </div>
                                {update &&
                                    <div className='update_form'>
                                        <UpdateForm user={currentUser} />
                                    </div>
                                }
                            </>
                        }
                    </>
                }
            </div>
            <div className='vehicle_user'>
                <div className='vehicle_info'>
                    <ul>
                        <h3>User Info</h3>
                        <li>
                            <strong>Email</strong> {user.email}
                        </li>
                        <li>
                            <strong>Description</strong> {user.description}
                        </li>
                    </ul>
                </div>
                <div className='vehicle_info'>
                    <h3>Vehicle Info</h3>
                    <img src={user.vehicle_pic}></img>
                    <ul>
                        <li>
                            <strong>Vehicle</strong> {user.vehicle}
                        </li>
                        <li>
                            <strong>Type</strong> {user.type}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default User;
