import React from "react";
import { Formik, Field, Form } from "formik";

export default function BaseForm({
  title,
  initialValues,
  fieldsAttributes,
  submitFunc,
  submitText,
  children,
}) {
  return (
    <div className="flex flex-row h-full items-center justify-center pt-12 font-inconsolata text-xl">
      <div className="border-4 border-black rounded-xl mt-16 flex flex-col items-center gap-y-8 py-8 px-12">
        <h1 className="font-karla text-2xl font-bold">{title}</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            submitFunc(values);
          }}
        >
          <Form className="flex flex-col gap-y-12">
            <div className="flex flex-col gap-y-4">
              {fieldsAttributes.map((attrs) => (
                <div className="flex flex-col">
                  <p className="text-base">{attrs.fieldName}</p>
                  <Field
                    className="bg-transparent focus:outline-none border-2 border-black p-2 focus:border-blue-600"
                    id={attrs.id}
                    name={attrs.name}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <button
                className="bg-sunglow py-2 border-2 border-black"
                type="submit"
              >
                {submitText ? submitText : "Submit"}
              </button>
              {children}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
