import EventForm from "../components/EventForm"

export default function CreateEvent() {
    return (
        <div className='Event__Create--content'>
            <div className='fakeform'>
                <h1 style={{"font-size": "30px", "paddingLeft": "10px", "paddingRight": "10px", "paddingBottom": "10px", "fontStyle": "Arial"}}>Create Event Page</h1>
                <EventForm />
            </div>
        </ div>
    )
}
