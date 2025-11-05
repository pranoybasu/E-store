import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  // Password complexity regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const submitHandler = (e) => {
    e.preventDefault()
    setMessage(null)
    
    // Only validate password if user is trying to change it
    if (password) {
      if (!passwordRegex.test(password)) {
        setMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)')
        return
      }
      
      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
        return
      }
    }
    
    // Dispatch update user
    if (user && user._id) {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className='row'>
        <div className='col-md-4'>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
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

            <form onSubmit={submitHandler}>
              <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                <label htmlFor='name' style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.75rem',
                    width: '100%'
                  }}
                />
              </div>

              <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                <label htmlFor='email' style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.75rem',
                    width: '100%'
                  }}
                />
              </div>

              <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                <label htmlFor='password' style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder='Leave blank to keep current'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      padding: '0.75rem',
                      paddingRight: '3rem',
                      width: '100%'
                    }}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      fontSize: '1.1rem'
                    }}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
                <small style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem'
                }}>
                  Min. 8 characters with uppercase, lowercase, number & special character (@$!%*?&)
                </small>
              </div>

              <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                <label htmlFor='confirmPassword' style={{
                  color: 'var(--text-primary)',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  display: 'block'
                }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    placeholder='Confirm new password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      padding: '0.75rem',
                      paddingRight: '3rem',
                      width: '100%'
                    }}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      fontSize: '1.1rem'
                    }}
                  >
                    <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
                {password && confirmPassword && (
                  <small style={{
                    display: 'block',
                    marginTop: '0.5rem',
                    color: password === confirmPassword ? '#28a745' : '#dc3545',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {password === confirmPassword ? (
                      <><i className='fas fa-check-circle'></i> Passwords match</>
                    ) : (
                      <><i className='fas fa-times-circle'></i> Passwords do not match</>
                    )}
                  </small>
                  )}
                </div>
  
                <button
                type='submit'
                className='btn btn-primary'
                style={{
                  marginTop: '1rem',
                  padding: '0.875rem',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%'
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
              </button>
            </form>
          </div>
        </div>

        <div className='col-md-8'>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
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
                <table className='table table-sm'>
                  <thead>
                    <tr style={{ background: 'var(--bg-tertiary)' }}>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>ID</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>DATE</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>PRODUCTS</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>TOTAL</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>PAID</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}>DELIVERED</th>
                      <th style={{ color: 'var(--text-primary)', padding: '1rem' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders && orders.length > 0 ? orders.map(order => (
                      <tr key={order._id} style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
                        <td style={{ color: 'var(--text-secondary)', padding: '1rem' }}>{order._id}</td>
                        <td style={{ color: 'var(--text-secondary)', padding: '1rem' }}>{order.createdAt.substring(0, 10)}</td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {order.orderItems && order.orderItems.map((item, index) => (
                              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {item.product && item.product.image ? (
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name || item.name}
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      objectFit: 'cover',
                                      borderRadius: '6px',
                                      border: '1px solid var(--border-primary)'
                                    }}
                                  />
                                ) : (
                                  <div style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <i className='fas fa-image' style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}></i>
                                  </div>
                                )}
                                <div style={{ flex: 1 }}>
                                  <div style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    marginBottom: '0.125rem'
                                  }}>
                                    {item.product && item.product.name ? item.product.name : item.name}
                                  </div>
                                  <div style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.75rem'
                                  }}>
                                    Qty: {item.qty}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
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
                          <Link to={`/order/${order._id}`}>
                            <button
                              style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-primary)',
                                color: 'var(--text-primary)',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen