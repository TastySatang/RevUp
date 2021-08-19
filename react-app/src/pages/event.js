import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvent, createRsvp, deleteRsvp } from "../store/events";
import EventForm from "../components/EventForm";

export default function EventPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const user = useSelector((state) => state.session.user)
    const event = useSelector((state) => state.events[id])

    const [showForm, setShowForm] = useState(false);
    const [rsvp, setRsvp] = useState(false)

    useEffect(() => {
        dispatch(getEvent(id))
        user.rsvp.forEach(rsvp => {if(rsvp.id === event?.id) setRsvp(true)})
    }, [dispatch, id, user])





    if (event === undefined) {
        return (
            <>
            </>
        )
    }

    const cRsvp = async () => {
        const users_id = user.id;
        const events_id = event.id;
        dispatch(createRsvp(users_id, events_id))
        setRsvp(true);
    }

    const dRsvp = async () => {
        const users_id = user.id;
        const events_id = event.id;
        dispatch(deleteRsvp(users_id, events_id))
        setRsvp(false);
    }

    let content;
    if (user) {
        if (user.name === event.user_id) {
            content = (
                <>
                    <button type='button' onClick={() => showForm === false ? setShowForm(true) : setShowForm(false)}>Edit</button>
                    <button type="button" onClick={() => {
                        dispatch(deleteEvent(id))
                        history.push('/events')
                    }}>delete</button>

                </>
            )
        }
    } else {
        content = (
            <>
            </>
        )
    }

    return (
        <>
            <div className='content'>
                <div className='event__header'>
                    {event.user.username}
                </div>
                <div className='event__content'>
                    <div className='event__image'>
                        <img src={event.image} alt='event' />
                    </div>
                    <div>
                        {event.name}
                    </div>
                </div>

                {content}
                {showForm && (
                    <EventForm id={id} event={event} />
                )}
                {!rsvp &&
                    <button onClick={cRsvp}>Rsvp</button>
                }
                {rsvp &&
                    <button onClick={dRsvp}>Delete Rsvp</button>
                }
            </ div>
        </>
    )
}
