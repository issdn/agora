import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { PostInfoDTO } from "../types/apiTypes";

export function Home() {
  const [posts, setPosts] = useState<PostInfoDTO[]>([]);

  useEffect(() => {
    axios.get("api/post").then((res: AxiosResponse<PostInfoDTO[]>) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center gap-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} postData={post} />
      ))}
    </div>
  );
}