import { Home } from "./components/Home";
import FrontPage from "./components/FrontPage";
import Register from "./components/Register";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    requireAuth: true,
    path: "/front",
    element: <FrontPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default AppRoutes;
