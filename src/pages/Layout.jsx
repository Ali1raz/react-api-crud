import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  }

  return (
    <div>
      <header className=" w-full p-4 bg-blue-950 text-white">
        <nav className="">
          <div className="left">
            <Link to="/">Home</Link>
          </div>
          {user ? (
            <div className="right">
              <p className=" text-slate-200">{user.name}</p>
              <Link to="/create-post" className="text-sm">
                Create
              </Link>
              <form>
                <button className="!bg-slate-100 error" onClick={handleLogout}>
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="right">
              <Link to="/register">Register</Link>
              <button>
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </nav>
      </header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
