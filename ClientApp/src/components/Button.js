import React from "react";

export default function Button({ children, styles, rest }) {
  return (
    <button
      {...rest}
      className={`drop-shadow-[3px_3px_black] bg-sunglow py-2 text-xl transition duration-400 hover:drop-shadow-none ${styles}`}
    >
      {children}
    </button>
  );
}
