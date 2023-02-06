import React, { useEffect, useRef, useState } from "react";
import Toast from "./Toast";

export type ToastColorType = "warning" | "success";
export type ToastType = {
  message: string;
  id: string;
  type?: ToastColorType;
  timeout?: number;
};

const randomToken = () => {
  return Math.random().toString(12);
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const deleteToast = (id: string) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  const addToast = (
    message: string,
    type: ToastColorType = "success",
    timeout = 3000
  ) => {
    setToasts([
      ...toasts,
      {
        message: message,
        type: type,
        timeout: timeout,
        id: randomToken(),
      },
    ]);
  };

  return { toasts, addToast, deleteToast };
};

export default function ToastContainer({
  toasts,
  deleteToast,
}: {
  toasts: ToastType[];
  deleteToast: any;
}) {
  useEffect(() => console.log(toasts), [toasts]);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
      <div className="w-full h-full flex flex-col gap-y-2 justify-end items-center py-8">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            info={t}
            deleteToast={deleteToast}
            toasts={toasts}
          />
        ))}
      </div>
    </div>
  );
}
