import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const productId = id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <div style={{
      padding: '2rem 0',
      minHeight: '70vh'
    }}>
      <Row>
        <Col md={8}>
          <div style={{
            marginBottom: '2rem'
          }}>
            <h1 style={{
              color: 'var(--text-primary)',
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Shopping Cart
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              Review your items before checkout
            </p>
          </div>
          
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  <Row className='align-items-center'>
                    <Col md={2}>
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
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{
                          color: 'var(--text-primary)',
                          fontSize: '1rem',
                          fontWeight: '500',
                          textDecoration: 'none'
                        }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                      <span style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        ${item.price}
                      </span>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                          padding: '0.5rem',
                          fontSize: '0.95rem'
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid var(--danger)',
                          color: 'var(--danger)',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--danger)'
                          e.currentTarget.style.color = '#ffffff'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = 'var(--danger)'
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
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
                padding: '1.5rem'
              }}>
                <h2 style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Order Summary
                </h2>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </span>
                  <span style={{
                    color: 'var(--accent-primary)',
                    fontSize: '1.5rem',
                    fontWeight: '700'
                  }}>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0 1.5rem 1.5rem'
              }}>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  style={{
                    backgroundColor: cartItems.length === 0 ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: cartItems.length === 0 ? 0.5 : 1
                  }}
                  onMouseOver={(e) => {
                    if (cartItems.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 113, 227, 0.3)'
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen