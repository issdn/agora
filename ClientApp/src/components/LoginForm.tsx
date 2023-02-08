import React from "react";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import BaseForm from "./BaseForm";
import { object, string } from "yup";
import { AuthContextType } from "../types/appTypes";

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

export default function LoginModal({
  onGotoRegister,
  onClose,
}: {
  onGotoRegister: () => void;
  onClose: () => void;
}) {
  const { onLogin } = useAuth() as AuthContextType;

  return (
    <BaseForm
      title={"Login"}
      initialValues={initialValues}
      fields={fields}
      validationSchema={loginSchema}
      submitFunc={(values) => onLogin(values).then(() => onClose())}
      submitText={"Login"}
    >
      <p key={Math.random()} className="text-base">
        Not a user?{" "}
        <button className="text-blue-600 underline" onClick={onGotoRegister}>
          register
        </button>
      </p>
    </BaseForm>
  );
}
