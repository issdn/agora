import React from "react";

export default function PostEditor() {
  return (
    <div className="flex flex-row justify-center h-full w-full pt-16 font-karla">
      <div className="flex flex-col gap-y-4 w-full h-full">
        <h1 className="text-2xl font-inconsolata">New Post</h1>
        <form className="flex flex-col gap-y-6 h-full">
          <input placeholder="Title goes here..." className="text-4xl p-4" />
          <div
            placeholder="Your thoughts go here..."
            className="h-full bg-white break-words p-4 text-xl before:block before:text-gray-500 empty:before:content-[attr(placeholder)]"
            contentEditable
          ></div>
        </form>
      </div>
    </div>
  );
}
