import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ToastColorType, ToastType } from "./ToastContainer";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// Code from https://daily-dev-tips.com/posts/react-cleaner-use-of-settimeout/
function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current as number);
  }, []);

  const memoizedCallback = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      callbackRef.current?.();
    }, delay);
  }, [delay, timeoutRef, callbackRef]);

  return useMemo(() => [memoizedCallback], [memoizedCallback]);
}

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
  const [timeout] = useTimeout(() => {
    deleteToast(info.id);
  }, info.timeout as number);

  useEffect(() => timeout(), []);

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
          } cursor-pointer leading-3 px-1 rounded-md text-3xl text-white`}
        >
          <CloseOutlinedIcon
            onClick={() => {
              deleteToast(info.id);
            }}
            fontSize="inherit"
          />
        </div>
      </div>
    </div>
  );
}
