import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
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
          border: '1px solid var(--border-color)',
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
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' style={{ marginBottom: '2rem' }}>
              <div style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  style={{
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </Form.Group>

            <Button
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
                boxShadow: '0 2px 8px rgba(0, 113, 227, 0.3)'
              }}
            >
              <i className='fas fa-save' style={{ marginRight: '0.5rem' }}></i>
              Update User
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen