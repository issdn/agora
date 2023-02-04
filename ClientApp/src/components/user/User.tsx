import React from "react";
import { useParams } from "react-router-dom";
import PostsList from "../post/PostsList";
import UserProfile from "./UserProfile";

export default function User() {
  let { userNickname } = useParams();

  return (
    <div className="flex flex-col gap-y-8">
      <UserProfile userNickname={userNickname as string} />
      <div className="flex flex-col gap-y-6">
        <p className="text-xl border-b border-black">{userNickname} posts:</p>
        <PostsList url={"api/user/posts/" + userNickname} dontShowAuthor />
      </div>
    </div>
  );
}
