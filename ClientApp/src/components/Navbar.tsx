import React, { useState } from "react";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../types/appTypes";
import { useNavigate } from "react-router-dom";
import Button from "./buttons/Button";
import LoginForm from "./LoginForm";
import Modal, { useModal } from "./Modal";
import RegisterForm from "./RegisterForm";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function Navbar() {
  const { token, onLogout, nickname } = useAuth() as {
    token: AuthContextType["token"];
    onLogout: AuthContextType["onLogout"];
    nickname: string;
  };

  const [navShown, setNavShown] = useState(false);

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useModal();

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useModal();

  const navigate = useNavigate();

  return (
    <div
      className={`fixed z-50 flex h-screen w-full flex-col items-center justify-between border-b border-black bg-primary px-12 font-inconsolata md:h-fit md:flex-row ${
        navShown ? "" : "h-fit"
      }`}
    >
      <div className="flex w-full flex-row items-center justify-between py-4 text-3xl md:w-fit">
        <h1>
          <a href="/">AGORA</a>
        </h1>
        <div onClick={() => setNavShown(!navShown)} className="md:hidden">
          <MenuOutlinedIcon fontSize="inherit" />
        </div>
      </div>
      <ul
        className={`flex h-full w-full grow flex-col-reverse items-center justify-center gap-y-4 gap-x-8 bg-primary text-2xl md:flex-row md:justify-end ${
          navShown ? "" : "hidden"
        }`}
      >
        {token ? (
          <>
            <li className="break-keep">
              <a href="/newpost">Create Post</a>
            </li>
            <li>
              <p className="cursor-pointer" onClick={onLogout}>
                Logout
              </p>
            </li>
            <li>
              <p
                className="cursor-pointer rounded-lg bg-gradient-to-bl from-[#8E2DE2] to-[#4A00E0] px-2 py-1 text-white"
                onClick={() => navigate("user/" + nickname)}
              >
                {nickname}
              </p>
            </li>
          </>
        ) : (
          <li>
            <Button type="clear" onClick={onLoginOpen}>
              Login
            </Button>
          </li>
        )}
        <li>
          {token ? null : (
            <button
              className="rounded-lg bg-gradient-to-bl from-[#8E2DE2] to-[#4A00E0] px-2 py-1 text-white"
              onClick={onRegisterOpen}
            >
              Register
            </button>
          )}
        </li>
      </ul>
      <Modal title="Login" isOpen={isLoginOpen} onClose={onLoginClose}>
        <LoginForm
          onClose={onLoginClose}
          onGotoRegister={() => {
            onLoginClose();
            onRegisterOpen();
          }}
        />
      </Modal>
      <Modal title="Register" isOpen={isRegisterOpen} onClose={onRegisterClose}>
        <RegisterForm onClose={onRegisterClose} />
      </Modal>
    </div>
  );
}
