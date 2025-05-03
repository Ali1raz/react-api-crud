import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function ShowPost() {
  const { id } = useParams();
  const { user } = useContext(AppContext);

  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data.post);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <section className="min-h-screen mx-auto max-w-4xl">
      <h1 className="title">Post Details</h1>
      {post && (
        <div className=" mx-auto mt-10">
          <div className="border-b-2 border-black p-5 mb-5 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{post.title}</h2>
              {user.id == post.user_id && (
                <button className="bg-green-200 py-4">
                  <Link to={`/edit-post/${post.id}`}>Edit</Link>
                </button>
              )}
            </div>
            <div className="space-x-2 flex flex-col">
              <small>
                Create by {user?.id == post.user.id ? "You" : post.user.name}
              </small>
              <small className="text-sm text-gray-500">
                Created on {new Date(post.created_at).toLocaleDateString()}
              </small>
              <small className="text-sm text-gray-500">
                Last Updated at {new Date(post.updated_at).toLocaleTimeString()}
              </small>
            </div>
            <p>{post.body}</p>
          </div>
        </div>
      )}
    </section>
  );
}
