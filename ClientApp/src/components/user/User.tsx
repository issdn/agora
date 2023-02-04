import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import ClosablePostsList from "../post/ClosablePostsList";
import { UserInfoDTO } from "../../types/apiTypes";
import SimpleUserDataList from "./SimpleUserDataList";

export default function User() {
  let { userNickname } = useParams();
  const [currOpenTab, setCurrOpenTab] = useState<
    "posts" | "follows" | "followers"
  >("posts");
  const [userInfo, setUserInfo] = useState<UserInfoDTO>({
    nickname: "",
    numberOfFollowers: 0,
    numberOfFollowed: 0,
    numberOfLikes: 0,
    userDoesFollow: false,
    numberOfPosts: 0,
  });

  return (
    <div className="flex flex-col gap-y-12">
      <UserProfile
        userInfo={userInfo as UserInfoDTO}
        setUserInfo={setUserInfo}
        userNickname={userNickname as string}
      />

      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row text-xl gap-x-6 border-b border-black">
          <p
            onClick={() => setCurrOpenTab("follows")}
            className={`px-2 py-1 cursor-pointer ${
              currOpenTab === "follows" ? "bg-gray-300" : ""
            }`}
          >
            Follows ({userInfo.numberOfFollowed})
          </p>
          <p
            onClick={() => setCurrOpenTab("followers")}
            className={`px-2 py-1 cursor-pointer ${
              currOpenTab === "followers" ? "bg-gray-300" : ""
            }`}
          >
            Followers ({userInfo.numberOfFollowers})
          </p>
          <p
            onClick={() => setCurrOpenTab("posts")}
            className={`px-2 py-1 cursor-pointer ${
              currOpenTab === "posts" ? "bg-gray-300" : ""
            }`}
          >
            Posts ({userInfo.numberOfPosts})
          </p>
        </div>
        <ClosablePostsList
          isOpen={currOpenTab === "posts"}
          url={"api/user/posts/" + userNickname}
          userNickname={userNickname as string}
        />
        <SimpleUserDataList
          url={"api/follow/followers/" + userNickname}
          isOpen={currOpenTab === "followers"}
          emptyMessage={userNickname + " has no followers 😞"}
        />
        <SimpleUserDataList
          url={"api/follow/follows/" + userNickname}
          isOpen={currOpenTab === "follows"}
          emptyMessage={userNickname + " doesn't follow anyone 😞"}
        />
      </div>
    </div>
  );
}
