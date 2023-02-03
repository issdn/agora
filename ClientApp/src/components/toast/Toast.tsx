import React, { useEffect, useState } from "react";
import { ToastColorType, ToastType } from "./ToastContainer";
import Icon from "../iconify/Icon";

const toastStyleTypes = { success: "bg-emerald-500", warning: "bg-red-500" };
const buttonStyleTypes = {
  success: "hover:bg-emerald-400",
  warning: "hover:bg-red-400",
};

export default function Toast({
  info,
  deleteToast,
}: {
  info: ToastType;
  deleteToast: any;
}) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | number | null>(
    null
  );

  useEffect(() => {
    const _timeoutId = setTimeout(() => {
      deleteToast(info.id);
      clearTimeout(timeoutId as number);
    }, info.timeout);
    setTimeoutId(_timeoutId);
  }, []);

  return (
    <div
      className={`${
        toastStyleTypes[info.type as ToastColorType]
      } w-96 py-2 pr-4 pl-6 flex flex-row rounded-sm justify-center items-center pointer-events-auto`}
    >
      <div className="w-full">
        <p key={info.id} className="text-white font-inconsolata text-xl">
          {info.message}
        </p>
      </div>
      <div className="h-full flex flex-col justify-center">
        <div
          className={`${
            buttonStyleTypes[info.type as ToastColorType]
          } cursor-pointer leading-3 px-1 rounded-md`}
        >
          <Icon
            onClick={() => {
              deleteToast(info.id);
              clearTimeout(timeoutId as number);
            }}
            iconName="close"
            styles="text-3xl text-white"
          />
        </div>
      </div>
    </div>
  );
}
