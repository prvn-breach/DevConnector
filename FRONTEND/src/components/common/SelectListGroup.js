import React from 'react'
import PropTypes from 'prop-types'; // PropTypes defines datatype and which props are required
import classnames from 'classnames'; // Which is used to pass conditional classess

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <div className="form-group">
            <select 
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                name={name} 
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

// PropTypes defines datatype and which props are required
SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}

export default SelectListGroup;
