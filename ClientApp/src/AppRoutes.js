import { Home } from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import PostEditor from "./components/PostEditor";
import Post from "./components/Post";
import User from "./components/user/User";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    requireAuth: true,
    path: "/newpost",
    element: <PostEditor />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "/user/:nickname",
    element: <User />,
  },
];

export default AppRoutes;
