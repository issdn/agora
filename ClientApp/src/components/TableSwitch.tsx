import React, { useState } from "react";

type TableItems = { label: string; key: string }[];

export const useTableSwitch = (items: TableItems) => {
  const keys = items.map((i) => i.key);
  const [currOpenTab, setCurrOpenTab] = useState(keys[0]);

  return { currOpenTab, setCurrOpenTab };
};

export default function TableSwitch({
  items,
  currOpenTab,
  setCurrOpenTab,
}: {
  items: TableItems;
  currOpenTab: string;
  setCurrOpenTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-row gap-x-6 border-b border-black text-sm md:text-xl">
      {items.map((i) => (
        <p
          key={i.key}
          onClick={() => setCurrOpenTab(i.key)}
          className={`cursor-pointer px-2 py-1 ${
            currOpenTab === i.key ? "bg-gray-300" : ""
          }`}
        >
          {i.label}
        </p>
      ))}
    </div>
  );
}
