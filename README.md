### BlogBox
![](https://github.com/Fyde0/BlogBox/actions/workflows/deploy-to-server.yml/badge.svg?branch=deploy)

BlogBox is a responsive blog platform made with React and written in Typescript.
It features several customization options like themes and layout changes, a tagging system, a WYSIWYG markdown editor and more.
It uses [BlogBoxAPI](https://github.com/Fyde0/BlogBoxAPI "BlogBoxAPI") as its backend.

You can try a demo [here](https://dev.flere.pw/blogbox "here"), login with remy:remy for a normal user account, or admin:admin if you want to see the customization options in the admin panel.

This is a personal project I started to test various methods of routing management, state management, queries, and cache.
In the end I achieved an extremely efficient and fast system, there are zero useEffect in BlogBox and all data is cached until modified or until it's stale (after a certain period or after a page refresh).

#### Routing
The routing is handled by React Router, I used lazy imports so the app only loads the next page when necessary. I decided not to use React Router loaders and actions because I didn't like how they handle the transition between pages, I integrated React Query's state to have full control on where and how to display the loading components.

#### React Query
React Query handles fetching and sending data to the backend, all the data is cached so navigating through pages already visited is instantaneous, the cache of a specific page is invalidated when changes are applied to it (e.g. the cache of a post is deleted when the post is edited) or when refreshing the page.

#### Global state management (context)
I experimented with various methods of global state management and I ended up keeping Zustand because it's very powerful but still simple to use. I also tested React Query and I decided to keep it for the global settings state just to have two examples.
