export type PostInfoDTO = {
  id: number;
  title: string;
  createdAt: string;
  likes: number;
  userId: number;
  userNickname: string;
};

export type UserLoginDTO = {
  nickname: string;
  password: string;
};
