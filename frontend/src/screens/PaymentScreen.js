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

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal')

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
                border: '1px solid var(--border-color)'
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
                            <div style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                <label style={{
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <input
                                        type='radio'
                                        id='PayPal'
                                        name='paymentMethod'
                                        value='PayPal'
                                        checked
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    PayPal or Credit Card
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
