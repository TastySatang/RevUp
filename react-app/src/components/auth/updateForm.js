import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Errors from '.././Errors'

const updateForm = (user) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [vehiclePic, setVehiclePic] = useState('')
  const [typeId, setTypeId] = useState(1)
  const userId = user.id
  const dispatch = useDispatch();

  const onUpdate = async (e) => {
    e.preventDefault();
      const data = await dispatch(update(username, email, password, description, vehicle, vehiclePic, typeId, userId));
      if (data) {
        setErrors(data)
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
        <div>
          <label>Vehicle Type</label>
          <select onChange={e => setTypeId(e.target.value)}>
            <option value='1'>American Muscle</option>
            <option value="2">JDM</option>
            <option value="3">Luxury</option>
            <option value="4">Sport Bike</option>
            <option value="5">Cruiser</option>
            <option value="6">European Sport</option>
            <option value="7">Off-road/Baja</option>
            <option value="8">Economy</option>
            <option value="9">Formula</option>
          </select>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
};

export default updateForm;
