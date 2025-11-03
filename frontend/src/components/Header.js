import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userAction'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <Navbar className="navbar" expand="lg" collapseOnSelect style={{
                background: 'rgba(26, 26, 26, 0.95)',
                borderBottom: '1px solid var(--border-color)',
                backdropFilter: 'blur(20px)',
                padding: '0.75rem 0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.03em',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease'
                        }}>
                            ⚡ E-Store
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        style={{
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--bg-tertiary)'
                        }}
                    >
                        <span style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
                        }} />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ms-auto" style={{ gap: '0.75rem', alignItems: 'center' }}>
                            <LinkContainer to='/cart'>
                                <Nav.Link style={{
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
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
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={<span style={{ color: 'var(--text-primary)' }}><i className="fas fa-user"></i> {userInfo.name}</span>}
                                    id='username'
                                    className='nav-dropdown'
                                    style={{
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item style={{
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
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        onClick={logoutHandler}
                                        style={{
                                            background: 'var(--bg-tertiary)',
                                            color: 'var(--text-primary)',
                                            transition: 'all 0.3s ease'
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
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link style={{
                                        color: 'var(--text-secondary)',
                                        fontWeight: '500',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
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
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown
                                    title={<span style={{ color: 'var(--accent-warning)' }}><i className="fas fa-cog"></i> Admin</span>}
                                    id='adminmenu'
                                    className='nav-dropdown'
                                >
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item style={{
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
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item style={{
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
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item style={{
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
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
