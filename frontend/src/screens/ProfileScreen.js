import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import{ listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading:loadingOrders, error:errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET })
          dispatch(getUserDetails('profile'))
          dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
        //dispatch update user
        if (user && user._id) {
          dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <Row>
        <Col md={4}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className='fas fa-user-circle' style={{ color: 'var(--accent-primary)' }}></i>
              User Profile
            </h2>

            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated!</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name' style={{ marginBottom: '1.5rem' }}>
                <Form.Label style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Name
                </Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.75rem'
                  }}
                />
              </Form.Group>

              <Form.Group controlId='email' style={{ marginBottom: '1.5rem' }}>
                <Form.Label style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.75rem'
                  }}
                />
              </Form.Group>

              <Form.Group controlId='password' style={{ marginBottom: '1.5rem' }}>
                <Form.Label style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Password
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Leave blank to keep current'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.75rem'
                  }}
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword' style={{ marginBottom: '1.5rem' }}>
                <Form.Label style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.75rem'
                  }}
                />
              </Form.Group>

              <Button
                type='submit'
                variant='primary'
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  padding: '0.875rem',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 20px rgba(0, 113, 227, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <i className='fas fa-save' style={{ marginRight: '0.5rem' }}></i>
                Update Profile
              </Button>
            </Form>
          </div>
        </Col>

        <Col md={8}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className='fas fa-shopping-bag' style={{ color: 'var(--accent-primary)' }}></i>
              My Orders
            </h2>

            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)' }}>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>ID</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>DATE</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>TOTAL</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>PAID</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>DELIVERED</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <td style={{ color: 'var(--text-secondary)', padding: '1rem' }}>{order._id}</td>
                        <td style={{ color: 'var(--text-secondary)', padding: '1rem' }}>{order.createdAt.substring(0, 10)}</td>
                        <td style={{ color: 'var(--accent-primary)', fontWeight: '600', padding: '1rem' }}>${order.totalPrice}</td>
                        <td style={{ padding: '1rem' }}>
                          {order.isPaid ? (
                            <span style={{ color: 'var(--accent-success)' }}>
                              <i className='fas fa-check-circle' style={{ marginRight: '0.25rem' }}></i>
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <i className='fas fa-times' style={{ color: 'var(--accent-danger)' }}></i>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {order.isDelivered ? (
                            <span style={{ color: 'var(--accent-success)' }}>
                              <i className='fas fa-check-circle' style={{ marginRight: '0.25rem' }}></i>
                              {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <i className='fas fa-times' style={{ color: 'var(--accent-danger)' }}></i>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button
                              className='btn-sm'
                              variant='light'
                              style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileScreen