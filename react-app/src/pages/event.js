import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvent } from "../store/events";
import EventForm from "../components/EventForm";
import { getComments } from "../store/comments";

export default function EventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user)
  const event = useSelector((state) => state.events[id])
  const comments = useSelector((state) => Object.values(state.comments)
  .filter(comment => comment.event_id === Number.parseInt(id)))

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getEvent(id))
    dispatch(getComments(id))
  }, [dispatch, id, user])

  console.log(comments)

  if (event === undefined) {
      return (
          <>
          </>
      )
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

  return(
    <div className='content'>
      <div className='event__header'>
        {event.user.username}
      </div>
      <div className='event__content'>
        <div className='event__image'>
          <img src={event.image} alt='event'/>
        </div>
        <div>
          {event.name}
        </div>
      </div>

      {content}
      {showForm && (
          <EventForm id={id} event={event}/>
      )}

      {comments.map((comment, idx) => {
        return (
          <div key={idx}>
            <p>{comment.comment}</p>
          </div>
        )
      })}
    </ div>

  )
}
