import { axiosInstance } from "../api/axiosInterceptors";
import React, { useState } from "react";
import { GetCommentDTO } from "../types/apiTypes";
import { prettyDate } from "../scripts/utils";
import Button from "./buttons/Button";
import { useAuth } from "../api/api-authentication/AuthenticationService";
import { AuthContextType } from "../types/appTypes";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

export default function CommentsList({
  postId,
  comments,
  setComments,
  numberOfComments,
  substractOneToNumberOfComments,
}: {
  postId: number;
  comments: GetCommentDTO[];
  setComments: React.Dispatch<React.SetStateAction<GetCommentDTO[]>>;
  numberOfComments: number;
  substractOneToNumberOfComments: () => void;
}) {
  const [commentsFetched, setCommentsFetched] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const { nickname } = useAuth() as { nickname: AuthContextType["nickname"] };

  const deleteComment = (commentId: number) => {
    axiosInstance.delete(`api/comment/` + commentId).then(() => {
      substractOneToNumberOfComments();
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
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
            <DeleteForeverOutlinedIcon
              onClick={() => deleteComment(c.id)}
              style={{ cursor: "pointer" }}
            />
          ) : null}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-y-4">
      {numberOfComments === 0 ? (
        <p className="text-xl">No comments</p>
      ) : (
        <Button
          onClick={handleCommentsClick}
          type="clear"
          styles="w-fit flex flex-row text-2xl items-center"
        >
          <p className="text-xl">Comments ({numberOfComments})</p>
          <ExpandMoreOutlinedIcon
            fontSize="inherit"
            style={{ transform: commentsOpen ? "rotate(180deg)" : "" }}
          />
        </Button>
      )}
      {commentsOpen ? renderComments() : null}
    </div>
  );
}
