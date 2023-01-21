import React from "react";
import BaseForm from "./BaseForm";
import axios from "axios";
import { object, string, ref } from "yup";

const registerSchema = object().shape({
  email: string()
    .email("Must be a valid email.")
    .required("Email is required."),
  nickname: string()
    .min(6, "Nickname has to be minimum 6 characters long.")
    .required("Nickname is required."),
  password: string()
    .min(6, "Password has to be minimum 6 characters long.")
    .required("Password is required."),
  passconfirmation: string().oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
});

const initialValues = {
  email: "",
  nickname: "",
  password: "",
  passconfirmation: "",
};

const fields = [
  {
    fieldName: "Email",
    attributes: { id: "email", name: "email", type: "email" },
  },
  { fieldName: "Nickname", attributes: { id: "nickname", name: "nickname" } },
  {
    fieldName: "Password",
    attributes: { id: "password", name: "password", type: "password" },
  },
  {
    fieldName: "Confirm Password",
    attributes: {
      id: "passconfirmation",
      name: "passconfirmation",
      type: "password",
    },
  },
];

export default function Register() {
  const onRegister = async (values) => {
    await axios
      .post("https://localhost:7065/api/auth/register", values)
      .then((res) => console.log(res))
      .catch((reason) => alert(reason));
  };

  return (
    <BaseForm
      title={"Register"}
      initialValues={initialValues}
      fields={fields}
      validationSchema={registerSchema}
      submitFunc={onRegister}
      submitText={"Register"}
    />
  );
}
