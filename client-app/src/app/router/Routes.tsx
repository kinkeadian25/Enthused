import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import BlogPost from "../../features/Posts/content/BlogPost";
import PostDashboard from "../../features/Posts/dashboard/PostDashboard";
import PostsForm from "../../features/Posts/postsform/PostsForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "posts", element: <PostDashboard />},
            {path: "posts/:id", element: <BlogPost />},
            {path: "createPost", element: <PostsForm />},
            {path: "manage/:id", element: <PostsForm />},
        ]

    }

]

export const router = createBrowserRouter(routes)