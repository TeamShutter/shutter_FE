import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    RESET_SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAIL
 } from "../actions/types";

 const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    signup_success: false
};

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;

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
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            };
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            };
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            };
        case AUTHENTICATION_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };

        default:
            return state;
    }
};

export default authReducer;