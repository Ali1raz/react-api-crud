import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { token } = context;
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "post",
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
      navigate("/");
    }
  };

  return (
    <section className="min-h-screen mx-auto flex flex-col items-center justify-center">
      <h1 className="title ">Create new Post</h1>
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
