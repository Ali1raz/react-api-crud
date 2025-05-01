import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header className=" w-full p-4 bg-blue-950 text-white">
        <nav className="">
          <div className="left">
            <Link to="/">Home</Link>
          </div>
          <div className="right">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
