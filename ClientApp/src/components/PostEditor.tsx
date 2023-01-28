import React, { FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import axios from "axios";
import BigInput from "./BigInput";
import { AuthContextType } from "../types/appTypes";

const TEST_TITLE = "What is Lorem Ipsum?";
const TEST_BODY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const SAVE_MS = 1000;

export default function PostEditor() {
  const { token } = useAuth() as { token: AuthContextType["token"] };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [timer, setTimer] = useState(SAVE_MS);
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);

  const saveData = () => {
    axios
      .put(
        "api/postdraft",
        { title: title, body: body },
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      )
      .then((res) => console.log(res))
      .catch((reason) => alert(reason));
  };

  useEffect(() => {
    axios
      .get("api/postdraft", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
      })
      .catch((reason) => console.log(reason));
  }, []);

  useEffect(() => {
    handleInput();
  }, [body, title]);

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(
        "api/post/createpost",
        { title: title, body: body },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => console.log(res))
      .catch((reason) => alert(reason));
  };

  const handleInput = () => {
    clearTimeout(timeoutId as NodeJS.Timeout);
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
            }}
            placeholder="Title goes here..."
            className="text-4xl p-4"
          />
          <BigInput
            body={body}
            setBody={setBody}
            attributes={{ placeholder: "Your thoughts go here..." }}
          />
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
