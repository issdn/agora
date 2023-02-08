import React, { ReactNode } from "react";
import { Formik, Field, Form } from "formik";
import Button from "./Button";
import { ObjectSchema } from "yup";
import { FieldsType } from "../types/appTypes";

type BaseFormPropsType = {
  title: string;
  initialValues: Record<string, string>;
  fields: FieldsType;
  validationSchema: ObjectSchema<any>;
  submitFunc: (values: any) => Promise<void>;
  submitText: string;
  children?: ReactNode;
};

export default function BaseForm({
  title,
  initialValues,
  fields,
  validationSchema,
  submitFunc,
  submitText,
  children,
}: BaseFormPropsType) {
  return (
    <div className="flex flex-row h-full w-full items-center justify-center font-inconsolata text-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          submitFunc(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-y-12 w-full">
            <div className="flex flex-col gap-y-4">
              {fields.map((attrs, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-base">{attrs.fieldName as string}</p>
                  <Field
                    className={`bg-transparent focus:outline-none border-2 border-black p-2 ${
                      errors[attrs.attributes.name as string] &&
                      touched[attrs.attributes.name as string]
                        ? "border-red-600"
                        : "focus:border-blue-600"
                    }`}
                    {...attrs.attributes}
                  />
                  {errors[attrs.attributes.name as string] &&
                  touched[attrs.attributes.name as string] ? (
                    <p className="text-base text-red-500">
                      {errors[attrs.attributes.name as string]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <Button attributes={{ type: "submit" }}>
                {submitText ? submitText : "Submit"}
              </Button>
              {children}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
