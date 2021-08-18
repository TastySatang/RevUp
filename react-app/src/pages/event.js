import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvent } from "../store/events";
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

    }, [dispatch, id, user])



    if (event === undefined) {
        return (
            <>
            </>
        )
    }

    const createRsvp = async () => {
        const users_id = user.id;
        const events_id = event.id;
        await fetch('/api/rsvp/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                users_id,
                events_id,
            })
        });
        setRsvp(true);
    }

    const deleteRsvp = async () => {
        if (user) {

        }
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
                    <button onClick={createRsvp}>Rsvp</button>
                }
                {rsvp &&
                    <button onClick={deleteRsvp}>Delete Rsvp</button>
                }
            </ div>
        </>
    )
}
