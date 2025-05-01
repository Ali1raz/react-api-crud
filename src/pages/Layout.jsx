import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Layout() {
  const { user } = useContext(AppContext);
  return (
    <div>
      <header className=" w-full p-4 bg-blue-950 text-white">
        <nav className="">
          <div className="left">
            <Link to="/">Home</Link>
          </div>
          {user ? (
            <div className="space-x-4">
              <p className=" text-slate-200">{user.name}</p>
            </div>
          ) : (
            <div className="right">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
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
