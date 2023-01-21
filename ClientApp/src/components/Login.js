import React from "react";
import { useAuth } from "../api-authentication/AuthenticationService";
import BaseForm from "./BaseForm";
import { object, string } from "yup";

const loginSchema = object().shape({
  nickname: string()
    .min(6, "Nickname has to be minimum 6 characters long.")
    .required("Nickname is required."),
  password: string()
    .min(6, "Password has to be minimum 6 characters long.")
    .required("Password is required."),
});

const initialValues = { nickname: "", password: "" };
const fields = [
  {
    fieldName: "Nickname",
    attributes: { id: "nickname", name: "nickname" },
  },
  {
    fieldName: "Password",
    attributes: { id: "password", name: "password", type: "password" },
  },
];

export default function Login() {
  const { onLogin } = useAuth();

  return (
    <BaseForm
      title={"Login"}
      initialValues={initialValues}
      fields={fields}
      validationSchema={loginSchema}
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
