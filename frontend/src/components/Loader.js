import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <Spinner
                animation='border'
                role='status'
                style={{
                    width: '60px',
                    height: '60px',
                    borderColor: 'var(--accent-primary)',
                    borderRightColor: 'transparent'
                }}
            >
                <span className='sr-only'>Loading</span>
            </Spinner>
            <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
            }}>
                Loading...
            </span>
        </div>
    )
}

export default Loader
