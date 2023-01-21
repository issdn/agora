import { Home } from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import PostEditor from "./components/PostEditor";

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
];

export default AppRoutes;
