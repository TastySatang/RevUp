import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, updateComment, deleteComment, getComments } from '../store/comments';

const Comments = ({ id, comments }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const [editId, setEditId] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editComment, setEditComment] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    dispatch(getComments(id))
  }, [id, dispatch, editComment])

  const handleNewSubmit = async e => {
    e.preventDefault()

    if (!comment) {
      setErrors('Please type your comment before posting.')
      return
    }

    let payload = {
      comment,
      user_id: user.id,
      event_id: Number.parseInt(id),
    }

    setComment('')
    setErrors('')
    await dispatch(createComment(payload))
  }

  const handleUpdateSubmit = async e => {
    e.preventDefault()

    if (!editComment) {
      setErrors('Please type your comment before posting.')
      return
    }

    let payload = {
      id: editId,
      comment: editComment,
      user_id: user.id,
      event_id: Number.parseInt(id),
    }

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
      <form
        className='comment__form'
        onSubmit={handleNewSubmit}>
        <textarea type='text'
          maxLength='500'
          className='comment__form--textarea'
          placeholder='New Comment (limit 500 chars)'
          value={comment}
          onChange={e => setComment(e.target.value)} />
        <div className='form__barrel'>
          <p className='maxLength'>{comment.length}/{500}</p>
          <div className='error__container'>
            {errors && (
              <p className='errors'>
                {errors}
              </p>
            )}
          </div>
        </div>
        <button className='comment__button' type='submit'>submit</button>
      </form>

      {comments?.slice(0).reverse().map((comment, idx) => {
        let content;
        if (showEdit && comment.id === editId) {
          content = (
            <div className='content__holder'>
              <div className='header__userinfo'>
                <div className='userinfo__image--holder'>
                  <Link to={`/users/${comment.user.id}`}>
                    <img className='userinfo__image' src={comment.user.vehicle_pic} alt='userinfo' />
                  </Link>
                </div>
                <div className='userinfo__name'>
                  {comment.user.username}
                </div>
              </div>
              <form className='comment__editform'
                onSubmit={handleUpdateSubmit}>
                <textarea
                  maxLength={500}
                  wrap='soft'
                  className='editform__textarea'
                  type='text'
                  placeholder='Edit Comment'
                  value={editComment}
                  onChange={e => setEditComment(e.target.value)} />
                <div className='form__barrel'>
                  <p className='maxLength'>{editComment.length}/{500}</p>
                  <div className='error__container'>
                    {errors && (
                      <p className='errors'>
                        {errors}
                      </p>
                    )}
                  </div>
                </div>
                <div className='editbuttons__holder'>
                  <button className='button' type='submit'>Submit</button>
                  <button className='button' onClick={() => setShowEdit(false)}>Cancel</button>
                  <button className='button delete' onClick={handleDeleteSubmit}>Delete</button>
                </div>
              </form>
            </div>
          )
        } else {
          content = (
            <div className='content__holder'>
              <div className='header__userinfo'>
                <div className='userinfo__image--holder'>
                  <Link to={`/users/${comment.user.id}`}>
                    <img className='userinfo__image' src={comment.user.vehicle_pic} alt='userinfo' />
                  </Link>
                </div>
                <div className='userinfo__name'>
                  {comment.user.username}
                </div>
              </div>

              <div className='comment'>
                {comment.comment}
              </div>
              {comment.user_id === user?.id && (
                <button
                  className='edit'
                  onClick={() => {
                    showEdit === false ? setShowEdit(true) : setShowEdit(false)
                    setEditId(comment.id)
                    setEditComment(comment.comment)
                  }}>Edit</button>
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
