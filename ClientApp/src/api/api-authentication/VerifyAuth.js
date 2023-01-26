import React, { useEffect } from "react";
import { useAuth } from "./AuthenticationService";

export default function VerifyAuth() {
  const { token, onLogout } = useAuth();

  const isTokenExpired = (token) => {
    if (token === "null" || token === null) return true;
    return Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;
  };

  useEffect(() => {
    if (isTokenExpired(token)) {
      onLogout();
    }
  });
  return <></>;
}
