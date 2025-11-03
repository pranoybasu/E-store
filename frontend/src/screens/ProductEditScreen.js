import axios from 'axios'
import API_URL from '../config'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)


  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInSock)
        setDescription(product.description)
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`${API_URL}/api/upload`, formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link
        to='/admin/productlist'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          marginBottom: '2rem'
        }}
      >
        <i className='fas fa-arrow-left' style={{ marginRight: '0.5rem' }}></i>
        Go Back
      </Link>
      <FormContainer>
        <div style={{
          marginBottom: '2rem',
          borderBottom: '2px solid var(--accent-primary)',
          paddingBottom: '1rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            <i className='fas fa-edit' style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
            Edit Product
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            marginBottom: 0
          }}>
            Update product information and details
          </p>
        </div>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginBottom: '0.75rem'
                }}
              ></Form.Control>
              <input
                type='file'
                id='image-file'
                onChange={uploadFileHandler}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  width: '100%'
                }}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' style={{ marginBottom: '1.5rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' style={{ marginBottom: '2rem' }}>
              <Form.Label style={{
                color: 'var(--text-primary)',
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              style={{
                background: 'var(--accent-primary)',
                border: 'none',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                width: '100%',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 113, 227, 0.3)'
              }}
            >
              <i className='fas fa-save' style={{ marginRight: '0.5rem' }}></i>
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen