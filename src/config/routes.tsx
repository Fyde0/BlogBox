import IRoute from "../interfaces/route"

const routes: IRoute[] = [
  {
    path: "/",
    lazy: () => import("../pages/Home"),
    auth: false
  },
  {
    path: "login",
    lazy: () => import("../pages/Login"),
    auth: false
  },
  {
    path: "post",
    auth: false,
    children: [
      {
        path: "new",
        lazy: () => import("../pages/Edit"),
        auth: true
      },
      {
        path: ":postId",
        lazy: () => import("../pages/Post"),
        auth: false
      }
    ]
  }
]

export default routes