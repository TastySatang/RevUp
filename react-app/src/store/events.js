const SET_EVENT = 'events/SET_EVENT'
const REMOVE_EVENT = 'events/REMOVE_EVENT'

const setEvent = (event) =>({
  type: SET_EVENT,
  event
})

const removeEvent = (id) => ({
  type: REMOVE_EVENT,
  id
})

export const getEvents = () => async dispatch => {
  const res = await fetch('/api/events/');

  if (res.ok) {
    const events = await res.json();
    dispatch(setEvent(events))
  }
}


export const getEvent = (id) => async dispatch => {
  const res = await fetch(`/api/events/${id}`)

  if (res.ok) {
    const event = await res.json();
    dispatch(setEvent(event))
  }
}

export const createEvent = (event) => async dispatch => {
  console.log('please log')
  const { name, user_id, category,
    description, address, city, state,
    image, start, end } = event;

  console.log('before sending to api', event)

  const res = await fetch('/api/events/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, user_id, category,
      description, address, city, state,
      image, start, end
    } )
  });

  if (res.ok) {
    const data = await res.json();
    console.log('monki', data)
    dispatch(setEvent(data))
    return data
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const updateEvent = (event) => async dispatch => {
  const { name, user_id, category,
    description, address, city, state,
    image, start, end } = event;

  const res = await fetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, user_id, category,
      description, address, city, state,
      image, start, end
    })
  });

  if (res.ok) {
    const data = await res.json();
    console.log('monkeydata',data)
    dispatch(setEvent(data))
    return data
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const deleteEvent = (id) => async dispatch => {
  console.log('inside thunk start')
  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    await res.json();
    console.log('after res ok', res.json)
    dispatch(removeEvent(id))
  }
}

const initialState = {};

const eventReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type){
    case SET_EVENT:
      // newState = { ...state }
      action.event.events.forEach(eve => {
        newState[eve.id] = eve
      })
      return newState
    case REMOVE_EVENT:
      // newState = {...state};
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

export default eventReducer
