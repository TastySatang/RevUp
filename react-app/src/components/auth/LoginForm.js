import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Errors from '.././Errors';

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const demoLogin = async () => {
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
            setErrors(data)
        }
    }

    if (user) {
        return <Redirect to='/events' />;
    }

    return (
        <>
            {/* <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link> */}
            <div className='backgroundLogin'>
                <Errors />
                <form onSubmit={onLogin} className='login-form'>
                    <h1>Member Login</h1>
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className='fields'>
                        <div className='email-field'>
                            <input
                                name='email'
                                type='search'
                                placeholder='          enter e-mail address'
                                value={email}
                                onChange={updateEmail}
                            />
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div className='password-field'>
                            <input
                                name='password'
                                type='password'
                                placeholder=' enter password'
                                value={password}
                                onChange={updatePassword}
                            />
                            <i class="fas fa-lock"></i>
                        </div>
                    </div>
                    <button className='loginButton' type='submit'>Sign In</button>
                    <button className='DemoB' onClick={demoLogin}>Demo User</button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
