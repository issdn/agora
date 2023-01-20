import React from "react";
import { useAuth } from "../api-authentication/AuthenticationService";
import BaseForm from "./BaseForm";

const initialValues = { nickname: "", password: "" };
const fieldsAttributes = [
  { id: "nickname", name: "nickname", fieldName: "Nickname" },
  { id: "password", name: "password", fieldName: "Password" },
];

export function Home() {
  const { onLogin } = useAuth();

  return (
    <BaseForm
      title={"Login"}
      initialValues={initialValues}
      fieldsAttributes={fieldsAttributes}
      submitFunc={onLogin}
      submitText={"Login"}
      children={[
        <p key={Math.random()} className="text-base">
          Not a user?{" "}
          <a className="text-blue-600 underline" href="/register">
            register
          </a>
        </p>,
      ]}
    />
  );
}
