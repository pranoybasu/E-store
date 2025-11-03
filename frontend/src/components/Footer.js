import React from 'react'

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-primary)',
            padding: 'var(--spacing-lg) 0',
            marginTop: 'auto'
        }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center py-3'>
                        <p style={{
                            color: 'var(--text-tertiary)',
                            fontSize: '0.875rem',
                            margin: '0.5rem 0'
                        }}>
                            <i className="fas fa-bolt" style={{ color: 'var(--accent-primary)' }}></i> E-Store
                        </p>
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.75rem',
                            margin: '0'
                        }}>
                            Copyright &copy; {new Date().getFullYear()} E-Store. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer