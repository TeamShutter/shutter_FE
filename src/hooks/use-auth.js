import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";



const BASE_URL = process.env.NODE_ENV === "development"
? "http://127.0.0.1:8000"
: "http://takeshutter.co.kr:8000"

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
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

    return await axios.post(`${BASE_URL}/accounts/login`, {
        username: username,
        password: password,
        
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            withCredentials: true,
        }
      ).then((response) => { 
      console.log("Res : ", response);
      console.log("Res Header: ",response.headers);
      console.log("Data : ", response.data);
  
      // console.log("Data : ", data);
      setUser(response.data.user);
      router.push('/');
  })

    // return await fetch(`${BASE_URL}/accounts/login`, {
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
    //         console.log("Res : ", response);
    //         console.log("Res Header: ",response.headers);
    //         console.log("Login!");
    //         const data = await response.json();
    //         console.log("Data : ", data);
    //         setUser(data.user);
    //         router.push('/');
    //     })
  } 

  const signup = async (formData) => {
    return await fetch(`${BASE_URL}/accounts/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    }).then(async (response) => {
        console.log("Singup Res: ", response);
        console.log("Signup!");
        const data = await response.json();
        setUser(data.user);
        router.push('/');
    });
}

  const logout = async () => {
    return await fetch(`${BASE_URL}/accounts/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
    }).then(async (response) => {
        console.log("Logout!");
        const data = await response.json();
        setUser(null);  
        router.push("/login");
    });
  }

  const getProfile = async () => {
    return await fetch(`${BASE_URL}/accounts/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
    }).then(async (response) => {
        console.log("GetProfile!");
        const data = await response.json();
        console.log("Profile: ", data);
        setProfile(data);
    });
  }

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