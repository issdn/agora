import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

export default function Like({
  liked,
  likes,
}: {
  liked: boolean;
  likes: number;
}) {
  return (
    <div className="flex flex-row gap-x-1 items-center">
      {liked ? (
        <ThumbUpIcon fontSize="inherit" />
      ) : (
        <ThumbUpOutlinedIcon fontSize="inherit" />
      )}
      <p>{likes}</p>
    </div>
  );
}
