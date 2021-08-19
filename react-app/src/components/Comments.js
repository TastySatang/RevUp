import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, updateComment, deleteComment, getComments } from '../store/comments';

const Comments = ({id, comments}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const [editId, setEditId] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editComment, setEditComment] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(getComments(id))
  }, [id, dispatch, editComment])

  const handleNewSubmit = async e => {
    e.preventDefault()

    let payload = {
      comment,
      user_id: user.id,
      event_id: Number.parseInt(id),
    }

    setComment('')
    await dispatch(createComment(payload))
  }

  const handleUpdateSubmit = async e => {
    e.preventDefault()

    let payload = {
      id: editId,
      comment: editComment,
      user_id: user.id,
      event_id: Number.parseInt(id),
    }

    console.log('inside handle update', payload)
    setEditId(false)
    setShowEdit(false)
    await dispatch(updateComment(payload))
  }

  const handleDeleteSubmit = async e => {
    e.preventDefault()

    await dispatch(deleteComment(editId))
  }



  return (
    <>
      <form onSubmit={handleNewSubmit}>
        <textarea type='text'
        placeholder='New Comment'
        value={comment}
        onChange={e => setComment(e.target.value)}/>
        <button type='submit'>submit</button>
      </form>

      {comments?.map((comment,idx) => {
        let content;
        if (showEdit && comment.id === editId) {
          content = (
            <form onSubmit={handleUpdateSubmit}>
              <textarea type='text'
                placeholder='Edit Comment'
                value={editComment}
                onChange={e => setEditComment(e.target.value)} />
              <button type='submit'>submit</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
              <button onClick={handleDeleteSubmit}>Delete</button>
            </form>
          )
        } else {
          content = (
            <div>
              {comment.user.username}
              {comment.comment}

              {comment.user_id === user?.id  && (
                <button onClick={() => {
                  showEdit === false ? setShowEdit(true) : setShowEdit(false)
                  setEditId(comment.id)
                  setEditComment(comment.comment)
                  console.log(editId, showEdit)
                }}>Show Edit</button>
              )}
            </div>
          )
        }

        return (
          <div key={idx}>
              {content}
          </div>
        )

      })}


    </>
  )
}


export default Comments
