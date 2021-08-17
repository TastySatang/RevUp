import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, updateEvent } from "../store/events";

export default function EventPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user)
  const event = useSelector((state) => state.events[id])

  const [name, setName] = useState(event?.name);
  const [category, setCategory] = useState(event?.category);
  const [day, setDay] = useState(event?.day)
  const [address, setAddress] = useState(event?.address)
  const [city, setCity] = useState(event?.city)
  const [state, setState] = useState(event?.state)
  const [image, setImage] = useState(event?.image)
  const [start, setStart] = useState(event?.start)
  const [end, setEnd] = useState(event?.end)

  useEffect(() => {
    dispatch(getEvent(id))
  }, [dispatch, id])

  const handleSubmit = async e => {
    e.preventDefault();

    const newEvent = {
      id,
      name,
      user_id: user.id,
      category,
      day,
      address,
      city,
      state,
      image,
      start,
      end
    }
    console.log('inside handlesubmit before dispatch', newEvent)
    await dispatch(updateEvent(newEvent))
  }

  return(
    <>
      <div>
        {event?.name}
      </div>

      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='name' required
        onChange={e => setName(e.target.value)}
        value={name}/>
        <select onchange={e => setCategory(e.target.value)}>
            <option value={`Meet & Greet`}>Meet and Greet</option>
            <option value='Track Event'>Track Event</option>
            <option value='Drag Event'>Drag Event</option>
            <option value='Car Show'>Car Show</option>
            <option value='Virtual'>Virtual</option>
            <option value='Promotional'>Promotional</option>
            <option value='Cruise'>Cruise</option>
            <option value='Demolition-Derby'>Demolition-Derby</option>
            <option value='Others'>Others</option>
        </select>
        <input type='date' required
        onChange={e => setDay(e.target.value)}/>
        <input type='text' placeholder='address' required
        onChange={e => setAddress(e.target.value)}/>
        <input type='text' placeholder='city' required
        onChange={e => setCity(e.target.value)}/>
        <select onChange={e => setState(e.target.value)}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
        </select>
        <input type='url' placeholder='imageUrl' required
        onChange={e => setImage(e.target.value)}/>


        <input type='datetime-local' required
            value={start}
            onChange={e => setStart(e.target.value)} />
        <input type='datetime-local' required
            value={end}
            onChange={e => setEnd(e.target.value)} />

        <button type="submit">Submit</button>
    </form>
    </>
  )
}
