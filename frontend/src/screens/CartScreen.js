import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/login?redirect=shipping')
    }
  }

  return (
    <div className='container' style={{ padding: '2rem 0', minHeight: '70vh' }}>
      <div className='row'>
        <div className='col-md-8'>
          <div style={{ marginBottom: '2rem' }}>
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
              Your cart is empty <Link to='/' style={{ color: 'var(--accent-primary)' }}>Go Back</Link>
            </Message>
          ) : (
            <div className='list-group list-group-flush'>
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className='list-group-item'
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div className='row align-items-center'>
                    <div className='col-md-2'>
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
                    <div className='col-md-3'>
                      <Link
                        to={`/product/${item.product}`}
                        style={{
                          color: 'var(--text-primary)',
                          fontSize: '1rem',
                          fontWeight: '500',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className='col-md-2'>
                      <span style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        ${item.price}
                      </span>
                    </div>
                    <div className='col-md-2'>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                          padding: '0.5rem',
                          fontSize: '0.95rem',
                          width: '100%'
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            style={{
                              backgroundColor: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-md-2'>
                      <button
                        type='button'
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid var(--danger-color)',
                          color: 'var(--danger-color)',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          width: '100%',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--danger-color)'
                          e.currentTarget.style.color = '#ffffff'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                          e.currentTarget.style.color = 'var(--danger-color)'
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              </div>
              <div className='list-group-item' style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0 1.5rem 1.5rem'
              }}>
                <button
                  type='button'
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
                  onMouseEnter={(e) => {
                    if (cartItems.length > 0) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 113, 227, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen