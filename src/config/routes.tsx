import { RouteObject } from "react-router-dom"

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("../pages/Root"),
    // Not caught errors
    errorElement: <p className="w-100 text-center mt-5">⚠️ Something went wrong.</p>,
    children: [
      {
        index: true,
        lazy: () => import("../pages/Home")
      },
      {
        path: "login",
        lazy: () => import("../pages/Login")
      },
      {
        path: "post",
        children: [
          {
            path: "new",
            lazy: () => import("../pages/Edit")
          },
          {
            path: ":postId",
            lazy: () => import("../pages/Post")
          }
        ]
      }
    ],
  },
]

export default routes