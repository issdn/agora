export interface PostInfoDTO {
  id: number;
  title: string;
  createdAt: string;
  likes: number;
  userId: number;
  autor: string;
  commentsNumber: number;
  userDoesLike: boolean;
}

export interface PostDTO extends PostInfoDTO {
  body: string;
}

export type SimplePostDTO = {
  title: string;
  body: string;
};

export type UserLoginDTO = {
  nickname: string;
  password: string;
};

export type UserRegisterDTO = {
  nickname: string;
  password: string;
  passconfirmation: string;
};

export type CommentDTO = {
  body: string;
};

export type GetCommentDTO = {
  body: string;
  createdAt: string;
  id: number;
  postId: number;
  autor: string;
};

export type UserInfoDTO = {
  nickname: string;
  numberOfFollowers: number;
  numberOfFollowed: number;
  numberOfLikes: number;
  userDoesFollow: boolean;
  numberOfPosts: number;
};
