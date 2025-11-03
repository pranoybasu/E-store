import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  // Auto-advance carousel
  useEffect(() => {
    if (!products || products.length === 0 || isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [products, isPaused])

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? products.length - 1 : current - 1
    )
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % products.length)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-inner">
        {products && products.map((product, index) => (
          <div
            key={product._id}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
          >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                position: 'relative',
                height: '400px',
                backgroundColor: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxHeight: '400px',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div className="carousel-caption">
                <h2>
                  {product.name}
                </h2>
                <p>
                  ${product.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Previous/Next Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        onClick={goToPrevious}
        aria-label="Previous"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={goToNext}
        aria-label="Next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {products && products.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === activeIndex ? 'active' : ''}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel