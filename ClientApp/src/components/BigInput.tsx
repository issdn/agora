import React, { AllHTMLAttributes, useRef } from "react";

export default function BigInput({
  body,
  setBody,
  styles,
  attributes,
}: {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<any>>;
  styles?: string;
  attributes?: AllHTMLAttributes<HTMLTextAreaElement>;
}) {
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <textarea
      value={body}
      style={{
        height: areaRef.current?.scrollHeight
          ? areaRef.current?.scrollHeight
          : "1px",
      }}
      onChange={(e) => {
        if (!e.target.value) {
          e.target.rows = 1;
          e.target.style.height = "1px";
        }
      }}
      ref={areaRef}
      {...attributes}
      onInput={(event: React.FormEvent<HTMLTextAreaElement>) => {
        setBody((event.target as HTMLInputElement).value);
      }}
      className={`h-1 cursor-text resize-none overflow-y-hidden break-words bg-white p-2 text-xl outline-none focus:border-blue-700 
       ${styles}`}
    ></textarea>
  );
}
