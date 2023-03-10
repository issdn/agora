import React from "react";
import BaseForm from "./BaseForm";
import { object, string, ref } from "yup";
import { axiosInstance } from "../api/axiosInterceptors";
import { UserRegisterDTO } from "../types/apiTypes";

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

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const randomInt = getRandomInt(1000);

const initialValues = {
  email: `admin${randomInt}@em.de`,
  nickname: "admin" + randomInt,
  password: "admin" + randomInt,
  passconfirmation: "admin" + randomInt,
};

const fields = [
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

export default function RegisterForm({ onClose }: { onClose: () => void }) {
  const onRegister = async (values: UserRegisterDTO) => {
    await axiosInstance.post("api/auth/register", values).then(() => onClose());
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
