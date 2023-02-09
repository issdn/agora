import React from "react";
import BigInput from "./BigInput";
import Button from "./buttons/Button";

export default function CommentField({
  comment,
  setComment,
  submitComment,
  styles,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  submitComment: (e: React.FormEvent<HTMLFormElement>) => void;
  styles?: string;
}) {
  const checkIfShouldSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      submitComment(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        submitComment(e);
      }}
      className={`flex w-full flex-col ${styles}`}
    >
      <BigInput
        body={comment}
        setBody={setComment}
        styles="border border-black"
        attributes={{
          placeholder: "Comment",
          onKeyDown: checkIfShouldSubmit,
          type: "submit",
        }}
      />
      <div className="hidden flex-row justify-end md:flex">
        <p className="text-sm">
          Press <b>Enter</b> to submit.
        </p>
      </div>
      <Button attributes={{ type: "submit" }} styles="mt-4 md:hidden">
        Submit
      </Button>
    </form>
  );
}
