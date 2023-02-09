import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

export default function LikeButton({
  likes,
  handleLike,
  liked,
}: {
  likes: number;
  handleLike: () => void;
  liked: boolean;
}) {
  return (
    <div className="flex flex-row gap-x-1 text-xl items-center">
      <button onClick={handleLike} className="flex flex-col justify-center">
        {liked ? (
          <ThumbUpIcon fontSize="inherit" />
        ) : (
          <ThumbUpOutlinedIcon fontSize="inherit" />
        )}
      </button>
      <p>{likes}</p>
    </div>
  );
}
