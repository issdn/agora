import React from "react";
import { useNavigate } from "react-router-dom";
import { PostInfoDTO } from "../types/apiTypes";
import PrettyDate from "./DataWithIcons/PrettyDate";
import IconInformation from "./DataWithIcons/IconInformation";

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

  return (
    <div
      onClick={() => navigate(`/post/${postData.id}`)}
      className="cursor-pointer p-4 text-white flex flex-col gap-y-4 rounded-xl"
      style={{
        background: `linear-gradient(90deg, ${randomGradient[0]}, ${randomGradient[1]})`,
      }}
    >
      <h1 className="font-bold text-2xl">{postData.title}</h1>
      <div className="flex flex-row justify-between text-sm">
        <div className="flex flex-row gap-x-8">
          <PrettyDate date={postData.createdAt} />
          <IconInformation iconName="thumb_up" information={postData.likes} />
        </div>
        <IconInformation
          iconName="person"
          information={postData.autor}
          type="tag"
        />
      </div>
    </div>
  );
}
