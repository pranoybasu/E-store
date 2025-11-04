import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate
  
  useEffect(() => {
    if(success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  },[navigate, success])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  return (
    <div className='container' style={{ padding: '2rem 0', minHeight: '70vh' }}>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='row'>
        <div className='col-md-8'>
          <div className='list-group list-group-flush'>
            {/* Shipping Section */}
            <div className='list-group-item' style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-shipping-fast" style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
                Shipping
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </div>

            {/* Payment Section */}
            <div className='list-group-item' style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-credit-card" style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
                Payment Method
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>

            {/* Order Items Section */}
            <div className='list-group-item' style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}>
                <i className="fas fa-shopping-bag" style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
                Order Items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className='list-group list-group-flush'>
                  {cart.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className='list-group-item'
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: index < cart.cartItems.length - 1 ? '1px solid var(--border-primary)' : 'none',
                        padding: '1rem 0'
                      }}
                    >
                      <div className='row align-items-center'>
                        <div className='col-md-1'>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '100%',
                              borderRadius: '8px',
                              border: '1px solid var(--border-primary)'
                            }}
                          />
                        </div>
                        <div className='col'>
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
                        <div className='col-md-4' style={{ color: 'var(--text-secondary)' }}>
                          {item.qty} x ${item.price} = <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>${(item.qty * item.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className='col-md-4'>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: '12px',
            position: 'sticky',
            top: '2rem'
          }}>
            <div className='list-group list-group-flush'>
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1.5rem',
                borderBottom: '1px solid var(--border-primary)'
              }}>
                <h2 style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '0'
                }}>
                  Order Summary
                </h2>
              </div>
              
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem'
              }}>
                <div className='row'>
                  <div className='col' style={{ color: 'var(--text-secondary)' }}>Items</div>
                  <div className='col' style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>${cart.itemsPrice}</div>
                </div>
              </div>
              
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem'
              }}>
                <div className='row'>
                  <div className='col' style={{ color: 'var(--text-secondary)' }}>Shipping</div>
                  <div className='col' style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>${cart.shippingPrice}</div>
                </div>
              </div>
              
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem'
              }}>
                <div className='row'>
                  <div className='col' style={{ color: 'var(--text-secondary)' }}>Tax</div>
                  <div className='col' style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>${cart.taxPrice}</div>
                </div>
              </div>
              
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-primary)',
                borderBottom: '1px solid var(--border-primary)'
              }}>
                <div className='row'>
                  <div className='col' style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>Total</div>
                  <div className='col' style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '700', textAlign: 'right' }}>${cart.totalPrice}</div>
                </div>
              </div>
              
              {error && (
                <div className='list-group-item' style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '1rem 1.5rem'
                }}>
                  <Message variant='danger'>{error}</Message>
                </div>
              )}
              
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1.5rem'
              }}>
                <button
                  type='button'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                  style={{
                    backgroundColor: cart.cartItems.length === 0 ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    cursor: cart.cartItems.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: cart.cartItems.length === 0 ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (cart.cartItems.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 113, 227, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen