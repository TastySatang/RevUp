import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import Errors from '.././Errors'
import '.././LoginForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [description, setDescription] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [vehicle_pic, setVehiclePic] = useState('')
  const [type, setType] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, description, vehicle, vehicle_pic, type));
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

  const demoLogin = async () => {
    const data = await dispatch(login('demo@aa.io', 'password'));
      if (data) {
        setErrors(data)
      }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='backgroundSignUp'>
      <Errors />
      <form onSubmit={onSignUp} className='signUp'>
        <h1>Create Account</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>

          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='username'
          ></input>
        </div>
        <div>

          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='email'
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='password'
          ></input>
        </div>
        <div>

          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='confirm password'
          ></input>
        </div>
        <div>
          <label className='label__textarea'>Tell us about your vehicle</label>
          <textarea
            placeholder={`My car is the bestest car there is`}
            className='description'
            name='description'
            onChange={e => setDescription(e.target.value)}
            value={description}
            required={true}

          ></textarea>
        </div>
        <div>

          <input
            type='text'
            name='Vehicle'
            onChange={e => setVehicle(e.target.value)}
            value={vehicle}
            placeholder='Whats your vehicle?'
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='VehiclePic'
            onChange={e => setVehiclePic(e.target.value)}
            value={vehicle_pic}
            placeholder='URL of your vehicle pic'
          ></input>
        </div>

        <div>
          <label className='label__selectField' >Select vehicle Type</label>
          <select
          className='signup__selectField'
          onChange={e => setType(e.target.value)}
          value={type}
          >
            <option value='American Muscle'>American Muscle</option>
            <option value='JDM'>JDM</option>
            <option value='Luxury'>Luxury</option>
            <option value='Sport Bike'>Sport Bike</option>
            <option value='Cruiser'>Cruiser</option>
            <option value="European Sport">European Sport</option>
            <option value='Off-road/Baja'>Off-road/Baja</option>
            <option value='Economy'>Economy</option>
            <option value='Formula'>Formula</option>
            <option value='Other'>Formula</option>
          </select>
        </div>
        <button className='SignupB' type='submit'>Sign Up</button>
        <button className='DemoB' onClick={demoLogin}>Demo User</button>
      </form>
    </div>
  );
};

export default SignUpForm;
