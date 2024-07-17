import { RouteObject } from "react-router-dom"
import Root from "../pages/Root"
import Home from "../pages/Home"
import Post from "../pages/Post"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "post",
        element: <Post />
      }
    ],
  },
]

export default routes