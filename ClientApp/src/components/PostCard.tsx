import React from "react";
import { useNavigate } from "react-router-dom";
import { PostInfoDTO } from "../types/apiTypes";
import PrettyDate from "./iconify/PrettyDate";
import Like from "./iconify/Like";
import UserButton from "./iconify/UserButton";

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

export default function PostCard({ postData }: { postData: PostInfoDTO }) {
  const randomGradient = getRandomGradient();
  const navigate = useNavigate();

  const handleGotoPost = () => {
    navigate(`/post/${postData.id}`);
  };

  return (
    <div className="p-4 text-white relative">
      <div className="flex flex-col gap-y-4 relative">
        <h1
          className="font-bold text-2xl z-10 capitalize cursor-pointer"
          onClick={handleGotoPost}
        >
          {postData.title}
        </h1>
        <div className="flex flex-row justify-between text-lg">
          <div className="flex flex-row gap-x-8 z-10">
            <PrettyDate date={postData.createdAt} />
            <Like
              liked={(postData as PostInfoDTO).userDoesLike}
              likes={(postData as PostInfoDTO).likes}
            />
          </div>
          <UserButton
            styles="z-10 cursor-pointer"
            user={postData.autor}
            type="tag"
          />
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
