import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, updateEvent } from "../store/events";

export default function EventPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user)
  const event = useSelector((state) => state.events[id])

  const [name, setName] = useState(event?.name);
  const [category, setCategory] = useState(event?.category);
  const [day, setDay] = useState(event?.day)
  const [address, setAddress] = useState(event?.address)
  const [city, setCity] = useState(event?.city)
  const [state, setState] = useState(event?.state)
  const [image, setImage] = useState(event?.image)
  const [start, setStart] = useState(event?.start)
  const [end, setEnd] = useState(event?.end)

  useEffect(() => {
    dispatch(getEvent(id))
  }, [dispatch])

  return(
    <>
      <div>
        {event?.name}
      </div>
    </>
  )
}
