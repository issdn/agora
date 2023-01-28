import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PostDTO } from "../types/apiTypes";
import PrettyDate from "./DataWithIcons/PrettyDate";
import IconInformation from "./DataWithIcons/IconInformation";
import CommentField from "./CommentField";
import CommentsList from "./CommentsList";
import { GetCommentDTO } from "../types/apiTypes";
import { AuthContextType } from "../types/appTypes";
import { useAuth } from "../api/api-authentication/AuthenticationService";

const sizes = ["sm", "base", "lg", "xl", "2xl"];

export default function Post() {
  const { token } = useAuth() as {
    token: AuthContextType["token"];
    nickname: string;
  };
  const [post, setPost] = useState<PostDTO | {}>({});
  const [sizeIndex, setSizeIndex] = useState(3);
  const [comments, setComments] = useState<GetCommentDTO[]>([]);
  const [comment, setComment] = useState("");

  let { id } = useParams();

  useEffect(() => {
    axios.get("api/post/" + id).then((res) => setPost(res.data));
  }, []);

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(
        "api/comment",
        { body: comment, postId: (post as PostDTO).id },
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      )
      .then((res) => {
        setComment("");
        setComments([res.data, ...comments]);
      });
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-4xl font-inconsolata font-bold">
          {(post as PostDTO).title}
        </h1>
        <div className="flex flex-row justify-between border-black">
          <div className="flex flex-row gap-x-8">
            <IconInformation
              iconName="person"
              information={(post as PostDTO).autor}
            />
            <PrettyDate date={(post as PostDTO).createdAt} />
            <IconInformation
              iconName="thumb_up"
              information={(post as PostDTO).likes}
            />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-y-4">
          <div className="flex flex-row justify-end gap-x-2">
            <span
              onClick={() => {
                if (sizeIndex > 0) setSizeIndex(sizeIndex - 1);
              }}
              className="material-symbols-outlined bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-md px-1 text-2xl select-none"
            >
              text_decrease
            </span>
            <span
              onClick={() => {
                if (sizeIndex < sizes.length - 1) setSizeIndex(sizeIndex + 1);
              }}
              className="material-symbols-outlined bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-md px-1 text-2xl select-none"
            >
              text_increase
            </span>
          </div>
          <p className={`text-${sizes[sizeIndex]}`}>{(post as PostDTO).body}</p>
        </div>
      </div>
      <CommentField
        submitComment={submitComment}
        setComment={setComment}
        comment={comment}
        styles="mt-16"
      />
      <CommentsList
        comments={comments}
        setComments={setComments}
        postId={(post as PostDTO).id}
      />
    </div>
  );
}
