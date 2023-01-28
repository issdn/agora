export interface PostInfoDTO {
  id: number;
  title: string;
  createdAt: string;
  likes: number;
  userId: number;
  autor: string;
}

export interface PostDTO extends PostInfoDTO {
  body: string;
}

export type UserLoginDTO = {
  nickname: string;
  password: string;
};

export type UserRegisterDTO = {
  email: string;
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
