import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEvents } from "../store/events"

export default function EventsPage() {
    const dispatch = useDispatch();
    const events = useSelector((state) => Object.values(state.events))

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch])
    console.log(events)

    return (
        <>
            {events.map((event, idx) => {
                return(
                    <div key={idx}>
                        {event.name}
                    </div>
                )
            })}
        </>
    )
}
