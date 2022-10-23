import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    RESET_SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING
 } from "./types";


export const login = (username, password) => async dispatch => {
    const body = JSON.stringify({
        username,
        password
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });
        
        if(res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS
            })
            // dispatch(loaduser())
        }   else {
            dispatch({
                type: LOGIN_FAIL
            })    
        }

    }   catch(err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    });
}

export const logout = () => async dispatch => {
    try {
        const res = await fetch('/api/account/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        })

        if (res.status === 200) {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }   else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }

    }   catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        })
    }

}


export const signup = (
    first_name,
    last_name,
    username,
    password,
    re_password
) => async dispatch => {
    const body = JSON.stringify({
        first_name,
        last_name,
        username,
        password,
        re_password
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch(`/api/account/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: data.success
            });
        }   else {
            dispatch({
                type: SIGNUP_FAIL,
                payload: data.error
            })
        }

    }   catch(err) {
            dispatch({
                type: SIGNUP_FAIL,
                payload: data.error
            })
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    });
}

export const reset_signup_success = () => dispatch => {
    dispatch({
        type: RESET_SIGNUP_SUCCESS
    });
}