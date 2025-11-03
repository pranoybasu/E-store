import React from 'react';

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
            <div 
                className="spinner"
                role="status"
                style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid rgba(0, 113, 227, 0.3)',
                    borderTop: '4px solid var(--accent-primary)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}
            >
                <span style={{ 
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: '0',
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    borderWidth: '0'
                }}>Loading</span>
            </div>
            <span style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: '500'
            }}>
                Loading...
            </span>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

export default Loader