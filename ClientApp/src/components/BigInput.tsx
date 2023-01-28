import React, { AllHTMLAttributes, useRef } from "react";

export default function BigInput({
  body,
  setBody,
  styles,
  attributes,
}: {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  styles?: string;
  attributes?: AllHTMLAttributes<HTMLInputElement>;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={bodyRef}
      suppressContentEditableWarning={true}
      onInput={(e: any) => {
        (bodyRef.current as HTMLDivElement).innerText = e.target.innerText;
        setBody(e.target.innerText);
      }}
      {...attributes}
      className={`h-full cursor-text bg-white break-words p-4 text-xl before:block before:text-gray-500 empty:before:content-[attr(placeholder)] ${styles}`}
      contentEditable
    ></div>
  );
}
