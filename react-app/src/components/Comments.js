import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, updateComment, deleteComment } from '../store/comments';

const Comments = ({id, comments}) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.session.user)
  const [comment, setComment] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    let payload = {
      comment,
      user_id: user.id,
      event_id: Number.parseInt(id),
    }

    setComment('')
    await dispatch(createComment(payload))
  }



  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea type='text'
        placeholder='New Comment'
        value={comment}
        onChange={e => setComment(e.target.value)}/>
        <button type='submit'>submit</button>
      </form>


      {comments?.map((comment,idx) => (
        <div key={idx}>
          {comment.user.username}
          {'  '}
          {comment.comment}

          {/* {comment.user_id === user.id && (
            <button onClick={(e) => }>
              edit
            </button>
          )} */}
        </div>
      ))}


    </>
  )
}


export default Comments
