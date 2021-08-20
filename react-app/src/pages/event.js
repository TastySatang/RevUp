import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
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
          <button className='button' type='button' onClick={() => showForm === false ? setShowForm(true) : setShowForm(false)}>Edit</button>
          <button className='button delete' type="button" onClick={() => {
            dispatch(deleteEvent(id))
            history.push('/events')
          }}>DELETE EVENT</button>

        </div>
      )
    }
  } else {
    content = (
      <>
      </>
    )
  }

  const eventStart = event.start.split('')
  const eventEnd = event.end.split('')
  eventStart.splice(-7, 3)
  eventEnd.splice(-7, 3)

  return (
    <div className='content'>
      <div className='event__header'>
        <div className='header__eventinfo'>
          <span className='eventinfo__start'>
            {eventStart}
          </span>
          <h2 className='eventinfo__name'>
            {event.name}
          </h2>
        </div>
        <div className='header__userinfo'>
          <div className='userinfo__image--holder'>
            <Link to={`/users/${event.user.id}`}>
              <img className='userinfo__image' src={event.user.vehicle_pic} alt='userinfo' />
            </Link>
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
        <div className='event__details'>
          <h2 className='event__h2'>
            Details
          </h2>
          {content}
        </div>
        <p className='event__description'>
          {event.description}
        </p>

        {showForm && (
          <EventForm id={id} event={event} />
        )}
        <Comments id={id} comments={comments} />
      </div>

      <div className='content__side'>
        <div className='side__date'>
          <i className="fas fa-clock"></i>
          <div className='date__info'>
            <p>
              From {eventStart}
            </p>
            <p>
              To {eventEnd}
            </p>
          </div>
        </div>

        <div className='side__location'>
          <i className="fas fa-map-marker-alt"></i>
          <div className='location__info'>
            {event.address} · {event.city}, {event.state}
          </div>
        </div>

        {!rsvp &&
          <button className='rsvp--do' onClick={cRsvp}>RSVP</button>
        }
        {rsvp &&
          <button className='rsvp--undo' onClick={dRsvp}>Delete RSVP</button>}
        <h3 className='attendeeh3'>{event.rsvp.length} Attendees</h3>
        <div className='attendee__list'>
          {event.rsvp.map((attendee, idx) => {

            return (
              <div key={idx} className='holder__attendee'>
                <div className='holder__image--holder'>
                  <Link to={`/users/${attendee.id}`}>
                    <img className='holder__image' src={attendee.vehicle_pic} alt='userinfo' />
                  </Link>
                </div>
                <div className='holder__username'>
                  {attendee.username}
                </div>


              </div>
            )
          })}
        </div>
      </div>
    </ div>

  )
}
