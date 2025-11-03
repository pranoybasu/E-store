import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const stepStyle = (isActive) => ({
        color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)',
        fontSize: '0.95rem',
        fontWeight: '500',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        position: 'relative'
    })

    const activeStepStyle = {
        ...stepStyle(true),
        backgroundColor: 'rgba(0, 113, 227, 0.1)',
        borderBottom: '2px solid var(--accent-primary)'
    }

    return (
        <ul
            className='nav justify-content-center mb-4'
            style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                marginBottom: '2rem'
            }}
        >
            <li className='nav-item'>
                {step1 ? (
                    <Link to='/login' className='nav-link' style={activeStepStyle}>
                        <i className="fas fa-user" style={{ marginRight: '0.5rem' }}></i>
                        Sign In
                    </Link>
                ) : (
                    <span className='nav-link disabled' style={stepStyle(false)}>
                        <i className="fas fa-user" style={{ marginRight: '0.5rem' }}></i>
                        Sign In
                    </span>
                )}
            </li>

            <li className='nav-item'>
                {step2 ? (
                    <Link to='/shipping' className='nav-link' style={activeStepStyle}>
                        <i className="fas fa-shipping-fast" style={{ marginRight: '0.5rem' }}></i>
                        Shipping
                    </Link>
                ) : (
                    <span className='nav-link disabled' style={stepStyle(false)}>
                        <i className="fas fa-shipping-fast" style={{ marginRight: '0.5rem' }}></i>
                        Shipping
                    </span>
                )}
            </li>

            <li className='nav-item'>
                {step3 ? (
                    <Link to='/payment' className='nav-link' style={activeStepStyle}>
                        <i className="fas fa-credit-card" style={{ marginRight: '0.5rem' }}></i>
                        Payment
                    </Link>
                ) : (
                    <span className='nav-link disabled' style={stepStyle(false)}>
                        <i className="fas fa-credit-card" style={{ marginRight: '0.5rem' }}></i>
                        Payment
                    </span>
                )}
            </li>

            <li className='nav-item'>
                {step4 ? (
                    <Link to='/placeorder' className='nav-link' style={activeStepStyle}>
                        <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                        Place Order
                    </Link>
                ) : (
                    <span className='nav-link disabled' style={stepStyle(false)}>
                        <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                        Place Order
                    </span>
                )}
            </li>
        </ul>
    )
}

export default CheckoutSteps
