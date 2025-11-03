import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <Container style={{ padding: '2rem 0' }}>
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
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <Table responsive className='table-sm' style={{ marginBottom: 0 }}>
            <thead>
              <tr style={{
                background: 'var(--bg-tertiary)',
                borderBottom: '2px solid var(--border-color)'
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
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <td style={{
                    padding: '1rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace'
                  }}>{order._id}</td>
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
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        className='btn-sm'
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <i className='fas fa-eye' style={{ marginRight: '0.3rem' }}></i>
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
    </Container>
  )
}

export default OrderListScreen