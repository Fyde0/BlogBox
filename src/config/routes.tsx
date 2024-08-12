import IRoute from "../interfaces/route"

const routes: IRoute[] = [
  {
    path: "/page?/:page?", // ← I don't get it
    lazy: () => import("../pages/Home")
  },
  // Auth
  {
    path: "login",
    lazy: () => import("../pages/Login")
  },
  {
    path: "register",
    lazy: () => import("../pages/Register")
  },
  // New post
  {
    path: "post",
    lazy: () => import("../pages/CreatePost"),
    auth: true
  },
  // View and edit post
  {
    path: ":year/:month?/:day?",
    children: [
      {
        path: "page?/:page?",
        lazy: () => import("../pages/ViewPostsByDateRange")
      },
      {
        path: ":titleId",
        children: [
          {
            path: "",
            lazy: () => import("../pages/ViewPost")
          },
          {
            path: "edit",
            lazy: () => import("../pages/EditPost"),
            auth: true
          }
        ]
      }
    ]
  },
  {
    path: "tag/:tag/page?/:page?",
    lazy: () => import("../pages/ViewPostsByTag")
  },
  // User Panel
  {
    path: "account",
    lazy: () => import("../pages/UserPanel"),
    auth: true,
    children: [
      {
        path: "profile",
        lazy: () => import("../pages/EditProfile"),
        auth: true
      },
      {
        path: "settings",
        lazy: () => import("../pages/UserSettings"),
        auth: true
      }
    ]
  },
  // Admin panel
  {
    path: "admin",
    lazy: () => import("../pages/AdminPanel"),
    admin: true,
    children: [
      {
        path: "settings",
        lazy: () => import("../pages/BlogSettings"),
        admin: true,
      }
    ]
  },
  // Catch all (404)
  {
    path: "*",
    lazy: () => import("../pages/404")
  }
]

export default routes