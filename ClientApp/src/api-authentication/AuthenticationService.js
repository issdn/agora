import React, { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDefaultNavigation } from "./Navigation";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const defaultNavigation = useDefaultNavigation();

  const handleLogin = async (values) => {
    await axios
      .post("https://localhost:7065/api/auth/login", values)
      .then((result) => {
        setToken(result.data.token);
        defaultNavigation("/front");
      })
      .catch((reason) => alert(reason));
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthorizeRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
};
