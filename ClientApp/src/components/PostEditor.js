import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useAuth } from "../api-authentication/AuthenticationService";

const TEST_TITLE = "What is Lorem Ipsum?";
const TEST_BODY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const SAVE_MS = 1000;

export default function PostEditor() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [timer, setTimer] = useState(SAVE_MS);
  const [timeoutId, setTimeoutId] = useState(null);

  const saveData = () => {
    axios
      .put(
        "https://localhost:7065/api/postdraft",
        { Title: title, Body: body },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((reason) => console.log(reason));
  };

  useEffect(() => {
    axios
      .get("https://localhost:7065/api/postdraft", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
      })
      .catch((reason) => console.log(reason));
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://localhost:7065/api/Post/createpost",
        {
          title: title,
          body: body,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => console.log(res))
      .catch((reason) => alert(reason));
  };

  const handleInput = () => {
    clearTimeout(timeoutId);
    setTimer(1000);
    setTimeoutId(setTimeout(() => saveData(), timer));
  };

  return (
    <div className="flex flex-row justify-center h-full w-full pt-16 font-karla">
      <div className="flex flex-col gap-y-4 w-full h-full">
        <h1 className="text-2xl font-inconsolata">New Post</h1>
        <form
          className="flex flex-col gap-y-6 h-full"
          onSubmit={handleCreatePost}
        >
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              handleInput();
            }}
            placeholder="Title goes here..."
            className="text-4xl p-4"
          />
          <div
            suppressContentEditableWarning={true}
            onInput={(e) => {
              setBody(e.target.innerHTML);
              handleInput();
            }}
            placeholder="Your thoughts go here..."
            className="h-full bg-white break-words p-4 text-xl before:block before:text-gray-500 empty:before:content-[attr(placeholder)]"
            contentEditable
          >
            {body}
          </div>
          <div className="w-1/2 flex flex-row gap-x-16">
            <Button styles={"w-full md:w-64"}>Create</Button>
            <button
              type="button"
              onClick={() => {
                setBody(TEST_BODY);
                setTitle(TEST_TITLE);
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
