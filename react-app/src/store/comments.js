const SET_COMMNET = 'comments/SET_COMMNET'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

const setComment = (comment) => ({
  type: SET_COMMNET,
  comment
})

const removeComment = (id) => ({
  type: REMOVE_COMMENT,
  id
})

export const getComments = (id) => async dispatch => {
  const res = await fetch(`/api/events/${id}/comments`)

  if (res.ok) {
    const comments = await res.json();
    dispatch(setComment(comments))
  }
}

export const createComment = (payload) => async dispatch => {
  const { comment, event_id, user_id } = payload;

  const res = await fetch(`/api/events/${event_id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      comment, user_id, event_id
    })
  });

  if (res.ok){
    const data = await res.json();
    dispatch(setComment(data))
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

export const updateComment = (payload) => async dispatch => {
  const { id, comment, event_id, user_id } = payload;

  const res = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      comment, event_id, user_id,
    })
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setComment(data))
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

export const deleteComment = (id) => async dispatch => {
  const res = await fetch(`/api/comments/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    await res.json();
    dispatch(removeComment(id))
  }
}


const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = {...state}
    switch (action.type){
      case SET_COMMNET:
        action.comment.comments.forEach(com => {
            newState[com.id] = com
        })
        return newState
      case REMOVE_COMMENT:
        delete newState[action.id]
        return newState
      default:
        return state;
    }
}

export default commentsReducer
