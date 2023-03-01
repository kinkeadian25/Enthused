import React from "react";
import { Post } from "../../../app/models/post";
import BlogPost from "../content/BlogPost";
import PostsForm from "../postsform/PostsForm";
import PostList from "./PostList";

interface Props {
  posts: Post[];
}

export default function PostsDashboard({ posts }: Props) {
  return (
    <>
    <PostList posts={posts} />
    {posts[0] && <BlogPost post={posts[0]} />}
    <PostsForm createPost={function (post: Post): Promise<void> {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
}
