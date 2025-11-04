import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deleteOrder, payOrderAdmin, deliverOrder } from '../actions/orderActions'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'

const OrderListScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const orderDelete = useSelector((state) => state.orderDelete)
  const { success: successDelete } = orderDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
      if (successDelete) {
        dispatch({ type: ORDER_DELETE_RESET })
      }
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id))
    }
  }

  const markAsPaidHandler = (id) => {
    if (window.confirm('Mark this order as paid?')) {
      dispatch(payOrderAdmin(id))
    }
  }

  const markAsDeliveredHandler = (order) => {
    dispatch(deliverOrder(order))
  }

  return (
    <div className='container' style={{ padding: '2rem 0' }}>
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
          <i className='fas fa-shopping-bag' style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
          Order Management
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          marginBottom: 0
        }}>
          View and manage all customer orders
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table className='table-sm' style={{ width: '100%', marginBottom: 0 }}>
              <thead>
                <tr style={{
                  background: 'var(--bg-tertiary)',
                  borderBottom: '2px solid var(--border-primary)'
                }}>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ID</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>PRODUCT</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>USER</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>DATE</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>TOTAL</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>PAID</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>DELIVERED</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-primary)',
                    transition: 'background 0.2s ease'
                  }}>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace'
                    }}>{order._id}</td>
                    <td style={{ padding: '1rem' }}>
                      {order.orderItems && order.orderItems.length > 0 && (
                        <img
                          src={order.orderItems[0].image}
                          alt={order.orderItems[0].name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            border: '1px solid var(--border-primary)'
                          }}
                        />
                      )}
                    </td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-primary)',
                      fontWeight: '500'
                    }}>{order.user && order.user.name}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-secondary)'
                    }}>{order.createdAt.substring(0, 10)}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--accent-success)',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>${order.totalPrice}</td>
                    <td style={{ padding: '1rem' }}>
                      {order.isPaid ? (
                        <span style={{ color: 'var(--text-secondary)' }}>
                          <i className='fas fa-check' style={{ color: 'var(--accent-success)', marginRight: '0.5rem' }}></i>
                          {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        <i className='fas fa-times' style={{ color: 'var(--accent-danger)', fontSize: '1.1rem' }}></i>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {order.isDelivered ? (
                        <span style={{ color: 'var(--text-secondary)' }}>
                          <i className='fas fa-check' style={{ color: 'var(--accent-success)', marginRight: '0.5rem' }}></i>
                          {order.deliveredAt.substring(0, 10)}
                        </span>
                      ) : (
                        <i className='fas fa-times' style={{ color: 'var(--accent-danger)', fontSize: '1.1rem' }}></i>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link to={`/order/${order._id}`}>
                          <button
                            style={{
                              background: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-primary)',
                              color: 'var(--text-primary)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              fontSize: '0.85rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'var(--accent-primary)'
                              e.target.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'var(--bg-tertiary)'
                              e.target.style.color = 'var(--text-primary)'
                            }}
                          >
                            <i className='fas fa-eye' style={{ marginRight: '0.3rem' }}></i>
                            Details
                          </button>
                        </Link>
                        
                        {!order.isPaid && (
                          <button
                            onClick={() => markAsPaidHandler(order._id)}
                            style={{
                              background: 'var(--bg-tertiary)',
                              border: '1px solid var(--accent-success)',
                              color: 'var(--accent-success)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              fontSize: '0.85rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'var(--accent-success)'
                              e.target.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'var(--bg-tertiary)'
                              e.target.style.color = 'var(--accent-success)'
                            }}
                          >
                            <i className='fas fa-check' style={{ marginRight: '0.3rem' }}></i>
                            Mark Paid
                          </button>
                        )}

                        {order.isPaid && !order.isDelivered && (
                          <button
                            onClick={() => markAsDeliveredHandler(order)}
                            style={{
                              background: 'var(--bg-tertiary)',
                              border: '1px solid var(--accent-warning)',
                              color: 'var(--accent-warning)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              fontSize: '0.85rem'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'var(--accent-warning)'
                              e.target.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'var(--bg-tertiary)'
                              e.target.style.color = 'var(--accent-warning)'
                            }}
                          >
                            <i className='fas fa-shipping-fast' style={{ marginRight: '0.3rem' }}></i>
                            Mark Delivered
                          </button>
                        )}

                        <button
                          onClick={() => deleteHandler(order._id)}
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--accent-danger)',
                            color: 'var(--accent-danger)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'var(--accent-danger)'
                            e.target.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'var(--bg-tertiary)'
                            e.target.style.color = 'var(--accent-danger)'
                          }}
                        >
                          <i className='fas fa-trash' style={{ marginRight: '0.3rem' }}></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderListScreen