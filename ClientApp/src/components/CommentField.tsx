import React, { FormEvent } from "react";
import BigInput from "./BigInput";
import Button from "./Button";

export default function CommentField({
  comment,
  setComment,
  submitComment,
  styles,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  submitComment: (e: FormEvent) => void;
  styles?: string;
}) {
  const checkIfShouldSubmit = (e: any) => {
    if (e.key === "Enter") {
      submitComment(e);
    }
  };

  return (
    <form
      onSubmit={submitComment}
      className={`flex flex-col gap-y-4 w-full ${styles}`}
    >
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
        <div className="flex flex-row w-1/4 gap-x-4">
          <Button styles="w-full">Submit</Button>
        </div>
      </div>
    </form>
  );
}
