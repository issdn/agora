import React from "react";
import { useAuth } from "../api-authentication/AuthenticationService";

export default function Navbar() {
  const { token, onLogout } = useAuth();

  return (
    <div className="flex flex-row px-36 py-4 justify-between items-center font-karla">
      <h1 className="text-3xl">AGORA</h1>
      <ul className="flex flex-row text-2xl gap-x-8">
        <li>
          {token ? (
            <p onClick={onLogout}>logout</p>
          ) : (
            <a href="/login">login</a>
          )}
        </li>
        <li>{token ? null : <a href="register">register</a>}</li>
      </ul>
    </div>
  );
}
