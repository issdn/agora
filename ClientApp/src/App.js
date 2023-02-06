import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {
  AuthProvider,
  AuthorizeRoute,
} from "./api/api-authentication/AuthenticationService";
import VerifyAuth from "./api/api-authentication/VerifyAuth";
import Navbar from "./components/Navbar";
import ToastContainer, { useToast } from "./components/toast/ToastContainer";
import { axiosInstance } from "./api/axiosInterceptors";
import RouteRenderer from "./components/RouteRenderer";

export default function App() {
  const { toasts, addToast, deleteToast } = useToast();

  axiosInstance.interceptors.response.use(
    (res) => {
      if (res.status > 400 && res.status < 500) {
        addToast("You should log in!", "warning");
      }
      return res;
    },
    (error) => {
      addToast(error.message, "warning");
      return Promise.reject(error);
    }
  );

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
                  requireAuth ? (
                    <AuthorizeRoute element={element} />
                  ) : (
                    <RouteRenderer
                      element={element}
                      props={{ addToast: addToast }}
                    />
                  )
                }
              />
            );
          })}
        </Routes>
        <ToastContainer toasts={toasts} deleteToast={deleteToast} />
      </div>
      <VerifyAuth />
    </AuthProvider>
  );
}
