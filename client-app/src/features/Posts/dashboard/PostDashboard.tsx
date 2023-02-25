import React from "react";
import { Post } from "../../../app/models/post";
import BlogPost from "../content/BlogPost";
import PostList from "./PostList";

interface Props {
  posts: Post[];
}

export default function PostsDashboard({ posts }: Props) {
  return (
    <>
    <PostList posts={posts} />
    {posts[0] && <BlogPost post={posts[0]} />}
    </>
  );
}
