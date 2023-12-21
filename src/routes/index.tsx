import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default routes;
