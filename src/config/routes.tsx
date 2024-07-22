import { RouteObject } from "react-router-dom"
import Root from "../pages/Root"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Logout from "../pages/Logout"
import Post from "../pages/Post"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    // Not caught errors
    errorElement: <p className="w-100 text-center mt-5">⚠️ Something went wrong.</p>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "post/:postId?",
        element: <Post />
      }
    ],
  },
]

export default routes