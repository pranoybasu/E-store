import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal or Credit Card')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid var(--border-primary)'
            }}>
                <h1 style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.75rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                }}>
                    Payment Method
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    marginBottom: '2rem'
                }}>
                    Choose your preferred payment method
                </p>
                
                <form onSubmit={submitHandler}>
                    <div className='form-group' style={{ marginBottom: '2rem' }}>
                        <label style={{
                            color: 'var(--text-primary)',
                            fontWeight: '500',
                            marginBottom: '1rem',
                            display: 'block'
                        }}>
                            Select Method
                        </label>
                        <div className='col'>
                            {/* PayPal / Credit Card Option */}
                            <div style={{
                                backgroundColor: paymentMethod === 'PayPal or Credit Card' ? 'var(--bg-tertiary)' : 'transparent',
                                border: `2px solid ${paymentMethod === 'PayPal or Credit Card' ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => setPaymentMethod('PayPal or Credit Card')}
                            onMouseEnter={(e) => {
                                if (paymentMethod !== 'PayPal or Credit Card') {
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)'
                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (paymentMethod !== 'PayPal or Credit Card') {
                                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                                    e.currentTarget.style.backgroundColor = 'transparent'
                                }
                            }}
                            >
                                <label style={{
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: 0
                                }}>
                                    <input
                                        type='radio'
                                        id='PayPal'
                                        name='paymentMethod'
                                        value='PayPal or Credit Card'
                                        checked={paymentMethod === 'PayPal or Credit Card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{
                                            marginRight: '0.75rem',
                                            accentColor: 'var(--accent-primary)'
                                        }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                                            <i className="fab fa-paypal" style={{ marginRight: '0.5rem', color: 'var(--accent-primary)' }}></i>
                                            PayPal or Credit Card
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            Secure payment via PayPal
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Cash on Delivery Option */}
                            <div style={{
                                backgroundColor: paymentMethod === 'Cash on Delivery' ? 'var(--bg-tertiary)' : 'transparent',
                                border: `2px solid ${paymentMethod === 'Cash on Delivery' ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => setPaymentMethod('Cash on Delivery')}
                            onMouseEnter={(e) => {
                                if (paymentMethod !== 'Cash on Delivery') {
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)'
                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (paymentMethod !== 'Cash on Delivery') {
                                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                                    e.currentTarget.style.backgroundColor = 'transparent'
                                }
                            }}
                            >
                                <label style={{
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: 0
                                }}>
                                    <input
                                        type='radio'
                                        id='CashOnDelivery'
                                        name='paymentMethod'
                                        value='Cash on Delivery'
                                        checked={paymentMethod === 'Cash on Delivery'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{
                                            marginRight: '0.75rem',
                                            accentColor: 'var(--accent-primary)'
                                        }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                                            <i className="fas fa-money-bill-wave" style={{ marginRight: '0.5rem', color: 'var(--accent-success)' }}></i>
                                            Cash on Delivery
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            Pay when you receive your order
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        type='submit'
                        className='btn btn-primary'
                        style={{
                            backgroundColor: 'var(--accent-primary)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#ffffff',
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            width: '100%',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 113, 227, 0.3)'
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        Continue to Review Order
                    </button>
                </form>
            </div>
        </FormContainer>
    )
}

export default PaymentScreen
