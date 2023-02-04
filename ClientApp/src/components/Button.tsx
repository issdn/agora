import React, { MouseEventHandler } from "react";

type types = "primary" | "secondary" | "clear";
const styleByType = {
  primary: "bg-gray-800 text-white hover:bg-gray-700",
  secondary: "border border-gray-800",
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
      className={`py-2 text-xl transition duration-400 ${styleByType[type]} ${styles}`}
    >
      {children}
    </button>
  );
}
