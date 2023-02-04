import React from "react";
import { PostInfoDTO } from "../../types/apiTypes";
import PostCard from "./PostCard";

export default function PostsListBase({
  posts,
  dontShowAuthor = false,
}: {
  posts: PostInfoDTO[];
  dontShowAuthor?: boolean;
}) {
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
