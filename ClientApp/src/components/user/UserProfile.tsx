import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { UserInfoDTO } from "../../types/apiTypes";
import Chip from "../data-display/ChipButton";
import { useAuth } from "../../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../../types/appTypes";

export default function UserProfile({
  userNickname,
}: {
  userNickname: string;
}) {
  let { nickname } = useAuth() as { nickname: AuthContextType["nickname"] };

  const [userInfo, setUserInfo] = useState<UserInfoDTO>({
    nickname: "",
    numberOfFollowed: 0,
    numberOfFollowers: 0,
    numberOfLikes: 0,
    userDoesFollow: false,
  });

  const handleFollowClick = () => {
    axiosInstance.post("/api/follow/" + userNickname).then(() => {
      if (!userInfo.userDoesFollow) {
        setUserInfo({
          ...userInfo,
          numberOfFollowers: userInfo.numberOfFollowers + 1,
          userDoesFollow: true,
        });
      } else {
        setUserInfo({
          ...userInfo,
          numberOfFollowers: userInfo.numberOfFollowers - 1,
          userDoesFollow: false,
        });
      }
    });
  };

  useEffect(() => {
    axiosInstance
      .get("/api/user/" + userNickname)
      .then((res) => setUserInfo(res.data))
      .then(() => console.log(userInfo));
  }, [userNickname]);

  return (
    <div className="flex flex-col gap-y-4 p-4 text-xl">
      <div className="flex flex-row gap-x-4">
        <h1 className="text-2xl">
          <b>{userInfo.nickname}</b>
        </h1>
        {nickname !== userNickname ? (
          <Chip type="dark" onClick={handleFollowClick} styles="text-base">
            <p className="text-center">
              {userInfo.userDoesFollow ? "Followed" : "Follow"}
            </p>
          </Chip>
        ) : null}
      </div>
      <div className="flex flex-col gap-x-4 md:flex-row">
        <p className="cursor-pointer underline underline-offset-4 hover:text-blue-800">
          Follows: {userInfo.numberOfFollowed}
        </p>
        <p className="cursor-pointer underline underline-offset-4 hover:text-blue-800">
          Followers: {userInfo.numberOfFollowers}
        </p>
        <p>Likes: {userInfo.numberOfLikes}</p>
      </div>
    </div>
  );
}
