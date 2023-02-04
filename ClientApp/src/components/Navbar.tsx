import React from "react";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../types/appTypes";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token, onLogout, nickname } = useAuth() as {
    token: AuthContextType["token"];
    onLogout: AuthContextType["onLogout"];
    nickname: string;
  };

  const navigate = useNavigate();

  return (
    <div className="flex w-full bg-cultured flex-row px-12 py-4 justify-between items-center font-inconsolata border-b border-black fixed z-50">
      <h1 className="text-3xl">
        <a href="/">AGORA</a>
      </h1>
      <ul className="flex flex-row text-2xl gap-x-8 items-center">
        {token ? (
          <>
            <li>
              <a href="/newpost">Create Post</a>
            </li>
            <li>
              <p className="cursor-pointer" onClick={onLogout}>
                Logout
              </p>
            </li>
            <li>
              <p
                className="cursor-pointer bg-gradient-to-bl from-[#8E2DE2] to-[#4A00E0] px-2 py-1 text-2xl rounded-lg text-white"
                onClick={() => navigate("user/" + nickname)}
              >
                {nickname}
              </p>
            </li>
          </>
        ) : (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        <li>
          {token ? null : (
            <a
              className="bg-gradient-to-bl from-[#8E2DE2] to-[#4A00E0] px-2 py-1 rounded-lg text-white"
              href="register"
            >
              Register
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}
