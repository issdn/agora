import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "./Button";

export default function BaseForm({
  title,
  initialValues,
  fields,
  validationSchema,
  submitFunc,
  submitText,
  children,
}) {
  return (
    <div className="flex flex-row h-full items-center justify-center pt-12 font-inconsolata text-xl">
      <div className="border-4 border-black rounded-xl mt-16 flex flex-col items-center gap-y-8 py-8 px-12 w-[max(35%,150px)]">
        <h1 className="font-karla text-2xl font-bold">{title}</h1>
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
                    <p className="text-base">{attrs.fieldName}</p>
                    <Field
                      className={`bg-transparent focus:outline-none border-2 border-black p-2 ${
                        errors[attrs.attributes.name] &&
                        touched[attrs.attributes.name]
                          ? "border-red-600"
                          : "focus:border-blue-600"
                      }`}
                      {...attrs.attributes}
                    />
                    {errors[attrs.attributes.name] &&
                    touched[attrs.attributes.name] ? (
                      <p className="text-base text-red-500">
                        {errors[attrs.attributes.name]}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full gap-y-2">
                <Button
                  className="drop-shadow-[3px_3px_black] bg-sunglow py-2 transition duration-400 hover:drop-shadow-none"
                  type="submit"
                >
                  {submitText ? submitText : "Submit"}
                </Button>
                {children}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
