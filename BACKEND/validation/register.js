const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Check name field validation
    data.name = !isEmpty(data.name) ? data.name : '';
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required.';
    } else if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters'; 
    }

    // Check email field validation
    data.email = !isEmpty(data.email) ? data.email : '';
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.';
    } else if(!Validator.isEmail(data.email)) {
        errors.email = 'Email field is Invalid.';
    }

    // Check password field validation
    data.password = !isEmpty(data.password) ? data.password : '';
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required.';
    } else if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be atleast 6 characters.';
    } else {
        // Check confirm password field validation
        data.password2 = !isEmpty(data.password2) ? data.password2 : '';
        if(Validator.isEmpty(data.password2)) {
            errors.password2 = 'Confirm password field is required.';
        } else if(!Validator.equals(data.password, data.password2)) {
            errors.password2 = 'Password must match.';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}