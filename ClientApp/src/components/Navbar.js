import React from "react";
import { useAuth } from "../api-authentication/AuthenticationService";

export default function Navbar() {
  const { token, onLogout } = useAuth();

  return (
    <div className="flex flex-row px-36 py-4 justify-between items-center font-karla">
      <h1 className="text-3xl">
        <a href="/">AGORA</a>
      </h1>
      <ul className="flex flex-row text-2xl gap-x-8">
        {token ? (
          <>
            <li>
              <a href="/newpost">Create Post</a>
            </li>
            <li>
              <p onClick={onLogout}>Logout</p>
            </li>
          </>
        ) : (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        <li>{token ? null : <a href="register">Register</a>}</li>
      </ul>
    </div>
  );
}
