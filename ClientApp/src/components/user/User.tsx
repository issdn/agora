import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import ClosablePostsList from "../post/ClosablePostsList";
import { UserInfoDTO } from "../../types/apiTypes";
import SimpleUserDataList from "./SimpleUserDataList";
import TableSwitch, { useTableSwitch } from "../TableSwitch";
import { AddToastFuncType } from "../../types/appTypes";

export default function User({ addToast }: { addToast: AddToastFuncType }) {
  let { userNickname } = useParams();

  const [userInfo, setUserInfo] = useState<UserInfoDTO>({
    nickname: "",
    numberOfFollowers: 0,
    numberOfFollowed: 0,
    numberOfLikes: 0,
    userDoesFollow: false,
    numberOfPosts: 0,
  });

  let tableSwitchItems = [
    {
      label: `Follows (${userInfo.numberOfFollowed})`,
      key: "follows",
    },
    {
      label: `Followers (${userInfo.numberOfFollowers})`,
      key: "followers",
    },
    {
      label: `Posts (${userInfo.numberOfPosts})`,
      key: "posts",
    },
  ];

  const { currOpenTab, setCurrOpenTab } = useTableSwitch(tableSwitchItems);

  return (
    <div className="flex flex-col gap-y-12">
      <UserProfile
        userInfo={userInfo as UserInfoDTO}
        setUserInfo={setUserInfo}
        userNickname={userNickname as string}
        addToast={addToast}
      />

      <div className="flex flex-col gap-y-4">
        <TableSwitch
          items={tableSwitchItems}
          currOpenTab={currOpenTab}
          setCurrOpenTab={setCurrOpenTab}
        />
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
