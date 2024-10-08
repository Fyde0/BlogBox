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
    lazy: () => import("../pages/UserPanel/index"),
    auth: true,
    children: [
      {
        path: "profile",
        lazy: () => import("../pages/UserPanel/EditProfile"),
        auth: true
      },
      {
        path: "settings",
        lazy: () => import("../pages/UserPanel/UserSettings"),
        auth: true
      },
      {
        path: "changePassword",
        lazy: () => import("../pages/UserPanel/ChangePassword"),
        auth: true
      }
    ]
  },
  // Admin panel
  {
    path: "admin",
    lazy: () => import("../pages/AdminPanel/index"),
    admin: true,
    children: [
      {
        path: "settings",
        lazy: () => import("../pages/AdminPanel/BlogSettings"),
        admin: true
      },
      {
        path: "homePostPreviews",
        lazy: () => import("../pages/AdminPanel/Home/PostPreviewsStyle"),
        admin: true
      },
      {
        path: "homeFeatured",
        lazy: () => import("../pages/AdminPanel/Home/FeaturedPostsSettings"),
        admin: true
      },
      {
        path: "homeIntroCard",
        lazy: () => import("../pages/AdminPanel/Home/IntroCard"),
        admin: true
      },
      {
        path: "sidebarSettings",
        lazy: () => import("../pages/AdminPanel/Sidebar/SidebarSettings"),
        admin: true
      },
      {
        path: "sidebarPostPreviews",
        lazy: () => import("../pages/AdminPanel/Sidebar/LatestPostsPreviewsStyle"),
        admin: true
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