import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-6'>
                    <div style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '12px',
                        padding: '2rem',
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormContainer
