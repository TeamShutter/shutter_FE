import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    RESET_SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
 } from "../actions/types";

 const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    signup_success: false
};

const authReducer = (state = initialState, action) => {
    const {type} = action;

    switch(type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signup_success: true
            };
        case SIGNUP_FAIL:
            return {
                ...state
            };
        case RESET_SIGNUP_SUCCESS:
            return {
                ...state,
                signup_success: false
            };
        case LOGIN_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case LOGOUT_SUCCESS: 
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        case LOGOUT_FAIL:
            return {
                ...state
            };

        default:
            return state;
    }
};

export default authReducer;