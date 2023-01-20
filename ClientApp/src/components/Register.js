import React from "react";
import BaseForm from "./BaseForm";
import axios from "axios";

const initialValues = { email: "", nickname: "", password: "" };
const fieldsAttributes = [
  { id: "email", name: "email", fieldName: "Email" },
  { id: "nickname", name: "nickname", fieldName: "Nickname" },
  { id: "password", name: "password", fieldName: "Password" },
];

export default function Register() {
  const onRegister = async (values) => {
    await axios
      .post("https://localhost:7065/api/auth/register", values)
      .catch((reason) => alert(reason));
  };

  return (
    <BaseForm
      title={"Register"}
      initialValues={initialValues}
      fieldsAttributes={fieldsAttributes}
      submitFunc={onRegister}
      submitText={"Register"}
    />
  );
}
