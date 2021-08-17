import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom';
import { update } from '../../store/session';
import Errors from '.././Errors'

const UpdateForm = () => {
    const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [vehicle, setVehicle] = useState(user.vehicle);
  const [vehicle_pic, setVehicle_Pic] = useState(user.vehicle_pic);
  const [type, setType] = useState(1);
  const userId = useParams();
  const dispatch = useDispatch();

  const onUpdate = async (e) => {
    e.preventDefault();
      const data = await dispatch(update(username, email, description, vehicle, vehicle_pic, type, userId));
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

  return (
    <>
      <Errors />
      <form onSubmit={onUpdate}>
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
            onChange={e => setVehicle_Pic(e.target.value)}
            value={vehicle_pic}
          ></input>
        </div>
        <div>
          <label>Vehicle Type</label>
          <select onChange={e => setType(e.target.value)} value={type}>
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
        <button type='submit'>Confirm Update</button>
      </form>
    </>
  );
};

export default UpdateForm;
