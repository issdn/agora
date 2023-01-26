import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("api/post").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center gap-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} postData={post}/>
        ))}
    </div>
  );
}
