import { axiosInstance } from "../api/axiosInterceptors";
import React, { useState } from "react";
import { GetCommentDTO } from "../types/apiTypes";
import { prettyDate } from "../scripts/utils";
import Button from "./Button";
import Icon from "./iconify/Icon";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../types/appTypes";

export default function CommentsList({
  postId,
  comments,
  setComments,
}: {
  postId: number;
  comments: GetCommentDTO[];
  setComments: React.Dispatch<React.SetStateAction<GetCommentDTO[]>>;
}) {
  const [commentsFetched, setCommentsFetched] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const { nickname } = useAuth() as { nickname: AuthContextType["nickname"] };

  const deleteComment = (commentId: number) => {
    axiosInstance
      .delete(`api/comment/` + commentId)
      .then(() =>
        setComments(comments.filter((comment) => comment.id !== commentId))
      );
  };

  const fetchComments = () => {
    if (postId !== undefined) {
      axiosInstance.get(`api/comment/${postId}`).then((res) => {
        setComments(res.data);
        setCommentsFetched(true);
        setCommentsOpen(true);
      });
    }
  };

  const handleCommentsClick = () => {
    if (!commentsFetched) {
      fetchComments();
    } else {
      setCommentsOpen(!commentsOpen);
    }
  };

  const renderComments = () => {
    return comments.map((c) => (
      <div
        key={c.id}
        className="flex flex-col gap-y-2 border-l border-black px-4 py-1"
      >
        <p className="text-xl">{c.body}</p>
        <div className="flex flex-row gap-x-8">
          <p>{c.autor}</p>
          <p>{prettyDate(c.createdAt)}</p>
          {nickname === c.autor ? (
            <Icon
              onClick={() => deleteComment(c.id)}
              iconName="delete_forever"
              styles="cursor-pointer"
            />
          ) : null}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={handleCommentsClick}
        type="clear"
        styles="w-fit flex flex-row"
      >
        <p>Comments</p>
        <Icon
          iconName="expand_more"
          styles={`text-2xl ${commentsOpen ? "rotate-180" : ""}`}
        />
      </Button>
      {commentsOpen ? renderComments() : null}
    </div>
  );
}
