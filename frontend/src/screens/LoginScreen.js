import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userAction';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    // Check for redirect in URL params first, then query string, then default to '/'
    const redirect = params.redirect || (location.search ? new URLSearchParams(location.search).get('redirect') : null) || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                    Sign In
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Welcome back! Please sign in to continue
                </p>
            </div>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <form onSubmit={submitHandler}>
                <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor='email' style={{
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        marginBottom: '0.5rem',
                        display: 'block'
                    }}>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='form-control'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)',
                            padding: '0.75rem'
                        }}
                    />
                </div>

                <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor='password' style={{
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        marginBottom: '0.5rem',
                        display: 'block'
                    }}>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='form-control'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-primary)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)',
                            padding: '0.75rem'
                        }}
                    />
                </div>

                <button
                    type='submit'
                    className='btn btn-primary'
                    style={{
                        width: '100%',
                        marginTop: '1rem',
                        padding: '0.875rem',
                        background: 'var(--accent-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 8px 20px rgba(0, 113, 227, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                    }}
                >
                    <i className='fas fa-sign-in-alt' style={{ marginRight: '0.5rem' }}></i>
                    Sign In
                </button>
            </form>

            <div className='row' style={{ marginTop: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div className='col' style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    New Customer?{' '}
                    <Link
                        to={redirect ? `/register?redirect=${redirect}` : `/register`}
                        style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Register Here
                    </Link>
                </div>
            </div>
        </FormContainer>
    )
}

export default LoginScreen
