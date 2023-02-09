import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { PostInfoDTO } from "../../types/apiTypes";
import PostsListBase from "./PostsListBase";

export default function PostsList({
  url,
  isOpen,
  emptyMessage = "Nothing to see...",
}: {
  url: string;
  isOpen: boolean;
  emptyMessage?: string;
}) {
  const [posts, setPosts] = useState<PostInfoDTO[]>([]);

  const handlePostDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    axiosInstance.get(url).then((res) => setPosts([...posts, ...res.data]));
  }, [url]);

  const renderTable = () => {
    return !(posts.length > 0) ? (
      <p className="text-xl">{emptyMessage}</p>
    ) : (
      <PostsListBase posts={posts} handlePostDelete={handlePostDelete} />
    );
  };

  return isOpen ? renderTable() : null;
}
