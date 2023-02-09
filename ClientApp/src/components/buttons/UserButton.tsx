import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";

type types = "tag" | "base";
const styleByType = { tag: "bg-gray-800 rounded-md px-2 text-white", base: "" };

export default function UserButton({
  user,
  type = "base",
  styles,
}: {
  user: string;
  type?: types;
  styles?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/user/" + user)}
      className={`flex flex-row items-center gap-x-1 select-none cursor-pointer hover:underline ${styleByType[type]} ${styles}`}
    >
      <PersonOutlineOutlinedIcon fontSize="inherit" />
      <p>{user}</p>
    </div>
  );
}
