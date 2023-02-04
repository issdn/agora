import React from "react";

const chipTypes = {
  base: "bg-gray-300 hover:bg-gray-200",
  dark: "font-inconsolata font-bold bg-slate-900 text-white hover:bg-slate-700",
};

type ChipTypesType = keyof typeof chipTypes;

export default function Chip({
  onClick,
  children,
  styles,
  type = "base",
}: {
  children: any;
  onClick?: () => void;
  styles?: string;
  type?: ChipTypesType;
}) {
  return (
    <div
      onClick={onClick}
      className={`px-5 cursor-pointer flex flex-row items-center justify-center gap-x-2 rounded-3xl ${chipTypes[type]} ${styles}`}
    >
      {children}
    </div>
  );
}
