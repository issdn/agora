import React, { ReactElement, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserLoginDTO } from "../../types/apiTypes";
import { AuthContextType } from "../../types/appTypes";

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));

  const handleLogin = async (values: UserLoginDTO) => {
    axios.post("api/auth/login", values).then((result) => {
      setToken(result.data.token);
      setNickname(result.data.nickname);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("nickname", result.data.nickname);
      navigate("/newpost");
    });
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("nickname", "");
    setToken(null);
    setNickname(null);
  };

  const value: AuthContextType = {
    nickname,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthorizeRoute = ({ element }: { element: ReactElement }) => {
  const { token } = useAuth() as { token: AuthContextType["token"] };
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
};
