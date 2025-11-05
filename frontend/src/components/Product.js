import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    const isSoldOut = product.countInStock === 0

    return (
        <div
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
                flexDirection: 'column',
                opacity: isSoldOut ? 0.7 : 1,
                position: 'relative'
            }}
            onMouseEnter={(e) => {
                if (!isSoldOut) {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                    e.currentTarget.style.borderColor = 'var(--border-hover)'
                }
            }}
            onMouseLeave={(e) => {
                if (!isSoldOut) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                }
            }}
        >
            {isSoldOut ? (
                <div style={{ textDecoration: 'none', cursor: 'not-allowed' }}>
                    <div style={{
                        width: '100%',
                        height: '280px',
                        overflow: 'hidden',
                        background: 'var(--bg-tertiary)',
                        position: 'relative'
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: isSoldOut ? 'grayscale(50%)' : 'none'
                            }}
                        />
                        {isSoldOut && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(220, 53, 69, 0.9)',
                                color: '#fff',
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                                fontWeight: '700',
                                fontSize: '1.25rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                            }}>
                                SOLD OUT
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        width: '100%',
                        height: '280px',
                        overflow: 'hidden',
                        background: 'var(--bg-tertiary)',
                        position: 'relative'
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
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
            )}

            <div style={{
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
                    <h3
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
                    </h3>
                </Link>

                <div style={{ marginTop: 'auto' }}>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </div>

                <h3
                    style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        margin: '0',
                        letterSpacing: '-0.02em'
                    }}
                >
                    ${product.price}
                </h3>
            </div>
        </div>
    )
}

export default Product
