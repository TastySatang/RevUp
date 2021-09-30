import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import { createEvent, updateEvent } from "../store/events"

import "react-datepicker/dist/react-datepicker.css";
import './EventForm.css'
import '../pages/events.css';

export default function EventForm({ id, event }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)

    const [name, setName] = useState('');
    const [category, setCategory] = useState('Meet & Greet');
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('AL')
    const [image, setImage] = useState('')
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null)

    useEffect(() => {
        if (id) {
            setName(event.name)
            setCategory(event.category)
            setDescription(event.description)
            setAddress(event.address)
            setCity(event.city)
            setState(event.state)
            setImage(event.image)
            setStart(new Date(event.start))
            setEnd(new Date(event.end))
        }
    }, [id, event?.name, event?.category, event?.description, event?.address, event?.city, event?.state, event?.image, event?.start, event?.end])

    const handleSubmit = async e => {
        e.preventDefault();

        if (id) {
            const newEvent = {
                id,
                name,
                user_id: user.id,
                category,
                description,
                address,
                city,
                state,
                image,
                start,
                end
            }
            dispatch(updateEvent(newEvent))
            return
        }

        const event = {
            name,
            user_id: user.id,
            category,
            description,
            address,
            city,
            state,
            image,
            start,
            end
        }
        const posted = await dispatch(createEvent(event))

        if (posted) {
            history.push('/events')
        }
    }

    return (
        <div>
            <form id='event__form' className='event__form' onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Name' required
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
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
                </div>
                <div>
                    <textarea
                        className='Event__Create--textarea'
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Details'
                        value={description} />
                </div>
                <div>
                    <input type='text' placeholder='Address' required value={address}
                        onChange={e => setAddress(e.target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='City' required value={city}
                        onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                    <select onChange={e => setState(e.target.value)} value={state}>
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
                </div>
                <div>
                    <input type='url' placeholder='Image Url' required value={image}
                        onChange={e => setImage(e.target.value)} />
                </div>
                <div className='dpicker'>

                    <DatePicker
                        selected={start}
                        onChange={(date) => {
                            setStart(date)
                        }}
                        selectsStart
                        showTimeSelect
                        placeholderText='Click to select a start date'
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        startDate={start}
                        endDate={end}
                    />
                    <DatePicker
                        selected={end}
                        onChange={(date) => setEnd(date)}
                        selectsEnd
                        showTimeSelect
                        placeholderText='Click to select an end date'
                        dateFormat="MMMM d, yyyy h:mm aa"
                        startDate={start}
                        endDate={end}
                        minDate={start}
                    />

                </div>

                <div className='buttonHolder'>
                    <button className='Event__Create--Button' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
