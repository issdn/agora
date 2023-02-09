import React, { ReactNode } from "react";

const styleTypes = {
  primary: "text-white p-2",
  secondary: "text-black p-2",
  small: "text-black p-1",
};
export type IconButtonStyleTypes = keyof typeof styleTypes;

export default function IconButton({
  children,
  onClick,
  type = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  type?: IconButtonStyleTypes;
}) {
  return (
    <button
      className={`text-xl z-10 bg-slate-700/25 hover:bg-slate-500/25 rounded-lg flex flex-row justify-center items-center ${styleTypes[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
