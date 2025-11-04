import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'

import {
    listProductDetails,
    createProductReview,
  } from '../actions/productActions'
  import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect( () => {
        if (successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
          }
        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview] )

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(id, {
            rating,
            comment,
          })
        )
      }


    return (
        <div className='container'>
         <Link
           className='btn my-3'
           to='/'
           style={{
             backgroundColor: 'var(--bg-secondary)',
             color: 'var(--text-primary)',
             border: '1px solid var(--border-primary)',
             padding: '0.75rem 1.5rem',
             borderRadius: '8px',
             transition: 'all 0.3s ease',
             textDecoration: 'none',
             display: 'inline-block'
           }}
           onMouseEnter={(e) => {
             e.target.style.backgroundColor = 'var(--bg-tertiary)';
             e.target.style.borderColor = 'var(--accent-primary)';
           }}
           onMouseLeave={(e) => {
             e.target.style.backgroundColor = 'var(--bg-secondary)';
             e.target.style.borderColor = 'var(--border-primary)';
           }}
         >
           ← Go Back
         </Link>
         { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
           <>
           <Meta title={product.name} />
           <div className='row' style={{ marginTop: '2rem' }}>
             <div className='col-md-6' style={{ marginBottom: '2rem' }}>
               <div style={{
                 backgroundColor: 'var(--bg-secondary)',
                 borderRadius: '12px',
                 padding: '1.5rem',
                 border: '1px solid var(--border-primary)'
               }}>
                 <img
                   src={product.image}
                   alt={product.name}
                   style={{
                     borderRadius: '8px',
                     maxHeight: '500px',
                     objectFit: 'cover',
                     width: '100%'
                   }}
                 />
               </div>
             </div>
             <div className='col-md-3' style={{ marginBottom: '2rem' }}>
                   <div className='list-group list-group-flush' style={{ backgroundColor: 'transparent' }}>
                       <div className='list-group-item' style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '0 0 1rem 0'
                        }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{product.name}</h3>
                        </div>
                        <div className='list-group-item' style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '0.5rem 0'
                        }}>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        />
                        </div>
                        <div className='list-group-item' style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '1rem 0',
                          fontSize: '1.5rem',
                          color: 'var(--accent-primary)',
                          fontWeight: '600'
                        }}>
                          ${product.price}
                        </div>
                        <div className='list-group-item' style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '1rem 0'
                        }}>
                        <p style={{
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {product.description}
                        </p>
                        </div>
                        </div>
                        </div>
                        <div className='col-md-3'>
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
                              borderColor: 'var(--border-primary)',
                              color: 'var(--text-primary)'
                            }}>
                                <div className='row'>
                                <div className='col'>Price:</div>
                                <div className='col'>
                                    <strong style={{ color: 'var(--accent-primary)' }}>${product.price}</strong>
                                </div>
                                </div>
                            </div>

                            <div className='list-group-item' style={{
                              backgroundColor: 'transparent',
                              borderColor: 'var(--border-primary)',
                              color: 'var(--text-primary)'
                            }}>
                                <div className='row'>
                                    <div className='col'>Status:</div>
                                    <div className='col'>
                                    <span style={{
                                      color: product.countInStock > 0 ? 'var(--success-color)' : 'var(--danger-color)',
                                      fontWeight: '500'
                                    }}>
                                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </span>
                                    </div>
                                </div>
                            </div>
                            {product.countInStock > 0 && (
                    <div className='list-group-item' style={{
                      backgroundColor: 'transparent',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}>
                      <div className='row'>
                        <div className='col'>Qty:</div>
                        <div className='col'>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{
                              backgroundColor: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-primary)',
                              borderRadius: '6px',
                              padding: '0.5rem',
                              width: '100%'
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
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
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='list-group-item' style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '1rem'
                  }}>
                    <button
                      onClick={addToCartHandler}
                      type='button'
                      disabled={product.countInStock === 0}
                      style={{
                        width: '100%',
                        backgroundColor: product.countInStock === 0 ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                        color: 'var(--text-primary)',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (product.countInStock > 0) {
                          e.target.style.backgroundColor = '#005bb5';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (product.countInStock > 0) {
                          e.target.style.backgroundColor = 'var(--accent-primary)';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                            Add To Cart
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='row' style={{ marginTop: '3rem' }}>
                    <div className='col-md-8'>
                    <h2 style={{
                      color: 'var(--text-primary)',
                      marginBottom: '1.5rem',
                      paddingBottom: '1rem',
                      borderBottom: '2px solid var(--border-primary)'
                    }}>
                      Customer Reviews
                    </h2>
                    {product.reviews.length === 0 && <Message>No Reviews Yet</Message>}
                    <div className='list-group list-group-flush' style={{ backgroundColor: 'transparent' }}>
                        {product.reviews.map((review) => (
                        <div
                          key={review._id}
                          className='list-group-item'
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            marginBottom: '1rem'
                          }}
                        >
                            <strong style={{ color: 'var(--text-primary)' }}>{review.name || 'Anonymous'}</strong>
                            <div style={{ margin: '0.5rem 0' }}>
                              <Rating value={review.rating} />
                            </div>
                            <p style={{
                              color: 'var(--text-tertiary)',
                              fontSize: '0.875rem',
                              margin: '0.5rem 0'
                            }}>
                              {review.createdAt.substring(0, 10)}
                            </p>
                            <p style={{
                              color: 'var(--text-secondary)',
                              lineHeight: '1.6',
                              margin: '0.5rem 0 0 0'
                            }}>
                              {review.comment}
                            </p>
                        </div>
                        ))}
                        <div className='list-group-item' style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: '12px',
                          padding: '2rem',
                          marginTop: '2rem'
                        }}>
                        <h2 style={{
                          color: 'var(--text-primary)',
                          marginBottom: '1.5rem',
                          fontSize: '1.5rem'
                        }}>
                          Write a Review
                        </h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor='rating' style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>
                          Rating
                        </label>
                        <select
                          id='rating'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            width: '100%'
                          }}
                        >
                          <option value='' style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>Select...</option>
                          <option value='1' style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>1 - Poor</option>
                          <option value='2' style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>2 - Fair</option>
                          <option value='3' style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>3 - Good</option>
                          <option value='4' style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>4 - Very Good</option>
                          <option value='5' style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>5 - Excellent</option>
                        </select>
                      </div>
                      <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor='comment' style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'block' }}>
                          Comment
                        </label>
                        <textarea
                          id='comment'
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            resize: 'vertical',
                            width: '100%'
                          }}
                          placeholder='Share your experience with this product...'
                        ></textarea>
                      </div>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--text-primary)',
                          border: 'none',
                          padding: '0.75rem 2rem',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#005bb5';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'var(--accent-primary)';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Submit Review
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to='/login' style={{ color: 'var(--accent-primary)' }}>sign in</Link> to write a review
                    </Message>
                  )}
                        </div>
                    </div>
                    </div>
          </div>
        </>
        ) }
       </div>
    )
}

export default ProductScreen