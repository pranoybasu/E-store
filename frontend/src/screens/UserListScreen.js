import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deletetUser, listUsers } from '../actions/userAction'

const UserListScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success:successDelete } = userDelete

  useEffect(() => {
      if(userInfo && userInfo.isAdmin) {
        dispatch(listUsers())
      } else {
          navigate('/login')
      }
  }, [dispatch, navigate, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')){
      dispatch(deletetUser(id))
    }
  }

  return (
    <div className='container' style={{ padding: '2rem 0' }}>
      <div style={{
        marginBottom: '2rem',
        borderBottom: '2px solid var(--accent-primary)',
        paddingBottom: '1rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          <i className='fas fa-users' style={{ marginRight: '0.75rem', color: 'var(--accent-primary)' }}></i>
          User Management
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          marginBottom: 0
        }}>
          Manage all user accounts and permissions
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table className='table-sm' style={{ width: '100%', marginBottom: 0 }}>
              <thead>
                <tr style={{
                  background: 'var(--bg-tertiary)',
                  borderBottom: '2px solid var(--border-primary)'
                }}>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ID</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>NAME</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>EMAIL</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ADMIN</th>
                  <th style={{
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-primary)',
                    transition: 'background 0.2s ease'
                  }}>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace'
                    }}>{user._id}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'var(--text-primary)',
                      fontWeight: '500'
                    }}>{user.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <a href={`mailto:${user.email}`} style={{
                        color: 'var(--accent-primary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}>
                        {user.email}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {user.isAdmin ? (
                        <i className='fas fa-check' style={{
                          color: 'var(--accent-success)',
                          fontSize: '1.1rem'
                        }}></i>
                      ) : (
                        <i className='fas fa-times' style={{
                          color: 'var(--accent-danger)',
                          fontSize: '1.1rem'
                        }}></i>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-primary)',
                            color: 'var(--text-primary)',
                            marginRight: '0.5rem',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'var(--accent-primary)'
                            e.target.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'var(--bg-tertiary)'
                            e.target.style.color = 'var(--text-primary)'
                          }}
                        >
                          <i className='fas fa-edit'></i>
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        style={{
                          background: 'rgba(255, 59, 48, 0.1)',
                          border: '1px solid var(--accent-danger)',
                          color: 'var(--accent-danger)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--accent-danger)'
                          e.target.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(255, 59, 48, 0.1)'
                          e.target.style.color = 'var(--accent-danger)'
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserListScreen