import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../config'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const orderId = id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && order) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${API_URL}/api/config/paypal`)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid && order.paymentMethod === 'PayPal') {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, navigate])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div className='container' style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>
          Order Details
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Order ID: {order._id}
        </p>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          {/* Shipping Section */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className='fas fa-shipping-fast' style={{ color: 'var(--accent-primary)' }}></i>
              Shipping Information
            </h2>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Name:</strong> {order.user.name}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`} style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
                  {order.user.email}
                </a>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Address:</strong>{' '}
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className='fas fa-credit-card' style={{ color: 'var(--accent-primary)' }}></i>
              Payment Method
            </h2>
            <div style={{ color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </div>
          </div>

          {/* Order Items Section */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className='fas fa-shopping-bag' style={{ color: 'var(--accent-primary)' }}></i>
              Order Items
            </h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: index < order.orderItems.length - 1 ? '1px solid var(--border-primary)' : 'none'
                  }}>
                    <div style={{ width: '80px', marginRight: '1rem' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ 
                          width: '100%',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div style={{
                      color: 'var(--text-secondary)',
                      textAlign: 'right',
                      minWidth: '150px'
                    }}>
                      {item.qty} x ${item.price} = <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>${item.qty * item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-4'>
          <div style={{ position: 'sticky', top: '2rem' }}>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Order Summary
              </h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border-primary)',
                  color: 'var(--text-secondary)'
                }}>
                  <span>Items</span>
                  <span>${order.itemsPrice}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border-primary)',
                  color: 'var(--text-secondary)'
                }}>
                  <span>Shipping</span>
                  <span>${order.shippingPrice}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border-primary)',
                  color: 'var(--text-secondary)'
                }}>
                  <span>Tax</span>
                  <span>${order.taxPrice}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--accent-primary)' }}>${order.totalPrice}</span>
                </div>
              </div>

              {!order.isPaid && (
                <div style={{ marginTop: '1.5rem' }}>
                  {order.paymentMethod === 'PayPal' ? (
                    <>
                      {loadingPay && <Loader />}
                      {!sdkReady ? <Loader /> : (
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                      )}
                    </>
                  ) : (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <i className="fas fa-money-bill-wave" style={{
                        fontSize: '2rem',
                        color: 'var(--accent-success)',
                        marginBottom: '0.75rem',
                        display: 'block'
                      }}></i>
                      <p style={{
                        color: 'var(--text-primary)',
                        fontWeight: '600',
                        marginBottom: '0.5rem'
                      }}>
                        Cash on Delivery
                      </p>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        margin: 0
                      }}>
                        Payment will be collected upon delivery
                      </p>
                    </div>
                  )}
                </div>
              )}

              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  type='button'
                  onClick={deliverHandler}
                  style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    padding: '0.875rem',
                    background: 'var(--accent-success)',
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
                    e.target.style.boxShadow = '0 8px 20px rgba(48, 209, 88, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <i className='fas fa-check-circle' style={{ marginRight: '0.5rem' }}></i>
                  Mark As Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderScreen