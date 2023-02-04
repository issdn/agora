import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { UserInfoDTO } from "../../types/apiTypes";
import ChipButton from "../data-display/ChipButton";
import { useAuth } from "../../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../../types/appTypes";

export default function UserProfile({
  userNickname,
  userInfo,
  setUserInfo,
}: {
  userNickname: string;
  userInfo: UserInfoDTO;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoDTO>>;
}) {
  let { nickname } = useAuth() as { nickname: AuthContextType["nickname"] };

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
    axiosInstance.get("/api/user/" + userNickname).then((res) => {
      setUserInfo(res.data);
    });
  }, [userNickname]);

  return (
    <div className="flex flex-col text-xl">
      <div className="flex flex-row gap-x-4">
        <h1 className="text-2xl">
          <b>{userInfo.nickname}</b>
        </h1>
        {nickname !== userNickname ? (
          <ChipButton
            type="dark"
            onClick={handleFollowClick}
            styles="text-base"
          >
            <p className="text-center">
              {userInfo.userDoesFollow ? "Followed" : "Follow"}
            </p>
          </ChipButton>
        ) : null}
      </div>
      <p>Likes: {userInfo.numberOfLikes}</p>
    </div>
  );
}
