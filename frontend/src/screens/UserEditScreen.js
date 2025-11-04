import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const userId = id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link
        to='/admin/userlist'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          color: 'var(--text-primary)',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          marginBottom: '2rem'
        }}
      >
        <i className='fas fa-arrow-left' style={{ marginRight: '0.5rem' }}></i>
        Go Back
      </Link>
      <FormContainer>
        <div style={{
          marginBottom: '2rem',
          borderBottom: '2px solid var(--accent-primary)',
          paddingBottom: '1rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            <i className='fas fa-user-edit' style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
            Edit User
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            marginBottom: 0
          }}>
            Update user information and permissions
          </p>
        </div>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor='name' style={{
                display: 'block',
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Name</label>
              <input
                id='name'
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-primary)'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor='email' style={{
                display: 'block',
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Email Address</label>
              <input
                id='email'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-primary)'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <input
                    type='checkbox'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    style={{
                      marginRight: '0.75rem',
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontWeight: '500' }}>Is Admin</span>
                </label>
              </div>
            </div>

            <button
              type='submit'
              style={{
                background: 'var(--accent-primary)',
                border: 'none',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                width: '100%',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 113, 227, 0.3)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 12px rgba(0, 113, 227, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 8px rgba(0, 113, 227, 0.3)'
              }}
            >
              <i className='fas fa-save' style={{ marginRight: '0.5rem' }}></i>
              Update User
            </button>
          </form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen