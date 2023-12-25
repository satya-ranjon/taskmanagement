import { createBrowserRouter } from "react-router-dom";
import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todo from "../pages/Dashboard/Todo";
import DashboardWrapper from "../layout/DashboardWrapper";
import Event from "../pages/Dashboard/Event";
import Profile from "../pages/Dashboard/Profile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskView from "../pages/Dashboard/Todo/TaskView";
import UpdateTask from "../pages/Dashboard/Todo/UpdateTask";

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
  {
    path: "dashboard",
    element: <DashboardWrapper />,
    children: [
      {
        path: "todo",
        element: (
          <DndProvider backend={HTML5Backend}>
            <Todo />
          </DndProvider>
        ),
      },
      { path: "todo/:id", element: <TaskView /> },
      { path: "todo/edit/:id", element: <UpdateTask /> },
      { path: "event", element: <Event /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default routes;
