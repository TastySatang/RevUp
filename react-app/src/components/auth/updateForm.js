import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { update } from '../../store/session';
import Errors from '.././Errors'
import { useHistory } from 'react-router-dom';

const UpdateForm = ({ user }) => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [vehicle, setVehicle] = useState(user.vehicle);
  const [vehicle_pic, setVehicle_Pic] = useState(user.vehicle_pic);
  const [type, setType] = useState(user.type);
  const dispatch = useDispatch();

  const validateEmail = (mail) => {
    const regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regMail.test(String(mail).toLowerCase())
  }
  const onUpdate = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrors(['Please enter a valid Email'])
    }

    else {
      const data = await dispatch(update(username, email, description, vehicle, vehicle_pic, type));
      if (data) {
        setErrors(data)
      }
    }
    history.push(`/users/${user.id}`)
  };

  return (
    <div className='backgroundUpdate'>
      <Errors />
      <form onSubmit={onUpdate} className='update'>
        <h1>Update Account</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>

          <input
            type='text'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='email'
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
            onChange={e => setVehicle_Pic(e.target.value)}
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
        <button className='SignupB' type='submit'>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
