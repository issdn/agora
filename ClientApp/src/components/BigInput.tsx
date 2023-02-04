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
      onInput={(e: any) => {
        setBody(e.target.value);
      }}
      className={`resize-none h-1 overflow-y-hidden cursor-text bg-white break-words p-2 text-xl border focus:border-blue-700 outline-none border-black
       ${styles}`}
    ></textarea>
  );
}
