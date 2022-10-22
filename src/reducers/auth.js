import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
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

        default:
            return state;
    }
};

export default authReducer;