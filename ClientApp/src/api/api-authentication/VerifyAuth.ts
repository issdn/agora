import { useEffect } from "react";
import { useAuth } from "./AuthenticationService";
import { AuthContextType } from "../../types/appTypes";

export default function VerifyAuth() {
  const { token, onLogout } = useAuth() as {
    token: AuthContextType["token"];
    onLogout: AuthContextType["onLogout"];
  };

  const isTokenExpired = (token: string) => {
    if (token === null || token === "") return true;
    return Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;
  };

  useEffect(() => {
    if (isTokenExpired(token as string)) {
      onLogout();
    }
  });
  return;
}
