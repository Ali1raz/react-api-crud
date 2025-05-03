import { useContext, useDeferredValue, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { token, user } = context;
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  const getPost = async () => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (user.id != data.post.user_id) {
      navigate("/");
      return;
    }

    if (res.ok) {
      setFormData({
        title: data.post.title,
        body: data.post.body,
      });
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate(`/post/${id}`);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <section className="min-h-screen mx-auto flex flex-col items-center justify-center">
      <h1 className="title ">Update Post</h1>
      <form className="space-y-5 max-w-96 w-2/3 mt-10" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors?.title && <p className="error">{errors.title[0]}</p>}
        </div>
        <div>
          <textarea
            rows={3}
            placeholder="Describe your post..."
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors?.body && <p className="error">{errors.body[0]}</p>}
        </div>
        <button className="w-full cursor-pointer bg-blue-800 text-white hover:bg-blue-900">
          Send
        </button>
      </form>
    </section>
  );
}
