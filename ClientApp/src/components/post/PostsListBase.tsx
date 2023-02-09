import React from "react";
import { PostInfoDTO } from "../../types/apiTypes";
import PostCard from "./PostCard";

export default function PostsListBase({
  posts,
  handlePostDelete,
  dontShowAuthor = false,
}: {
  posts: PostInfoDTO[];
  handlePostDelete: (id: number) => void;
  dontShowAuthor?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center gap-y-6">
      {posts.map((post) => (
        <PostCard
          handlePostDelete={handlePostDelete}
          key={post.id}
          postData={post}
          dontShowAuthor={dontShowAuthor}
        />
      ))}
    </div>
  );
}
