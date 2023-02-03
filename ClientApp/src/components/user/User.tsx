import React, { useEffect, useState } from "react";
import { PostInfoDTO } from "../../types/apiTypes";
import { axiosInstance } from "../../api/axiosInterceptors";

export default function User() {
  const [posts, setPosts] = useState<PostInfoDTO[]>([]);

  useEffect(() => {
    axiosInstance.get("");
  });

  return <div>User</div>;
}
