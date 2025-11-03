import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from 'react-bootstrap';
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
        <Container>
         <Link
           className='btn my-3'
           to='/'
           style={{
             backgroundColor: 'var(--bg-secondary)',
             color: 'var(--text-primary)',
             border: '1px solid var(--border-color)',
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
             e.target.style.borderColor = 'var(--border-color)';
           }}
         >
           ← Go Back
         </Link>
         { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
            <Meta title={product.name} />
            <Row style={{ marginTop: '2rem' }}>
              <Col md={6} style={{ marginBottom: '2rem' }}>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid var(--border-color)'
                }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    style={{
                      borderRadius: '8px',
                      maxHeight: '500px',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                </div>
              </Col>
              <Col md={3} style={{ marginBottom: '2rem' }}>
                    <ListGroup variant='flush' style={{ backgroundColor: 'transparent' }}>
                        <ListGroup.Item style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '0 0 1rem 0'
                        }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '0.5rem 0'
                        }}>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        />
                        </ListGroup.Item>
                        <ListGroup.Item style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '1rem 0',
                          fontSize: '1.5rem',
                          color: 'var(--accent-primary)',
                          fontWeight: '600'
                        }}>
                          ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item style={{
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
                        </ListGroup.Item>
                        </ListGroup>
                        </Col>
                        <Col md={3}>
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
                              borderColor: 'var(--border-color)',
                              color: 'var(--text-primary)'
                            }}>
                                <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong style={{ color: 'var(--accent-primary)' }}>${product.price}</strong>
                                </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{
                              backgroundColor: 'transparent',
                              borderColor: 'var(--border-color)',
                              color: 'var(--text-primary)'
                            }}>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                    <span style={{
                                      color: product.countInStock > 0 ? 'var(--success-color)' : 'var(--danger-color)',
                                      fontWeight: '500'
                                    }}>
                                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                    <ListGroup.Item style={{
                      backgroundColor: 'transparent',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{
                              backgroundColor: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '6px'
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '1rem'
                  }}>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
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
                            </Button>
                        </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '3rem' }}>
                    <Col md={8}>
                    <h2 style={{
                      color: 'var(--text-primary)',
                      marginBottom: '1.5rem',
                      paddingBottom: '1rem',
                      borderBottom: '2px solid var(--border-color)'
                    }}>
                      Customer Reviews
                    </h2>
                    {product.reviews.length === 0 && <Message>No Reviews Yet</Message>}
                    <ListGroup variant='flush' style={{ backgroundColor: 'transparent' }}>
                        {product.reviews.map((review) => (
                        <ListGroup.Item
                          key={review._id}
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
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
                        </ListGroup.Item>
                        ))}
                        <ListGroup.Item style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
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
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating' style={{ marginBottom: '1.5rem' }}>
                        <Form.Label style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                          Rating
                        </Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '0.75rem'
                          }}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment' style={{ marginBottom: '1.5rem' }}>
                        <Form.Label style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                          Comment
                        </Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            resize: 'vertical'
                          }}
                          placeholder='Share your experience with this product...'
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--text-primary)',
                          border: 'none',
                          padding: '0.75rem 2rem',
                          borderRadius: '8px',
                          fontWeight: '600',
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
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login' style={{ color: 'var(--accent-primary)' }}>sign in</Link> to write a review
                    </Message>
                  )}
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
          </Row>
        </>
        ) }
       </Container>
    )
}

export default ProductScreen
