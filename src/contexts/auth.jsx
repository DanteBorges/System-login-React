import React, { useState,useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading,setLoadign]=useState(true);

    useEffect(()=>{
        const recoveredUser = localStorage.getItem('user');

        if(recoveredUser){
            setUser(JSON.parse(recoveredUser));
        }

        setLoadign(false);
    },[])

    const login = (email, password) => {

        console.log("login auth", { email, password })

        //api criar uma session

        const loggerdUser = {
            id: "123",
            email,
        };

        localStorage.setItem("user", JSON.stringify(loggerdUser));

        if (password === "secret") {
            setUser(loggerdUser);
            navigate("/");
        }
    };
    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user")
        setUser(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user,loading, login, logout }}>

            {children}
        </AuthContext.Provider>
    )
}