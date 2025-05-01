import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Login() {
  const navigate = useNavigate();

  const { setToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
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
      <h1 className="title">Login to your account</h1>
      <form onSubmit={handleSubmit} className="w-2/3 login mx-auto space-y-4">
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
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
