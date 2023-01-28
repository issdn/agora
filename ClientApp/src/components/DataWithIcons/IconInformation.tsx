import React from "react";
import Icon from "./Icon";

type types = "tag" | "base";
const styleByType = { tag: "bg-gray-800 rounded-md px-2 text-white", base: "" };

export default function IconInformation({
  iconName,
  information,
  type = "base",
  left = false,
}: {
  iconName: string;
  information: string | number;
  type?: types;
  left?: boolean;
}) {
  return (
    <div
      className={`flex ${
        left ? "flex-row-reverse" : "flex-row"
      } gap-x-1 items-center ${styleByType[type]}`}
    >
      <Icon iconName={iconName} />
      <p>{information}</p>
    </div>
  );
}
