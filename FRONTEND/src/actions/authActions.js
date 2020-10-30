import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Decode encrypted token
import setAuthToken from '../utils/setAuthToken'; // Set token to Auth Headers
import { GET_ERRORS, SET_CURRENT_USER } from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post ('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}


// Login - Get User Token
export const loginUser = (credentials) => dispatch => {
    axios.post('/api/users/login', credentials)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;

            // Set token to ls
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode Token
            const decoded = jwt_decode(token);
            
            // Set Current User
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Set Current User
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log out user
export const logoutUser = history => dispatch => {
    // Remove Token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove Auth Header for future requests
    setAuthToken(false);
    // Set current to {}  which will set isAuthenticated false
    dispatch(setCurrentUser({}));
    // Redirect to landing page
    history.push('/');
}