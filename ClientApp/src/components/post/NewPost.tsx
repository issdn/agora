import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import PostEditor, { useEditor } from "./PostEditor";

const SAVE_MS = 2000;

export default function NewPost() {
  const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);
  const { post, setPost, clearPost } = useEditor();

  const saveData = () => {
    axiosInstance.put("api/postdraft", post).then((res) => console.log(res));
  };

  const fetchPost = useCallback(async () => {
    const response = await axiosInstance.get("api/postdraft");
    setPost(response.data);
  }, [post]);

  useEffect(() => {
    fetchPost();
  }, []);

  const handleInput = () => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    setTimeoutId(setTimeout(() => saveData(), SAVE_MS));
  };

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    axiosInstance.post("api/post/createpost", post).then(() => clearPost());
  };

  return (
    <PostEditor
      post={post}
      setPost={setPost}
      onInput={handleInput}
      onSubmit={handleCreatePost}
    />
  );
}
