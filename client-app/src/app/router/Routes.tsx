import { createBrowserRouter, RouteObject } from "react-router-dom";
import BlogPost from "../../features/Posts/content/BlogPost";
import PostDashboard from "../../features/Posts/dashboard/PostDashboard";
import PostsForm from "../../features/Posts/postsform/PostsForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: "posts", element: <PostDashboard />},
            {path: "posts/:id", element: <BlogPost />},
            {path: "createPost", element: <PostsForm key='create'/>},
            {path: "manage/:id", element: <PostsForm key='manage'/>},
        ]
    }
]

export const router = createBrowserRouter(routes)