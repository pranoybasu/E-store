import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card
            className='product-card fade-in'
            style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '0',
                transition: 'all var(--transition-base)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                e.currentTarget.style.borderColor = 'var(--border-hover)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                e.currentTarget.style.borderColor = 'var(--border-primary)'
            }}
        >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                    width: '100%',
                    height: '280px',
                    overflow: 'hidden',
                    background: 'var(--bg-tertiary)',
                    position: 'relative'
                }}>
                    <Card.Img
                        src={product.image}
                        variant='top'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform var(--transition-base)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
                        }}
                    />
                </div>
            </Link>

            <Card.Body style={{
                padding: 'var(--spacing-md)',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)'
            }}>
                <Link
                    to={`/product/${product._id}`}
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                >
                    <Card.Title
                        as='div'
                        style={{
                            color: 'var(--text-primary)',
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            marginBottom: 'var(--spacing-xs)',
                            lineHeight: '1.4',
                            minHeight: '2.8em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {product.name}
                    </Card.Title>
                </Link>

                <Card.Text as='div' style={{ marginTop: 'auto' }}>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text
                    as='h3'
                    style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        margin: '0',
                        letterSpacing: '-0.02em'
                    }}
                >
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
