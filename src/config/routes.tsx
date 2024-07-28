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
  // Post
  {
    path: "post", // New post
    lazy: () => import("../pages/Edit"),
    auth: true,
  },
  {
    path: ":year/:month/:day/:titleId",
    lazy: () => import("../pages/Post"),
    auth: false
  },
  // Catch all (404)
  {
    path: "*",
    lazy: () => import("../pages/404"),
    auth: false
  }
]

export default routes