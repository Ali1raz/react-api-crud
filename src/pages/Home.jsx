import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AppContext);

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
      <div className=" max-w-3xl mx-auto mt-10">
        {posts.length > 0 ? (
          <div className="max-sm:max-w-xl">
            {posts.map((post) => (
              <div
                key={post.id}
                className={clsx(
                  "border-2 border-black border-dashed p-5 mb-5 rounded-sm shadow-md",
                  user?.id === post.user_id && "border-blue-500"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <Link to={`/post/${post.id}`}>
                    <h2 className="text-xl truncate max-w-[36ch] max-sm:max-w-[20ch] max-sm:text-sm font-bold">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="space-x-2">
                    <small className="truncate max-w-6 max-sm:max-w-[4ch]">
                      {post.user.name}
                    </small>
                    <small className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <p className="truncate max-w-[70ch] max-sm:max-w-[40ch]">
                  {post.body}
                </p>
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
