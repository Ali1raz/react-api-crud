import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import CreatePost from "./pages/post/Create";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
        </Route>
        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}
