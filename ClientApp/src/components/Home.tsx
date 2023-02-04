import React from "react";
import PostsList from "./post/PostsList";

export function Home() {
  return <PostsList url="api/post" />;
}
