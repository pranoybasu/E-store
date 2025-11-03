import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating' style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>
                <i style={{color}}
                className={
                value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'}
                ></i>
            </span>
            <span>
                <i style={{color}}
                className={
                value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'}
                ></i>
            </span>
            <span>
                <i style={{color}}
                className={
                value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'}
                ></i>
            </span>
            <span>
                <i style={{color}}
                className={
                value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'}
                ></i>
            </span>
            <span>
                <i style={{color}}
                className={
                value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'}
                ></i>
            </span>
            {text && <span style={{
              marginLeft: '0.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem'
            }}>{text}</span>}
        </div>
    )
}

Rating.defaultProps = {
    color: '#ffd700',
    value: 0,
  };
//Typechecking of props
Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Rating
