import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios.get("api/post/" + id).then((res) => setPost(res.data));
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        <p>{post.userNickname}</p>
      </div>
    </div>
  );
}
