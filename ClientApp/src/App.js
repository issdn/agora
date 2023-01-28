import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {
  AuthProvider,
  AuthorizeRoute,
} from "./api/api-authentication/AuthenticationService";
import VerifyAuth from "./api/api-authentication/VerifyAuth";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="px-[25%] pt-24 pb-8 font-karla">
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return (
              <Route
                key={index}
                {...rest}
                element={
                  requireAuth ? <AuthorizeRoute element={element} /> : element
                }
              />
            );
          })}
        </Routes>
      </div>
      <VerifyAuth />
    </AuthProvider>
  );
}
