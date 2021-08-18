import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getEvents, createEvent, updateEvent } from "../store/events"
import '../pages/events.css';

export default function EventForm({id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)

    const [name, setName] = useState('');
    const [category, setCategory] = useState('Meet & Greet');
    const [day, setDay] = useState(null)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('AL')
    const [image, setImage] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch])

    const handleSubmit = async e => {
        e.preventDefault();

        if (id) {
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
              dispatch(updateEvent(newEvent))
              return
        }

        const event = {
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
        console.log('inside handlesubmit before dispatch', event)
        const posted = await dispatch(createEvent(event))

        if (posted) {
            history.push('/events')
        }
    }

    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='name' required
                    value={name}
                    onChange={e => setName(e.target.value)}/>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
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
            </div>
    )
}
