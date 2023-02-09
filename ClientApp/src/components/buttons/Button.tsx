import React, { MouseEventHandler } from "react";

type types = "primary" | "secondary" | "clear";
const styleByType = {
  primary: "bg-gray-800 py-2 text-white hover:bg-gray-700 px-8",
  secondary: "border py-2 border-gray-800 px-8",
  clear: "hover:text-gray-800",
};

export default function Button({
  children,
  onClick,
  type = "primary",
  styles,
  attributes,
}: {
  children: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: types;
  styles?: string;
  attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      {...attributes}
      className={`transition duration-400 ${styleByType[type]} ${styles}`}
    >
      {children}
    </button>
  );
}
