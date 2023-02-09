import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInterceptors";
import { useParams } from "react-router-dom";
import { PostDTO } from "../../types/apiTypes";
import PrettyDate from "../buttons/PrettyDate";
import CommentField from "../CommentField";
import CommentsList from "../CommentsList";
import { GetCommentDTO } from "../../types/apiTypes";
import { AddToastFuncType, AuthContextType } from "../../types/appTypes";
import { useAuth } from "../../api/api-authentication/AuthenticationService";
import LikeButton from "../buttons/LikeButton";
import UserButton from "../buttons/UserButton";
import PostAuthorButtons from "../buttons/PostAuthorButtons";
import TextDecreaseOutlinedIcon from "@mui/icons-material/TextDecreaseOutlined";
import TextIncreaseOutlinedIcon from "@mui/icons-material/TextIncreaseOutlined";
import IconButton from "../buttons/IconButton";

const sizes = ["base", "lg", "xl", "2xl", "3xl", "4xl"];

export default function Post({ addToast }: { addToast: AddToastFuncType }) {
  const { token, nickname } = useAuth() as {
    token: AuthContextType["token"];
    nickname: string;
  };
  const [post, setPost] = useState<PostDTO | {}>({});
  const [sizeIndex, setSizeIndex] = useState(3);
  const [comments, setComments] = useState<GetCommentDTO[]>([]);
  const [comment, setComment] = useState("");

  let { id } = useParams();

  const addOneToNumberOfComments = () => {
    setPost({ ...post, commentsNumber: (post as PostDTO).commentsNumber + 1 });
  };

  const substractOneToNumberOfComments = () => {
    setPost({ ...post, commentsNumber: (post as PostDTO).commentsNumber - 1 });
  };

  const addLike = async () => {
    if (!token) {
      addToast("You must be logged in to like!", "warning");
      return;
    }
    await axiosInstance
      .post("api/post/like/" + (post as PostDTO).id)
      .then((res) => {
        if (res.data === "Liked") {
          setPost({
            ...post,
            likes: (post as PostDTO).likes + 1,
            userDoesLike: true,
          });
        } else {
          setPost({
            ...post,
            likes: (post as PostDTO).likes - 1,
            userDoesLike: false,
          });
        }
      });
  };

  const handleLike = async () => {
    await addLike();
  };

  useEffect(() => {
    axiosInstance.get("api/post/" + id).then((res) => setPost(res.data));
  }, []);

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post("api/comment", { body: comment, postId: (post as PostDTO).id })
      .then((res) => {
        (e.target as HTMLTextAreaElement).value = "";
        addOneToNumberOfComments();
        setComments([res.data, ...comments]);
        setComment("");
      });
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <h1 className="break-all font-inconsolata text-4xl font-bold">
          {(post as PostDTO).title}
        </h1>
        <div className="flex flex-row justify-between border-black">
          <div className="flex flex-row gap-x-8 text-lg">
            <UserButton user={(post as PostDTO).autor} />
            <PrettyDate date={(post as PostDTO).createdAt} />
            <LikeButton
              liked={(post as PostDTO).userDoesLike}
              handleLike={handleLike}
              likes={(post as PostDTO).likes}
            />
          </div>
          {nickname === (post as PostDTO).autor ? (
            <PostAuthorButtons
              handlePostDelete={() => null}
              postId={(post as PostDTO).id}
              type="secondary"
            />
          ) : null}
        </div>
        <div className="mt-12 flex flex-col gap-y-4">
          <div className="flex flex-row justify-end gap-x-2">
            <IconButton
              type="small"
              onClick={() => {
                if (sizeIndex > 0) setSizeIndex(sizeIndex - 1);
              }}
            >
              <TextDecreaseOutlinedIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              type="small"
              onClick={() => {
                if (sizeIndex < sizes.length - 1) setSizeIndex(sizeIndex + 1);
              }}
            >
              <TextIncreaseOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>
          <p className={`text-${sizes[sizeIndex]}`}>{(post as PostDTO).body}</p>
        </div>
      </div>
      {token ? (
        <CommentField
          submitComment={submitComment}
          setComment={setComment}
          comment={comment}
          styles="mt-16"
        />
      ) : null}
      <CommentsList
        comments={comments}
        setComments={setComments}
        postId={(post as PostDTO).id}
        numberOfComments={(post as PostDTO).commentsNumber}
        substractOneToNumberOfComments={substractOneToNumberOfComments}
      />
    </div>
  );
}
