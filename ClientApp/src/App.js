import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import {
  AuthProvider,
  AuthorizeRoute,
} from "./api-authentication/AuthenticationService";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Navbar />
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return (
              <Route
                key={index}
                {...rest}
                element={
                  requireAuth ? (
                    <AuthorizeRoute {...rest} element={element} />
                  ) : (
                    element
                  )
                }
              />
            );
          })}
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
