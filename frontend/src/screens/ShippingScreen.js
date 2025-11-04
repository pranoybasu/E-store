import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
    const navigate = useNavigate()
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=shipping')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
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
                    Shipping Address
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    marginBottom: '2rem'
                }}>
                    Enter your shipping details
                </p>
                
                <form onSubmit={submitHandler}>
                    <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor='address' style={{
                            color: 'var(--text-primary)',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                        }}>
                            Address
                        </label>
                        <input
                            type='text'
                            id='address'
                            className='form-control'
                            placeholder='Enter Address'
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                padding: '0.75rem',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor='city' style={{
                            color: 'var(--text-primary)',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                        }}>
                            City
                        </label>
                        <input
                            type='text'
                            id='city'
                            className='form-control'
                            placeholder='Enter City'
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                padding: '0.75rem',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor='postalCode' style={{
                            color: 'var(--text-primary)',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                        }}>
                            Postal Code
                        </label>
                        <input
                            type='text'
                            id='postalCode'
                            className='form-control'
                            placeholder='Enter Postal Code'
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                padding: '0.75rem',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div className='form-group' style={{ marginBottom: '2rem' }}>
                        <label htmlFor='country' style={{
                            color: 'var(--text-primary)',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                        }}>
                            Country
                        </label>
                        <input
                            type='text'
                            id='country'
                            className='form-control'
                            placeholder='Enter Country'
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                padding: '0.75rem',
                                fontSize: '1rem'
                            }}
                        />
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
                        Continue to Payment
                    </button>
                </form>
            </div>
        </FormContainer>
    )
}

export default ShippingScreen
