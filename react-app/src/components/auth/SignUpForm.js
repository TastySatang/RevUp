import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Errors from '.././Errors'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [description, setDescription] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [vehiclePic, setVehiclePic] = useState('')
  const [typeId, setTypeId] = useState(1)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      console.log('in sign up')
      const data = await dispatch(signUp(username, email, password, description, vehicle, vehiclePic, typeId));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
        <Errors />
        <form onSubmit={onSignUp}>
        <div>
            {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
            <label>User Name</label>
            <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            ></input>
        </div>
        <div>
            <label>Email</label>
            <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            ></input>
        </div>
        <div>
            <label>Password</label>
            <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            ></input>
        </div>
        <div>
            <label>Repeat Password</label>
            <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></input>
        </div>
        <div>
            <label>Description</label>
            <textarea
            name='description'
            onChange={e => setDescription(e.target.value)}
            value={description}
            required={true}
            ></textarea>
        </div>
        <div>
            <label>Vehicle</label>
            <input
            type='text'
            name='Vehicle'
            onChange={e => setVehicle(e.target.value)}
            value={vehicle}
            ></input>
        </div>
        <div>
            <label>Vehicle Picture</label>
            <input
            type='text'
            name='VehiclePic'
            onChange={e => setVehiclePic(e.target.value)}
            value={vehiclePic}
            ></input>
        </div>
        <button type='submit'>Sign Up</button>
        </form>
    </>
  );
};

export default SignUpForm;
