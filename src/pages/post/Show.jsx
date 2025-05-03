import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { formatDate } from "../../lib/utils";

export default function ShowPost() {
  const { id } = useParams();
  const { token, user } = useContext(AppContext);

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

  const handleDelete = async (id) => {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await res.json();
    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <section className="min-h-screen mx-auto max-w-4xl">
      {post ? (
        <div className=" mx-auto">
          <h1 className="title">Post Details</h1>
          <div className="border-b-2 border-black p-5 mb-5 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{post.title}</h2>
              {user?.id == post.user_id && (
                <div className="space-x-2.5">
                  <button className="bg-green-200 py-4">
                    <Link to={`/edit-post/${post.id}`}>Edit</Link>
                  </button>
                  <button
                    className="bg-rose-500 text-white py-4"
                    onClick={() => handleDelete(post?.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="space-x-2 flex flex-col">
              <small>
                Create by {user?.id == post.user.id ? "You" : post.user.name}
              </small>
              <small className="text-sm text-gray-500">
                Created on {formatDate(post.created_at)}
              </small>
              <small className="text-sm text-gray-500">
                Last Updated at {formatDate(post.updated_at)}
              </small>
            </div>
            <p>{post.body}</p>
          </div>
        </div>
      ) : (
        <h1 className="title">Post not found</h1>
      )}
    </section>
  );
}
