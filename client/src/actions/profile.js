import axios from 'axios';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }} 

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated': 'profile created', 'success'))

        // if it's a new profile and not an edit, redirect to the dashboard when complete
        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors){
            console.log(err.msg)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}  