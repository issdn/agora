import React from "react";
import BigInput from "./BigInput";

export default function CommentField({
  comment,
  setComment,
  submitComment,
  styles,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  submitComment: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  styles?: string;
}) {
  const checkIfShouldSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      submitComment(e);
    }
  };

  return (
    <form className={`flex flex-col w-full ${styles}`}>
      <BigInput
        body={comment}
        setBody={setComment}
        attributes={{
          placeholder: "Comment",
          onKeyDown: checkIfShouldSubmit,
          type: "submit",
        }}
      />
      <div className="flex flex-row justify-end">
        <p className="text-sm">
          Press <b>Enter</b> to submit.
        </p>
      </div>
    </form>
  );
}
