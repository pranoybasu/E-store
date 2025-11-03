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
        <header>
            <Navbar className="navbar" expand="lg" collapseOnSelect style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-primary)',
                backdropFilter: 'blur(20px)'
            }}>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.03em'
                        }}>
                            ⚡ E-Store
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{
                        borderColor: 'var(--border-primary)'
                    }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ms-auto" style={{ gap: '0.5rem' }}>
                            <LinkContainer to='/cart'>
                                <Nav.Link style={{
                                    color: 'var(--text-secondary)',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    transition: 'all var(--transition-fast)'
                                }}>
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id='username'
                                    style={{
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        }}>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        onClick={logoutHandler}
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link style={{
                                        color: 'var(--text-secondary)',
                                        fontWeight: '500',
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        transition: 'all var(--transition-fast)'
                                    }}>
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown
                                    title='Admin'
                                    id='adminmenu'
                                    style={{
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        }}>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        }}>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item style={{
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)'
                                        }}>
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
