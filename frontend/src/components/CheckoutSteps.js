import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
        <Nav
            className='justify-content-center mb-4'
            style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                marginBottom: '2rem'
            }}
        >
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link style={activeStepStyle}>
                            <i className="fas fa-user" style={{ marginRight: '0.5rem' }}></i>
                            Sign In
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={stepStyle(false)}>
                        <i className="fas fa-user" style={{ marginRight: '0.5rem' }}></i>
                        Sign In
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link style={activeStepStyle}>
                            <i className="fas fa-shipping-fast" style={{ marginRight: '0.5rem' }}></i>
                            Shipping
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={stepStyle(false)}>
                        <i className="fas fa-shipping-fast" style={{ marginRight: '0.5rem' }}></i>
                        Shipping
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link style={activeStepStyle}>
                            <i className="fas fa-credit-card" style={{ marginRight: '0.5rem' }}></i>
                            Payment
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={stepStyle(false)}>
                        <i className="fas fa-credit-card" style={{ marginRight: '0.5rem' }}></i>
                        Payment
                    </Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link style={activeStepStyle}>
                            <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                            Place Order
                        </Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled style={stepStyle(false)}>
                        <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                        Place Order
                    </Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
