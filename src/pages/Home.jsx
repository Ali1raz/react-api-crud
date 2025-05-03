import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="title">Latest posts</h1>
      <div className="max-w-96 mx-w-4xl mx-auto mt-10">
        {posts.length > 0 ? (
          <div className="">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-2 border-black border-dashed p-5 mb-5 rounded-sm shadow-md"
              >
                <h2 className="text-xl font-bold">{post.title}</h2>
                <small>Created by {post.user.name}</small>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
}
