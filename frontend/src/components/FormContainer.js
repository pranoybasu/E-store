import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <div style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '2rem',
                        marginTop: '2rem',
                        marginBottom: '2rem'
                    }}>
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
