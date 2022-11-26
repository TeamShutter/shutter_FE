import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = async (username, password) => {
    return await axios
      .post(`${API_URL}/accounts/login/`, {
        username: username,
        password: password,

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        // setUser(response.data.user);
        router.push("/");
      });

    // return await fetch(`${API_URL}/accounts/login`, {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({
    //             username,
    //             password
    //         }),
    //     }).then(async (response) => {
    //         const data = await response.json();
    //         setUser(data.user);
    //         router.push('/');
    //     })
  };

  const signup = async (formData) => {
    return await fetch(`${API_URL}/accounts/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }).then(async (response) => {
      const data = await response.json();
      setUser(data.user);
      router.push("/");
    });
  };

  const logout = async () => {
    return await fetch(`${API_URL}/accounts/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      const data = await response.json();
      setUser(null);
      router.push("/login");
    });
  };

  const getProfile = async () => {
    return await fetch(`${API_URL}/accounts/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      const data = await response.json();
      setProfile(data);
    });
  };

  // Return the user object and auth methods
  return {
    user,
    profile,
    login,
    signup,
    logout,
    getProfile,
  };
}
