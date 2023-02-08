import { Home } from "./components/Home";
import NewPost from "./components/post/NewPost";
import Post from "./components/post/Post";
import User from "./components/user/User";
import EditPost from "./components/post/EditPost";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    requireAuth: true,
    path: "/newpost",
    element: <NewPost />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "/user/:userNickname",
    element: <User />,
  },
  {
    requireAuth: true,
    path: "/editpost/:id",
    element: <EditPost />,
  },
];

export default AppRoutes;
