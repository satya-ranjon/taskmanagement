import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";

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
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
    ],
  },
]);

export default routes;
