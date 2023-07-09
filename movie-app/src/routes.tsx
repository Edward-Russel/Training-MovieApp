import Profile from "./pages/Profile";
import Movies from "./pages/Movies";

const routes = [
  {
    index: true,
    element: <Movies />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export default routes;
