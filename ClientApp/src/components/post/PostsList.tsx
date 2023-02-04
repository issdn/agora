import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { axiosInstance } from "../../api/axiosInterceptors";
import { PostInfoDTO } from "../../types/apiTypes";

export default function PostsList({
  url,
  dontShowAuthor = false,
}: {
  url: string;
  dontShowAuthor?: boolean;
}) {
  const [posts, setPosts] = useState<PostInfoDTO[]>([]);

  useEffect(() => {
    axiosInstance.get(url).then((res) => setPosts(res.data));
  }, [url]);

  return (
    <div className="flex flex-col justify-center gap-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          postData={post}
          dontShowAuthor={dontShowAuthor}
        />
      ))}
    </div>
  );
}
