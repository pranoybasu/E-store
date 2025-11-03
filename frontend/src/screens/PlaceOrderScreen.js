import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
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
    <div style={{ padding: '2rem 0', minHeight: '70vh' }}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
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
            </ListGroup.Item>

            <ListGroup.Item style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
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
            </ListGroup.Item>

            <ListGroup.Item style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
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
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: index < cart.cartItems.length - 1 ? '1px solid var(--border-color)' : 'none',
                        padding: '1rem 0'
                      }}
                    >
                      <Row className='align-items-center'>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            style={{
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)'
                            }}
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{
                              color: 'var(--text-primary)',
                              textDecoration: 'none',
                              fontWeight: '500'
                            }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} style={{ color: 'var(--text-secondary)' }}>
                          {item.qty} x ${item.price} = <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>${(item.qty * item.price).toFixed(2)}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            position: 'sticky',
            top: '2rem'
          }}>
            <ListGroup variant='flush'>
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1.5rem',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <h2 style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '0'
                }}>
                  Order Summary
                </h2>
              </ListGroup.Item>
              
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem'
              }}>
                <Row>
                  <Col style={{ color: 'var(--text-secondary)' }}>Items</Col>
                  <Col style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem'
              }}>
                <Row>
                  <Col style={{ color: 'var(--text-secondary)' }}>Shipping</Col>
                  <Col style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem'
              }}>
                <Row>
                  <Col style={{ color: 'var(--text-secondary)' }}>Tax</Col>
                  <Col style={{ color: 'var(--text-primary)', fontWeight: '600', textAlign: 'right' }}>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <Row>
                  <Col style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>Total</Col>
                  <Col style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '700', textAlign: 'right' }}>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              {error && (
                <ListGroup.Item style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '1rem 1.5rem'
                }}>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}
              
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '1.5rem'
              }}>
                <Button
                  type='button'
                  className='btn-block'
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
                  onMouseOver={(e) => {
                    if (cart.cartItems.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 113, 227, 0.3)'
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen