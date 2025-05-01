import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Register() {
  const navigate = useNavigate();

  const { setToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
  }

  return (
    <>
      <h1 className="title">Register your account</h1>
      <form onSubmit={handleSubmit} className="w-2/3 mx-auto space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors?.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors?.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors?.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
