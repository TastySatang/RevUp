import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvent, createRsvp, deleteRsvp } from "../store/events";
import EventForm from "../components/EventForm";
import Comments from "../components/Comments";
import { getComments } from "../store/comments";

import './event.css'

export default function EventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user)
  const event = useSelector((state) => state.events[id])
  const comments = useSelector((state) => Object.values(state.comments)
    .filter(comment => comment.event_id === Number.parseInt(id)))

  const [showForm, setShowForm] = useState(false);
  const [rsvp, setRsvp] = useState(false)

  useEffect(() => {
    dispatch(getEvent(id))
    user?.rsvp?.forEach(rsvp => { if (rsvp.id === event?.id) setRsvp(true) })
  }, [dispatch, id, user, event?.id])

  useEffect(() => {
    dispatch(getEvent(id))
    dispatch(getComments(id))
  }, [dispatch, id, user])

  if (!user) history.push('/login')

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
    if (user.id === event.user.id) {
      content = (
        <div>
          <button type='button' onClick={() => showForm === false ? setShowForm(true) : setShowForm(false)}>Edit</button>
          <button type="button" onClick={() => {
            dispatch(deleteEvent(id))
            history.push('/events')
          }}>delete</button>

        </div>
      )
    }
  } else {
    content = (
      <>
      </>
    )
  }

  return (
    <div className='content'>
      <div className='event__header'>
        <div className='header__eventinfo'>
          <span className='eventinfo__start'>
            {event.start}
          </span>
          <h2 className='eventinfo__name'>
            {event.name}
          </h2>
        </div>
        <div className='header__userinfo'>
          <div className='userinfo__image--holder'>
            <img className='userinfo__image' src={event.user.vehicle_pic} />
          </div>
          <div className='userinfo__host'>
            <span>Hosted By</span>
            <span className='host__name'>{event.user.username}</span>
          </div>
        </div>
      </div>
      <div className='content__event'>
        <div className='event__image'>
          <img src={event.image} alt='event' />
        </div>
        <h2>
          Details
        </h2>
        <p>
          {event.description}
        </p>

        {content}
        {showForm && (
          <EventForm id={id} event={event} />
        )}
        <Comments id={id} comments={comments} />
      </div>

      <div className='content__side'>
        {!rsvp &&
          <button onClick={cRsvp}>Rsvp</button>
        }
        {rsvp &&
          <button onClick={dRsvp}>Delete Rsvp</button>
        }
      </div>
    </ div>

  )
}
