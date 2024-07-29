import IRoute from "../interfaces/route"

const routes: IRoute[] = [
  {
    path: "/",
    lazy: () => import("../pages/Home"),
    auth: false
  },
  // Auth
  {
    path: "login",
    lazy: () => import("../pages/Login"),
    auth: false
  },
  // New post
  {
    path: "post",
    lazy: () => import("../pages/CreatePost"),
    auth: true,
  },
  // View and edit post
  {
    path: ":year/:month/:day/:titleId",
    auth: false,
    children: [
      {
        path: "",
        lazy: () => import("../pages/ViewPost"),
        auth: false
      },
      {
        path: "edit",
        lazy: () => import("../pages/EditPost"),
        auth: true
      }
    ]
  },
  // Catch all (404)
  {
    path: "*",
    lazy: () => import("../pages/404"),
    auth: false
  }
]

export default routes