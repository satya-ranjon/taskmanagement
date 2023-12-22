import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default routes;
