import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userAction';

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    // Check for redirect in URL params first, then query string, then default to '/'
    const redirect = params.redirect || (location.search ? new URLSearchParams(location.search).get('redirect') : null) || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register
        if(password !== confirmPassword) {
            setMessage('Passwords do not match!') 
        } else {
        dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                    Sign Up
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Create your account to get started
                </p>
            </div>

            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <form onSubmit={submitHandler}>
                <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor='name' style={{
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        marginBottom: '0.5rem',
                        display: 'block'
                    }}>
                        Full Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='form-control'
                        placeholder='Enter your full name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)',
                            padding: '0.75rem'
                        }}
                    />
                </div>

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
                            border: '1px solid var(--border-color)',
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
                        placeholder='Enter a strong password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)',
                            padding: '0.75rem'
                        }}
                    />
                </div>

                <div className='form-group' style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor='confirmPassword' style={{
                        color: 'var(--text-primary)',
                        fontWeight: '500',
                        marginBottom: '0.5rem',
                        display: 'block'
                    }}>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        className='form-control'
                        placeholder='Re-enter your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
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
                    <i className='fas fa-user-plus' style={{ marginRight: '0.5rem' }}></i>
                    Create Account
                </button>
            </form>

            <div className='row' style={{ marginTop: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div className='col' style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Existing Customer?{' '}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : `/login`}
                        style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Sign In Here
                    </Link>
                </div>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen
