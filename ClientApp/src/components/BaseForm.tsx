import React, { ReactNode } from "react";
import { Formik, Field, Form } from "formik";
import Button from "./buttons/Button";
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
    <div className="flex h-full w-full flex-row items-center justify-center font-inconsolata text-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          submitFunc(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex w-full flex-col gap-y-12">
            <div className="flex flex-col gap-y-4">
              {fields.map((attrs, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-base">{attrs.fieldName as string}</p>
                  <Field
                    className={`border-2 border-black bg-transparent p-2 focus:outline-none ${
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
            <div className="flex w-full flex-col gap-y-2">
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
