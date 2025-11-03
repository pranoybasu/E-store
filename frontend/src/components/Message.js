import React from 'react';

const Message = ({ variant, children }) => {
    const getVariantStyles = () => {
        switch(variant) {
            case 'danger':
                return {
                    backgroundColor: 'rgba(255, 59, 48, 0.1)',
                    borderColor: 'var(--danger-color)',
                    color: 'var(--danger-color)'
                };
            case 'success':
                return {
                    backgroundColor: 'rgba(48, 209, 88, 0.1)',
                    borderColor: 'var(--success-color)',
                    color: 'var(--success-color)'
                };
            case 'warning':
                return {
                    backgroundColor: 'rgba(255, 204, 0, 0.1)',
                    borderColor: '#ffcc00',
                    color: '#ffcc00'
                };
            default: // info
                return {
                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)'
                };
        }
    };

    return (
        <div
            className={`alert alert-${variant}`}
            role="alert"
            style={{
                ...getVariantStyles(),
                border: '1px solid',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                lineHeight: '1.5'
            }}
        >
            {children}
        </div>
    )
}

Message.defaultProps = {
    variant: 'info',
}

export default Message