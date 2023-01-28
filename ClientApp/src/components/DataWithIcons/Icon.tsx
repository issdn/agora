import React from "react";

export default function Icon({
  iconName,
  styles,
}: {
  iconName: string;
  styles?: string;
}) {
  return (
    <span className={`material-symbols-outlined text-xl ${styles}`}>
      {iconName}
    </span>
  );
}
