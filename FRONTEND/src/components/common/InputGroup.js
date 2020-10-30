import React from 'react'
import PropTypes from 'prop-types'; // PropTypes defines datatype and which props are required
import classnames from 'classnames'; // Which is used to pass conditional classess

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    type,
    onChange,
    icon
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input
                type={type} 
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder} 
                name={name} 
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

// PropTypes defines datatype and which props are required
InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
    type: 'text'
}


export default InputGroup;
