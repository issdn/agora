import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { PostInfoDTO } from "../../types/apiTypes";
import PostsListBase from "./PostsListBase";

export default function PostsList({ url }: { url: string }) {
  const [posts, setPosts] = useState<PostInfoDTO[]>([]);

  useEffect(() => {
    axiosInstance.get(url).then((res) => setPosts(res.data));
  }, [url]);

  return <PostsListBase posts={posts} />;
}
