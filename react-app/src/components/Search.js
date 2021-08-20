import { useEffect, useState } from "react"
import { getEventsSearch } from "../store/events"
import { useDispatch } from "react-redux";
import '../pages/events.css'


export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        dispatch(getEventsSearch({ name, category, state }))
    }, [dispatch, name, category, state])


    return (
        <>
            <form className='search__form'>
                <h1 className='search__h1'>Search Meetups</h1>
                <div className='form__title'>
                    <label className='search__form--label'>Title</label>
                    <input className='search__title'
                        type='text'
                        placeholder='Search for Titles'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <select className='search__state' onChange={e => setState(e.target.value)} value={state}>
                        <option value="">Any State</option>
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
                <div className='form__type'>
                    <label className='search__form--label'>Meetup Type</label>
                    <select className='search__type' value={category} onChange={e => setCategory(e.target.value)}>
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
            </form>
        </>
    )
}
