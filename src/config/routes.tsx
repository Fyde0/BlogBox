import { RouteObject } from "react-router-dom"
import Root from "../pages/Root"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Post from "../pages/Post"
import ProtectedRoute from "../components/ProtectedRoute"
import Edit from "../pages/Edit"

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
        path: "post",
        children: [
          {
            path: "new",
            element: <><ProtectedRoute /><Edit /></>
          },
          {
            path: ":postId",
            element: <Post />,
          }
        ]
      }
      // {
      //   path: "post",
      //   children: [
      //     {
      //       element: <ProtectedRoute />,
      //       children: [
      //         {
      //           path: "new",
      //           element: <Edit />
      //         }
      //       ]
      //     },
      //     {
      //       path: ":postId",
      //       element: <Post />,
      //     }
      //   ]
      // }
    ],
  },
]

export default routes