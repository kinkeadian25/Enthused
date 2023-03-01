import React from "react";
import { Post } from "../../../app/models/post";
import BlogPost from "../content/BlogPost";
import PostsForm from "../postsform/PostsForm";
import PostList from "./PostList";

interface Props {
  posts: Post[];
  selectedPost: Post | undefined;
  selectPost: (id: string) => void;
  cancelSelectPost: () => void;
}

export default function PostsDashboard({ posts, selectedPost, selectPost, cancelSelectPost }: Props) {
  return (
    <>
    <PostList posts={posts} selectPost={selectPost} />
    {selectedPost && <BlogPost post={selectedPost} />}
    <PostsForm createPost={function (post: Post): Promise<void> {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
}
