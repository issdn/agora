import React, { useEffect } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { UserInfoDTO } from "../../types/apiTypes";
import ChipButton from "../data-display/ChipButton";
import { useAuth } from "../../api/api-authentication/AuthenticationService";
import { AddToastFuncType, AuthContextType } from "../../types/appTypes";
import Modal, { useModal } from "../Modal";
import EditUserPasswordForm from "../EditUserPasswordForm";
import Button from "../buttons/Button";

export default function UserProfile({
  userNickname,
  userInfo,
  setUserInfo,
  addToast,
}: {
  userNickname: string;
  userInfo: UserInfoDTO;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoDTO>>;
  addToast: AddToastFuncType;
}) {
  let { nickname, token } = useAuth() as {
    nickname: AuthContextType["nickname"];
    token: AuthContextType["token"];
  };

  const { isOpen, onOpen, onClose } = useModal();

  const handleFollowClick = () => {
    if (!token) {
      addToast("You must be logged in to follow.", "warning");
      return;
    }
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
        ) : (
          <Button styles="text-base" type="clear" onClick={onOpen}>
            Reset Password
          </Button>
        )}
      </div>
      <p>Likes: {userInfo.numberOfLikes}</p>
      <Modal
        title="Reset Password"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <EditUserPasswordForm onClose={onClose} />
      </Modal>
    </div>
  );
}
