import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = async (values) => {
    axios
      .post("api/auth/login", values)
      .then((result) => {
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        navigate("/newpost");
      });
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
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

export const AuthorizeRoute = ({ element, rest }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
};
