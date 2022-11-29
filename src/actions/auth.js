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
  AUTHENTICATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types";

export const loaduser = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const check_auth_status = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATION_SUCCESS,
      });
      dispatch(loaduser());
    } else {
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATION_FAIL,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(loaduser());
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const kakaologin = (code) => async (dispatch) => {
  const body = JSON.stringify({
    code
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/kakaologin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(loaduser());
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    console.log("err : ", err)
    dispatch({
      type: LOGIN_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

export const signup =
  (email, first_name, last_name, username, password, re_password) =>
  async (dispatch) => {
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      username,
      password,
      re_password,
    });

    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch(`/api/account/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();

      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: data.success,
        });
      } else {
        dispatch({
          type: SIGNUP_FAIL,
          payload: data.error,
        });
      }
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
        payload: data.error,
      });
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const reset_signup_success = () => (dispatch) => {
  dispatch({
    type: RESET_SIGNUP_SUCCESS,
  });
};
