import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber || 1))
  }, [dispatch, keyword, pageNumber])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: 'var(--spacing-xl)'
    }}>
      <Meta />
      <div className='container'>
        {!keyword ? (
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <ProductCarousel />
          </div>
        ) : (
          <Link
            to='/'
            className='btn btn-secondary'
            style={{
              marginBottom: 'var(--spacing-lg)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <i className="fas fa-arrow-left"></i> Go Back
          </Link>
        )}
        
        <div style={{
          marginBottom: 'var(--spacing-lg)',
          paddingBottom: 'var(--spacing-md)',
          borderBottom: '2px solid var(--border-primary)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            marginBottom: 'var(--spacing-xs)'
          }}>
            {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.125rem',
            margin: '0'
          }}>
            Discover our premium collection of tech products
          </p>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
          }}>
            <Loader />
          </div>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <div className='row' style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              {products.map((product) => (
                <div key={product._id} className="product-grid-item">
                  <Product product={product} />
                </div>
              ))}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'var(--spacing-xl)'
            }}>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomeScreen