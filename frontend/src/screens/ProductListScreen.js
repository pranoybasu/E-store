import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = () => {
  const { pageNumber } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPage = pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login')
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', currentPage))
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    currentPage
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        marginBottom: '2rem',
        borderBottom: '2px solid var(--accent-primary)',
        paddingBottom: '1rem'
      }}>
        <Row className='align-items-center'>
          <Col>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              <i className='fas fa-box' style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
              Product Management
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              marginBottom: 0
            }}>
              Manage your product inventory and listings
            </p>
          </Col>
          <Col className='text-right'>
            <Button
              onClick={createProductHandler}
              style={{
                background: 'var(--accent-primary)',
                border: 'none',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 113, 227, 0.3)'
              }}
            >
              <i className='fas fa-plus' style={{ marginRight: '0.5rem' }}></i>
              Create Product
            </Button>
          </Col>
        </Row>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            <Table responsive className='table-sm' style={{ marginBottom: 0 }}>
              <thead>
                <tr style={{
                  background: 'var(--bg-tertiary)',
                  borderBottom: '2px solid var(--border-color)'
                }}>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ID</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>NAME</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>PRICE</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>CATEGORY</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>BRAND</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} style={{
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)'
                  }}>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace'
                    }}>{product._id}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-primary)',
                      fontWeight: '500'
                    }}>{product.name}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--accent-success)',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>${product.price}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-secondary)'
                    }}>{product.category}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-secondary)'
                    }}>{product.brand}</td>
                    <td style={{ padding: '1rem' }}>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button
                          className='btn-sm'
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            marginRight: '0.5rem',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                        style={{
                          background: 'rgba(255, 59, 48, 0.1)',
                          border: '1px solid var(--accent-danger)',
                          color: 'var(--accent-danger)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductListScreen