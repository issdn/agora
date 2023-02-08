import React, { useState } from "react";
import CloseButton from "./CloseButton";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };

  return { isOpen, onOpen, onClose };
};

const renderModal = (children: any, title: string, onClose: any) => {
  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-50 bg-black/50">
      <div className="flex flex-row h-full justify-center items-center">
        <div className="md:min-w-[30rem] bg-white rounded-xl flex flex-col items-center p-8 gap-y-8">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="ml-8 font-karla text-2xl font-bold w-full text-center">
              {title}
            </h1>
            <CloseButton onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Modal({ children, isOpen, title, onClose }: any) {
  return isOpen ? renderModal(children, title, onClose) : null;
}
