import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../components/Search";
import './events.css';

export default function EventsPage() {
    const events = useSelector((state) => Object.values(state.events))

    return (
        <>
            <Search />
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
