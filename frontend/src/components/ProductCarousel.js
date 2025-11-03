import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-dark'
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem'
      }}
    >
      {products && products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              position: 'relative',
              height: '400px',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image
                src={product.image}
                alt={product.name}
                style={{
                  maxHeight: '400px',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
            <Carousel.Caption style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              paddingBottom: '2rem',
              paddingTop: '3rem',
              left: 0,
              right: 0,
              bottom: 0
            }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontSize: '1.75rem',
                fontWeight: '700',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                marginBottom: '0.5rem'
              }}>
                {product.name}
              </h2>
              <p style={{
                color: 'var(--accent-primary)',
                fontSize: '1.5rem',
                fontWeight: '600',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                ${product.price}
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel