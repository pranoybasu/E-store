import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { logout } from '../actions/userAction'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false)

    const logoutHandler = () => {
        dispatch(logout())
        setUserDropdownOpen(false)
    }
    
    const closeDropdowns = () => {
        setUserDropdownOpen(false)
        setAdminDropdownOpen(false)
    }

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <nav className="navbar" style={{
                background: 'rgba(26, 26, 26, 0.95)',
                borderBottom: '1px solid var(--border-primary)',
                backdropFilter: 'blur(20px)',
                padding: '0.75rem 0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
                <div className='container' style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                }}>
                    <Link to='/' style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.03em',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease',
                            textDecoration: 'none'
                        }}>
                        ⚡ E-Store
                    </Link>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flex: '1',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap'
                    }}>
                        <SearchBox />
                        <ul className="navbar-nav" style={{
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'center',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0
                        }}>
                            <li className='nav-item'>
                                <Link to='/cart' onClick={closeDropdowns} style={{
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    <span>Cart</span>
                                </Link>
                            </li>
                            {userInfo ? (
                                <li className='nav-item dropdown'>
                                    <button
                                        className='nav-link dropdown-toggle'
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        style={{
                                            color: 'var(--text-primary)',
                                            fontWeight: '500',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className="fas fa-user"></i> {userInfo.name}
                                    </button>
                                    <ul className={`dropdown-menu ${userDropdownOpen ? 'show' : ''}`}>
                                        <li>
                                            <Link
                                                to='/profile'
                                                className='dropdown-item'
                                                onClick={closeDropdowns}
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    color: 'var(--text-primary)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                                }}
                                            >
                                                <i className="fas fa-user-circle" style={{ marginRight: '0.5rem' }}></i>
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={logoutHandler}
                                                className='dropdown-item'
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    color: 'var(--text-primary)',
                                                    transition: 'all 0.3s ease',
                                                    border: 'none',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-danger)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                                }}
                                            >
                                                <i className="fas fa-sign-out-alt" style={{ marginRight: '0.5rem' }}></i>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className='nav-item'>
                                    <Link to='/login' onClick={closeDropdowns} style={{
                                        color: 'var(--text-secondary)',
                                        fontWeight: '500',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        textDecoration: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                    >
                                        <i className="fas fa-user"></i>
                                        <span>Sign In</span>
                                    </Link>
                                </li>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <li className='nav-item dropdown'>
                                    <button
                                        className='nav-link dropdown-toggle'
                                        onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                                        style={{
                                            color: 'var(--accent-warning)',
                                            fontWeight: '500',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className="fas fa-cog"></i> Admin
                                    </button>
                                    <ul className={`dropdown-menu ${adminDropdownOpen ? 'show' : ''}`}>
                                        <li>
                                            <Link
                                                to='/admin/userlist'
                                                className='dropdown-item'
                                                onClick={closeDropdowns}
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    color: 'var(--text-primary)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                                }}
                                            >
                                                <i className="fas fa-users" style={{ marginRight: '0.5rem' }}></i>
                                                Users
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to='/admin/productlist'
                                                className='dropdown-item'
                                                onClick={closeDropdowns}
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    color: 'var(--text-primary)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                                }}
                                            >
                                                <i className="fas fa-box" style={{ marginRight: '0.5rem' }}></i>
                                                Products
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to='/admin/orderlist'
                                                className='dropdown-item'
                                                onClick={closeDropdowns}
                                                style={{
                                                    background: 'var(--bg-tertiary)',
                                                    color: 'var(--text-primary)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                                }}
                                            >
                                                <i className="fas fa-receipt" style={{ marginRight: '0.5rem' }}></i>
                                                Orders
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
