import React, { FormEvent, useCallback, useEffect } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import PostEditor, { useEditor } from "./PostEditor";
import { useParams } from "react-router-dom";

export default function EditPost() {
  let { id } = useParams();
  const { post, setPost } = useEditor();

  const fetchPost = useCallback(async () => {
    const response = await axiosInstance.get("api/post/" + id);
    setPost(response.data);
  }, [post]);

  useEffect(() => {
    fetchPost();
  }, []);

  const handleInput = () => {};

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosInstance.put("api/post/edit/" + id, post).then();
  };

  return (
    <PostEditor
      post={post}
      setPost={setPost}
      onInput={handleInput}
      onSubmit={onSubmit}
    />
  );
}
