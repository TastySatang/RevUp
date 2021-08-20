import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getEventsSearch } from "../store/events"
import './events.css';

export default function EventsPage() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('')
    const dispatch = useDispatch();
    const events = useSelector((state) => Object.values(state.events))


    useEffect(() => {
        dispatch(getEventsSearch({name, category, state}))
    }, [dispatch, name, category, state])


    return (
        <>
            <form >
                <h1>Search Events</h1>
                <div>
                    <label>Title</label>
                    <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>Type</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value=''>All</option>
                        <option value={`Meet & Greet`}>Meet and Greet</option>
                        <option value='Track Event'>Track Event</option>
                        <option value='Drag Event'>Drag Event</option>
                        <option value='Car Show'>Car Show</option>
                        <option value='Virtual'>Virtual</option>
                        <option value='Promotional'>Promotional</option>
                        <option value='Cruise'>Cruise</option>
                        <option value='Demolition-Derby'>Demolition-Derby</option>
                        <option value='Others'>Other</option>
                    </select>
                </div>
                <div>
                    <label>State</label>
                    <select onChange={e => setState(e.target.value)} value={state}>
                        <option value="">All</option>
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
            </form>
            <div className='events'>
                {events.map((event, idx) => {
                    return (
                        <div key={idx} className='event__tile--holder'>
                            <Link className='event__tile' to={`/events/${event.id}`}>
                                <div className='event__tile--imageholder' >
                                    <img className='event__tile--img' src={event.image} alt='tile' />
                                </div>
                                <div className='event__tile--adetail'>
                                    <div className='event__detail--start'>
                                        {event.start}
                                    </div>
                                    <div className='event__detail--name'>
                                        {event.name}
                                    </div>
                                    <div className='event__detail--address'>
                                        {event.address}, {event.city}, {event.state}
                                    </div>
                                </div>

                            </Link>
                        </div>
                    )
                })}
            </ div>
        </>
    )
}
