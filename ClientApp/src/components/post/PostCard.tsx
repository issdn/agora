import React from "react";
import { useNavigate } from "react-router-dom";
import { PostInfoDTO } from "../../types/apiTypes";
import PrettyDate from "../iconify/PrettyDate";
import Like from "../iconify/Like";
import UserButton from "../iconify/UserButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAuth } from "../../api/api-authentication/AuthenticationService";

// Gradients from https://uigradients.com/
const gradients = [
  ["#DA4453", "#89216B"],
  ["#636363", "#a2ab58"],
  ["#ad5389", "#3c1053"],
  ["#a8c0ff", "#3f2b96"],
  ["#333333", "#dd1818"],
  ["#12c2e9", "#c471ed"],
  ["#355C7D", "#C06C84"],
  ["#bc4e9c", "#f80759"],
  ["#40E0D0", "#FF8C00"],
  ["#3E5151", "#DECBA4"],
  ["#11998e", "#38ef7d"],
];
const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export default function PostCard({
  postData,
  dontShowAuthor = false,
}: {
  postData: PostInfoDTO;
  dontShowAuthor?: boolean;
}) {
  const { nickname } = useAuth() as { nickname: string };
  const randomGradient = getRandomGradient();
  const navigate = useNavigate();

  const handleGotoPost = () => {
    navigate(`/post/${postData.id}`);
  };

  return (
    <div className="p-4 text-white relative">
      <div className="flex flex-col gap-y-4 relative">
        <div className="flex flex-row items-center justify-between">
          <h1
            className="font-bold text-2xl z-10 capitalize cursor-pointer break-all"
            onClick={handleGotoPost}
          >
            {postData.title}
          </h1>
          {nickname === postData.autor ? (
            <div
              onClick={() => navigate("editpost/" + postData.id)}
              className="text-xl z-10 cursor-pointer bg-slate-700/25 p-1.5 hover:bg-slate-500/25 text-white rounded-lg flex flex-row justify-center items-center"
            >
              <EditOutlinedIcon fontSize="inherit" />
            </div>
          ) : null}
        </div>
        <div className="flex flex-row justify-between text-lg">
          <div className="flex flex-row gap-x-8 z-10">
            {!dontShowAuthor ? (
              <UserButton styles="z-10 cursor-pointer" user={postData.autor} />
            ) : null}
            <Like
              liked={(postData as PostInfoDTO).userDoesLike}
              likes={(postData as PostInfoDTO).likes}
            />
            <PrettyDate date={postData.createdAt} />
          </div>
        </div>
      </div>
      <div
        onClick={handleGotoPost}
        className="absolute w-full h-full top-0 left-0 cursor-pointer rounded-xl z-0"
        style={{
          background: `linear-gradient(90deg, ${randomGradient[0]}, ${randomGradient[1]})`,
        }}
      />
    </div>
  );
}
