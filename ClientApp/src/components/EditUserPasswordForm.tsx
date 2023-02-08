import React from "react";
import BaseForm from "./BaseForm";
import { object, string } from "yup";
import { axiosInstance } from "../api/axiosInterceptors";
import { UserRegisterDTO } from "../types/apiTypes";

const editPasswordSchema = object().shape({
  oldpassword: string().required("Old password is required."),
  newpassword: string()
    .min(6, "Password has to be minimum 6 characters long.")
    .required("Password is required."),
});

const initialValues = { oldpassword: "", newpassword: "" };
const fields = [
  {
    fieldName: "Old Password",
    attributes: { id: "oldpassword", name: "oldpassword", type: "password" },
  },
  {
    fieldName: "New Password",
    attributes: { id: "newpassword", name: "newpassword", type: "password" },
  },
];

export default function EditUserPasswordForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const onSubmit = async (values: UserRegisterDTO) => {
    await axiosInstance
      .post("api/auth/newpassword", values)
      .then(() => onClose());
  };

  return (
    <BaseForm
      title={"New Password"}
      initialValues={initialValues}
      fields={fields}
      validationSchema={editPasswordSchema}
      submitFunc={onSubmit}
      submitText={"Submit"}
    />
  );
}
