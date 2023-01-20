import React, { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const auth = async (values) => {
  const result = await axios
    .post("https://localhost:7065/api/auth/login", values)
    .catch((reason) => alert(reason));
  return await result.data.token;
};

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");

  const handleLogin = async (values) => {
    const jwt = await auth(values);
    setToken(jwt);

    const origin = location.state?.from?.pathname || "/front";
    navigate(origin);
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
