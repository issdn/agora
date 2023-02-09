import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";
import BigInput from "../BigInput";
import { SimplePostDTO } from "../../types/apiTypes";

const TEST_TITLE = "What is Lorem Ipsum?";
const TEST_BODY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const useEditor = () => {
  const [post, setPost] = useState({ body: "", title: "eee" });

  const clearPost = () => setPost({ body: "", title: "" });

  return { post, setPost, clearPost };
};

export default function PostEditor({
  post,
  onInput,
  setPost,
  onSubmit,
}: {
  post: { body: string; title: string };
  setPost: React.Dispatch<React.SetStateAction<SimplePostDTO>>;
  onSubmit: (e: FormEvent) => void;
  onInput: () => void | typeof useCallback;
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const timedDisableButton = () => {
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 2500);
  };

  useEffect(() => {
    onInput();
  }, [post]);

  return (
    <div className="flex h-full w-full flex-row justify-center pt-16 font-karla">
      <div className="flex h-full w-full flex-col gap-y-4">
        <h1 className="font-inconsolata text-2xl">New Post</h1>
        <form
          className="flex h-full flex-col gap-y-6"
          onSubmit={(e) => {
            onSubmit(e);
            timedDisableButton();
          }}
        >
          <input
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
            placeholder="Title goes here..."
            className="p-4 text-4xl"
          />
          <BigInput
            body={post.body}
            setBody={(value: HTMLInputElement["value"]) =>
              setPost({ ...post, body: value })
            }
            attributes={{ placeholder: "Your thoughts go here..." }}
          />
          <div className="flex w-1/2 flex-row gap-x-16">
            <Button
              attributes={{ disabled: buttonDisabled }}
              styles={"w-full md:w-64"}
            >
              Create
            </Button>
            <button
              type="button"
              onClick={() => {
                setPost({ body: TEST_BODY, title: TEST_TITLE });
              }}
            >
              Lorem Ipsum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
