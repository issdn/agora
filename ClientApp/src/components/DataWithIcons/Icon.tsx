import React from "react";

export default function Icon({
  iconName,
  styles,
  onClick,
}: {
  iconName: string;
  styles?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <span
      onClick={onClick}
      className={`material-symbols-outlined text-xl ${styles}`}
    >
      {iconName}
    </span>
  );
}
