import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { PostInfoDTO } from "../../types/apiTypes";
import PostsListBase from "./PostsListBase";

export default function ClosablePostsList({
  url,
  isOpen,
}: {
  url: string;
  userNickname: string;
  isOpen: boolean;
}) {
  const [posts, setPosts] = useState<PostInfoDTO[]>([]);

  const handlePostDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    axiosInstance.get(url).then((res) => setPosts(res.data));
  }, [url]);

  return (
    <div className="flex flex-col gap-y-6">
      {isOpen ? (
        <PostsListBase
          posts={posts}
          dontShowAuthor
          handlePostDelete={handlePostDelete}
        />
      ) : null}
    </div>
  );
}
