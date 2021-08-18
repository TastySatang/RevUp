import EventForm from "../components/EventForm"

export default function CreateEvent() {
    return (
        <div className='Event__Create--content'>
            <div className='fakeform'>
                <h1>Create Event Page</h1>
                <EventForm />
            </div>
        </ div>
    )
}
