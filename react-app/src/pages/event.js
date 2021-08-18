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

  useEffect(() => {
    dispatch(getEvent(id))

  }, [dispatch, id, user])

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
    <>
      <div>
        {event?.name}
      </div>
      {content}
      {showForm && (
          <EventForm id={id} event={event}/>
      )}
    </>
  )
}
